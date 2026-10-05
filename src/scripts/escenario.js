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
    this.caminante = document.querySelector('[data-caminante]');

    this.escala = 1;
    this.recorrido = 0;
    this.desplazamiento = 0;
    this.ultimoY = window.scrollY;
    this.caminando = false;

    this.medir();
    this.publicar();
    this.prescribirAlScroll();
    this.prescribirTeclado();
    this.prescribirResize();

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
    estilo.setProperty('--ciclo-paso', `${CAMINANTE.cicloPaso}s`);

    // Cada capa tiene que ser más ancha que la pantalla para que al desplazarla
    // no aparezca fondo vacío: el ancho extra es justamente lo que viaja.
    for (const capa of this.capas) {
      const factor = this.factorDe(capa);
      capa.style.width = `${window.innerWidth + this.recorrido * factor}px`;
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

    for (const capa of this.capas) {
      const factor = this.factorDe(capa);
      capa.style.transform = `translate3d(${(-this.desplazamiento * factor).toFixed(2)}px, 0, 0)`;
    }

    this.marcarActiva();
    this.marcarPosicion();
    this.marcarCaminando(y);

    this.pintarDebug(p);
  }

  /** Marca la cartelera más cercana al centro de la pantalla. */
  marcarActiva() {
    const centro = window.innerWidth / 2;
    const umbral = ESCENA.umbralActiva * window.innerWidth;

    let mejor = null;
    let mejorDistancia = Infinity;

    for (const cartelera of this.carteleras) {
      const rect = cartelera.getBoundingClientRect();
      const distancia = Math.abs(rect.left + rect.width / 2 - centro);
      if (distancia < mejorDistancia) {
        mejorDistancia = distancia;
        mejor = cartelera;
      }
    }

    const activa = mejor && mejorDistancia <= umbral ? mejor : null;

    for (const cartelera of this.carteleras) {
      cartelera.dataset.activa = String(cartelera === activa);
    }

    this.activa = activa;
  }

  /** Marca si estamos al principio, en el medio o al final del recorrido. */
  marcarPosicion() {
    const y = window.scrollY;

    if (y <= 4) this.escenario.dataset.posicion = 'inicio';
    else if (y >= this.recorridoScroll - 4) this.escenario.dataset.posicion = 'fin';
    else this.escenario.dataset.posicion = 'medio';
  }

  /** El ciclo de pasos sólo corre mientras el mundo se está moviendo. */
  marcarCaminando(y) {
    const moviendo = Math.abs(y - this.ultimoY) > 0.5;
    this.ultimoY = y;

    if (moviendo === this.caminando) return;
    this.caminando = moviendo;
    if (this.caminante) this.caminante.dataset.caminando = String(moviendo);
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
    const alPresionar = (evento) => {
      const etiqueta = evento.target instanceof HTMLElement ? evento.target.tagName : '';
      if (['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON', 'A'].includes(etiqueta)) return;

      switch (evento.key) {
        case 'ArrowRight':
          evento.preventDefault();
          this.saltar(1);
          break;
        case 'ArrowLeft':
          evento.preventDefault();
          this.saltar(-1);
          break;
        case 'Home':
          evento.preventDefault();
          this.irAInicio();
          break;
        case 'End':
          evento.preventDefault();
          this.irAFinal();
          break;
      }
    };

    window.addEventListener('keydown', alPresionar);
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

  /** Saltar a la parada siguiente o anterior. */
  saltar(delta) {
    const actual = this.activa ? Number(this.activa.dataset.indice) : 0;
    const siguiente = acotar(actual + delta, 0, this.carteleras.length - 1);

    if (siguiente === actual) return;
    this.irACartelera(siguiente);
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

  /** Números del motor a la vista, sólo en desarrollo. */
  pintarDebug(p) {
    const caja = this.escenario.querySelector('[data-debug]');
    if (!caja) return;

    const escribir = (selector, valor) => {
      const nodo = caja.querySelector(selector);
      if (nodo) nodo.textContent = valor;
    };

    escribir('[data-debug-p]', p.toFixed(3));
    escribir('[data-debug-escala]', this.escala.toFixed(3));
    escribir('[data-debug-recorrido]', Math.round(this.recorrido));
    escribir('[data-debug-activa]', this.activa ? this.activa.dataset.indice : 'ninguna');
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