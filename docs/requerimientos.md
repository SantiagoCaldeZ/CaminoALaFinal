# Requerimientos funcionales y no funcionales

# La Mejenga: Camino a la Final

## 1. Propósito del documento

Este documento define los requerimientos funcionales y no funcionales del proyecto **La Mejenga: Camino a la Final**.

Su objetivo es traducir la visión del juego, el MVP y el roadmap en condiciones más concretas que permitan diseñar, desarrollar, probar y evaluar cada versión del producto.

Este documento no sustituye la documentación de gameplay ni la arquitectura técnica. Más bien funciona como puente entre ambas:

* La documentación base define qué es el juego.
* La especificación del MVP define cómo se juega la primera versión.
* La arquitectura técnica define cómo se construye.
* Este documento define qué debe cumplir el sistema.

---

## 2. Alcance general del sistema

El sistema será inicialmente una **aplicación web responsive** orientada a jugar partidos tácticos de fútbol por cartas, con progresión futura hacia cuentas, perfiles, amigos, presencia en línea, partidas privadas y multijugador.

El juego se construirá de forma incremental. Por eso los requerimientos se dividen por módulos y por prioridad.

---

## 3. Prioridades de requerimientos

Para ordenar el desarrollo, cada requerimiento puede clasificarse así:

| Prioridad | Significado                                                      |
| --------- | ---------------------------------------------------------------- |
| Alta      | Necesario para validar o lanzar la versión correspondiente       |
| Media     | Importante, pero puede implementarse después del flujo principal |
| Baja      | Deseable, pero no bloquea la versión                             |
| Futura    | Pertenece a una expansión posterior                              |

---

# 4. Requerimientos funcionales generales

## RF-001 — Inicio del juego

**Prioridad:** Alta para MVP 1.

El sistema debe mostrar una pantalla inicial del juego con el nombre provisional, una descripción breve y una opción para iniciar un partido rápido.

### Criterios de aceptación

* El usuario puede entrar a la pantalla principal.
* El usuario puede iniciar el flujo de partido rápido.
* La pantalla debe ser clara y no requerir registro en el MVP 1.

---

## RF-002 — Selección de equipo

**Prioridad:** Alta para MVP 1.

El sistema debe permitir que el usuario seleccione un equipo predefinido antes de iniciar el partido.

### Criterios de aceptación

* Se muestran al menos dos equipos disponibles.
* Cada equipo muestra nombre, estilo, fortalezas, debilidades y plantilla básica.
* El usuario puede seleccionar un equipo y continuar.
* El rival se asigna automáticamente en el MVP 1.

---

## RF-003 — Visualización de plantilla

**Prioridad:** Alta para MVP 1.

El sistema debe mostrar los jugadores principales de cada equipo.

### Criterios de aceptación

* Cada jugador muestra nombre, apodo, rol y estadísticas principales.
* Cada jugador muestra un rasgo especial.
* La información debe ser entendible sin necesidad de explicaciones externas.

---

## RF-004 — Inicio de partido

**Prioridad:** Alta para MVP 1.

El sistema debe crear un partido entre el equipo seleccionado por el usuario y un rival controlado por IA.

### Criterios de aceptación

* El partido inicia con marcador 0-0.
* Ambos equipos inician con energía y momentum definidos.
* El sistema carga el primer momento clave.
* El estado del partido queda listo para jugar.

---

## RF-005 — Momentos clave del partido

**Prioridad:** Alta para MVP 1.

El sistema debe dividir el partido en una cantidad limitada de momentos clave.

### Criterios de aceptación

* El MVP 1 debe tener 8 momentos clave por partido.
* Cada momento debe tener minuto, título, descripción y tipo de situación.
* El usuario debe entender el contexto antes de elegir una carta.
* La última jugada debe sentirse como cierre del partido.

---

## RF-006 — Mano de cartas

**Prioridad:** Alta para MVP 1.

El sistema debe mostrar una mano de cartas tácticas disponibles en cada momento clave.

### Criterios de aceptación

* Se muestran 4 cartas por momento en el MVP 1.
* Cada carta muestra nombre, tipo, costo de energía, poder, riesgo y descripción.
* El usuario puede seleccionar una carta.
* El sistema debe impedir o advertir cuando una carta no pueda jugarse por falta de energía, si aplica.

---

## RF-007 — Selección de carta por el usuario

**Prioridad:** Alta para MVP 1.

El usuario debe poder elegir una carta para resolver la situación actual.

