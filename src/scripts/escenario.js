import { ESCENA, CAMINANTE } from '../config.js';

/**
 * Motor del escenario.
 *
 * La idea: el mundo es una página alta (el "riel"). El escenario queda fijo
 * (`position: sticky`) y el scroll vertical nativo se traduce a un
 * desplazamiento horizontal del mundo. Así no hay que inventar un scroll
 * propio: teclado, touch, swipe, lectores de pantalla y la barra de scroll
 * del navegador siguen funcionando.
 *
 * Todos los números salen de src/config.js. Acá sólo está el cálculo.
 */

/** Acota un valor entre un mínimo y un máximo. */
function acotar(valor, min, max) {
  return Math.min(Math.max(valor, min), max);
}

/** Escala real del escenario en esta pantalla: 1 = 1080 px de alto. */
function calcularEscala() {
  const alto = window.innerHeight;
  return acotar(alto / ESCENA.altoRef, ESCENA.escalaMin, ESCENA.escalaMax);
}

class Escenario {
  constructor() {
    this.riel = document.querySelector('[data-riel]');
    this.escenario = document.querySelector('[data-escenario]');
    if (!this.riel || !this.escenario) return;

    this.capas = Array.from(document.querySelectorAll('[data-capa]'));
    this.carteleras = Array.from(document.querySelectorAll('[data-cartelera]'));
    this.objetos = Array.from(document.querySelectorAll('[data-objeto]'));
    this.caminante = document.querySelector('[data-caminante]');

    this.escala = 1;
    this.recorrido = 0;
    this.desplazamiento = 0;
    this.ultimoY = window.scrollY;
    this.caminando = false;
    this.freno = 0; // id del timer que frena la caminata (ver marcarCaminando)
    this.pendientes = new Set(this.carteleras); // carteleras aún escondidas (ver revelar)

    this.medir();
    this.publicar();
    this.prescribirAlScroll();
    this.prescribirTeclado();
    this.prescribirResize();

    // Estado de arranque: posición, cartelera activa y carteleras visibles.
    // Sin esto, hasta el primer scroll todo quedaría sin calcular.
    this.desplazar();

    // Sin esto, si el usuario abre la página con el scroll restaurado desde el
    // historial, la primera pintada queda desfasada.
    window.addEventListener('pageshow', () => this.desplazar());
  }

  /** Calcula escala, recorrido y altura del riel a partir del viewport. */
  medir() {
    const alto = window.innerHeight;
    const ancho = window.innerWidth;

    this.escala = calcularEscala();

    const anchoMundo =
      (ESCENA.margen * 2 + ESCENA.separacion * (this.carteleras.length - 1)) * this.escala;

    // Cuánto se puede desplazar el mundo en horizontal.
    this.recorrido = Math.max(0, anchoMundo - ancho);

    // El riel mide lo que se ve + lo que hay que scrollear para recorrer todo.
    // De ahí sale `recorridoScroll`, que es el rango útil de scrollY.
    this.recorridoScroll = this.recorrido * ESCENA.ritmo;
    this.riel.style.height = `${alto + this.recorridoScroll}px`;
  }

  /** Publica los valores como variables CSS, para que CSS y JS no se contradigan. */
  publicar() {
    const estilo = this.escenario.style;
    estilo.setProperty('--escala', String(this.escala));
    estilo.setProperty('--cartelera-separacion', String(ESCENA.separacion));
    estilo.setProperty('--cartelera-margen', String(ESCENA.margen));
    estilo.setProperty('--cartelera-ancho', String(ESCENA.carteleraAncho));
    estilo.setProperty('--caminante-x', String(CAMINANTE.x));
    estilo.setProperty('--caminante-y', String(CAMINANTE.y));
    estilo.setProperty('--suelo-carteleras', String(ESCENA.sueloCarteleras));
    // La vuelta completa del sprite (1 → 2 → 3 → 2 → 1) son dos pasos.
    estilo.setProperty('--ciclo-sprite', `${CAMINANTE.cicloPaso * 2}s`);

    // Cada capa tiene que ser más ancha que la pantalla para que al desplazarla
    // no aparezca fondo vacío: el ancho extra es justamente lo que viaja.
    for (const capa of this.capas) {
      const factor = this.factorDe(capa);
      capa.style.width = `${window.innerWidth + this.recorrido * factor}px`;
    }

    this.posicionarObjetos();
  }

