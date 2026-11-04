# Ilustraciones del cielo

Se generaron con la herramienta integrada de `imagegen`, con fondo transparente,
el 04/11/2026. Se usó como referencia de estilo
`docs/capturas/cartel-mobile-2026-11-04.png`, sin modificar las ilustraciones originales.
Mica pidió elementos que acompañaran el clima y mantuvieran la estética de la escena.

Archivos finales reemplazables:

- `src/assets/clima/sol.png`
- `src/assets/clima/luna.png`
- `src/assets/clima/nube.png`

Astro genera versiones WebP para la web. Las variantes de nube oscura se resuelven
con filtros CSS; no son ilustraciones distintas. No se anima su desplazamiento.

## Prompt compartido

```text
Use case: illustration-story. Asset type: one transparent-background sky illustration for the existing Buenos Aires illustrated portfolio. Input image is STYLE REFERENCE ONLY: match the thin irregular dark brown pencil/ink contours, restrained muted watercolor washes, subtle paper grain INSIDE the object, and handcrafted storybook drawing of the buildings and character. Do not draw the reference scene, buildings, person, signs or UI. No text, no face, no emoji, no photorealism, no plastic 3D, no flat vector clipart. A single isolated object centered, all edges comfortably inside frame, truly transparent outside object; no rectangular paper background, no drop shadow.
```

## Asunto agregado a cada llamada

Sol:

```text
Subject: a small hand-drawn warm pale ochre sun disk, slightly irregular circular outline, with short fine uneven hand-inked rays all around. Dusty antique gold and cream washes, subtle graphite hatching. Simple elegant sun that belongs over the illustrated Buenos Aires houses. Square image.
```

Luna:

```text
Subject: one slender crescent moon open to the right, warm ivory with muted pale gold edging, delicate uneven charcoal-brown ink outline and very subtle etched pencil shading. No stars, no face. Quiet illustrated night sky prop. Square image.
```

Nube:

```text
Subject: one horizontally elongated cumulus cloud, softly uneven lobes, restrained off-white/cream and cool gray watercolor washes, a few delicate gray-brown sketchy pencil contours and sparse hatching along its underside. Airy and organic but readable, no sun, no raindrops, no other objects. Landscape 3:2 image, cloud fills width with transparent margin. It will be reused as a fair-weather cloud and darkened in CSS for storms, so retain fine texture.
```

## Ajustes de Mica

Sol más arriba, más a la derecha y al 78% de opacidad. Todos los elementos del cielo
quedan detrás del Obelisco y de las capas de edificios. Posición y opacidad se ajustan
desde `src/styles/tokens.css`.