### Criterios de aceptación

* La carta seleccionada queda claramente marcada.
* El usuario no debe poder seleccionar más de una carta para el mismo momento.
* Al confirmar la carta, el sistema avanza a la selección/respuesta de la IA.

---

## RF-008 — Selección de carta por IA

**Prioridad:** Alta para MVP 1.

El sistema debe seleccionar automáticamente una carta para el rival.

### Criterios de aceptación

* La IA elige una carta válida.
* La selección de la IA considera al menos el tipo de situación, energía y marcador.
* La IA no debe sentirse completamente aleatoria.
* La carta rival debe revelarse al usuario antes o durante la resolución.

---

## RF-009 — Resolución de jugada

**Prioridad:** Alta para MVP 1.

El sistema debe resolver cada jugada comparando la carta del usuario, la carta rival, las estadísticas de los equipos/jugadores, energía, momentum, situación y azar controlado.

### Criterios de aceptación

* Cada jugada genera un resultado válido.
* El resultado puede afectar marcador, energía, momentum e historial.
* El usuario debe recibir una narración clara de lo ocurrido.
* El sistema no debe producir resultados imposibles o incoherentes.

---

## RF-010 — Sistema de marcador

**Prioridad:** Alta para MVP 1.

El sistema debe mostrar y actualizar el marcador del partido.

### Criterios de aceptación

* El marcador inicia en 0-0.
* El marcador se actualiza cuando hay gol.
* El marcador final se muestra en el resumen.

---

## RF-011 — Sistema de energía

**Prioridad:** Alta para MVP 1.

El sistema debe manejar energía por equipo durante el partido.

### Criterios de aceptación

* Cada equipo inicia con energía definida.
* Cada carta consume energía.
* La energía se actualiza visualmente después de cada jugada.
* La baja energía debe afectar el rendimiento.
* La energía no debe bajar de 0 ni superar el máximo definido.

---

## RF-012 — Sistema de momentum

**Prioridad:** Alta para MVP 1.

El sistema debe manejar momentum por equipo durante el partido.

### Criterios de aceptación

* Cada equipo inicia con momentum definido.
* El momentum cambia según resultados de jugadas.
* Goles, atajadas, ocasiones y errores afectan el momentum.
* El momentum debe tener impacto moderado en la resolución.
* El momentum no debe bajar de 0 ni superar 100.

---

## RF-013 — Narración de jugadas

**Prioridad:** Alta para MVP 1.

El sistema debe generar una narración textual para cada jugada.

### Criterios de aceptación

* La narración explica qué ocurrió.
* La narración debe mencionar jugadores, cartas o equipos cuando sea posible.
* La narración debe reforzar el tono futbolero y de barrio.
* La narración no debe ser excesivamente larga.
* Debe existir variación suficiente para evitar repetición inmediata.

---

## RF-014 — Historial de partido

**Prioridad:** Media para MVP 1.

El sistema debe registrar los eventos principales del partido.

### Criterios de aceptación

* Cada jugada queda registrada con minuto, cartas usadas, resultado y marcador parcial.
* El usuario puede ver al menos las últimas jugadas durante el partido.
* El resumen final puede usar este historial para mostrar jugadas destacadas.

---

## RF-015 — Resumen final

**Prioridad:** Alta para MVP 1.

El sistema debe mostrar un resumen al finalizar el partido.

### Criterios de aceptación

* Se muestra el marcador final.
* Se indica el ganador o empate.
* Se muestran energía y momentum finales.
* Se muestra al menos una jugada destacada o resumen del historial.
* El usuario puede jugar de nuevo.

---

## RF-016 — Reiniciar partido

**Prioridad:** Media para MVP 1.

El sistema debe permitir iniciar un nuevo partido después del resumen final.

### Criterios de aceptación

* El usuario puede volver a jugar sin recargar manualmente la página.
* El nuevo partido debe iniciar con estado limpio.
* No deben conservarse datos de marcador, energía o momentum del partido anterior, salvo que una versión futura incluya progresión.

---

# 5. Requerimientos funcionales de progresión

Estos requerimientos no pertenecen al MVP 1. Corresponden a versiones posteriores.

## RF-017 — Recompensas postpartido

**Prioridad:** Alta para Versión 0.1.

El sistema debe entregar recompensas después de un partido.

### Criterios de aceptación

* El usuario recibe recompensa por completar un partido.
* Ganar otorga mejor recompensa que perder, pero perder también puede otorgar progreso mínimo.
* Las recompensas pueden incluir XP, monedas ficticias, cartas o mejoras.

