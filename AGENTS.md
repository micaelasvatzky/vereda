# VEREDA — reglas del proyecto

Este repo es el TP Final de Programación Multimedial IV (UMAI). Entregable: un portfolio
web personal e interactivo. Defensa individual: hay que explicar el código y hacer una
modificación menor en vivo.

## Concepto

Caminata lateral por una vereda de Buenos Aires. Una chica camina por la vereda y va
pasando por carteleras verdes de calle (elemento icónico de la ciudad). Cada cartelera es un
proyecto: **la captura de su web va en el hueco transparente del marco verde** (medido del
SVG, no a ojo), la preview entera es el link a la demo en Vercel y el botón de GitHub lleva
al repositorio. El fondo es el cielo, que cambia con la hora real de Buenos Aires. Se
avanza con las flechas del teclado o con scroll.

## Estado
**Actualización 29/10/2026:** la consigna completa está en `examen-final-portfolio.txt`.
Open-Meteo sirve para el requisito de API externa, pero todavía falta integrarla.
Las cinco descripciones, años y tecnologías de Mica ya están en los Markdown y se ven
con hover/foco sobre cada cartel (fondo verde al 88%). `Edificios.svg` es el fondo
continuo detrás del Obelisco, al 80%; se retiraron los edificios/árboles placeholder.
La chica avanza de x 0.24 a 0.9 y gira al volver. Las flechas son continuas al sostenerlas.
Mica reportó tirones: se quitaron lecturas de geometría por frame y se usa transform;
falta medir si la mejora alcanza. Bienvenida aprobada: pequeña, serif, sin fondo, fija
arriba a la izquierda durante todo el recorrido. Pendientes: mobile/fps, capturas propias,
API y completar README/créditos para entrega. El detalle histórico siguiente puede
referirse a pendientes que esta actualización ya resuelve.

**Fase 1 (motor del escenario) — abierta.** Mica vio la escena el 7/10: **parallax
aprobado**; reportó flechas raras y afiches fuera de la vereda → bugs 9-11 arreglados el
mismo día. El 8/10 reportó que **las carteleras nunca se veían**: era el bug 12 (`calc()`
inválido → ancho 0), ya arreglado y verificado por conteo de píxeles. **El build vuelve a
pasar** (corrido el 21/10, después de todo lo del 8/10). Lo que falta es **la confirmación
visual de Mica** y **medir fps**.

Pendientes que bloquean o atrasan:

- **Confirmar en navegador (nunca visto):** los fixes del 7/10 (flechas = bug 9, carteleras
  sobre la vereda = bug 10, aparición progresiva) y los del 8/10 (carteleras visibles al
  abrir, sin flash, chica en x 0.24 / alto 340, cartel sin marco). Detalle en
  `docs/bitacora.md`.
- **Medir fps en un celular de gama media.** Es el criterio de cierre de la fase.
- **Pregunta abierta sin responder (desde el 7/10):** si el cielo por horario de Buenos
  Aires se hace ahora (adelantar la Fase 4) o en su fase. Hoy el cielo es fijo
  `--cielo-dia`; `cielo.js` no existe.
- **Postergado a pedido de Mica:** rig de partes separadas para animar la chica (SVG con
  capas nombradas y pivotes en las articulaciones). Ella manda el SVG partido cuando vuelva.
- **Entran los links de los proyectos** (Vercel y GitHub) y el orden en que van: es la
  entrada de la Fase 2, con la preview de cada proyecto en el centro del cartel.
- **Falta una foto del cartel verde icónico de Buenos Aires.** Dos búsquedas web no dieron
  una forma documentada y no se inventó. Hoy el marco es el SVG que dibujó Mica
  (`public/img/CartelVerde.svg`), así que la forma ya no está bloqueada: lo que falta es
  decidir si hace falta más referencia.
- Las capas de fondo siguen siendo SVG placeholder; las cuatro ilustraciones de la chica ya
  están integradas en `public/caminante/`.
- **El repo vive en GitHub** (`https://github.com/micaelasvatzky/vereda.git`, rama `main`) y
  al 22/10 quedó sincronizado: las fases 1 y 2 están subidas. Para saber si falta subir algo:
  `git rev-list --count origin/main..HEAD`.

**Fase 2 (21/10) — las previews en los carteles — abierta.** Mica pasó los links de los
cinco proyectos y dijo: *"las previews van en el hueco transparente de la imagen, como si
fueran el cartel"*, con Vercel como link prioritario y GitHub en un botón aparte. Ya está:
la colección `proyectos` (`src/content/proyectos/*.md`), la captura en el hueco medido del
cartel, el link a Vercel y el botón de GitHub. Mica la vio y pidió un solo cambio: sacar la
chapa con el nombre del proyecto (hecho). Lo que falta:

- **Las capturas del repo son provisionales** (las sacó el agente de las URLs de Vercel).
  Mica tiene que subir las suyas: se reemplazan los archivos de `src/assets/proyectos/`.
- **Las descripciones de los proyectos** son `TODO(Mica)` en el cuerpo de cada `.md`.
- **El `<dialog>` con la descripción** quedó para después: falta definir con Mica cuándo se
  abre.
- **La consigna original no está en el repo** (ni en el escritorio, ni en la web). Hay que
  pedirle el PDF o el texto para confirmar el alcance del requisito de tomar datos de una
  API.

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
10. **La push la hace el agente al cerrar la sesión, pero SIEMPRE con confirmación previa de
    Mica.** Antes de subir, el agente muestra qué va a subir y pregunta; recién con el OK
    corre `git push origin main`. Sin OK, no se pushea. Nunca `--force`. Lo pidió Mica el
    22/10: *"a partir de ahora los push los hacés vos antes de terminar la sesión, primero
    me preguntás así te confirmo"*.

## Comandos de sesión

- `iniciar sesion` → cargar la memoria del proyecto con engram y recuperar el estado.
- `cerrar sesion` → guardar todo en engram en condiciones para seguir la próxima sesión:
  actualizar `docs/bitacora.md`, `docs/uso-de-ia.md` y `docs/pruebas.md`, commitear,
  **mostrar qué falta subir y preguntar si se pushea**; con el OK, `git push origin main`;
  y al final llamar a `mem_save` + `mem_session_summary`. La sesión no se cierra con
  commits sin subir: o se suben, o queda anotado en la bitácora que Mica dijo que no.

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
- **`npm run check`** verifica que todos los archivos de texto del repo estén en UTF-8. Un
  archivo en Windows-1252 (ANSI) no rompe nada visible — Git no avisa y el build pasa —
  pero muestra rombos con signo de pregunta en vez de las tildes. Ya pasó una vez.
- **Mojibake doble.** `sesión` guardado como `sesiÃ³n` es UTF-8 VÁLIDO: el decoder no lo ve y
  el texto queda roto igual. Desde el 22/10 el check lo detecta en un segundo control (saltea
  el código inline, para poder documentar el patrón sin falsos positivos). Pasó el 22/10 con
  `AGENTS.md` y `CLAUDE.md`: se recuperó desde el commit sano `22f1a04`. **Nunca editar texto
  con acentos usando `Get-Content | Set-Content` en PowerShell 5.1**: sin `-Encoding` lee como
  ANSI y corrompe el archivo. Usar el editor de archivos, o
  `[System.IO.File]::ReadAllText/WriteAllText` con `UTF8Encoding($false)`. El daño no siempre
  es reversible: si aparecen `?` o U+FFFD, el carácter se perdió y hay que volver a la versión
  de git.

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
