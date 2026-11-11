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
export const BIENVENIDA = {
  titulo: 'La vereda de Mica',
  descripcion: 'Portfolio de Micaela Svatzky: diseño y desarrollo web front end. Recorré una vereda de Buenos Aires para conocer mis proyectos.',
  presentacion: {
    rol: 'Diseñadora y desarrolladora web.',
    gusto: 'Me gusta darle forma a las ideas, desde el primer boceto hasta verlas funcionar.',
    invitacion: 'Te invito a caminar por mis proyectos.',
  },
  especialidad: 'Diseño y desarrollo web · Front end',
  instrucciones: 'Caminá con las flechas ← → o hacé scroll',
  instruccionesLista: 'Explorá los proyectos y abrí sus webs o repositorios.',
};

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
  /** Tramo inicial más corto sólo en celulares; no cambia la distancia entre proyectos. */
  margenInicioMobile: 350,
  anchoMobile: 767,
  /**
   * Ancho de una cartelera, en px de referencia. El motor lo usa para
   * centrar el salto. También sale de la Escena: cada cartel mide
   * 8.662 px de dibujo = 359 de referencia.
   */
  carteleraAncho: 359,
  /** Mínimo en pantalla para que el texto no se achique en celulares bajos. */
  carteleraAnchoMin: 250,
  /** Cuánto scroll vertical hace falta por px de mundo. >1 = más lento. */
  ritmo: 1,
  /** Velocidad con flechas sostenidas, en px de mundo de referencia por segundo. */
  velocidadTeclado: 550,
  /**
   * Capas de fondo, de la más lejana a la más cercana.
   * factor = 0 la capa queda fija, factor = 1 se mueve a la velocidad del mundo.
   */
  capas: [
    { id: 'fondo', factor: 0.1 },
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
  /** Parte del ancho de la chica que cuenta al entrar en contacto con un cartel. */
  contactoCartel: 0.4,
  /** Escala mínima y máxima para que en un teléfono no se lea gigante ni en una pantalla enorme se vea chiquito. */
  escalaMin: 0.5,
  escalaMax: 1.2,
  demoraResize: 150,
};

/**
 * La chica que camina por la vereda.
 *
 * Avanza entre x y xFinal mientras el mundo se desplaza frente a ella.
 */
export const CAMINANTE = {
  /**
   * Fracción del ancho de pantalla donde se ubica. 0 = borde izquierdo,
   * 1 = borde derecho. Mica pidió (8/10) que arranque "un poco más
   * atrás": bajó de 0.28 a 0.24. Si se quiere más o menos, se toca
   * sólo este número.
   */
  x: 0.24,
  /** Posición horizontal al terminar el recorrido. */
  xFinal: 0.9,
  /**
   * Línea de suelo: fracción del alto donde tocan la baldosa los pies de la
   * chica. Va MÁS ABAJO que ESCENA.sueloCarteleras (0.86): ella camina por
   * adelante de los carteles y no pisa nunca sobre ellos. 0.90 deja sus pies
   * 21 px (de referencia) por debajo de la base del cartel más bajo.
   */
  y: 0.9,
  /**
   * Altura del personaje en px de referencia (se escala con --escala).
   * Historia del número: 260 → 300 (Mica, 8/10, "un poco más grande").
   * Se probó 380 y volvió a 300 ("el tamaño está bien"). El 21/10 Mica pidió
   * "un poco más grande" otra vez: 300 → 340, un paso medido (+13%) y no
   * el salto de 380 que ya había descartado.
   * El 4/11 pidió otro aumento leve: 340 → 360 (+6%).
   * Después de aprobar el rig, pidió llegar con la cabeza a mitad del cartel: 380.
   *
   * OJO: los pies quedan anclados a la línea de suelo (`y`), así que
   * agrandarla la hace crecer hacia arriba y NO la levanta del piso.
   */
  alto: 380,
  /** Distancia por paso en px de referencia. */
  largoPaso: 155,
  /** Amplitudes en grados. Rodillas y codos acompañan a cadera y hombros. */
  giroCadera: 19,
  giroRodilla: 32,
  giroHombro: 16,
  giroCodo: 12,
  /** Espera sin movimiento antes de frenar, en ms. */
  demoraFreno: 110,
  /** Tiempo para apoyar ambos pies al soltar las flechas o terminar el scroll. */
  duracionReposo: 180,
};

/**
 * Recortes y pivotes ajustados visualmente sobre camina-3.svg (209.25 × 511.5).
 * Se reutiliza ese único dibujo: los grupos hijos heredan el giro del padre.
 * Los pequeños solapes en rodillas/codos mantienen cerradas las uniones.
 */
