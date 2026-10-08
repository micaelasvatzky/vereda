# Registro de uso de IA

Por cada fase: **para qué se usó IA**, **qué generó el agente**, **qué revisó / adaptó /
descartó Mica**, **qué problemas o límites se detectaron** y **qué decisiones tomó Mica**.

> Los campos que deben completar Mica están marcados. El agente deja el borrador pero no
> los completa.

---

## Fase 0 — Andamiaje (5 de octubre de 2026)

**Para qué se usó IA**

Crear el andamiaje del proyecto: inicializar Astro, definir la estructura de carpetas,
escribir los tokens de diseño, el archivo de configuración centralizado, los stubs de
documentación y el primer commit.

**Qué generó el agente**

- `astro.config.mjs` con `output: 'static'`.
- `src/config.js`: constantes `ESCENA`, `CAMINANTE`, `CIUDAD`, `STICKERS`, `RUTAS_CAPAS`.
- `src/styles/tokens.css` y `src/styles/global.css`.
- `src/pages/index.astro` mínimo.
- `README.md` y `docs/bitacora.md` iniciales.
- Commits de esta fase.

**Revisó / adaptó / descartó Mica** *(lo completa ella)*

- [ ] Revisado
- [ ] Adaptado
- [ ] Descartado

**Problemas, errores o límites detectados por Mica** *(lo completa ella)*

**Decisiones tomadas por Mica**

- El concepto: caminata lateral por una vereda de Buenos Aires, con una chica que camina y
  pasa por carteleras verdes de calle. El fondo es el cielo, que cambia con la hora real de
  Buenos Aires. Los afiches son las previews de los proyectos.
- Que las capas del fondo sean **ilustraciones**, no fotos.
- Que el agente avance y Mica corrija sobre la marcha.
- Los proyectos van a ser placeholders hasta que Mica pase los links reales.

**Límites del agente que conviene registrar**

- No se encontró documentación en línea sobre la forma exacta del cartel verde icónico de
  Buenos Aires. Dos búsquedas no dieron resultado útil, así que **no se inventó** la forma:
  queda pendiente una foto de referencia de Mica antes de cerrarlo.
- Como Mica no dibuja, las ilustraciones definitivas son un input pendiente. Los
  placeholders son SVG provisionales.

---

## Fase 1 — Motor del escenario (5 de octubre de 2026)

**Para qué se usó IA**

Escribir el motor que traduce el scroll vertical en un desplazamiento horizontal del mundo,
con parallax en tres capas, detección de la cartelera activa y el ciclo de pasos de la chica.

**Qué generó el agente**

- `src/scripts/escenario.js` completo.
- `src/components/Escenario.astro`, `Caminante.astro`, `Cartelera.astro`.
- `src/layouts/Vereda.astro`.
- Cuatro SVG placeholder en `public/capas/`.
- Seis commits, uno por cambio con sentido.

**Revisó / adaptó / descartó Mica** *(lo completa ella)*

- [ ] Revisado
- [ ] Adaptado
- [ ] Descartado

**Problemas, errores o límites detectados por Mica** *(lo completa ella)*

**Decisiones tomadas por Mica**

- El agente avanza y Mica corrige sobre la marcha: se hizo la Fase 1 completa sin
  esperarla en el medio.

**Límites del agente que conviene registrar**

- **El agente no puede ver el resultado renderizado.** Verificó el HTML servido y el código,
  pero no miró la página. Por eso la fase queda abierta: falta confirmación visual y medir
  fps.
- El agente encontró cuatro bugs revisando su propio código antes de que los viera nadie. Se
  documentan en `docs/bitacora.md` porque son decisiones de diseño, no sólo errores de
  tipeo.

---

## Fase 1 (continuación) — Integración de las ilustraciones (7 de octubre de 2026)

**Para qué se usó IA**

Integrar las cuatro ilustraciones que mandó Mica: armar el ciclo de caminata con las tres
poses de caminata y la pose "mira al cartel" al hacer hover sobre el marco verde.

