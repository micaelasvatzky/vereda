# VEREDA — reglas del proyecto

Este repo es el TP Final de Programación Multimedial IV (UMAI). Entregable: un portfolio
web personal e interactivo. Defensa individual: hay que explicar el código y hacer una
modificación menor en vivo.

## Concepto

Caminata lateral por una vereda de Buenos Aires. Una chica camina por la vereda y va
pasando por carteleras verdes de calle (elemento icónico de la ciudad). Cada cartelera es un
proyecto y el afiche negro que lleva puesto es la preview del proyecto. El fondo es el
cielo, que cambia con la hora real de Buenos Aires. Se avanza con las flechas del teclado o
con scroll.

## Estado

**Fase 1 (motor del escenario) — abierta.** Mica vio la escena el 7/10: **parallax
aprobado**; reportó flechas raras y afiches fuera de la vereda → bugs 9-11 arreglados el
mismo día, **pendientes de su confirmación visual**. El build pasa, pero el último OK es
anterior a la integración de ilustraciones y a esos arreglos: hay que correrlo antes de
cerrar la fase. Falta también medir fps y que Mica confirme chica, caminata, hover y
cartelera activa.

Pendientes que bloquean o atrasan:

- **Confirmar en navegador los fixes del 7/10 (tarde):** flechas (bug 9), carteleras sobre
  la vereda (bug 10) y aparición progresiva. Detalle en `docs/bitacora.md`.
- **Pregunta abierta sin responder:** si el cielo por horario de Buenos Aires se hace ahora
  (adelantar la Fase 4) o en su fase. Hoy el cielo es fijo `--cielo-dia`; `cielo.js` no existe.
- **Postergado a pedido de Mica:** rig de partes separadas para animar la chica (SVG con
  capas nombradas y pivotes en las articulaciones). Ella manda el SVG partido cuando vuelva.
- **Falta una foto del cartel verde icónico de Buenos Aires.** Dos búsquedas web no dieron
  una forma documentada y no se inventó. El `Cartelera.astro` usa un rectángulo con sombra
  como placeholder.
- Las capas de fondo siguen siendo SVG placeholder; las cuatro ilustraciones de la chica ya
  están integradas en `public/caminante/`.
- El repo es local: la push a GitHub la hace Mica (**4 commits sin subir** al cerrar el 7/10).

## Reglas no negociables

1. **AstroJS es la única tecnología obligatoria.** Todo lo demás se puede elegir, pero en
   este proyecto no se usan frameworks de UI, ni Tailwind, ni librerías de animación
   (GSAP, Framer, Lenis, etc.) salvo que Mica lo pida explícitamente. CSS plano con
   variables, JavaScript plano en módulos ES. TypeScript sólo en `src/content.config.ts`.
2. **Dependencias mínimas.** Permitidas: `astro` y `@fontsource*`. Cualquier otra se consulta
   antes de agregar.
3. **Trabajar por fases** (`docs/bitacora.md` describe el avance). Al cerrar cada fase:
   `npm run build` pasa, commits chicos con sentido, se actualizan `docs/bitacora.md` y
   `docs/uso-de-ia.md`, se explica a Mica en lenguaje simple qué se hizo y por qué, y se
   frena esperando su OK.
4. **Código explicable.** Módulos chicos, nombres claros, comentarios en español sólo donde
   la intención no sea obvia. Sin abstracciones prematuras.
5. **Los textos los escribe Mica.** No inventar contenido, anécdotas ni datos sobre ella.
   Dejar placeholders `TODO(Mica)` visibles. Antes de entregar,
   `grep -R "TODO(Mica)" src` tiene que dar vacío.
6. **Verificar en la documentación oficial** todo lo que dependa de versiones. No asumir de
   memoria.
7. **Honestidad.** Si algo no funciona o falta, escribirlo en `docs/bitacora.md` y en el
   README. No maquillar.
8. **Todo lo ajustable vive en `src/config.js` y `src/styles/tokens.css`.** La defensa
   incluye una modificación en vivo, y tocar un número centralizado es la forma más segura
   de que Mica pueda hacerla.
9. **Nunca** `git push --force`, nunca reescribir historial, nunca borrar archivos de
   `docs/`.
10. **LaPush a GitHub la hace Mica.** El agente la guía con los comandos.

## Comandos de sesión

- `iniciar sesion` → cargar la memoria del proyecto con engram y recuperar el estado.
- `cerrar sesion` → guardar todo en engram en condiciones para seguir la próxima sesión:
  actualizar `docs/bitacora.md`, `docs/uso-de-ia.md` y `docs/pruebas.md`, commitear, y llamar
  a `mem_save` + `mem_session_summary`.

## Idioma

Documentación, comentarios y commits en español rioplatense informal. Nombres de
componentes y archivos de dominio en español (`Escenario`, `Cartelera`, `Afiche`);
nombres técnicos genéricos en inglés.

## Referencia técnica verificada

- Astro **7.3.5**. Node requerido `>=22.12.0`.
- El schema de Content Collections va en **`src/content.config.ts`** (raíz de `src`).
- Zod se importa de **`astro/zod`**, no de `zod`.
- `glob` loader: `glob({ base: './src/content/proyectos', pattern: '**/*.md' })`.
- Markdown: `const { Content } = await render(entry)` → `<Content />`.
- Open-Meteo no pide clave. Tabla WMO de `weather_code` verificada: los códigos de nieve
  son `71–77` y `85–86`, y hay que mapearlos explícitamente (si no caen en el default
  "nublado").

---

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
