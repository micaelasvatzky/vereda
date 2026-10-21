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

---

## Fase 1 — 7 de octubre de 2026 — Las ilustraciones de Mica: caminata y mirada

**Qué se hizo**

- Mica mandó cuatro ilustraciones (viven en `docs/imgs/`): tres poses de caminata
  (`Camina1/2/3`) y una de "mira al cartel". Se copiaron a `public/caminante/` para que
  Astro las sirva. Los originales quedan en `docs/imgs/` y no se borran.
- `Caminante.astro` reescrito: las cuatro imágenes apiladas en el mismo lugar (comparten
  lienzo `0 0 209.25 511.5`, así que no hay que calcular anchos) con ciclo de caminata
  animado por CSS puro y la pose "mira" encima, invisible hasta el hover.
- El ciclo es ida y vuelta `1 → 2 → 3 → 2 → 1` (nunca 3 → 1 directo, eso salta) con cuatro
  fundidos de 6% del ciclo (~75 ms) por vuelta. Cada cruce va en dos tiempos: la pose que
  entra sube a 1 mientras la que sale sigue opaca abajo, y recién después se baja la otra
  (escondida). En ningún momento se transparenta el fondo a través del cuerpo, y el t=0
  cae en la pose 1 pura: la animación pausada queda exactamente en la pose de reposo.
- `escenario.js`: el ciclo sólo corre con `data-caminando="true"` — pausar congela el frame
  en el que estaba, no salta a la pose 1 —; publica `--ciclo-sprite` (= 2 ×
  `CAMINANTE.cicloPaso`) y el freno pasó a ser por timer de 140 ms.
- Hover en el marco verde de cualquier cartelera: `:global(html:has(.cartelera__marco:hover))`
  muestra la pose "mira al cartel" con un fundido de `--duracion-mira`. Sin JavaScript.
- `Vereda.astro`: el bloque de estilo pasó a `is:global define:vars` para poder publicar
  `--caminante-x`, `--caminante-y` y `--ciclo-sprite`.
- `config.js` ganó `RUTAS_CHICA` (las cuatro rutas en un solo lugar) y `tokens.css` ganó
  `--duracion-mira`.

**Problemas encontrados y cómo se resolvieron**

Sigue la numeración de los cuatro bugs de arriba:

5. **La caminata no frenaba al parar el scroll.** El último `scroll` de un gesto puede no
   volver a dispararse nunca más, así que `caminando` quedaba en `true` y la chica seguía
   caminando estando parada. **Se resolvió** con un freno por `setTimeout` de 140 ms que se
   reprograma en cada scroll: si no llega ninguno nuevo, apaga el ciclo.
6. **El fallback sin JavaScript no ocultaba a la chica.** El selector
   `html:not([data-motor='riel']) .caminante` estaba en `Escenario.astro`, pero `html` no
   recibe el scope del componente y `.caminante` vive en otro archivo: selector muerto, sin
   error, simplemente no matcheaba nunca. **Se resolvió** con
   `html:not([data-motor='riel']) :global(.caminante)`.
7. **`--ciclo-paso` se publicaba como texto.** `Vereda.astro` lo escribía con interpolación
   de template dentro de `<style>` (`{CAMINANTE.cicloPaso}s`), que Astro no procesa: CSS
   roto. Nadie lo vio porque el JS lo pisaba después. **Se resolvió** con `define:vars`,
   la única forma que tiene Astro de pasar datos del frontmatter al CSS.
8. **La primera versión de los keyframes estaba mal (hallazgo del agente al
   autorrevisarse).** Dos problemas: el `0%` de la pose 2 daba `opacity: 1`, así que con la
   animación pausada la chica quieta se habría visto en pose 2 y no en pose 1; y los
   fundidos complementarios (una baja de 1 a 0 mientras la otra sube de 0 a 1) suman 1 en
   el papel, pero apiladas las capas el cuerpo se pone translúcido en el punto medio y el
   fondo se cuela ~25%. **Se rediseñaron los keyframes** con la estructura de dos tiempos:
   siempre hay al menos una capa en `opacity: 1` y los cuatro fundidos visibles quedan en
   `[7,13]`, `[32,38]`, `[63,69]` y `[88,94]`.