---

## RF-018 — Experiencia de jugadores

**Prioridad:** Media para Versión 0.1.

Los jugadores del equipo deben poder ganar experiencia.

### Criterios de aceptación

* Al menos un jugador recibe XP después del partido.
* El jugador destacado puede recibir bonificación.
* La XP puede reflejarse en una barra o valor numérico.

---

## RF-019 — Mejora de estadísticas

**Prioridad:** Media para Versión 0.1.

El sistema debe permitir mejorar estadísticas de jugadores.

### Criterios de aceptación

* El usuario puede elegir una mejora después de acumular progreso.
* Las estadísticas mejorables deben estar limitadas para evitar crecimiento desbalanceado.
* El cambio debe reflejarse en futuros partidos.

---

## RF-020 — Desbloqueo de cartas

**Prioridad:** Media para Versión 0.1.

El usuario debe poder desbloquear nuevas cartas.

### Criterios de aceptación

* El sistema puede otorgar una carta después de ciertos logros o partidos.
* La nueva carta queda disponible para futuros partidos.
* El usuario puede ver qué carta desbloqueó.

---

# 6. Requerimientos funcionales de torneo/carrera

## RF-021 — Torneo corto

**Prioridad:** Alta para Versión 0.2.

El sistema debe permitir jugar una serie corta de partidos con estructura de torneo.

### Criterios de aceptación

* El torneo tiene entre 3 y 5 partidos.
* El usuario avanza o queda eliminado según resultados.
* Existe una pantalla de progreso del torneo.
* Existe una final o cierre claro.

---

## RF-022 — Eventos narrativos entre partidos

**Prioridad:** Alta para Versión 0.3.

El sistema debe presentar eventos narrativos entre partidos.

### Criterios de aceptación

* Cada evento tiene título, descripción y opciones.
* Las decisiones tienen consecuencias.
* Las consecuencias pueden afectar moral, energía, jugadores, cartas o próximos partidos.

---

## RF-023 — Moral del equipo

**Prioridad:** Media para Versión 0.3.

El sistema debe manejar moral del equipo en una campaña o carrera local.

### Criterios de aceptación

* La moral cambia según resultados y eventos.
* La moral afecta jugadas bajo presión.
* La moral se muestra de forma comprensible al usuario.

---

## RF-024 — Química del equipo

**Prioridad:** Media para Versión 0.3.

El sistema debe manejar química del equipo.

### Criterios de aceptación

* La química afecta jugadas colectivas.
* Eventos y decisiones pueden modificar la química.
* El usuario puede ver el estado general de química.

---

# 7. Requerimientos funcionales de persistencia

## RF-025 — Guardado local

**Prioridad:** Alta para Versión 0.4.

El sistema debe guardar progreso localmente antes de integrar backend.

### Criterios de aceptación

* El progreso se guarda en el navegador.
* El usuario puede cerrar y volver sin perder progreso local.
* Debe existir opción para reiniciar progreso local.

---

## RF-026 — Registro e inicio de sesión

**Prioridad:** Alta para Versión 0.5.

El sistema debe permitir registro e inicio de sesión.

### Criterios de aceptación

* El usuario puede crear cuenta.
* El usuario puede iniciar sesión.
* El usuario puede cerrar sesión.
* El sistema debe proteger rutas o datos que requieran sesión.

---

## RF-027 — Perfil de usuario

**Prioridad:** Alta para Versión 0.5.

El sistema debe permitir que cada usuario tenga un perfil.

### Criterios de aceptación

* El perfil contiene nombre visible.
* El perfil puede mostrar estadísticas básicas.
* El perfil puede asociarse al equipo del usuario.
* Más adelante puede incluir avatar y escudo.

---

## RF-028 — Guardado en nube

**Prioridad:** Alta para Versión 0.5.

El sistema debe guardar el progreso del usuario en una base de datos.

### Criterios de aceptación

* El progreso se asocia al usuario autenticado.
* El usuario puede recuperar su progreso desde otro dispositivo.
* El sistema debe proteger datos mediante reglas de seguridad.

---

# 8. Requerimientos funcionales sociales

## RF-029 — Buscar usuarios

**Prioridad:** Alta para Versión 0.6.

El sistema debe permitir buscar otros usuarios.

### Criterios de aceptación

* El usuario puede buscar por nombre visible o identificador.
* El sistema muestra resultados relevantes.
* El sistema no debe exponer información privada innecesaria.

