/**
 * VEREDA — toda la parametrización ajustable del sitio vive acá.
 *
 * La idea es que en la defensa (y en las modificaciones en vivo) se toquen
 * números de este archivo, no el motor de `src/scripts/escenario.js`.
 */

/**
 * Motor del escenario.
 *
 * El mundo se mide en "px de referencia" sobre una pantalla de 1080 px de alto.
 * En cualquier dispositivo real se multiplica por `--escala` (ver `escenario.js`).
 */
export const ESCENA = {
  /** Alto de referencia del escenario, en px. Todo el mundo se expresa contra esto. */
  altoRef: 1080,
  /** Distancia entre carteleras, en px de referencia. */
  separacion: 1400,
  /** Espacio antes de la primera y después de la última cartelera, en px de referencia. */
  margen: 1000,
  /** Ancho de una cartelera, en px de referencia. El motor lo usa para centrar el salto. */
  carteleraAncho: 520,
  /** Cuánto scroll vertical hace falta por px de mundo. >1 = más lento. */
  ritmo: 1,
  /**
   * Capas de fondo, de la más lejana a la más cercana.
   * factor = 0 la capa queda fija, factor = 1 se mueve a la velocidad del mundo.
   */
  capas: [
    { id: 'lejana', factor: 0.2 },
    { id: 'media', factor: 0.55 },
    { id: 'vereda', factor: 1.0 },
  ],
  /** Fracción del ancho de pantalla alrededor del centro que cuenta como "cerca" de una cartelera. */
  umbralActiva: 0.25,
  /** Escala mínima y máxima para que en un teléfono no se lea gigante ni en una pantalla enorme se vea chiquito. */
  escalaMin: 0.5,
  escalaMax: 1.2,
};

/**
 * La chica que camina por la vereda.
 *
 * Va siempre en el mismo lugar de la pantalla (no se mueve con el mundo):
 * lo que pasa es que el mundo se desplaza frente a ella. Así el personaje
 * es un ancla estable y no hay que perseguirlo con el scroll.
 */
export const CAMINANTE = {
  /** Fracción del ancho de pantalla donde se ubica. 0.28 = un poco a la izquierda del centro. */
  x: 0.28,
  /** Posición vertical como fracción del alto. 0.82 = los pies cerca del borde inferior. */
  y: 0.82,
  /** Altura del personaje en px de referencia (se escala con --escala). */
  alto: 260,
  /**
   * Segundos que tarda un paso. El sprite de caminata da la vuelta completa
   * (pose 1 → 2 → 3 → 2 → 1) en dos pasos: escenario.js publica
   * `--ciclo-sprite` multiplicando esto por 2. Si la caminata se ve muy
   * rápida o muy lenta, se toca sólo este número.
   */
  cicloPaso: 0.62,
  /** Largo máximo de la caminata en px de referencia (1 = 100% de la velocidad del scroll). */
  desfase: 0,
};

/** Ciudad y datos del clima (Open-Meteo). Cambiar acá para mover la vereda a otro lugar. */
export const CIUDAD = {
  nombre: 'Buenos Aires',
  latitud: -34.61,
  longitud: -58.38,
  /** Zona horaria IANA, para que la hora local sea la de esa ciudad y no la del visitante. */
  zonaHoraria: 'America/Argentina/Buenos_Aires',
  /** Milisegundos de espera antes de abandonar el request. */
  timeout: 6000,
  /** Vigencia de la respuesta cacheada en localStorage. */
  vigenciaCache: 30 * 60 * 1000,
  /** Clave de cache en localStorage. */
  claveCache: 'vereda:clima',
};

/**
 * Stickers sueltos pegados sobre la vereda. Decorativos.
 * x e y van en fracciones del ancho y alto de referencia. Se placean al azar
 * en cada carga, así el sitio no se ve idéntico cada vez.
 */
export const STICKERS = [
  { src: '/stickers/star.svg', x: 0.06, y: 0.74, rotacion: -12, escala: 1 },
  { src: '/stickers/heart.svg', x: 0.14, y: 0.68, rotacion: 9, escala: 0.9 },
  { src: '/stickers/rayo.svg', x: 0.23, y: 0.79, rotacion: -5, escala: 1.1 },
  { src: '/stickers/nube.svg', x: 0.34, y: 0.71, rotacion: 14, escala: 0.85 },
  { src: '/stickers/star.svg', x: 0.47, y: 0.77, rotacion: -20, escala: 0.8 },
];

/** Rutas de las capas de fondo. Para pasar de los SVG placeholder a los webp finales se cambia solo acá. */
export const RUTAS_CAPAS = {
  lejana: '/capas/lejana.svg',
  media: '/capas/media.svg',
  vereda: '/capas/vereda.svg',
  colectivo: '/capas/colectivo.svg',
};

/**
 * Ilustraciones de la chica. Las tres de `camina` forman el ciclo de
 * caminata y tienen que ir en orden: el CSS las apila por índice
 * (camina-1, camina-2, camina-3). `mira` es la pose que se muestra cuando
 * alguien hace hover sobre el marco verde de una cartelera.
 * Para cambiar las ilustraciones se reemplazan los archivos en
 * `public/caminante/` manteniendo los nombres, o se cambia solo acá.
 */
export const RUTAS_CHICA = {
  camina: ['/caminante/camina-1.svg', '/caminante/camina-2.svg', '/caminante/camina-3.svg'],
  mira: '/caminante/mira-al-cartel.svg',
};