**Alternativas descartadas**

- **Fundidos complementarios simples** (la vieja versión del punto 8): matemáticamente
  correctos en suma, visualmente con sangrado de fondo. Descartados.
- **Cortes secos con `steps()`**: cero translucidez, pero se ve el salto de pose. El fundido
  de 75 ms es lo que pidió Mica ("que sean suaves y parezcan una animación").
- **Reiniciar la animación al parar**: vuelve de golpe a la pose 1 a mitad de un cruce.
  Descartado: pausar congela el frame.
- **Clase JS para el hover de la mirada**: no hace falta JavaScript para un hover. `:has()`
  lo resuelve en CSS; se verificó contra la fuente del compilador de Astro que el selector
  cross-component con `:global()` al principio queda scoping al lado correcto.

**Qué queda pendiente**

- **Mica todavía no vio nada de esto.** Falta: que mire la chica caminando (suavidad del
  ciclo), que pase el mouse por el marco verde y le cambie la pose, que confirme la pose de
  reposo (`camina-1`, decisión del agente) y medir fps.
- **El build NO se corrió después de estos cambios** (regla de sesión: nunca build después
  de cambios). Antes de cerrar la fase hay que correrlo.
- Las rutas y el ritmo del ciclo se cambian en un solo lugar: `RUTAS_CHICA` y
  `CAMINANTE.cicloPaso` en `src/config.js`.

**Mica todavía no revisó nada de esta fase.**

---

## Fase 1 — 7 de octubre de 2026 (tarde) — Ajustes sobre la primera revisión de Mica

Mica vio la escena y reportó tres cosas: las flechas se movían raro, los afiches no estaban
sobre la vereda y aparecían todos juntos al principio. El parallax, OK.

**Qué se hizo**

- **Teclado sin estado derivado.** `saltar()` ahora calcula en qué parada estamos con la
  nueva `indiceCercano()`, que invierte `yDeCartelera()` y mide contra el `scrollY`. El
  constructor pasó a llamar `desplazar()` una vez al arrancar, así el estado inicial (posición,
  activa, carteleras visibles) queda calculado antes del primer scroll.
- **Las carteleras se plantan en la línea de suelo de la chica.** El `bottom` de la cartelera
  salió del borde inferior de la pantalla (`0`) y ahora es `(1 - var(--caminante-y)) * 100%`,
  la misma recta donde tocan la baldosa los pies de la chica. `CAMINANTE.y` en `config.js`
  quedó documentado como la "línea de suelo" compartida: un número, dos objetos clavados.
- **Aparición progresiva de las carteleras.** El motor ganó `revelar()`: cada cartelera arranca
  escondida y el motor la da vuelta (`data-visible`) recién cuando el movimiento del mundo la
  entra en pantalla. Hasta que la chica no arranca (`desplazamiento > 0`) no se ve ninguna, y
  una vez vista queda visible para siempre. `tokens.css` ganó `--duracion-aparecer` (0.6 s) y
  `--curva-aparecer`.
- **Verificación del cielo por horario.** Consultado por Mica: confirmado en el código que
  **no existe** — el cielo es un `var(--cielo-dia)` fijo y no hay lógica de hora en todo `src/`.
  Los degradés y `CIUDAD.zonaHoraria` ya están; el script sigue siendo Fase 4 (pregunta
  abierta más abajo).

**Problemas encontrados y cómo se resolvieron**

Sigue la numeración de los ocho bugs anteriores:

9. **Las flechas se desorientaban entre paradas.** `saltar()` tomaba la parada actual desde
   `this.activa`, pero la activa es `null` apenas uno se corre del umbral del centro, y entre
   parada y parada hay huecos de ~450 px sin activa. En esos huecos el código asumía la
   parada 0: la flecha derecha volvía hacia atrás (entre la parada 3 y la 4 saltaba a la 1) y
   la flecha izquierda no hacía nada. **Se resolvió** con `indiceCercano()` (ver arriba): la
   posición sale del scroll, que es la verdad, y no de un estado derivado del umbral.
10. **Las carteleras no estaban sobre la vereda.** Su base estaba en `bottom: 0`, ~190 px por
    debajo de los pies de la chica: se veían colgadas en el borde inferior de la pantalla, en
    otro plano que el donde ella camina. **Se resolvió** plantándolas en la misma línea de
    suelo (`--caminante-y`).