---

## RF-030 — Solicitudes de amistad

**Prioridad:** Alta para Versión 0.6.

El sistema debe permitir enviar, aceptar y rechazar solicitudes de amistad.

### Criterios de aceptación

* El usuario puede enviar solicitud.
* El receptor puede aceptar o rechazar.
* No deben generarse solicitudes duplicadas.
* Los amigos aceptados aparecen en lista de amigos.

---

## RF-031 — Lista de amigos

**Prioridad:** Alta para Versión 0.6.

El sistema debe mostrar la lista de amigos del usuario.

### Criterios de aceptación

* Se muestran amigos aceptados.
* Se muestra estado básico si existe presencia.
* El usuario puede acceder a acciones relacionadas, como invitar a partida en versiones futuras.

---

## RF-032 — Presencia en línea

**Prioridad:** Media para Versión 0.6.

El sistema debe mostrar si un amigo está en línea, en menú, en partido o desconectado.

### Criterios de aceptación

* La presencia se actualiza automáticamente.
* El usuario puede ver el estado de sus amigos.
* El sistema debe manejar desconexiones o inactividad.

---

## RF-033 — Mensajes privados

**Prioridad:** Media para Versión 0.6 o posterior.

El sistema puede permitir mensajes privados entre amigos.

### Criterios de aceptación

* El usuario puede enviar mensajes a un amigo.
* El usuario puede ver conversaciones.
* El sistema puede mostrar mensajes no leídos.
* Deben considerarse reglas mínimas de seguridad y moderación.

---

# 9. Requerimientos funcionales multijugador

## RF-034 — Crear sala privada

**Prioridad:** Alta para Versión 0.7.

El sistema debe permitir crear una sala privada para jugar contra otra persona.

### Criterios de aceptación

* El usuario puede crear sala.
* La sala genera un código o invitación.
* Otro usuario puede unirse.
* La sala tiene estado claro: esperando, lista, en partida, finalizada o abandonada.

---

## RF-035 — Unirse a sala

**Prioridad:** Alta para Versión 0.7.

El sistema debe permitir que un usuario se una a una sala existente.

### Criterios de aceptación

* El usuario puede ingresar código o aceptar invitación.
* El sistema valida si la sala existe y tiene espacio.
* El sistema evita que más jugadores de los permitidos entren a la misma partida.

---

## RF-036 — Partida 1v1 sincronizada

**Prioridad:** Alta para Versión 0.7.

El sistema debe permitir jugar un partido 1v1 entre dos usuarios.

### Criterios de aceptación

* Ambos jugadores ven el mismo estado de partido.
* Las cartas seleccionadas se sincronizan correctamente.
* La resolución de cada jugada es compartida.
* El historial coincide para ambos jugadores.
* El resultado final es el mismo para ambos.

---

## RF-037 — Manejo de abandono

**Prioridad:** Alta para Versión 0.7.

El sistema debe manejar cuando un jugador abandona una partida.

### Criterios de aceptación

* La partida detecta desconexión o abandono.
* El rival recibe notificación visual.
* El sistema define si la partida queda abandonada, pausada o ganada por el rival.

---

## RF-038 — Validación de jugadas

**Prioridad:** Alta para Versión 0.7.

El sistema debe validar que las jugadas multijugador sean legítimas.

### Criterios de aceptación

* Un jugador no puede jugar cartas que no tiene.
* Un jugador no puede alterar manualmente marcador, energía o momentum desde el cliente.
* La resolución debe ejecutarse o validarse en un lugar confiable.

---

# 10. Requerimientos funcionales competitivos

## RF-039 — Ranking

**Prioridad:** Media para Versión 0.8.

El sistema debe mostrar ranking de jugadores.

### Criterios de aceptación

* El ranking considera resultados de partidas válidas.
* El ranking muestra al menos nombre, victorias, derrotas y puntaje.
* El sistema debe evitar que partidas inválidas manipulen ranking.

---

## RF-040 — Temporadas

**Prioridad:** Media para Versión 0.8.

El sistema puede organizar la competencia en temporadas.

### Criterios de aceptación

* Cada temporada tiene fecha de inicio y fin.
* Los resultados se asocian a una temporada.
* Se pueden otorgar recompensas al cierre.

---

# 11. Requerimientos no funcionales

## RNF-001 — Rendimiento

El sistema debe responder de forma fluida durante el partido.

### Criterios

