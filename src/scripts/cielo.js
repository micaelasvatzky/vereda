import { CIUDAD } from '../config.js';
import { describirTiempo, fechaCiudad, obtenerClima } from './clima.js';

/** Usa salida/puesta del sol del día; sin API, estima con la hora de Buenos Aires. */
export function momentoDelDia(ahora, datos = null) {
  let amanecer = datos?.amanecer;
  let atardecer = datos?.atardecer;
  if (!amanecer || fechaCiudad(amanecer) !== fechaCiudad(ahora)) {
    const partes = new Intl.DateTimeFormat('es-AR', {
      timeZone: CIUDAD.zonaHoraria, hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
    }).formatToParts(new Date(ahora));
    const valor = (tipo) => Number(partes.find((parte) => parte.type === tipo).value);
    const minutos = valor('hour') * 60 + valor('minute');
    amanecer = ahora + (CIUDAD.amanecerRespaldo * 60 - minutos) * 60000;
    atardecer = ahora + (CIUDAD.atardecerRespaldo * 60 - minutos) * 60000;
  }
  const margen = CIUDAD.margenCrepusculo * 60000;
  if (Math.abs(ahora - amanecer) <= margen) return 'amanecer';
  if (Math.abs(ahora - atardecer) <= margen) return 'tarde';
  return ahora > amanecer && ahora < atardecer ? 'dia' : 'noche';
}

function iniciarCielo() {
  const cielo = document.querySelector('[data-cielo]');
  const indicador = document.querySelector('[data-clima]');
  const texto = document.querySelector('[data-clima-texto]');
  if (!cielo || !indicador || !texto) return;

  let datos = null;
  let estado = 'cargando';
  let consultando = false;
  let ultimoIntento = -Infinity;
  let fechaIntento = '';

  function pintar() {
    const ahora = Date.now();
    // Un dato que envejeció mientras la pestaña estaba abierta deja de usarse.
    if (datos && ahora - datos.observado > CIUDAD.maxEdadRespaldo) {
      datos = null;
      estado = 'sin-datos';
    }
    const momento = momentoDelDia(ahora, datos);
    const tiempo = datos ? describirTiempo(datos.codigo) : null;
    cielo.dataset.momento = momento;
    cielo.dataset.tiempo = tiempo?.tipo ?? 'sin-datos';
    document.documentElement.dataset.momento = momento;
    document.documentElement.dataset.tiempo = cielo.dataset.tiempo;
    indicador.dataset.estado = estado;

    let mensaje = `${CIUDAD.nombre} · consultando el cielo…`;
    if (datos) {
      mensaje = `${CIUDAD.nombre} · ${Math.round(datos.temperatura)} °C · ${tiempo.texto.toLowerCase()}`;
      if (estado === 'guardado') mensaje += ' · último dato guardado';
      indicador.title = `Dato de ${new Intl.DateTimeFormat('es-AR', {
        timeZone: CIUDAD.zonaHoraria, dateStyle: 'short', timeStyle: 'short',
      }).format(new Date(datos.observado))} (Buenos Aires)`;
    } else if (estado !== 'cargando') {
      mensaje = `${CIUDAD.nombre} · clima no disponible; cielo según horario`;
      indicador.title = 'Sin datos del clima. Los colores siguen el horario aproximado de Buenos Aires.';
    }
    if (texto.textContent !== mensaje) texto.textContent = mensaje;
  }

  async function actualizar() {
    if (document.hidden) return;
    pintar();
    const ahora = Date.now();
    if (consultando || (ahora - ultimoIntento < CIUDAD.vigenciaCache &&
        fechaIntento === fechaCiudad(ahora))) return;
    consultando = true;
    ultimoIntento = ahora;
    fechaIntento = fechaCiudad(ahora);
    const resultado = await obtenerClima(ahora);
    datos = resultado.datos;
    estado = resultado.estado;
    // Abrir una pestaña no debe extender otros 30 minutos la vigencia de un dato viejo.
    ultimoIntento = resultado.actualizadoEn ?? ahora;
    consultando = false;
    pintar();
  }

  actualizar();
  setInterval(actualizar, CIUDAD.revisionReloj);
  document.addEventListener('visibilitychange', actualizar);
}

if (typeof document !== 'undefined') iniciarCielo();