**Qué generó el agente**

- Copia de los cuatro SVG a `public/caminante/` (los originales quedan en `docs/imgs/`).
- `Caminante.astro` reescrito: cuatro poses apiladas, ciclo por keyframes CSS y el hover
  de la mirada resuelto con `:has()`, sin JavaScript.
- Cambios de apoyo en `escenario.js` (freno por timer de 140 ms y `--ciclo-sprite`),
  `Escenario.astro` (fix del selector `:global(.caminante)` del fallback sin JS),
  `Vereda.astro` (`define:vars`), `config.js` (`RUTAS_CHICA`) y `tokens.css`
  (`--duracion-mira`).
- Los keyframes del ciclo, escritos dos veces: la primera versión tenía la pausa en la pose
  equivocada y transparecía el fondo en los fundidos; el agente lo detectó al
  autorrevisarse y los rediseñó antes de tocar los docs.

**Revisó / adaptó / descartó Mica** *(lo completa ella)*

- [ ] Revisado
- [ ] Adaptado
- [ ] Descartado

**Problemas, errores o límites detectados por Mica** *(lo completa ella)*

**Decisiones pendientes de Mica**

- La pose de reposo de la chica quedó en `camina-1` (decisión del agente, ver bitácora
  bug 8). Si ninguna de las tres sirve de parada, ella manda una y se agrega al array.
- El ritmo del ciclo (`CAMINANTE.cicloPaso`) y la velocidad del fundido de la mirada
  (`--duracion-mira`) son números de un solo archivo: si al verlo le parece muy rápido o
  muy lento, se ajustan sin tocar más nada.

**Límites del agente que conviene registrar**

- **El agente no vio la animación corriendo.** Verificó los porcentajes de los keyframes a
  mano (cobertura en cada tramo, cierre del bucle y pose en t=0) pero no con los ojos: la
  confirmación visual de la suavidad es de Mica.
- El selector cross-component del hover (`:global(html:has(...))`) se verificó contra la
  fuente del compilador de Astro y contra la guía de styling de la documentación oficial,
  no con una prueba en navegador.
- El build no se corrió después de estos cambios (regla de sesión), así que la fase no se
  cierra hasta que alguien lo corra y Mica vea la página.

---

## Fase 1 (continuación) — Ajustes sobre la revisión de Mica: teclado, suelo y aparición (7 de octubre de 2026, tarde)

**Para qué se usó IA**

Resolver lo que reportó Mica al ver la escena: las flechas se movían raro, los afiches no
estaban sobre la vereda y aparecían todos juntos al principio. Además, verificar si el cielo
por horario de Buenos Aires funcionaba.

**Qué generó el agente**

- `escenario.js`: `indiceCercano()` (el salto de parada medido por scroll, reemplaza al cálculo
  desde la cartelera activa), `revelar()` (aparición progresiva con `pendientes`) y una
  llamada inicial a `desplazar()` en el constructor.
- `Cartelera.astro`: `bottom` sobre la línea de suelo (`--caminante-y`), estado escondido con
  fundido + `pointer-events: none`, y regla para `prefers-reduced-motion`.
- `tokens.css`: `--duracion-aparecer` y `--curva-aparecer`.
- `config.js`: `CAMINANTE.y` documentado como línea de suelo compartida.
- Dos commits: uno de código, uno de docs.

**Revisó / adaptó / descartó Mica** *(lo completa ella)*

- [ ] Revisado
- [ ] Adaptado
- [ ] Descartado

**Problemas, errores o límites detectados por Mica**

- Reportó tres: flechas raras (bug 9), afiches fuera de la vereda (bug 10), todos juntos al
  principio. Y aprobó el parallax.

**Decisiones tomadas por Mica**

- **El rig de partes separadas para animar la chica se postergó.** Se explicó el approach
  (SVG con capas nombradas, pivotes en las articulaciones, overlap en las juntas) y ella
  decidió dejarlo para otro momento; manda el SVG partido cuando vuelva.