11. **El arreglo del 10 introdujo uno nuevo (detectado al revisar, antes de que nadie lo viera).**
    Las carteleras escondidas seguían siendo interactivas: pasar el mouse por un espacio vacío
    disparaba `:has(.cartelera__marco:hover)` y la chica miraba un cartel que no se veía.
    **Se resolvió** con `pointer-events: none` en el estado escondido, más una regla de
    `prefers-reduced-motion` para que la aparición sea sin animación.

**Alternativas descartadas**

- **Parchear el 9 subiendo `umbralActiva`** para que no queden huecos sin activa: el umbral
  es fracción de pantalla y la distancia entre paradas crece con la escala — nunca se alcanza
  para todo. Además "¿dónde estoy?" se responde con el scroll, no con un estado derivado.
- **Aparición por proximidad a la chica** (que aparezca cuando se le acerca, no al entrar en
  pantalla): en pantallas anchas un cartel ya visible a pantalla completa aparecería tarde y
  de golpe. La entrada en pantalla con gate de movimiento cubre los dos pedidos con menos magia.
- **Subir las carteleras con un `bottom` a ojo** (p. ej. 15%): otro número suelto que se
  contradice con la chica. Se usó la línea de suelo que ya existe.

**Qué queda pendiente**

- **Mica no vio estos fixes.** Falta que pruebe las flechas, que mire las carteleras paradas
  sobre la vereda y que vea la aparición progresiva al caminar.
- **Pregunta abierta de Mica, sin responder al cerrar la sesión:** si el cielo por horario de
  Buenos Aires se implementa ahora (Fase 4 adelantada) o en su fase.
- **Postergado a pedido de Mica:** el rig de partes separadas para animar la chica (SVG con
  capas nombradas y pivotes). Se explicó el approach; ella manda el SVG partido cuando vuelva.
- **El build NO se corre después de cambios** (regla de sesión): el último build OK es
  anterior a la integración de ilustraciones y a estos ajustes. Antes de cerrar la Fase 1 hay
  que correrlo.
- Sin push: quedan **4 commits** sin subir (los dos de la mañana y los dos de hoy).

**Mica revisó la escena el 7 de octubre: parallax aprobado; flechas y afiches reportados
como mal (bugs 9 y 10). Los fixes quedan pendientes de su confirmación visual.**

## Fase 1 — 8 de octubre de 2026 — Los carteles que nunca se vieron: un `calc()` inválido

Segundo reporte de Mica, con dos pistas que lo cambiaron todo: "los carteles verdes sigo sin
verlos, es como que cuando recargo la página aparecen por un minuto y después desaparecen",
y un puñado de 404 de `/stickers/*.svg` en la consola. Además aplicamos su feedback de la
mañana: la preview **reemplaza** al afiche (hueco transparente, el negro lo pinta su SVG),
el colectivo salió de la escena, dos edificios nuevos en la zona del obelisco (capa lejana
y capa media, placeholders grises por ahora) y se borró `foto-vertical.png` del repo (Mica no
sabe qué es; si lo necesita, la Escena de Figma lo tiene).

**El bug de fondo (12): las carteleras tuvieron ancho 0 toda su vida.**

- `calc()` sólo acepta **longitud × número** (o porcentaje × número). En `Cartelera.astro`,
  `left` y `width` eran `calc(var(--cartelera-margen, 1000) * var(--escala, 1))` —
  **número × número**, que da una expresión sin unidades: inválida donde se espera una
  longitud. Verificado con valores computados reales: `left = 8px`, `width = 0px`. El ancho
  0 es literal: el cartel no ocupaba lugar y no se veía **nunca**, con ningún scroll.
- Lo que Mica veía "aparecer un ratito al recargar" era el **fallback sin JavaScript**:
  mientras el motor no arrancaba, `html:not([data-motor])` mostraba las carteleras en
  `position: static` con ancho fijo. En cuanto corría el script, volvían al mundo con el
  calc roto y desaparecían. Su descripción fue precisa desde el primer reporte.