* Las interacciones básicas deben sentirse inmediatas.
* La selección de cartas no debe tener retrasos perceptibles.
* Las animaciones no deben bloquear el flujo del partido.
* El partido debe poder completarse en dispositivos de gama media.

---

## RNF-002 — Usabilidad

El sistema debe ser fácil de entender para un usuario nuevo.

### Criterios

* El usuario debe entender qué hacer en menos de un minuto.
* Las cartas deben ser legibles.
* Las barras de energía y momentum deben ser claras.
* El resultado de cada jugada debe explicarse visual y textualmente.

---

## RNF-003 — Claridad de reglas

El usuario debe poder comprender por qué una jugada tuvo determinado resultado.

### Criterios

* La narración debe explicar el resultado.
* Las cartas deben indicar riesgo y costo.
* Las situaciones deben orientar al usuario.
* En versiones futuras, pueden mostrarse indicadores de ventaja o desventaja.

---

## RNF-004 — Mantenibilidad

El código debe ser fácil de modificar y ampliar.

### Criterios

* La lógica de juego debe estar separada de la UI.
* Las cartas, equipos y situaciones deben estar centralizados.
* Las constantes de balance deben estar en un archivo dedicado.
* Los componentes deben tener responsabilidades claras.

---

## RNF-005 — Escalabilidad funcional

El sistema debe permitir agregar nuevos equipos, cartas, situaciones y modos sin reescribir la base.

### Criterios

* Agregar una carta no debe requerir modificar múltiples componentes.
* Agregar un equipo no debe romper la selección de equipo.
* Agregar una situación no debe obligar a rehacer el motor.
* El modelo debe soportar evolución hacia progresión y multijugador.

---

## RNF-006 — Seguridad futura

Cuando existan cuentas y multijugador, el sistema debe proteger datos y resultados.

### Criterios

* Los usuarios solo pueden acceder a sus propios datos privados.
* Las partidas multijugador deben validar acciones críticas.
* Los resultados competitivos no deben depender únicamente del cliente.
* La base de datos debe usar políticas de seguridad adecuadas.

---

## RNF-007 — Compatibilidad responsive

La aplicación debe funcionar en escritorio y móvil.

### Criterios

* La UI debe adaptarse a diferentes tamaños de pantalla.
* Las cartas deben poder seleccionarse cómodamente en móvil.
* El marcador, energía y momentum deben mantenerse visibles o accesibles.
* No deben existir elementos imposibles de tocar en pantallas pequeñas.

---

## RNF-008 — Accesibilidad básica

El sistema debe seguir prácticas básicas de accesibilidad.

### Criterios

* Botones y cartas interactivas deben ser identificables.
* Debe existir contraste suficiente entre texto y fondo.
* No se debe depender únicamente del color para comunicar información importante.
* Los textos deben ser legibles.

---

## RNF-009 — Consistencia visual

El juego debe mantener una identidad visual coherente.

### Criterios

* Las cartas deben compartir lenguaje visual.
* Los paneles deben usar estilos consistentes.
* Las barras y estados deben seguir patrones repetibles.
* El tono visual debe reforzar fútbol de barrio, no simulador realista.

---

## RNF-010 — Bajo acoplamiento con backend en etapas tempranas

El MVP inicial no debe depender de backend.

### Criterios

* El partido debe poder jugarse localmente.
* Los datos mock deben permitir probar el juego sin base de datos.
* La integración con Supabase debe venir después de validar el núcleo.

---

## RNF-011 — Integridad del estado de partido

El estado del partido debe mantenerse coherente durante todo el flujo.

### Criterios

* No debe haber marcadores negativos.
* Energía y momentum deben mantenerse dentro de rangos válidos.
* No debe poder jugarse una jugada después de finalizar el partido.
* El historial debe corresponder al estado final.

---

## RNF-012 — Rejugabilidad

El sistema debe favorecer que el usuario quiera jugar más de una vez.

### Criterios

* Las situaciones deben variar.
* Las cartas disponibles no deben ser siempre iguales.
* Los resultados deben tener cierto grado de incertidumbre.
* El partido debe ser suficientemente corto para repetir.

---

## RNF-013 — Balance ajustable

Las reglas deben poder ajustarse fácilmente.

### Criterios

* Poder, riesgo, costos y umbrales deben estar centralizados.
* Debe ser posible ajustar frecuencia de goles.
* Debe ser posible modificar impacto de energía y momentum.
* El balance no debe estar enterrado en componentes visuales.

---

# 12. Restricciones del sistema

