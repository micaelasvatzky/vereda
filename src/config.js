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
  /**
   * Distancia entre carteleras, en px de referencia.
   * Sale de la Escena de Mica: sus carteles están cada 15.310 px de dibujo
   * y el dibujo mide 26.088 px de alto = 1080 de referencia, así que
   * 15310 / 24.16 = 633.
   */
  separacion: 633,
  /** Espacio antes de la primera y después de la última cartelera, en px de referencia. */
  margen: 1000,
  /**
   * Ancho de una cartelera, en px de referencia. El motor lo usa para
   * centrar el salto. También sale de la Escena: cada cartel mide
   * 8.662 px de dibujo = 359 de referencia.
   */
  carteleraAncho: 359,
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
  /**
   * Línea de suelo de las CARTELERAS: fracción del alto donde se apoya la
   * base del poste. En la Escena de Mica los tres carteles se apoyan entre
   * el 84.7% y el 87.9%, así que va 0.86.
   *
   * Es DISTINTA de CAMINANTE.y a propósito: ella pisa más abajo (adelante
   * de los carteles), así nunca "pisa encima" de un cartel.
   */
  sueloCarteleras: 0.86,
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
  /**
   * Fracción del ancho de pantalla donde se ubica. 0 = borde izquierdo,
   * 1 = borde derecho. Mica pidió (8/10) que arranque "un poco más
   * atrás": bajó de 0.28 a 0.24. Si se quiere más o menos, se toca
   * sólo este número.
   */
  x: 0.24,
  /**
   * Línea de suelo: fracción del alto donde tocan la baldosa los pies de la
   * chica. Va MÁS ABAJO que ESCENA.sueloCarteleras (0.86): ella camina por
   * adelante de los carteles y no pisa nunca sobre ellos. 0.90 deja sus pies
   * 21 px (de referencia) por debajo de la base del cartel más bajo.
   */
  y: 0.9,
  /**
   * Altura del personaje en px de referencia (se escala con --escala).
   * Mica pidió (8/10) "un poco más grande": 260 → 300. Se probó 380 y
   * volvió a 300 ("el tamaño está bien").
   */
  alto: 300,
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
 * x e y van en fracciones del ancho y alto de referencia.
 *
 * Vacíos a propósito: Mica todavía no mandó los SVG y los rutas viejas
 * daban 404 en la consola. Cuando estén, van acá y en Escenario.astro
 * se dibujan solos (el .map sobre este array).
 */
export const STICKERS = [];

/**
 * Rutas de las capas de fondo. La franja de vereda se cambia sólo acá.
 * Las capas lejana y media ya no llevan imagen de fondo: llevan los objetos
 * de abajo, cada uno con su posición en el mundo.
 */
export const RUTAS_CAPAS = {
  vereda: '/img/Vereda.svg',
};

/** Assets de las carteleras. El cartel es el SVG que dibujó Mica. */
export const RUTAS_CARTEL = {
  verde: '/img/CartelVerde.svg',
};

/**
 * Objetos sueltos del escenario. Van dentro de una capa y viajan con la
 * velocidad de esa capa (parallax). Todos los números están en px de
 * referencia (26.088 px de dibujo de la Escena = 1080 de referencia).
 *
 * - capa:  a qué capa se engancha (lejana / media / vereda). La capa
 *          define qué tan atrás está y a qué velocidad viaja.
 * - x:     posición horizontal del mundo en px de referencia. El objeto queda
 *          centrado en pantalla cuando el mundo llega hasta ahí. Las de la
 *          Escena van corridas 643 px (1000 - 357): nuestra cartelera
 *          arranca en el margen 1000 y la de ella en 357.
 * - alto:  altura en px de referencia.
 * - base:  fracción del alto donde se apoya (su propia línea de suelo).
 *
 * Los dos edificios van a propósito EN LA ZONA DEL OBELISCO y no en la del
 * cartel de calles (pedido de Mica): misma x que el obelisco pero capas
 * distintas, así uno queda detrás suyo y el otro adelante, y al viajar a
 * velocidad distinta se despegan uno del otro. Los archivos son los
 * placeholders de la Fase 1; cuando Mica mande sus edificios se cambia
 * sólo el src.
 */
export const OBJETOS = [
  {
    id: 'obelisco',
    capa: 'lejana',
    src: '/img/ObeliscoP.svg',
    x: 2534, // Escena: centro en x 1891 + 643
    alto: 825,
    base: 0.86,
  },
  {
    // Detrás del obelisco: misma capa (lejana) y misma x, se mueve con él.
    id: 'edificio-trasero',
    capa: 'lejana',
    src: '/capas/lejana.svg', // PLACEHOLDER: silueta de edificios.
    x: 2534,
    alto: 700,
    base: 0.86,
  },
  {
    // Delante del obelisco: capa media, más cerca y más veloz que él.
    id: 'edificio-delantero',
    capa: 'media',
    src: '/capas/media.svg', // PLACEHOLDER: locales y árboles.
    x: 2534,
    alto: 620,
    base: 0.86,
  },
  {
    id: 'cartel-calles',
    capa: 'media',
    src: '/img/CartelCalles.svg',
    x: 1494, // Escena: centro en x 851 + 643
    alto: 559,
    base: 0.81,
  },
];

/**
 * Ilustraciones de la chica. Las tres de `camina` forman el ciclo de
 * caminata y tienen que ir en orden: el CSS las apila por índice
 * (camina-1, camina-2, camina-3). `mira` es la pose que se muestra cuando
 * alguien hace hover sobre el cartel de una cartelera.
 * Para cambiar las ilustraciones se reemplazan los archivos en
 * `public/caminante/` manteniendo los nombres, o se cambia solo acá.
 */
export const RUTAS_CHICA = {
  camina: ['/caminante/camina-1.svg', '/caminante/camina-2.svg', '/caminante/camina-3.svg'],
  mira: '/caminante/mira-al-cartel.svg',
};