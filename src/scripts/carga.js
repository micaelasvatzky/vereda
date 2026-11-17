import { CARGA, RUTAS_CAPAS, ARTICULACIONES } from '../config.js';

const raiz = document.documentElement;
const pantalla = document.querySelector('[data-carga-inicial]');
const contenido = document.querySelector('main');
const esperar = (ms) => new Promise((resolver) => setTimeout(resolver, ms));

async function cargarImagen(ruta) {
  const imagen = new Image();
  imagen.src = ruta;
  await imagen.decode().catch(() => {});
}

async function iniciarCarga() {
  if (!pantalla || !raiz.dataset.carga) return;
  contenido?.setAttribute('inert', '');
  const recursos = Promise.allSettled([
    document.fonts.ready,
    ...Array.from(document.images, (imagen) => imagen.decode()),
    ...Object.values(RUTAS_CAPAS).map(cargarImagen),
    cargarImagen(ARTICULACIONES.base),
    cargarImagen(ARTICULACIONES.cabezaMirando),
  ]);
  // La API del clima es independiente: no bloquea la entrada al portfolio.
  await Promise.all([
    Promise.race([recursos, esperar(CARGA.esperaMaxima - CARGA.duracionBlanco)]),
    esperar(CARGA.minimoRojo),
  ]);
  if (!raiz.dataset.carga) return;
  raiz.dataset.carga = 'blanco';
  pantalla.querySelector('[data-carga-texto]').textContent = CARGA.textoListo;
  await esperar(CARGA.duracionBlanco);
  if (!raiz.dataset.carga) return;
  raiz.dataset.carga = 'saliendo';
  const duracion = parseFloat(getComputedStyle(raiz).getPropertyValue('--carga-salida')) || 0;
  await esperar(window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : duracion);
  clearTimeout(window.__respaldoCarga);
  delete raiz.dataset.carga;
  contenido?.removeAttribute('inert');
  pantalla.remove();
}

iniciarCarga();