- **Se resolvió** agregando `* 1px` al final de cada `calc()` de `left` y `width`: número
  × número × 1px = longitud válida. El mismo truco ya lo usaba `Escenario.astro` para la
  altura de los objetos (`calc(var(--objeto-alto) * 1px * var(--escala))`) — la lección
  estaba en casa y no se aplicó al cartel.
- **El flash también se cortó**: el fallback sin-JS se movió de una regla CSS normal a un
  `<noscript><style is:inline>`. Con JS activo, el contenido del `<noscript>` ni se parsea,
  así que las carteleras arrancan escondidas desde la primera pintada y no hay estado
  intermedio visible. (El fallback no-JS queda **sin probar en navegador**: `--headless` con
  scripts apagados no genera screenshots en este entorno; se verificó por selector y
  especificidad, no por píxel.)
- **`revelar()` aprendió a no exigir movimiento**: el gate `desplazamiento > 0` escondía
  todas al abrir — Mica tenía que adivinar que había que scrollear. Ahora la cartelera que
  ya está en pantalla se revela apenas arranca el motor; las de afuera siguen apareciendo
  con el movimiento.
- **Stickers**: `STICKERS = []`. `public/stickers/` sólo tiene `.gitkeep` desde siempre —
  los SVG nunca existieron y los 404 eran de toda la vida. El mecanismo (config + `.map`)
  queda listo para cuando Mica mande los assets.
- **La chica, más atrás y más grande** (pedido de Mica, 8/10): `CAMINANTE.x` bajó de 0.28
  a 0.24 y `CAMINANTE.alto` subió de 260 a 300, sólo tocando `config.js`. Se probó 380
  y Mica lo desconfirmó al toque: quedó en 300 ("el tamaño está bien").
- **Mica reemplazó `CartelVerde.svg`** (resolución nueva, misma proporción; el rect
  `#0b100a` del afiche ya no existe en el dibujo). Y pidió sacar "los cosos de los
  bordes": se quitaron el `box-shadow` de `.cartelera__cartel` y el anillo blanco del
  estado activo — ambos dibujaban un rectángulo alrededor del cartel en vez de ceñirse
  a su forma. La cartelera activa ahora "prendе" sólo con `scale`. El hueco del afiche
  (`.cartelera__afiche`) sigue con las medidas del rect viejo; al entrar la Fase 2 hay
  que re-pensarlo contra el SVG sin hueco.

**Verificación por datos (el modelo no ve pantallas):**

