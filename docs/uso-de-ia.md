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