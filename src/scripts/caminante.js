import { ARTICULACIONES as rig, CAMINANTE } from '../config.js';

/** Rota un punto alrededor de una articulación, en coordenadas del dibujo. */
function rotar(punto, pivote, grados) {
  const angulo = grados * Math.PI / 180;
  const x = punto[0] - pivote[0];
  const y = punto[1] - pivote[1];
  return [
    pivote[0] + x * Math.cos(angulo) - y * Math.sin(angulo),
    pivote[1] + x * Math.sin(angulo) + y * Math.cos(angulo),
  ];
}

/** Una vuelta tiene dos pasos. La rodilla flexiona sólo al recuperar la pierna. */
export function calcularPose(fase, intensidad = 1) {
  const angulo = fase * Math.PI * 2;
  const balanceo = Math.cos(angulo) * intensidad;
  const pose = {
    caderaLejana: rig.enderezarLejana + balanceo * CAMINANTE.giroCadera,
    caderaCercana: rig.enderezarCercana - balanceo * CAMINANTE.giroCadera,
    rodillaLejana: Math.max(0, Math.sin(angulo)) * CAMINANTE.giroRodilla * intensidad,
    rodillaCercana: Math.max(0, -Math.sin(angulo)) * CAMINANTE.giroRodilla * intensidad,
    hombroLejano: 15 - balanceo * CAMINANTE.giroHombro,
    hombroCercano: 5 + balanceo * CAMINANTE.giroHombro,
    codoLejano: 5 + Math.max(0, balanceo) * CAMINANTE.giroCodo,
    codoCercano: 5 + Math.max(0, -balanceo) * CAMINANTE.giroCodo,
  };

  // El pie más bajo determina el apoyo: evita que el cuerpo flote al flexionar.
  const apoyo = (lado, pie) => {
    const rodilla = `rodilla${lado}`;
    const cadera = `cadera${lado}`;
    return rotar(rotar(pie, rig.pivotes[rodilla], pose[rodilla]),
      rig.pivotes[cadera], pose[cadera])[1];
  };
  pose.altura = rig.suelo - Math.max(
    apoyo('Lejana', rig.apoyoLejano), apoyo('Cercana', rig.apoyoCercano),
  );
  return pose;
}

/** Controla un único esqueleto SVG, sin intercambiar imágenes completas. */
export class Caminante {
  constructor(elemento) {
    this.elemento = elemento;
    this.cuerpo = elemento?.querySelector('[data-cuerpo]');
    this.articulaciones = Array.from(elemento?.querySelectorAll('[data-articulacion]') ?? []);
    this.fase = 0;
    this.intensidad = 0;
    this.reposo = 0;
    this.menosMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.menosMovimiento.addEventListener('change', () => this.detener(true));
    this.dibujar();
  }

  avanzar(distancia) {
    cancelAnimationFrame(this.reposo);
    if (this.menosMovimiento.matches) return this.dibujar(0);
    this.fase = (this.fase + distancia / (CAMINANTE.largoPaso * 2)) % 1;
    this.intensidad = Math.min(1, this.intensidad + distancia / (CAMINANTE.largoPaso / 2));
    this.dibujar();
  }

  detener(inmediato = false) {
    cancelAnimationFrame(this.reposo);
    if (inmediato || this.menosMovimiento.matches) {
      this.intensidad = 0;
      this.dibujar();
      return;
    }
    const inicio = performance.now();
    const intensidadInicial = this.intensidad;
    const asentar = (ahora) => {
      const progreso = Math.min(1, (ahora - inicio) / CAMINANTE.duracionReposo);
      this.intensidad = intensidadInicial * (1 - progreso) ** 2;
      this.dibujar();
      if (progreso < 1) this.reposo = requestAnimationFrame(asentar);
    };
    this.reposo = requestAnimationFrame(asentar);
  }

  dibujar(intensidad = this.intensidad) {
    const pose = calcularPose(this.fase, intensidad);
    for (const articulacion of this.articulaciones) {
      const nombre = articulacion.dataset.articulacion;
      const [x, y] = rig.pivotes[nombre];
      const giro = `rotate(${pose[nombre].toFixed(2)} ${x} ${y})`;
      if (articulacion.getAttribute('transform') !== giro) articulacion.setAttribute('transform', giro);
    }
    const altura = `translate(0 ${pose.altura.toFixed(2)})`;
    if (this.cuerpo && this.cuerpo.getAttribute('transform') !== altura) {
      this.cuerpo.setAttribute('transform', altura);
    }
  }
}