- Diagnóstico: Edge headless + conteo de píxeles por color. El SVG renderiza perfecto
  (7079 píxeles #345238 al abrirlo directo); el DOM servido tenía `data-visible="true"` y
  el CSS compilado correcto — pero la zona del cartel salía **cielo** (#a1e3e4). Página
  estática de prueba con el mismo CSS aisló el problema en el `calc()`, y leer
  `getComputedStyle` desde la propia página dio la sentencia: `width = 0px`.
- Después del fix: **466 píxeles verdes (ruido de fondo) → 2602** en el mismo screenshot
  de la página real, con la primera cartelera visible al abrir **sin scrollear**.
- Lección de método: cuando dos fuentes de verdad se contradicen (DOM correcto, píxel
  roto), no se elige una — se busca la tercera (valores computados). Y ojo con las zonas
  de medición: medir "donde creo que está" con la escala equivocada dio falsos negativos
  dos veces.

**Qué queda pendiente**

- **Mica confirma en navegador:** primer cartel visible al abrir, aparición progresiva al
  caminar, y los cambios de su feedback (colectivo fuera, edificios del obelisco, hueco
  transparente).
- **Edificios del obelisco:** son placeholders grises (`lejana.svg` / `media.svg`). Si Mica
  quiere los suyos, sólo cambia el `src` en `OBJETOS`.
- **Stickers:** el día que mande los SVG van en `STICKERS` (config.js) y se dibujan solos.
- **Pregunta sigue abierta:** cielo por horario de Buenos Aires — ¿ahora o en la Fase 4?
- **Build sin correr** (regla de sesión) y **push lo hace Mica**: quedan varios commits
  sin subir.

---

## Fase 1 — 21 de octubre de 2026 — Reanudación: build verificado y un documento corrupto

**Qué se hizo**

- **Build de control.** Después de trece días sin sesiones, se corrió `npm run build` sobre
  el estado del repo: los cambios del 8/10 nunca se habían compilado. **Pasa: 1 página,
  4.13 s, sin errores.** Con esto queda cerrado el último pendiente técnico de la Fase 1
  que no dependía de la vista de Mica.
- **Se reparó `docs/pruebas.md`.** Estaba con codificación mixta: la sección agregada el
  8/10 se había escrito en Windows-1252 (ANSI) en vez de UTF-8, así que las vocales
  acentuadas, el `¿` de apertura y los guiones largos se veían como el carácter de reemplazo
  (U+FFFD). Se decodificó esa parte con CP1252 y se reescribió el archivo entero en UTF-8
  sin BOM, con finales de línea LF como el resto del repo.
- `AGENTS.md` y `CLAUDE.md` actualizados: el estado de la fase ya no decía "falta correr el
  build" ni "4 commits sin subir" (son siete).
- **Guard de codificación.** `scripts/check-encoding.mjs` con `npm run check`: recorre los
  archivos de texto del repo y falla si alguno no es UTF-8 válido. Es la defensa contra el
  bug 13, que es **silencioso**: Git no avisa, el build pasa, y el síntoma aparece días
  después cuando alguien abre el documento. Probado: con un archivo en CP1252 devuelve
  código 1 y lo nombra; con el repo limpio devuelve 0.

**Problemas encontrados y cómo se resolvieron**

13. **Documento corrupto por codificación.** La sección del 8/10 en `docs/pruebas.md` quedó
    grabada en CP1252. Git no avisa: el archivo sigue siendo texto válido, sólo que con
    bytes que no son UTF-8, y cualquier lector UTF-8 los muestra como el rombo con signo
    de pregunta (U+FFFD). **Se resolvió** decodificando esa parte con CP1252 y
    reescribiendo el archivo entero en UTF-8 sin BOM.

    Lección de método (la misma se aplicó dos veces en un día): el problema no es Git ni
    el editor de texto, es **cómo se escribe el archivo**. En Windows, `Set-Content` y
    `Out-File` de PowerShell 5.1 escriben en ANSI por defecto, y una herramienta de
    edición que armó la línea de comando con el texto se cae a ANSI cuando la cadena
    contiene el carácter U+FFFD (justo el que se estaba documentando). **Regla: después
    de tocar un doc con acentos, verificar los bytes** — y nunca escribir el carácter
    U+FFFD literal dentro de un archivo, ni siquiera como ejemplo.

**Alternativas descartadas**

- **Reescribir la sección del 8/10 a mano desde cero**: funcionaba, pero se perdía el texto
  exacto que Mica ya había leído. Decodificar es más fiel y no inventa nada.

**Ajustes de la tarde (21 de octubre de 2026)**

- **La chica un poco más grande.** Mica pidió "un poco más grande": `CAMINANTE.alto` pasó de
  300 a 340 px de referencia (+13 %). Es un paso medido a propósito: el 8/10 se probó 380 y
  volvió a 300 ("el tamaño está bien"), así que no se repitió ese salto. Los pies quedan
  anclados a la línea de suelo (`CAMINANTE.y = 0.9`), así que crecerla le sube la cabeza
  sin levantarla del piso. El ancho de referencia pasa de 122,7 a 139,1 px.
- **Los respaldos del CSS quedaron al día.** `Caminante.astro` tenía `260px`, `0.28` y
  `0.82` como valores de respaldo, que ya no coincidían con `config.js`. Nunca se usaban
  (el valor real siempre llega), pero dejaban un número viejo a la vista en el CSS.
- **Se cerraron los commits que estaban pendientes** de la sesión anterior: el build del
  21/10, el guard de encoding, la reparación de `docs/pruebas.md` y este ajuste de tamaño.

**Qué queda pendiente**

- Lo mismo que estaba pendiente: la confirmación visual de Mica, medir fps, la push a
  GitHub, la pregunta del cielo por horario y el rig de partes separadas de la chica.
- **Los links de los proyectos** (Vercel y GitHub) y el orden en que van: es la entrada de
  la Fase 2, con la preview de cada proyecto en el centro del cartel.