  /**
   * Ubica cada objeto decorativo dentro de su capa.
   *
   * La fórmula deja el objeto centrado en pantalla en el instante en que el
   * mundo llega hasta su `x`. Como la capa viaja más lento que el mundo
   * (parallax), en cualquier otro instante el objeto se corre de la posición
   * que tenía en la Escena de Mica: eso es justamente el parallax.
   */
  posicionarObjetos() {
    const ancho = window.innerWidth;

    for (const objeto of this.objetos) {
      const capa = objeto.closest('[data-capa]');
      if (!capa || !objeto.dataset.x) continue;

      const factor = this.factorDe(capa);
      const x = parseFloat(objeto.dataset.x) * this.escala;
      const izquierda = ancho / 2 + factor * (x - ancho / 2);
      objeto.style.left = `${izquierda.toFixed(1)}px`;
    }
  }

  /** Busca el factor de parallax de una capa en la configuración. */
  factorDe(capa) {
    const id = capa.dataset.capa;
    const definicion = ESCENA.capas.find((c) => c.id === id);
    return definicion ? definicion.factor : 1;
  }

/** Convierte el scroll vertical en desplazamiento horizontal. */
  desplazar() {
    const y = window.scrollY;
    const p = acotar(y / Math.max(1, this.recorridoScroll), 0, 1);
    this.desplazamiento = p * this.recorrido;
    const xCaminante = CAMINANTE.x + (CAMINANTE.xFinal - CAMINANTE.x) * p;
    this.caminante?.style.setProperty('--caminante-x', String(xCaminante));

    for (const capa of this.capas) {
      const factor = this.factorDe(capa);
      capa.style.transform = `translate3d(${(-this.desplazamiento * factor).toFixed(2)}px, 0, 0)`;
    }

    this.marcarActiva();
    this.marcarPosicion();
    this.revelar();
    this.marcarCaminando(y);

  }

  /** Marca la cartelera más cercana al centro de la pantalla. */
  marcarActiva() {
    const centro = window.innerWidth / 2;
    const umbral = ESCENA.umbralActiva * window.innerWidth;

    let mejor = null;
    let mejorDistancia = Infinity;

    for (const [indice, cartelera] of this.carteleras.entries()) {
      // Las posiciones ya se conocen: medir el DOM después de moverlo fuerza layout.
      const x = this.xDeCartelera(indice) + ESCENA.carteleraAncho * this.escala / 2;
      const distancia = Math.abs(x - centro);
      if (distancia < mejorDistancia) {
        mejorDistancia = distancia;
        mejor = cartelera;
      }
    }

    const activa = mejor && mejorDistancia <= umbral ? mejor : null;

    for (const cartelera of this.carteleras) {
      const valor = String(cartelera === activa);
      if (cartelera.dataset.activa !== valor) cartelera.dataset.activa = valor;
    }

    this.activa = activa;
  }

  /** Borde izquierdo de un cartel en pantalla, sin consultar la geometría del DOM. */
  xDeCartelera(indice) {
    return (ESCENA.margen + indice * ESCENA.separacion) * this.escala - this.desplazamiento;
  }

  /** Marca si estamos al principio, en el medio o al final del recorrido. */
  marcarPosicion() {
    const y = window.scrollY;

    if (y <= 4) this.escenario.dataset.posicion = 'inicio';
    else if (y >= this.recorridoScroll - 4) this.escenario.dataset.posicion = 'fin';
    else this.escenario.dataset.posicion = 'medio';
  }

