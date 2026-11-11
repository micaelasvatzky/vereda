# Bitácora de Vereda

## 1. Primeras pruebas del recorrido — 05/10

En las primeras pruebas, los saltos entre carteles no llevaban al lugar correcto y las articulaciones de la chica giraban desde un punto que no correspondía. Se corrigieron los destinos del recorrido y los puntos de giro.

También había medidas repetidas en distintos archivos. Se unificaron en la configuración para poder ajustar la escena desde un solo lugar.

## 2. Animación, navegación y posición de los carteles — 07/10

Se incorporaron las ilustraciones de la chica y se armó una caminata alternando tres poses. Los cambios entre imágenes se veían bruscos y, al superponerlas, se transparentaba parte del fondo. Se ajustaron las transiciones para suavizar el movimiento.

La animación también seguía funcionando después de dejar de hacer scroll. Se agregó un freno para que la chica se detuviera al parar el recorrido.

Al probar la escena, las flechas a veces hacían volver hacia atrás en lugar de avanzar. Los carteles quedaban demasiado abajo y aparecían todos juntos al principio.

Se corrigió el cálculo de las paradas, se acomodaron los carteles sobre la vereda y se cambió su aparición para que fueran entrando durante el recorrido. El efecto de profundidad del fondo se mantuvo.

## 3. Carteles que desaparecían — 08/10

Los carteles aparecían al recargar la página, pero después desaparecían. Se encontró un error en el cálculo de su ancho que hacía que quedaran en cero. Se corrigió y se ajustó la carga inicial para evitar ese cambio al abrir la web.

También se quitaron los marcos rectangulares que se habían agregado alrededor de la ilustración y las referencias a stickers que todavía no existían. Se ajustaron el tamaño y la posición de la chica.

## 4. Capturas y problemas con las tildes — 21/10

El espacio previsto para las capturas no coincidía con el dibujo actualizado del cartel. Se volvieron a medir sus proporciones y se ubicó cada captura en el hueco transparente del centro.

Se incorporaron los cinco proyectos, con la captura como link a Vercel y un botón aparte para GitHub. Se quitó una etiqueta con el nombre del proyecto que tapaba parte de la imagen. Las capturas también se optimizaron para reducir su peso.

Algunos archivos mostraban caracteres incorrectos en lugar de tildes y otros signos. Se repararon los documentos y se agregó una revisión automática de la codificación.

## 5. Nueva corrección de los documentos — 22/10

El problema volvió a aparecer de otra forma y la primera revisión no lo detectó. Se recuperaron los archivos desde una versión anterior y se amplió el control para reconocer ese caso.

## 6. Fondo, recorrido, controles y textos — 29/10

Se reemplazaron los edificios de prueba por la ilustración definitiva del fondo y se retiraron los elementos que ya no correspondían a la escena.

La chica no llegaba hasta el final del recorrido. Se ajustó su avance para que pudiera pasar por todos los proyectos y volver al inicio. También se agregó el giro del personaje al caminar hacia el otro lado.

Las flechas no resultaban cómodas para caminar de forma continua. Se cambió su funcionamiento para que la chica avanzara mientras se mantuviera presionada la tecla y frenara al soltarla.

Durante la caminata se notaban tirones. Se modificó la forma de calcular las posiciones y mover al personaje para evitar trabajo repetido del navegador. Quedó pendiente medir el rendimiento en un celular real.

Se incorporaron las descripciones, los años y las tecnologías de los proyectos. En esta versión, los textos aparecían al pasar el mouse por cada cartel. Se cambió el fondo a verde y se bajó su opacidad para que no tapara completamente la captura.

La bienvenida no se veía como se esperaba. Se movió a la esquina superior izquierda y se dejó fija durante todo el recorrido. Después se redujo el tamaño y se quitó el fondo, dejando solamente el texto con una tipografía serif.

## 7. Ajustes del recorrido y del cielo — 04/11

