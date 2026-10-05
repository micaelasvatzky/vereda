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