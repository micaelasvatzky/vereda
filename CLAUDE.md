# VEREDA â€” reglas del proyecto

Este repo es el TP Final de ProgramaciÃ³n Multimedial IV (UMAI). Entregable: un portfolio
web personal e interactivo. Defensa individual: hay que explicar el cÃ³digo y hacer una
modificaciÃ³n menor en vivo.

## Concepto

Caminata lateral por una vereda de Buenos Aires. Una chica camina por la vereda y va
pasando por carteleras verdes de calle (elemento icÃ³nico de la ciudad). Cada cartelera es un
proyecto: **la captura de su web va en el hueco transparente del marco verde** (medido del
SVG, no a ojo), la preview entera es el link a la demo en Vercel y el botÃ³n de GitHub lleva
al repositorio. El fondo es el cielo, que cambia con la hora real de Buenos Aires. Se
avanza con las flechas del teclado o con scroll.

## Estado

**Fase 1 (motor del escenario) â€” abierta.** Mica vio la escena el 7/10: **parallax
aprobado**; reportÃ³ flechas raras y afiches fuera de la vereda â†’ bugs 9-11 arreglados el
mismo dÃ­a. El 8/10 reportÃ³ que **las carteleras nunca se veÃ­an**: era el bug 12 (`calc()`
invÃ¡lido â†’ ancho 0), ya arreglado y verificado por conteo de pÃ­xeles. **El build vuelve a
pasar** (corrido el 21/10, despuÃ©s de todo lo del 8/10). Lo que falta es **la confirmaciÃ³n
visual de Mica** y **medir fps**.

Pendientes que bloquean o atrasan:

- **Confirmar en navegador (nunca visto):** los fixes del 7/10 (flechas = bug 9, carteleras
  sobre la vereda = bug 10, apariciÃ³n progresiva) y los del 8/10 (carteleras visibles al
  abrir, sin flash, chica en x 0.24 / alto 340, cartel sin marco). Detalle en
  `docs/bitacora.md`.
- **Medir fps en un celular de gama media.** Es el criterio de cierre de la fase.
- **Pregunta abierta sin responder (desde el 7/10):** si el cielo por horario de Buenos
  Aires se hace ahora (adelantar la Fase 4) o en su fase. Hoy el cielo es fijo
  `--cielo-dia`; `cielo.js` no existe.
- **Postergado a pedido de Mica:** rig de partes separadas para animar la chica (SVG con
  capas nombradas y pivotes en las articulaciones). Ella manda el SVG partido cuando vuelva.
- **Falta una foto del cartel verde icÃ³nico de Buenos Aires.** Dos bÃºsquedas web no dieron
  una forma documentada y no se inventÃ³. Hoy el marco es el SVG que dibujÃ³ Mica
  (`public/img/CartelVerde.svg`), asÃ­ que la forma ya no estÃ¡ bloqueada: lo que falta es
  decidir si hace falta mÃ¡s referencia.
- Las capas de fondo siguen siendo SVG placeholder; las cuatro ilustraciones de la chica ya
  estÃ¡n integradas en `public/caminante/`.
- El repo es local: la push a GitHub la hace Mica (los commits de las fases 1 y 2 sin subir al 22/10; lo cuenta `git rev-list --count origin/main..HEAD`).

**Fase 2 (21/10) â€” las previews en los carteles â€” abierta.** Mica pasÃ³ los links de los
cinco proyectos y dijo: *"las previews van en el hueco transparente de la imagen, como si
fueran el cartel"*, con Vercel como link prioritario y GitHub en un botÃ³n aparte. Ya estÃ¡:
la colecciÃ³n `proyectos` (`src/content/proyectos/*.md`), la captura en el hueco medido del
cartel, el link a Vercel y el botÃ³n de GitHub. Mica la vio y pidiÃ³ un solo cambio: sacar
la chapa con el nombre del proyecto (hecho). Lo que falta:

- **Las capturas del repo son provisionales** (las sacÃ³ el agente de las URLs de Vercel).
  Mica tiene que subir las suyas: se reemplazan los archivos de `src/assets/proyectos/`.
- **Las descripciones de los proyectos** son `TODO(Mica)` en el cuerpo de cada `.md`.
- **El `<dialog>` con la descripciÃ³n** quedÃ³ para despuÃ©s: falta definir con Mica cuÃ¡ndo se
  abre.