La caminata seguía viéndose poco natural. Al alternar las imágenes completas se notaban los cambios de pose y se superponían brazos y piernas.

Se reemplazó ese sistema por una sola figura dividida en partes, con movimiento en caderas, rodillas, hombros y codos. Se ajustaron los recortes para evitar huecos en las uniones y se hizo que los pasos acompañaran la distancia recorrida. Al detenerse, la chica vuelve a apoyar las piernas.

Después de probarla, se aumentó un poco el movimiento de los brazos y se agrandó el personaje para que la cabeza llegara aproximadamente a la mitad del cartel. Esta versión de la caminata quedó aprobada.

Las descripciones no se leían bien y depender del mouse no acompañaba el recorrido. Se acortaron los textos y se cambió su aparición: ahora se muestran cuando la chica se acerca y el cartel se agranda. En ese mismo momento gira la cabeza para mirarlo.

Los últimos carteles reaccionaban tarde porque se tomaba como referencia el centro de la pantalla. Se cambió ese cálculo por la posición de la chica para que todos se activaran al acercarse. En pantallas chicas también se acomodó el cartel ampliado para que no quedara cortado.

El cielo todavía quedaba fijo. Se integró Open-Meteo para que cambie según el clima y el horario de Buenos Aires. Se agregaron ilustraciones de sol, luna y nubes con apoyo de IA, tomando como referencia la estética de la escena. Las nubes se oscurecen cuando hay lluvia o tormenta.

Se resolvió qué mostrar si la consulta falla: se usa un dato guardado o se mantiene el cielo según el horario, sin frenar el recorrido. Se probaron distintos estados del clima y momentos del día.

El sol quedaba demasiado abajo y las nubes podían tapar el Obelisco. Se corrigió el orden de las capas y se movió el sol más arriba y a la derecha, con menos opacidad. También se retiraron las leyendas de la fuente para dejar solamente el clima visible; la atribución queda accesible desde ese texto.

Al revisar la versión móvil, los textos quedaban chicos y algunos botones eran difíciles de tocar. Se aumentó el tamaño de lectura y el espacio de los botones. En pantallas muy bajas se adaptaron los proyectos a una lista para poder leerlos completos, y al volver a vertical se conserva el lugar del recorrido.

Con el teclado, algunos links recibían foco fuera de pantalla y la escena se desplazaba mal. Se corrigió para que el proyecto enfocado quede visible y muestre su descripción. También se revisaron la navegación sin JavaScript y la opción de reducir movimiento.

Durante estas pruebas se cambiaron la ubicación del clima y algunos colores del cielo, pero no me convencieron. Se dejaron como estaban antes. Se probó la fluidez en una emulación de celular y no se detectaron pausas largas; sigue pendiente comprobarlo en un teléfono real.

Se cerró el trabajo del día dejando esa prueba como primera tarea para la próxima sesión: recorrer la web desde un celular, tocar los proyectos, girar la pantalla y revisar si la caminata se traba.

## 8. Volver al recorrido en pantallas bajas — 11/11

Pedí sacar la sección blanca que aparecía al principio. Se quitó el cambio automático a una lista con fondo claro en pantallas bajas para mantener la vereda. Falta confirmar visualmente que fuera eso lo que veía.

Confirmé que era esa sección y quedó bien. Después pedí que la nena caminara un poquito más lento con las flechas: se bajó la velocidad aproximadamente un 15%.

Elegí el nombre La vereda de Mica y sumé qué estudio y qué me gusta hacer. Se mantuvo la tipografía, se destacó el título y se separaron presentación e instrucciones. Falta ver si me convence cómo queda; en celular se hizo lugar debajo para el clima.

No me gustó la estética de la presentación: las instrucciones quedaban arriba de los edificios y el clima se veía aburrido. Se achicó el bloque de presentación, se movieron las instrucciones abajo sobre la vereda y se probó un cartelito verde para el clima. Esta propuesta todavía no está aprobada.