export const ARTICULACIONES = {
  ancho: 209.25,
  alto: 511.5,
  suelo: 457,
  base: '/caminante/camina-3.svg',
  cabezaMirando: '/caminante/mira-al-cartel.svg',
  recortes: {
    cabeza: 'M0 0H209.25V141H125L122 151L111 150L107 143L96 150L87 159L79 169L66 180H0Z',
    mirada: 'M0 0H209.25V174H125L119 186L113 199L101 209L82 220H0Z',
    torso: 'M0 182H80L91 157L99 158L88 179L87 221L101 266L101 271H0Z',
    brazoLejano: 'M126 175L147 214L162 238L181 250V284H159L142 273L139 254L130 219Z',
    brazoCercano: 'M96 146L113 146L125 169L131 214L140 249L137 296H111L98 273L90 250L84 219L84 179Z',
    piernaLejana: 'M70 270L96 270L104 328L80 390L64 439L90 463H0V416L48 309Z',
    piernaCercana: 'M80 268H100L111 287L115 299H133L145 332L189 414L209.25 413V468H140L97 329L82 288Z',
  },
  pivotes: {
    caderaLejana: [83, 273],
    caderaCercana: [87, 273],
    rodillaLejana: [64, 357],
    rodillaCercana: [131, 357],
    hombroLejano: [115, 168],
    hombroCercano: [102, 163],
    codoLejano: [143, 235],
    codoCercano: [113, 232],
  },
  /** Ángulo que endereza las piernas del dibujo original antes de animarlas. */
  enderezarLejana: -23,
  enderezarCercana: 24,
  apoyoLejano: [37, 452],
  apoyoCercano: [168, 452],
  ajusteMirada: 'translate(10 -28)',
  solape: 8,
  radioRodilla: 18,
  colorJean: '#8da2b3',
  colorAbrigo: '#713f40',
  bordeAbrigo: '#403331',
  abrigoOculto: 'M83 156Q101 147 119 168L127 254Q113 271 72 269L62 214Z',
  caderaOculta: 'M79 269L103 267L125 297L111 318L87 296Z',
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
  endpoint: 'https://api.open-meteo.com/v1/forecast',
  /** Si la API falla, no mostrar como reciente un dato de hace varios días. */
  maxEdadRespaldo: 6 * 60 * 60 * 1000,
  /** Revisión del reloj local; la API se consulta como máximo cada 30 minutos. */
  revisionReloj: 60 * 1000,
  /** Minutos a cada lado de la salida/puesta del sol para los colores cálidos. */
  margenCrepusculo: 45,
  /** Después de la puesta, el cielo cálido da paso a la noche más rápido. */
  minutosNocheTrasPuesta: 15,
  /** Horarios aproximados usados sólo si faltan los datos solares del día. */
  amanecerRespaldo: 7,
  atardecerRespaldo: 19,
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
  edificios: '/img/Edificios.svg',
  vereda: '/img/Vereda.svg',
};

/** El SVG de edificios ya tiene opacidad 0.8; no se vuelve a multiplicar. */
export const EDIFICIOS = {
  alto: 700,
  base: 0.86,
  opacidad: 0.8,
  opacidadOriginal: 0.8,
};

/** Assets de las carteleras. El cartel es el SVG que dibujó Mica. */
export const RUTAS_CARTEL = {
  verde: '/img/CartelVerde.svg',
};

/**
 * Medidas del cartel, en porcentaje del viewBox del SVG (8606 × 13382).
 *
 * `hueco` es el rectángulo que el marco verde deja libre: ahí va la preview
 * del proyecto. Se midió renderizando el SVG con fondo transparente y
 * buscando el componente cerrado más grande (no a ojo). Si Mica cambia el
 * dibujo del cartel, estos números son lo único que hay que volver a medir.
 *
 * `afiche` es el rectángulo NEGRO de arriba: la ilustración de Mica. No es
 * el hueco (es opaco) y por eso la preview no va ahí.
 */
export const CARTEL = {
  proporcion: 8606 / 13382,
  hueco: { left: 6.86, top: 19.28, width: 86.05, height: 40.58 },
  afiche: { left: 40.33, top: 1.57, width: 20.0, height: 17.39 },
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
 * El fondo continuo de edificios se configura aparte en EDIFICIOS.
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
    id: 'cartel-calles',
    capa: 'media',
    src: '/img/CartelCalles.svg',
    x: 1494, // Escena: centro en x 851 + 643
    alto: 559,
    base: 0.81,
  },
];
