# Pruebas

Matriz de pantallas, navegadores, qué se probó, resultado y correcciones.

> Esto se completa a medida que avanzan las fases. Hoy sólo hay entradas de la Fase 0.

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
| ¿El parallax se nota (fondo más lento que la vereda)? | **Pendiente** |
| ¿La cartelera activa se prende? | **Pendiente** |
| Flechas ← →, Home, End | **Pendiente** |
| Rotar el celular / cambiar el tamaño | **Pendiente** |
| Fps en un celular de gama media | **Pendiente** — es el criterio de cierre de la fase |