  /**
   * Las carteleras se aparecen solas: cada una arranca escondida y se da
   * vuelta (`data-visible`) recién cuando el movimiento del mundo la entra
   * en pantalla. Una vez vista queda visible para siempre.
   *
   * La que ya está en pantalla al arrancar se muestra apenas inicia el
   * motor: si no, el sitio abría vacío y Mica tendría que adivinar que
   * tiene que scrollear para ver algo. Las de afuera siguen apareciendo
   * con el movimiento, así el principio no abre con todas juntas.
   *
   * Si el mundo es más angosto que la pantalla no hay recorrido posible
   * y ninguna entraría jamás: en ese caso se muestran todas de una.
   */
  revelar() {
    if (this.pendientes.size === 0) return;

    if (this.recorrido <= 0) {
      for (const cartelera of this.pendientes) cartelera.dataset.visible = 'true';
      this.pendientes.clear();
      return;
    }

    const ancho = window.innerWidth;
    for (const cartelera of this.pendientes) {
      if (this.xDeCartelera(Number(cartelera.dataset.indice)) < ancho) {
        cartelera.dataset.visible = 'true';
        this.pendientes.delete(cartelera);
      }
    }
  }

  /**
   * El ciclo de pasos sólo corre mientras el mundo se está moviendo.
   *
   * El delta por sí solo no alcanza: el último scroll event de una rueda o
   * de una flecha puede venir con un salto grande y no vuelve a dispararse,
   * y entonces "caminando" quedaría en true para siempre. Por eso además
   * del delta hay un freno: si pasan 140 ms sin scroll, la chica se para
   * sola.
   */
  marcarCaminando(y) {
    const delta = y - this.ultimoY;
    const moviendo = Math.abs(delta) > 0.5;
    if (moviendo && this.caminante) {
      const direccion = delta < 0 ? 'izquierda' : 'derecha';
      if (this.caminante.dataset.direccion !== direccion) this.caminante.dataset.direccion = direccion;
    }
    this.ultimoY = y;

    clearTimeout(this.freno);
    if (moviendo) {
      this.freno = setTimeout(() => this.ponerCaminando(false), 140);
      this.ponerCaminando(true);
    } else {
      this.ponerCaminando(false);
    }
  }

  /** Prende o apaga `data-caminando` en el DOM, sólo cuando el estado cambia. */
  ponerCaminando(valor) {
    if (valor === this.caminando) return;
    this.caminando = valor;
    if (this.caminante) this.caminante.dataset.caminando = String(valor);
  }

  /** El scroll recalcula en cada frame, no en cada evento. */
  prescribirAlScroll() {
    let pedido = false;

    const alDesplazar = () => {
      if (pedido) return;
      pedido = true;
      requestAnimationFrame(() => {
        pedido = false;
        this.desplazar();
      });
    };

    window.addEventListener('scroll', alDesplazar, { passive: true });
    this.alDesplazar = alDesplazar;
  }