Las instrucciones todavía aparecían arriba con una franja blanca. Se corrigió la carga de la alternativa sin JavaScript y se pusieron las instrucciones dentro de la escena, abajo y sin recuadro. Falta confirmar en pantalla que ya no aparezca la franja.

La franja quedó resuelta. Pedí dejar solamente Caminá con las flechas o hacé scroll y agrandar apenas esa frase.

A pedido de Mica, se agregaron los símbolos ← → después de la palabra flechas en las instrucciones.

En celular, los carteles parecían caminar al lado de la nena mientras los miraba. Era un ajuste que los mantenía dentro de la pantalla: se quitó para que conserven su lugar en la vereda. Siguen agrandándose y mostrando la descripción. Falta comprobarlo en el teléfono.

Los carteles ya se ven mejor. Pedí caminar menos hasta el primero sólo en celular: se acortó el tramo inicial, conservando la distancia entre los proyectos y el recorrido de escritorio.

Mica aportó una captura nueva de DevPath en public/img/devpath.png. Se revisó la imagen y se reemplazó src/assets/proyectos/devpath.png para usarla en el cartel con la optimización existente de Astro; se conserva el original aportado en img. Los enlaces y el hueco del marco no cambian.

Pedí agregar Pegatina como primer proyecto y que las capturas se corten menos. Se ajustaron para mostrarse completas dentro del cartel; pueden quedar franjas libres. Falta ubicar la imagen de Pegatina para terminar de sumarlo.

Subí la captura de Pegatina y se agregó como primer cartel, con mi descripción y los links a la web y GitHub. Los otros cinco siguen detrás en el mismo orden. No me gustaron las franjas negras de las imágenes, así que se volvió al encuadre anterior.

Mica definió el texto breve de Pegatina: Marketplace de stickers de ilustradores argentinos independientes. Se agregó arriba la ficha 2026 · React · Next.js · TypeScript, con el mismo formato de los otros proyectos.

A pedido de Mica, el nombre de cada proyecto aparece arriba de su año y tecnologías dentro de la descripción activa. Sale del título del Markdown, sin duplicarlo a mano ni agregar una chapa permanente sobre la captura. Tamaño centralizado en tokens.css.

Se completó el README con la propuesta, el público que aprobamos, cómo ejecutar el sitio, qué hace cada componente y cómo funciona el clima. Se enlazaron las bitácoras y el uso de IA. Faltan confirmar la URL publicada y los créditos de las ilustraciones; quedaron anotados.

Aclaré que las ilustraciones las generé con ChatGPT usando referencias de estilo de Pinterest, pero no guardé los links. Se agregó esa información al README y a los créditos del sitio.

Pedí que el README fuera menos técnico y más formal. Se simplificaron las explicaciones y se pasó a primera persona, conservando lo que pide la consigna.

Agregué acceso a /creditos/ desde el título La vereda de Mica, conservando su apariencia y mostrando subrayado al pasar el mouse o recibir foco de teclado.

Confirmé que el portfolio está publicado en https://vereda-portfolio.vercel.app/ y que corregí por mi cuenta los pendientes del primer párrafo de limitaciones. Se agregó el enlace al README y se dejó sólo el párrafo de los carteles, comenzando con Queda pendiente. Esta actualización registra mi confirmación; no agrega nuevas mediciones del agente.

Agregué Mi nombre es Micaela Svatzky al inicio de la presentación. El enlace del título queda explícitamente verde también después de visitarlo; conserva el subrayado al pasar el mouse o navegar con teclado.

Se completó la descripción para buscadores con mi nombre, diseño/desarrollo front end y el recorrido por Buenos Aires. Ya no quedan marcadores de texto pendiente en src.

Se preparó la publicación de los cambios de esta sesión y se comprobó que el sitio y el repositorio responden. Se corrigió el dominio de la configuración y pasaron las pruebas del clima. Falta mi confirmación para subir el commit.
