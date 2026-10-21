# Vereda

**TODO(Mica)**: nombre final del sitio, descripción de la propuesta y público al que se
dirige. Reemplazar este README completo en la Fase 7.

Un portfolio web personal e interactivo. El visitante camina por una vereda de Buenos
Aires y va pasando por carteleras verdes de calle. Cada cartelera es un proyecto: la
captura de su web va en el hueco del cartel verde, el cartel lleva a la demo en Vercel y
el botón de GitHub, al repositorio.

## Estado del proyecto

Fase 2 (las previews en los carteles) — en construcción. La Fase 1 (el motor del
escenario) tiene el parallax y los fixes de la vista de Mica, pero falta medir los fps en
un celular. El detalle de cada fase está en `docs/bitacora.md`.

## Instalación

```bash
npm install
npm run dev
```

El sitio corre en `http://localhost:4321`.

## Build

```bash
npm run build
npm run preview
```

La salida estática queda en `dist/`.

## Tecnologías

- **AstroJS** — única tecnología obligatoria de la consigna.
- **CSS plano** con variables custom properties (`src/styles/tokens.css`).
- **JavaScript plano** en módulos ES (`src/scripts/`).
- Sin framework de UI, sin Tailwind, sin librería de animación.

La justificación completa de estas decisiones está en `docs/decisiones.md`.

## Estructura

```
src/
├─ config.js          ← toda la parametrización ajustable
├─ content.config.ts  ← schema de la colección de proyectos
├─ content/proyectos/ ← un .md por cartelera (título, orden, links, preview)
├─ assets/proyectos/  ← las capturas de las previews (Astro las sirve en WebP)
├─ components/        ← Escenario, Cartelera, Afiche, ClimaCiudad, LineaParadas
├─ layouts/           ← Vereda.astro
├─ pages/             ← index, lista, 404
├─ scripts/           ← escenario, clima, cielo, afiche
└─ styles/            ← tokens.css, global.css
docs/                 ← bitácora, decisiones, pruebas, uso de IA, defensa
public/               ← capas/, stickers/, img/
```

## Los proyectos

Cada cartelera sale de un `.md` en `src/content/proyectos/`. Para agregar un proyecto se
agrega el archivo y la captura en `src/assets/proyectos/`; para sacarlo, se borra el
archivo. El orden en la vereda es el campo `orden` del frontmatter, y el motor arma solo
el recorrido.

## Fuente dinámica

Open-Meteo (clima y salida/puesta del sol de Buenos Aires). Se documenta completo en la
Fase 4.

## Licencia y créditos

**TODO(Mica)**: créditos de Open-Meteo, licencias de las tipografías y de las
ilustraciones.