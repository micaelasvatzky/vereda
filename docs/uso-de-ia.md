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