- **Pregunta abierta al cerrar la sesión:** si el cielo por horario se hace ahora o en la
  Fase 4. Sin responder todavía.

**Límites del agente que conviene registrar**

- **Ninguno de los tres fixes se vio corriendo.** El teclado y la aparición se verificaron
  leyendo el código y con `node --check` (sintaxis); el posicionamiento se calculó contra el
  SVG de la vereda (suelo en y=876 de 1080). La confirmación visual es de Mica.
- El bug 11 (hover de cartelera escondida) lo encontró el agente al revisar su propio fix
  del 10 — no Mica, ni un navegador.
- La respuesta sobre el cielo fue verificada por grep en `src/`, no asumida de memoria: no
  hay lógica de hora en ninguna parte.

---

## Fase 1 (continuación) — Los carteles que nunca se vieron y el feedback del 8 de octubre de 2026

**Para qué se usó IA**

Diagnosticar por qué Mica no veía las carteleras verdes ("aparecen un rato al recargar y
desaparecen") y sus 404 de stickers; aplicar su feedback visual (preview reemplaza al
afiche, colectivo fuera, edificios del obelisco, chica más atrás y más grande, sin marcos
en el cartel).

**Qué generó el agente**

- Fix del bug 12: `* 1px` en los `calc()` de `left` y `width` de `Cartelera.astro` —
  eran número × número, inválidos, y las carteleras colapsaban a ancho 0 (invisible
  desde que existen).
- Fallback sin-JS movido a `<noscript><style is:inline>` (fin del flash) y `revelar()`
  sin gate de movimiento (la cartelera en pantalla se ve al abrir).
- `STICKERS = []` (la carpeta siempre estuvo vacía; los 404 eran de toda la vida).
- `box-shadow` y anillo blanco de la cartelera activa quitados (marcos rectangulares).
- `OBJETOS` con edificios trasero/delantero en la zona del obelisco (placeholders).
- Ajustes en `config.js`: chica x 0.24 y alto 300; `--cielo-dia` en tokens.
- Verificación por datos: Edge headless + conteo de píxeles por color (466 → 2621 verdes)
  y `getComputedStyle` desde la propia página para confirmar el ancho 0.

**Revisó / adaptó / descartó Mica** *(lo completa ella)*

- [ ] Revisado
- [ ] Adaptado
- [ ] Descartado

**Problemas, errores o límites detectados por Mica**

- Los carteles verdes nunca se vieron (bug 12) y lo reportó dos veces con precisión:
  "aparecen al recargar y desaparecen".
- 404 de `/stickers/*.svg` en consola.
- Marcos rectangulares alrededor de su SVG ("no se aplica a la forma del cartel").
- La chica "muy chica" y luego "el tamaño está bien" (380 descartado, quedó 300).

**Decisiones tomadas por Mica**

- La preview del proyecto **reemplaza** al afiche negro (hueco transparente).
- El colectivo sale de la escena.
- Edificios detrás y delante del obelisco, nunca en la zona del cartel de calles.
- `foto-vertical.png` borrada del repo (no sabía qué era).
- Sin sombra ni anillo en el cartel; la activa prende sólo con scale.
- Reemplazó dos veces `CartelVerde.svg` (versión final: sin el rect del afiche).

**Límites del agente que conviene registrar**

- **El diagnóstico salió de medir, no de mirar**: screenshots de Edge headless + conteo de
  píxeles por color y valores computados leídos con un script inline. Tres capturas dieron
  falsos negativos por medir la zona equivocada (la escala real no es la del `--window-size`).
- El fallback sin JS quedó **sin probar en navegador**: `--headless` con scripts apagados
  no genera screenshots en este entorno.
- El hueco del afiche (`.cartelera__afiche`) quedó con las medidas del rect `#0b100a`
  que Mica eliminó de su SVG — re-pensar cuando entre la Fase 2.
- `npm run build` sin correr después de todo el 8/10 (regla de sesión).