- **La consigna original no estÃ¡ en el repo** (ni en el escritorio, ni en la web). Hay que
  pedirle el PDF o el texto para confirmar el alcance del requisito de tomar datos de una
  API.

## Reglas no negociables

1. **AstroJS es la Ãºnica tecnologÃ­a obligatoria.** Todo lo demÃ¡s se puede elegir, pero en
   este proyecto no se usan frameworks de UI, ni Tailwind, ni librerÃ­as de animaciÃ³n
   (GSAP, Framer, Lenis, etc.) salvo que Mica lo pida explÃ­citamente. CSS plano con
   variables, JavaScript plano en mÃ³dulos ES. TypeScript sÃ³lo en `src/content.config.ts`.
2. **Dependencias mÃ­nimas.** Permitidas: `astro` y `@fontsource*`. Cualquier otra se consulta
   antes de agregar.
3. **Trabajar por fases** (`docs/bitacora.md` describe el avance). Al cerrar cada fase:
   `npm run build` pasa, commits chicos con sentido, se actualizan `docs/bitacora.md` y
   `docs/uso-de-ia.md`, se explica a Mica en lenguaje simple quÃ© se hizo y por quÃ©, y se
   frena esperando su OK.
4. **CÃ³digo explicable.** MÃ³dulos chicos, nombres claros, comentarios en espaÃ±ol sÃ³lo donde
   la intenciÃ³n no sea obvia. Sin abstracciones prematuras.
5. **Los textos los escribe Mica.** No inventar contenido, anÃ©cdotas ni datos sobre ella.
   Dejar placeholders `TODO(Mica)` visibles. Antes de entregar,
   `grep -R "TODO(Mica)" src` tiene que dar vacÃ­o.
6. **Verificar en la documentaciÃ³n oficial** todo lo que dependa de versiones. No asumir de
   memoria.
7. **Honestidad.** Si algo no funciona o falta, escribirlo en `docs/bitacora.md` y en el
   README. No maquillar.
8. **Todo lo ajustable vive en `src/config.js` y `src/styles/tokens.css`.** La defensa
   incluye una modificaciÃ³n en vivo, y tocar un nÃºmero centralizado es la forma mÃ¡s segura
   de que Mica pueda hacerla.
9. **Nunca** `git push --force`, nunca reescribir historial, nunca borrar archivos de
   `docs/`.
10. **La push a GitHub la hace Mica.** El agente la guÃ­a con los comandos.

## Comandos de sesiÃ³n

- `iniciar sesion` â†’ cargar la memoria del proyecto con engram y recuperar el estado.
- `cerrar sesion` â†’ guardar todo en engram en condiciones para seguir la prÃ³xima sesiÃ³n:
  actualizar `docs/bitacora.md`, `docs/uso-de-ia.md` y `docs/pruebas.md`, commitear, y llamar
  a `mem_save` + `mem_session_summary`.

## Idioma

DocumentaciÃ³n, comentarios y commits en espaÃ±ol rioplatense informal. Nombres de
componentes y archivos de dominio en espaÃ±ol (`Escenario`, `Cartelera`, `Afiche`);
nombres tÃ©cnicos genÃ©ricos en inglÃ©s.

## Referencia tÃ©cnica verificada

- Astro **7.3.5**. Node requerido `>=22.12.0`.
- El schema de Content Collections va en **`src/content.config.ts`** (raÃ­z de `src`).
- Zod se importa de **`astro/zod`**, no de `zod`.
- `glob` loader: `glob({ base: './src/content/proyectos', pattern: '**/*.md' })`.
- Markdown: `const { Content } = await render(entry)` â†’ `<Content />`.
- Open-Meteo no pide clave. Tabla WMO de `weather_code` verificada: los cÃ³digos de nieve
  son `71â€“77` y `85â€“86`, y hay que mapearlos explÃ­citamente (si no caen en el default
  "nublado").
- **`npm run check`** verifica que todos los archivos de texto del repo estÃ©n en UTF-8. Un
  archivo en Windows-1252 (ANSI) no rompe nada visible â€” Git no avisa y el build pasa â€”
  pero muestra rombos con signo de pregunta en vez de las tildes. Ya pasÃ³ una vez.

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