## RES-001 — No fútbol en tiempo real al inicio

El juego no debe implementar movimiento libre de jugadores, físicas de balón ni controles en tiempo real en el MVP.

---

## RES-002 — No motor 3D en el MVP

El MVP debe construirse con componentes web, animaciones simples y lógica TypeScript.

---

## RES-003 — No app nativa al inicio

El proyecto debe iniciar como aplicación web. La app móvil puede evaluarse posteriormente.

---

## RES-004 — No licencias reales

El juego no debe depender de clubes, jugadores, ligas, marcas o escudos reales.

---

## RES-005 — No monetización temprana

No se debe diseñar una tienda, cartas pagadas o economía monetizada antes de validar el juego.

---

## RES-006 — No multijugador antes de validar partido local

El multijugador debe esperar hasta que el partido local sea claro, divertido y estable.

---

# 13. Reglas de aceptación por versión

## MVP 1 listo cuando:

* Se puede jugar un partido completo contra IA.
* Existen dos equipos.
* Existen veinte cartas iniciales.
* El partido tiene ocho momentos clave.
* Se actualizan marcador, energía y momentum.
* Hay narración de jugadas.
* Existe resumen final.

---

## MVP 2 listo cuando:

* La experiencia visual del partido es clara.
* Las cartas son legibles y atractivas.
* Hay animaciones básicas.
* El usuario entiende mejor por qué gana o pierde jugadas.
* El balance inicial se siente razonable.

---

## Versión 0.1 lista cuando:

* Existe recompensa postpartido.
* Existe progreso mínimo.
* El usuario puede mejorar algo después de jugar.
* El progreso influye en futuros partidos de la misma sesión.

---

## Versión 0.2 lista cuando:

* Existe torneo corto.
* El usuario puede jugar varios partidos encadenados.
* Existe un ganador o cierre del torneo.

---

## Versión 0.3 lista cuando:

* Existen eventos entre partidos.
* Las decisiones tienen consecuencias.
* La campaña local genera sensación de historia.

---

## Versión 0.4 lista cuando:

* El progreso se guarda localmente.
* El usuario puede continuar después de cerrar la app.

---

## Versión 0.5 lista cuando:

* Existe registro/login.
* Existe perfil.
* El progreso se guarda en nube.
* El usuario puede recuperar sus datos.

---

## Versión 0.6 lista cuando:

* El usuario puede buscar amigos.
* Puede enviar y aceptar solicitudes.
* Puede ver lista de amigos.
* Puede ver presencia básica.

---

## Versión 0.7 lista cuando:

* Dos usuarios pueden jugar una partida privada 1v1.
* La partida se sincroniza correctamente.
* El resultado final es igual para ambos.
* Existe manejo de abandono.

---

## Versión 1.0 lista cuando:

* El juego tiene partido pulido.
* Tiene progresión.
* Tiene cuentas.
* Tiene guardado en nube.
* Tiene amigos.
* Tiene partidas privadas.
* Tiene historial.
* Tiene interfaz responsive estable.
* Se siente como producto jugable y no como prototipo.

---

# 14. Criterios de calidad del gameplay

El gameplay debe evaluarse con preguntas simples:

1. ¿El jugador entiende qué está pasando?
2. ¿Elegir cartas se siente importante?
3. ¿El resultado parece justo o razonable?
4. ¿La energía obliga a tomar decisiones?
5. ¿El momentum agrega emoción sin romper el balance?
6. ¿La narración hace más entretenido el partido?
7. ¿El usuario quiere jugar otro partido?
8. ¿Hay suficiente variación entre partidas?
9. ¿Las cartas tienen riesgos y counters?
10. ¿El juego se siente original frente a otros juegos de fútbol?

---

# 15. Conclusión

Los requerimientos de **La Mejenga: Camino a la Final** deben proteger la idea central del proyecto: crear un juego de fútbol original, táctico, rápido, narrativo y social, pero sin caer en una complejidad excesiva desde el inicio.

El primer objetivo no es tener login, amigos, mensajes ni multijugador. El primer objetivo es que el partido funcione y sea divertido.

Después, cada versión debe agregar una capa clara:

1. Partido.
2. Pulido.
3. Progresión.
4. Torneo.
5. Carrera local.
6. Persistencia.
7. Cuentas.
8. Social.
9. Multijugador.
10. Competitivo.

Este documento debe utilizarse como referencia para decidir qué construir, qué probar, qué posponer y qué evitar en cada etap