  /** Flechas y teclas de salto, siempre que el foco no las esté usando otro control. */
  prescribirTeclado() {
    const teclas = new Set();
    let cuadro = 0;
    let anterior = 0;

    const avanzar = (segundos) => {
      const direccion = Number(teclas.has('ArrowRight')) - Number(teclas.has('ArrowLeft'));
      const paso = direccion * ESCENA.velocidadTeclado * this.escala * ESCENA.ritmo * segundos;
      window.scrollTo({ top: acotar(window.scrollY + paso, 0, this.recorridoScroll), behavior: 'instant' });
    };

    const mover = (ahora) => {
      avanzar(Math.min((ahora - anterior) / 1000, 0.05));
      anterior = ahora;
      cuadro = requestAnimationFrame(mover);
    };

    const detener = () => {
      teclas.clear();
      cancelAnimationFrame(cuadro);
      cuadro = 0;
    };

    const alPresionar = (evento) => {
      if (evento.ctrlKey || evento.altKey || evento.metaKey) return;
      if (evento.target instanceof HTMLElement &&
          (evento.target.isContentEditable || evento.target.closest('input, textarea, select, button'))) {
        detener();
        return;
      }

      switch (evento.key) {
        case 'ArrowRight':
        case 'ArrowLeft':
          evento.preventDefault();
          if (teclas.has(evento.key)) return;
          teclas.add(evento.key);
          // Un toque también mueve; sostener continúa sin depender de la repetición del teclado.
          avanzar(1 / 60);
          if (!cuadro) {
            anterior = performance.now();
            cuadro = requestAnimationFrame(mover);
          }
          break;
        case 'Home':
          evento.preventDefault();
          detener();
          this.irAInicio();
          break;
        case 'End':
          evento.preventDefault();
          detener();
          this.irAFinal();
          break;
      }
    };

    window.addEventListener('keydown', alPresionar);
    window.addEventListener('keyup', (evento) => {
      teclas.delete(evento.key);
      if (teclas.size === 0) detener();
    });
    window.addEventListener('blur', detener);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) detener();
    });
  }

  /** Ir al principio del recorrido. */
  irAInicio() {
    window.scrollTo({ top: 0, behavior: this.comportamientoSuave() });
  }

  /** Ir al final del recorrido. */
  irAFinal() {
    window.scrollTo({ top: this.recorridoScroll, behavior: this.comportamientoSuave() });
  }

  /** Lleva la caminata hasta dejar una cartelera centrada en pantalla. */
  irACartelera(indice) {
    window.scrollTo({ top: this.yDeCartelera(indice), behavior: this.comportamientoSuave() });
  }

  /** Calcula qué scrollY deja una cartelera centrada en pantalla. */
  yDeCartelera(indice) {
    const separacion = ESCENA.separacion * this.escala;
    const margen = ESCENA.margen * this.escala;

    // Posición de la cartelera en coordenadas de mundo.
    const xMundo = margen + indice * separacion + (ESCENA.carteleraAncho * this.escala) / 2;
    const xPantalla = window.innerWidth / 2;

    const desplazamiento = acotar(xMundo - xPantalla, 0, this.recorrido);
    return this.recorrido > 0 ? (desplazamiento / this.recorrido) * this.recorridoScroll : 0;
  }

  /**
   * Índice de la parada más cercana a donde estamos, medido por scroll.
   *
   * NO se usa `this.activa` para esto: la activa se pone en `null` apenas uno
   * se corre del umbral del centro, y entre parada y parada hay huecos sin
   * activa. En esos huecos el teclado se desorientaba: asumía la parada 0,
   * con lo cual la flecha derecha volvía hacia atrás (por ejemplo, entre la
   * parada 3 y la 4 saltaba a la 1) y la flecha izquierda no hacía nada.
   */
  indiceCercano() {
    let mejor = 0;
    let mejorDistancia = Infinity;

    for (let i = 0; i < this.carteleras.length; i++) {
      const distancia = Math.abs(this.yDeCartelera(i) - window.scrollY);
      if (distancia < mejorDistancia) {
        mejorDistancia = distancia;
        mejor = i;
      }
    }

    return mejor;
  }

  /** Saltar a la parada siguiente o anterior. */
  saltar(delta) {
    const paradas = this.carteleras.map((_, i) => this.yDeCartelera(i));
    // Los extremos también son destinos: se puede pasar el último cartel.
    const destino = delta > 0
      ? paradas.find((y) => y > window.scrollY + 4) ?? this.recorridoScroll
      : paradas.reverse().find((y) => y < window.scrollY - 4) ?? 0;
    window.scrollTo({ top: destino, behavior: this.comportamientoSuave() });
  }

  /** El scroll suave es un gusto, no una necesidad: si lo pidieron menos movimiento, no. */
  comportamientoSuave() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
  }

  /** Al cambiar el tamaño del navegador hay que recalcular, pero sin esperar cada pixel. */
  prescribirResize() {
    let temporizador = 0;

    window.addEventListener('resize', () => {
      clearTimeout(temporizador);
      temporizador = setTimeout(() => {
        // Guardamos la posición relativa para no perder el lugar del recorrido.
        const p = acotar(window.scrollY / Math.max(1, this.recorridoScroll), 0, 1);

        this.medir();
        this.publicar();

        window.scrollTo({ top: p * this.recorridoScroll, behavior: 'auto' });

        this.desplazar();
      }, 150);
    });
  }

}

function iniciar() {
  document.documentElement.dataset.motor = 'riel';
  window.__escenario = new Escenario(); // para depurar el motor desde la consola
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', iniciar);
} else {
  iniciar();
}
