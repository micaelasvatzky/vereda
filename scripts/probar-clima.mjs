import { test, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { CIUDAD } from '../src/config.js';
import { describirTiempo, fechaCiudad, leerRespuesta, obtenerClima, urlClima } from '../src/scripts/clima.js';
import { momentoDelDia } from '../src/scripts/cielo.js';

const ahora = Date.parse('2026-11-04T15:00:00Z');
const respuesta = () => ({
  current: { temperature_2m: 22.8, weather_code: 0, time: ahora / 1000 },
  daily: { sunrise: [Date.parse('2026-11-04T09:00:00Z') / 1000],
    sunset: [Date.parse('2026-11-04T22:00:00Z') / 1000] },
});
const fetchOriginal = globalThis.fetch;
const storageOriginal = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
const timeoutOriginal = CIUDAD.timeout;

function almacenamiento() {
  const valores = new Map();
  const storage = { getItem: (clave) => valores.get(clave) ?? null,
    setItem: (clave, valor) => valores.set(clave, valor) };
  Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: storage });
  return storage;
}

afterEach(() => {
  globalThis.fetch = fetchOriginal;
  CIUDAD.timeout = timeoutOriginal;
  if (storageOriginal) Object.defineProperty(globalThis, 'localStorage', storageOriginal);
  else delete globalThis.localStorage;
});

test('nieve, precipitación helada y tormentas tienen mapeo explícito', () => {
  for (const codigo of [71, 73, 75, 77, 85, 86]) assert.equal(describirTiempo(codigo).tipo, 'nieve');
  for (const codigo of [56, 57, 66, 67]) assert.equal(describirTiempo(codigo).tipo, 'lluvia');
  for (const codigo of [95, 96, 99]) assert.equal(describirTiempo(codigo).tipo, 'tormenta');
  assert.equal(describirTiempo(1000), null);
});

test('null y datos incompletos no se convierten en un cielo despejado', () => {
  const json = respuesta();
  json.current.weather_code = null;
  assert.throws(() => leerRespuesta(json));
  json.current.weather_code = 0;
  json.current.temperature_2m = null;
  assert.throws(() => leerRespuesta(json));
  assert.throws(() => leerRespuesta({}));
  const fechaRota = respuesta();
  fechaRota.daily.sunrise = [1e200];
  fechaRota.daily.sunset = [2e200];
  assert.throws(() => leerRespuesta(fechaRota));
});

test('la fecha y el cielo usan Buenos Aires y respetan la medianoche local', () => {
  assert.equal(fechaCiudad(Date.parse('2026-11-05T01:00:00Z')), '2026-11-04');
  assert.equal(momentoDelDia(Date.parse('2026-11-05T03:10:00Z')), 'noche');
  assert.equal(momentoDelDia(ahora), 'dia');
});

test('salida/puesta reales, crepúsculos y datos solares del día anterior', () => {
  const datos = leerRespuesta(respuesta());
  assert.equal(momentoDelDia(datos.amanecer, datos), 'amanecer');
  assert.equal(momentoDelDia(datos.atardecer, datos), 'tarde');
  assert.equal(momentoDelDia(ahora, datos), 'dia');
  assert.equal(momentoDelDia(Date.parse('2026-11-04T07:00:00Z'), datos), 'noche');
  assert.equal(momentoDelDia(Date.parse('2026-11-05T03:10:00Z'), datos), 'noche');
});

test('la noche empieza quince minutos después de la puesta, también sin API', () => {
  const datos = leerRespuesta(respuesta());
  assert.equal(momentoDelDia(datos.atardecer + 14 * 60000, datos), 'tarde');
  assert.equal(momentoDelDia(datos.atardecer + 15 * 60000, datos), 'noche');
  assert.equal(momentoDelDia(Date.parse('2026-11-04T23:00:00Z'), datos), 'noche');
  assert.equal(momentoDelDia(Date.parse('2026-11-04T23:00:00Z')), 'noche');
});

test('consulta realista y caché fresca: una sola solicitud, datos iguales', async () => {
  almacenamiento();
  let llamadas = 0;
  globalThis.fetch = async (url) => {
    llamadas++;
    assert.equal(url.searchParams.get('timezone'), CIUDAD.zonaHoraria);
    assert.equal(url.searchParams.get('timeformat'), 'unixtime');
    assert.equal(url.searchParams.get('latitude'), String(CIUDAD.latitud));
    return new Response(JSON.stringify(respuesta()));
  };
  const primera = await obtenerClima(ahora);
  const segunda = await obtenerClima(ahora + 1000);
  assert.equal(llamadas, 1);
  assert.equal(primera.estado, 'disponible');
  assert.deepEqual(primera.datos, segunda.datos);
  assert.equal(segunda.actualizadoEn, ahora);
  assert.equal(urlClima().hostname, 'api.open-meteo.com');
});

test('caché vencida y API caída: conserva el dato, marcado como guardado', async () => {
  almacenamiento();
  globalThis.fetch = async () => new Response(JSON.stringify(respuesta()));
  await obtenerClima(ahora);
  globalThis.fetch = async () => { throw new Error('Sin conexión'); };
  const resultado = await obtenerClima(ahora + CIUDAD.vigenciaCache + 1000);
  assert.equal(resultado.estado, 'guardado');
  assert.equal(resultado.datos.temperatura, 22.8);
});

test('un dato de más de seis horas no se presenta como clima actual', async () => {
  almacenamiento();
  globalThis.fetch = async () => new Response(JSON.stringify(respuesta()));
  await obtenerClima(ahora);
  globalThis.fetch = async () => { throw new Error('Sin conexión'); };
  assert.deepEqual(await obtenerClima(ahora + CIUDAD.maxEdadRespaldo + 1),
    { datos: null, estado: 'sin-datos' });
});

test('JSON de caché roto no impide consultar la API', async () => {
  almacenamiento().setItem(CIUDAD.claveCache, '{roto');
  globalThis.fetch = async () => new Response(JSON.stringify(respuesta()));
  assert.equal((await obtenerClima(ahora)).estado, 'disponible');
});

test('localStorage bloqueado no descarta una respuesta válida', async () => {
  Object.defineProperty(globalThis, 'localStorage', { configurable: true,
    get() { throw new Error('Almacenamiento bloqueado'); } });
  globalThis.fetch = async () => new Response(JSON.stringify(respuesta()));
  assert.equal((await obtenerClima(ahora)).datos.codigo, 0);
});

test('límite HTTP 429, cuerpo vacío o JSON roto usan el respaldo horario', async () => {
  almacenamiento();
  for (const crear of [() => new Response('', { status: 429 }),
    () => new Response('{}'), () => new Response('no es JSON')]) {
    globalThis.fetch = async () => crear();
    assert.deepEqual(await obtenerClima(ahora), { datos: null, estado: 'sin-datos' });
  }
});

test('una consulta colgada se cancela y devuelve el estado sin datos', async () => {
  almacenamiento();
  CIUDAD.timeout = 10;
  globalThis.fetch = (_, { signal }) => new Promise((_, rechazar) => {
    signal.addEventListener('abort', () => rechazar(new Error('Cancelada')), { once: true });
  });
  assert.equal((await obtenerClima(ahora)).estado, 'sin-datos');
});
