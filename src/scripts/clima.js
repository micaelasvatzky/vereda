import { CIUDAD } from '../config.js';

/** Agrupación de los códigos WMO publicados por Open-Meteo. */
export function describirTiempo(codigo) {
  if (codigo === 0) return { tipo: 'despejado', texto: 'Despejado' };
  if ([1, 2].includes(codigo)) return { tipo: 'parcial', texto: 'Parcialmente nublado' };
  if (codigo === 3) return { tipo: 'nublado', texto: 'Nublado' };
  if ([45, 48].includes(codigo)) return { tipo: 'niebla', texto: 'Con niebla' };
  if ([51, 53, 55, 56, 57].includes(codigo)) return { tipo: 'lluvia', texto: 'Llovizna' };
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(codigo)) return { tipo: 'lluvia', texto: 'Lluvia' };
  if ([71, 73, 75, 77, 85, 86].includes(codigo)) return { tipo: 'nieve', texto: 'Nieve' };
  if ([95, 96, 99].includes(codigo)) return { tipo: 'tormenta', texto: 'Tormenta' };
  return null;
}

/** La fecha se calcula siempre en Buenos Aires, aunque se visite desde otra ciudad. */
export function fechaCiudad(instante) {
  const partes = new Intl.DateTimeFormat('en-CA', {
    timeZone: CIUDAD.zonaHoraria, year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(new Date(instante));
  const valor = (tipo) => partes.find((parte) => parte.type === tipo).value;
  return `${valor('year')}-${valor('month')}-${valor('day')}`;
}

export function urlClima() {
  const url = new URL(CIUDAD.endpoint);
  url.search = new URLSearchParams({
    latitude: String(CIUDAD.latitud), longitude: String(CIUDAD.longitud),
    timezone: CIUDAD.zonaHoraria,
    current: 'temperature_2m,weather_code', daily: 'sunrise,sunset',
    forecast_days: '1', timeformat: 'unixtime', temperature_unit: 'celsius',
  }).toString();
  return url;
}

/** No convertir null en 0: un dato ausente no significa despejado ni cero grados. */
export function leerRespuesta(respuesta) {
  const temperatura = respuesta?.current?.temperature_2m;
  const codigo = respuesta?.current?.weather_code;
  const observado = respuesta?.current?.time;
  const amanecer = respuesta?.daily?.sunrise?.[0];
  const atardecer = respuesta?.daily?.sunset?.[0];
  if (![temperatura, codigo, observado, amanecer, atardecer].every(Number.isFinite) ||
      !describirTiempo(codigo) || observado <= 0 || amanecer <= 0 || atardecer <= amanecer ||
      [observado, amanecer, atardecer].some((valor) => Number.isNaN(new Date(valor * 1000).getTime()))) {
    throw new Error('La respuesta del clima está incompleta o no es válida.');
  }
  return {
    temperatura, codigo, observado: observado * 1000,
    amanecer: amanecer * 1000, atardecer: atardecer * 1000,
  };
}

const identidadCiudad = () => `${CIUDAD.latitud},${CIUDAD.longitud},${CIUDAD.zonaHoraria}`;

function leerCache(ahora) {
  try {
    const cache = JSON.parse(localStorage.getItem(CIUDAD.claveCache));
    if (cache?.version !== 1 || cache.ciudad !== identidadCiudad() ||
        !Number.isFinite(cache.guardadoEn) || cache.guardadoEn > ahora ||
        ahora - cache.guardadoEn > CIUDAD.maxEdadRespaldo) return null;
    const datos = leerRespuesta(cache.respuesta);
    if (Math.abs(ahora - datos.observado) > CIUDAD.maxEdadRespaldo) return null;
    return { ...cache, datos };
  } catch {
    // Almacenamiento bloqueado, JSON roto o datos viejos: se consulta sin caché.
    return null;
  }
}

/** La caída de la API nunca bloquea la vereda. */
export async function obtenerClima(ahora = Date.now()) {
  const cache = leerCache(ahora);
  if (cache && ahora - cache.guardadoEn < CIUDAD.vigenciaCache &&
      fechaCiudad(cache.datos.amanecer) === fechaCiudad(ahora)) {
    return { datos: cache.datos, estado: 'disponible', actualizadoEn: cache.guardadoEn };
  }

  const controlador = new AbortController();
  const espera = setTimeout(() => controlador.abort(), CIUDAD.timeout);
  try {
    const respuesta = await fetch(urlClima(), { signal: controlador.signal });
    if (!respuesta.ok) throw new Error(`Open-Meteo respondió ${respuesta.status}.`);
    const json = await respuesta.json();
    const datos = leerRespuesta(json);
    if (Math.abs(ahora - datos.observado) > CIUDAD.maxEdadRespaldo ||
        fechaCiudad(datos.amanecer) !== fechaCiudad(ahora)) {
      throw new Error('Open-Meteo no devolvió datos del día.');
    }
    try {
      localStorage.setItem(CIUDAD.claveCache, JSON.stringify({
        version: 1, ciudad: identidadCiudad(), guardadoEn: ahora, respuesta: json,
      }));
    } catch {
      // La respuesta sigue siendo útil aunque no se pueda guardar.
    }
    return { datos, estado: 'disponible', actualizadoEn: ahora };
  } catch {
    return { datos: cache?.datos ?? null, estado: cache ? 'guardado' : 'sin-datos' };
  } finally {
    clearTimeout(espera);
  }
}
