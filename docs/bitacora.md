# Bitácora

Registro cronológico del proyecto: qué se hizo, qué problema apareció, cómo se resolvió,
qué alternativas se descartaron y qué queda pendiente.

## Fase 0 — 5 de octubre de 2026 — Andamiaje

**Qué se hizo**

- Creación del proyecto Astro 7.3.5 con el template minimal, `output: 'static'`, sin adaptador.
- `git init` en rama `main`.
- Estructura de carpetas completa según el plan.
- `src/config.js` con la configuración del escenario, la del caminante, la ciudad y los stickers.
- `src/styles/tokens.css` (paleta, tipografías, cielos, movimiento, medidas) y `global.css` (reset, foco visible, `prefers-reduced-motion`).
- `src/pages/index.astro` mínimo que lee `config.js` y muestra los valores, para comprobar que todo llega al HTML.
- Stubs de `README.md` y de este documento.

**Problemas encontrados**

- Verificar la versión de Astro antes de escribir código. Resultó ser **7.3.5**, que ya no usa `src/content/config.ts` sino **`src/content.config.ts`** en la raíz de `src`. Confirmado contra la documentación oficial.
- El import de Zod para el schema es **`astro/zod`**, no `zod` directo. Así el schema valida sin agregar `zod` como dependencia.

**Cómo se resolvió**

Se consultó la documentación oficial de Astro antes de escribir el schema (Fase 2). Queda
documentado acá para no volver a buscarlo.

**Alternativas descartadas**

- Usar el template `blog` o `basics` de `create-astro`: traen más estructura de la que
  necesitamos y hay que borrar de más. El `minimal` alcanza.
- Poner la carpeta `content/` antes de crear el schema: el schema va en `content.config.ts`,
  no dentro de `content/`.

**Qué queda pendiente**

- Todo el motor de scroll (Fase 1).
- La forma del cartel verde icónico: se necesita una foto de referencia de Mica. Dos
  búsquedas web no dieron una forma documentada, así que no se inventó. El placeholder SVG
  se va a hacer en la Fase 1 y se ajusta con la foto.
- Los textos (`TODO(Mica)`) están marcados y son visibles en el sitio.

**Mica todavía no revisó nada de esta fase.**

---

## Fase 1 — 5 de octubre de 2026 — Prueba de concepto del escenario

**Qué se hizo**

- `src/scripts/escenario.js`: el motor. Mide el viewport, calcula escala y recorrido,
  publica la configuración como variables CSS, traduce el scroll vertical en desplazamiento
  horizontal, marca la cartelera activa, marca la posición del recorrido, prende y apaga el
  ciclo de pasos de la chica, escucha el teclado y recalcula al cambiar el tamaño.
- `src/components/Escenario.astro`: cielo, las tres capas de fondo, el mundo con las
  carteleras, el colectivo ambiental y la chica. El componente sólo pone las piezas.
- `src/components/Caminante.astro`: la chica con el ciclo de pasos. No se mueve con el mundo:
  queda fija y lo que se mueve es el mundo frente a ella.
- `src/components/Cartelera.astro`: placeholder con marco verde y afiche negro, más el
  estado "prendida". Sin contenido todavía.
- `src/layouts/Vereda.astro`: el shell del documento y las fuentes.
- `public/capas/`: cuatro SVG placeholder (edificios, locales y árboles, vereda, colectivo).

**Problemas encontrados y cómo se resolvieron**

Cuatro bugs que aparecieron revisando el código, antes de que nadie los viera:

1. **El salto a una parada estaba mal.** El cálculo `destino <= 1 ? destino * total : ...`
   confundía "la primera cartelera" (índice 0) con "el principio del recorrido" (0 del
   recorrido). `Home` pasaba por casualidad, pero saltar con la flecha a la primera
   cartelera no la centró. **Se partió en tres funciones**: `irAInicio()`, `irACartelera()` e
   `irAFinal()`, y una sola con el cálculo de `yDeCartelera()`.
2. **La chica se desarmaba al caminar.** `transform: rotate()` sobre un `<g>` de SVG gira
   alrededor del origen del SVG, que es la esquina 0,0, y no alrededor de la cadera. Las
   piernas se doblaban hacia otro lado. **Se agregó** `transform-box: fill-box` y
   `transform-origin: 50% 0%` a los grupos de piernas y brazos.
3. **El fallback sin JavaScript era código muerto.** Había un `const hayJsPlaceholder = true`
   y un ternario que siempre daba `false`. **Ahora funciona de verdad**: el motor pone
   `data-motor="riel"` en el `<html>` al arrancar, y el CSS detecta la ausencia de ese
   atributo para dejar el escenario estático y las carteleras en una fila desplazable.
4. **Las medidas de las carteleras estaban en dos archivos.** `--cartelera-separacion` y
   `--cartelera-margen` vivían en `tokens.css` y el motor usaba `config.js`. Cambiar uno en
   la defensa no hubiera tenido efecto y no se hubiera entendido por qué. **Se sacaron de
   `tokens.css`**: ahora hay una sola fuente y `escenario.js` publica las medidas a CSS.

**Alternativas descartadas**

- **Scroll horizontal propio con un listener y `preventDefault`.** Se descartó porque el
  scroll vertical nativo ya resuelve teclado, touch, swipe, lectores de pantalla y la barra
  de scroll del navegador. Reimplementarlo es perder todo eso a cambio de nada.
- **Un componente `Recorrido` o `Camino` aparte.** No hacía falta: el motor entero cabe en
  un módulo y partirlo en más archivos iba a ser abstracción sin motivo.
- **Un contador de pasos calculado en JavaScript** para la caminata. Se descartó porque
  alcanza con una clase CSS que se prende y se apaga; el ciclo lo resuelve el compositor, que
  es más barato.

**Qué queda pendiente**

- **Mica todavía no miró la escena renderizada.** El build pasa y el HTML servido tiene las
  cinco carteleras con su índice, el mundo, la chica y las cuatro capas. Pero nadie vio la
  página: falta confirmar que la chica se ve bien, que camina al scrollear, que el parallax
  se nota y que la cartelera activa se prende.
- **No se midieron los fps.** Es un criterio de esta fase.
- La forma del cartel verde icónico sigue bloqueada esperando una foto de Mica.
- Las capas y la chica son placeholders definitivos hasta que Mica mande las ilustraciones.

**Mica todavía no revisó nada de esta fase.**