import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { ESCENA } from '../src/config.js';

test('las flechas conservan avances menores a un píxel y frenan al soltarlas', () => {
  const eventos = {};
  const cuadros = new Map();
  let id = 0;
  const ventana = {
    scrollY: 0,
    addEventListener: (nombre, accion) => { eventos[nombre] = accion; },
    scrollTo: ({ top }) => { ventana.scrollY = Math.round(top); },
  };
  const contexto = vm.createContext({
    ESCENA, window: ventana, document: { documentElement: { dataset: {} }, addEventListener() {} },
    HTMLElement: class {}, performance: { now: () => 0 },
    requestAnimationFrame: (accion) => { cuadros.set(++id, accion); return id; },
    cancelAnimationFrame: (numero) => cuadros.delete(numero),
  });
  const fuente = readFileSync(new URL('../src/scripts/escenario.js', import.meta.url), 'utf8');
  vm.runInContext(fuente.slice(fuente.indexOf('/**')).split('\nfunction iniciar()')[0] +
    '\nglobalThis.Motor = Escenario;', contexto);
  const motor = Object.create(contexto.Motor.prototype);
  Object.assign(motor, { escala: 1, recorridoScroll: 1000, desplazar() {} });
  motor.prescribirTeclado();
  const tecla = (key) => ({ key, preventDefault() {} });
  const frame = (ahora) => {
    const pendientes = [...cuadros.values()];
    cuadros.clear();
    for (const accion of pendientes) accion(ahora);
  };
  eventos.keydown(tecla('ArrowRight'));
  // Dos cuadros muy próximos: el segundo no alcanza a mover un píxel entero.
  frame(0.01);
  frame(0.02);
  assert.equal(cuadros.size, 1, 'no debe cortar la tecla por el redondeo');
  for (let tiempo = 16; tiempo < 2200; tiempo += 16) frame(tiempo);
  assert.equal(ventana.scrollY, 1000);
  assert.equal(cuadros.size, 0, 'frena en el extremo');
  eventos.keydown(tecla('ArrowLeft'));
  frame(16);
  assert.ok(ventana.scrollY < 1000);
  eventos.keyup(tecla('ArrowLeft'));
  assert.equal(cuadros.size, 0, 'soltar cancela el movimiento');
});
