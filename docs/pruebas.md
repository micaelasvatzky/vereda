# Pruebas

Matriz de pantallas, navegadores, qué se probó, resultado y correcciones.

> Esto se completa a medida que avanzan las fases. Hoy hay entradas de las Fases 0 y 1
> (los resultados de la Fase 1 siguen pendientes de que Mica abra la página).

## Matriz de pantallas

Se prueban como mínimo estos tamaños, en vertical y horizontal los de celular:

| Ancho × alto | Tipo |
| --- | --- |
| 360 × 800 | Celular chico |
| 390 × 844 | Celular |
| 768 × 1024 | Tablet |
| 1280 × 720 | Notebook |
| 1920 × 1080 | Escritorio |

## Qué hay que probar

- **Teclado:** recorrer todo el sitio sólo con flechas, `PageUp`/`PageDown`, `Home`, `End`,
  `Tab`, `Enter`, `Esc`. Abrir y cerrar afiches.
- **Sin JavaScript:** el escenario debe caer a un contenedor con scroll horizontal y los
  afiches tienen que ser legibles.
- **`prefers-reduced-motion`:** sin transiciones largas, sin colectivo animado, sin `smooth`.
- **API caída:** bloquear el request a `api.open-meteo.com` en DevTools y verificar que el
  sitio sigue funcionando.
- **Cache vencida:** dejar un dato viejo en `localStorage` y cargar. Tiene que usarlo igual
  aunque esté vencido.
- **Resize y rotación de celular:** girar el teléfono y comprobar que la posición relativa
  del recorrido se conserva.

## Resultados

### Fase 0 — Andamiaje

| Prueba | Resultado |
| --- | --- |
| `npm run build` | OK, 1 página |
| `npm run dev` | OK |
| Sin JavaScript | **Pendiente** (la página actual no tiene nada que testear todavía) |
| Teclado | **Pendiente** |

### Fase 1 — Motor del escenario

Verificado por el agente (sin poder ver la página):

| Prueba | Resultado |
| --- | --- |
| `npm run build` | OK |
| HTML servido en `localhost:4321` | 1 riel, 1 escenario, 5 carteleras con índice, 1 chica, 1 capa de mundo, 4 capas de fondo |

**Todo lo demás quedó pendiente de que Mica abra la página.** Le comprobamos:

| Prueba | Resultado |
| --- | --- |
| ¿Se ve la chica? | **Pendiente** |
| ¿Camina al scrollear? | **Pendiente** |
| ¿La caminata se ve suave, sin saltos de pose? | **Pendiente** — el agente verificó los keyframes a mano, sin verlos |
| ¿Al parar el scroll frena la chica (no sigue caminando parada)? | **Pendiente** — el freno es por timer de 140 ms |
| Hover en el marco verde → la chica mira el cartel | **Pendiente** |
| ¿La pose quieta se ve bien (quedó `camina-1`)? | **Pendiente** — decisión del agente, ver bitácora |
| ¿El parallax se nota (fondo más lento que la vereda)? | **OK** — probado por Mica el 7/10: "el parallax va bien" |
| ¿La cartelera activa se prende? | **Pendiente** |
| Flechas ← →, Home, End | **Falló lo probado por Mica** (bug 9: entre paradas las flechas se desorientaban). **Arreglado, falta re-ver** en navegador |
| ¿Las carteleras están plantadas sobre la vereda (misma línea que la chica)? | **Falló lo probado por Mica** (bug 10: base en el borde inferior de la pantalla). **Arreglado, falta re-ver** |
| ¿Las carteleras aparecen al caminar, no todas juntas al principio? | **Falló lo reportado por Mica**. **Arreglado** (aparición progresiva con gate de movimiento), **falta re-ver** |
| ¿El cielo cambia con el horario de Buenos Aires? | **No existe todavía** — `cielo.js` es Fase 4; hoy el cielo es fijo `--cielo-dia`. Decisión pendiente de Mica: ¿ahora o en su fase? |
| Sin JavaScript: escenario estático y chica oculta | **Pendiente** — había un selector muerto, corregido sin verlo en navegador |
| Rotar el celular / cambiar el tamaño | **Pendiente** |
| Fps en un celular de gama media | **Pendiente** — es el criterio de cierre de la fase |
| `npm run build` después de integrar las ilustraciones y de los ajustes del 7/10 | **OK** — corrido el 21/10: 1 página, sin errores |

### Fase 1 (continuación) — 8 de octubre de 2026: carteleras, marcos y ajustes

Verificado por el agente con Edge headless + conteo de píxeles (no puede ver la pantalla;
mide colores en screenshots):

| Prueba | Resultado |
| --- | --- |
| ¿El SVG CartelVerde renderiza? | **OK** — 7079 píxeles #345238 al abrirlo directo; tras el fix del calc, 2621 en la escena (antes 466 = ruido) |
| ¿La primera cartelera se ve al abrir sin scrollear? | **OK por píxeles** — `revelar()` ya no exige desplazamiento > 0 |
| ¿El HTML/CSS servido es correcto? | **OK** — `data-motor="riel"` en `<html>`, `data-visible="true"` en la article, reglas compiladas presentes |
| ¿Los 404 de `/stickers/*.svg`? | **Causa encontrada**: `public/stickers/` siempre vacía. `STICKERS = []` — sin 404 |
| ¿Los marcos rectangulares del cartel? | **Quitados** (box-shadow + anillo blanco del activo), pedido de Mica |
| ¿La chica en x 0.24 / alto 300? | **OK** — `CAMINANTE` en config.js, verificado con import de node |

**Pendiente de Mica (confirmación visual):**

| Prueba | Resultado |
| --- | --- |
| ¿Se ven las carteleras al abrir y al caminar? | **Pendiente** — arreglado el bug 12 (calc con ancho 0), falta su vista |
| ¿El flash "aparecen y desaparecen" desapareció? | **Pendiente** — fallback movido a `<noscript>` |
| ¿La chica se ve bien en su nueva posición/tamaño? | **Pendiente** — 0.24 / 300 |
| ¿El SVG nuevo de la cartelera se ve limpio, sin marco? | **Pendiente** |
| Fallback sin JavaScript (carteleras apiladas) | **Sin probar en navegador** — `--headless` con scripts apagados no genera screenshots; verificado por selector y especificidad |
| `npm run build` después de todo el 8/10 | **OK** — corrido el 21/10: 1 página, 4.13 s, sin errores |
| ¿`docs/pruebas.md` se lee bien? | **OK** — la sección del 8/10 estaba en Windows-1252 (codificación mixta) y las vocales acentuadas se veían como el rombo con signo de pregunta (U+FFFD). Reparada a UTF-8 el 21/10 |
| `npm run check` (encoding de todo el repo) | **OK** — 0 archivos corruptos. Probado en negativo: con un archivo CP1252 devuelve código 1 y lo nombra |

### Fase 1 (continuación) — 21 de octubre de 2026: verificación y tamaño

| Prueba | Resultado |
| --- | --- |
| `npm run build` sobre el estado del repo | **OK** — 1 página, 4.13 s, sin errores (los cambios del 8/10 nunca se habían compilado) |
| `npm run check` | **OK** — 0 archivos corruptos |
| ¿La chica se ve bien con el tamaño nuevo (340)? | **Pendiente** — pedido de Mica el 21/10. Paso medido de 300 a 340 px de referencia; ver bitácora |
