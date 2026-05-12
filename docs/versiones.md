# Roadmap de versiones

# La Mejenga: Camino a la Final

## 1. Propósito del documento

Este documento define la ruta futura del proyecto **La Mejenga: Camino a la Final**, desde el primer prototipo jugable hasta versiones más completas con progresión, cuentas, funcionalidades sociales, multijugador y posibles expansiones.

La intención es evitar que el proyecto crezca de forma desordenada. No todas las ideas deben implementarse desde el inicio. Cada versión debe tener un objetivo claro, un alcance realista y una razón de existir.

Este roadmap funciona como guía estratégica. Puede ajustarse conforme se pruebe el juego, pero debe servir para mantener el foco.

---

## 2. Principio general del roadmap

El proyecto debe avanzar en capas:

1. Primero se valida si el partido es divertido.
2. Después se agrega progresión.
3. Luego se agrega persistencia local o de usuario.
4. Después se incorporan cuentas y datos reales.
5. Luego se agregan funciones sociales.
6. Finalmente se construye el multijugador competitivo y modos más grandes.

La lógica es simple:

> No tiene sentido construir amigos, mensajes, rankings o torneos online si el partido base todavía no es divertido.

---

## 3. Visión de evolución por versiones

| Etapa         | Nombre                | Objetivo principal                                       |
| ------------- | --------------------- | -------------------------------------------------------- |
| Preproducción | Documentación base    | Definir identidad, reglas y arquitectura                 |
| Prototipo 0   | Prueba de motor       | Validar reglas sin interfaz compleja                     |
| MVP 1         | Partido táctico local | Validar si el partido por cartas es divertido            |
| MVP 2         | Partido pulido        | Mejorar experiencia visual, balance y claridad           |
| Versión 0.1   | Progresión simple     | Dar recompensa y continuidad entre partidos              |
| Versión 0.2   | Torneo corto          | Crear una primera experiencia estructurada               |
| Versión 0.3   | Carrera local ligera  | Construir equipo, desbloquear cartas y mejorar jugadores |
| Versión 0.4   | Persistencia local    | Guardar progreso sin backend                             |
| Versión 0.5   | Cuentas y perfiles    | Agregar autenticación y progreso real                    |
| Versión 0.6   | Social básico         | Amigos, presencia e invitaciones                         |
| Versión 0.7   | Multijugador privado  | Partidas 1v1 contra amigos                               |
| Versión 0.8   | Temporadas y ranking  | Competencia online organizada                            |
| Versión 1.0   | Lanzamiento inicial   | Juego completo, estable y presentable                    |
| Futuro        | Expansiones           | Nuevos modos, eventos, cartas, torneos y app móvil       |

---

## 4. Fase de preproducción

## 4.1 Objetivo

Definir claramente qué es el juego, qué no es, cómo se juega y cómo se va a construir.

## 4.2 Documentos necesarios

Ya se definieron documentos iniciales importantes:

* Documento base del proyecto.
* Especificación del MVP 1.
* Arquitectura técnica inicial.
* Roadmap de versiones.

## 4.3 Resultado esperado

La preproducción termina cuando se puede responder con claridad:

* Qué tipo de juego es.
* Cuál es el núcleo jugable.
* Cuál es el primer MVP.
* Qué tecnologías se usarán.
* Qué se debe evitar al inicio.
* Cuál es el orden de desarrollo.

## 4.4 Riesgo principal

Quedarse documentando demasiado sin empezar a probar el juego.

La documentación debe servir para construir, no para retrasar indefinidamente el prototipo.

---

# 5. Prototipo 0 — Prueba de motor

## 5.1 Objetivo

Crear una primera versión del motor del partido sin una interfaz completa.

Este prototipo sirve para validar que las reglas básicas funcionan antes de invertir tiempo en diseño visual.

## 5.2 Alcance

Incluye:

* Tipos de datos.
* Dos equipos mock.
* Cartas mock.
* Situaciones mock.
* Función de inicio de partido.
* Función para elegir carta de IA.
* Función para resolver jugadas.
* Actualización de marcador, energía y momentum.
* Narración textual básica.

No incluye:

* Interfaz final.
* Animaciones.
* Selección visual de cartas.
* Login.
* Base de datos.
* Multijugador.

## 5.3 Resultado esperado

Poder simular un partido completo desde código.

Ejemplo:

```ts
const match = startMatch(playerTeam, rivalTeam);
const next = playMoment(match, selectedCard);
```

## 5.4 Criterio de éxito

El motor debe producir resultados coherentes, modificar el estado del partido y permitir jugar los 8 momentos sin romperse.

---

# 6. MVP 1 — Partido táctico local

## 6.1 Objetivo

Construir la primera versión jugable real.

El usuario debe poder entrar, elegir equipo y jugar un partido completo contra una IA simple usando cartas tácticas.

## 6.2 Alcance

Incluye:

* Pantalla de inicio del MVP.
* Selección de equipo.
* Dos equipos disponibles.
* Veinte cartas iniciales.
* Ocho momentos clave por partido.
* Mano de cuatro cartas por momento.
* IA simple.
* Marcador.
* Energía por equipo.
* Momentum por equipo.
* Narración de jugadas.
* Resumen final.

No incluye:

* Progresión.
* Recompensas.
* Guardado.
* Login.
* Amigos.
* Mensajes.
* Multijugador.
* Torneo.

## 6.3 Pregunta que debe responder

> ¿El partido por cartas y momentos clave se siente divertido?

## 6.4 Criterios de éxito

* El usuario entiende qué hacer.
* Las cartas se sienten relevantes.
* La energía obliga a pensar.
* El momentum agrega emoción.
* Las narraciones explican lo ocurrido.
* El usuario quiere jugar otro partido.

## 6.5 Riesgos

* Que todo se sienta demasiado aleatorio.
* Que una carta sea claramente superior a todas.
* Que el partido sea lento.
* Que la narración no explique bien los resultados.
* Que no haya suficiente emoción en las últimas jugadas.

---

# 7. MVP 2 — Partido pulido

## 7.1 Objetivo

Mejorar la experiencia del partido después de validar la primera versión jugable.

Esta fase no agrega sistemas grandes. Su función es hacer que el partido se sienta mejor, más claro y más emocionante.

## 7.2 Alcance

Incluye:

* Mejoras visuales en cartas.
* Animaciones básicas.
* Mejor lectura de energía y momentum.
* Historial de jugadas más claro.
* Mejores narraciones.
* Ajustes de balance.
* Indicadores simples de ventaja o riesgo.
* Mejor pantalla de resumen final.
* Mejor experiencia responsive.

No incluye:

* Login.
* Multijugador.
* Amigos.
* Mensajes.
* Ranking.
* Base de datos.

## 7.3 Mejoras recomendadas

### Cartas

* Mostrar poder, riesgo y costo de energía.
* Mostrar tipo de carta.
* Mostrar cuándo una carta es recomendada para la situación.
* Mostrar advertencia si una carta es muy arriesgada.

### Resolución

* Mostrar carta del usuario y carta rival.
* Mostrar resultado claro.
* Explicar brevemente por qué funcionó o falló.

### Sensación de partido

* Efecto de gol.
* Efecto de atajada.
* Cambio visual de momentum.
* Transición entre jugadas.
* Última jugada más dramática.

## 7.4 Criterio de éxito

El usuario no solo puede jugar el partido, sino que entiende mejor las decisiones y siente más emoción durante la partida.

---

# 8. Versión 0.1 — Progresión simple

## 8.1 Objetivo

Dar continuidad entre partidos.

Después de cada partido, el jugador debe recibir alguna recompensa o avance, aunque todavía no exista cuenta ni base de datos.

## 8.2 Alcance

Incluye:

* Recompensa al final del partido.
* XP para jugadores.
* Mejora simple de estadísticas.
* Desbloqueo básico de cartas.
* Pantalla de progreso.
* Registro temporal del equipo del jugador durante la sesión.

No incluye:

* Guardado permanente en nube.
* Login.
* Mercado complejo.
* Carrera completa.
* Multijugador.

## 8.3 Recompensas iniciales

Después de cada partido se podrían otorgar:

* Monedas ficticias.
* XP de equipo.
* XP de jugador destacado.
* Una carta desbloqueada.
* Mejora de stat.
* Aumento de reputación.

## 8.4 Decisiones de progresión

El jugador podría elegir entre:

* Mejorar ataque.
* Mejorar defensa.
* Mejorar técnica.
* Mejorar resistencia.
* Mejorar mentalidad.
* Desbloquear una carta.

## 8.5 Criterio de éxito

El jugador debe sentir que ganar o perder tiene consecuencias y que su equipo empieza a crecer.

---

# 9. Versión 0.2 — Torneo corto

## 9.1 Objetivo

Convertir partidos aislados en una experiencia estructurada.

El jugador debe disputar una mini copa con varios partidos y un cierre claro.

## 9.2 Alcance

Incluye:

* Copa corta de 3 a 5 partidos.
* Rivales predefinidos.
* Tabla simple o ruta de eliminación.
* Recompensas entre partidos.
* Eventos narrativos simples.
* Final del torneo.
* Pantalla de campeón o eliminación.

No incluye:

* Carrera completa.
* Calendario largo.
* Mercado complejo.
* Online.
* Login obligatorio.

## 9.3 Estructura sugerida

### Opción A: Eliminación directa

* Cuartos de final.
* Semifinal.
* Final.

### Opción B: Mini liga

* Tres partidos.
* Tabla de puntos.
* Final contra el mejor rival.

## 9.4 Criterio de éxito

El torneo debe dar una razón para jugar varios partidos seguidos.

---

# 10. Versión 0.3 — Carrera local ligera

## 10.1 Objetivo

Construir una primera experiencia de “Camino a la Final”.

El jugador empieza con un equipo básico y lo mejora durante una campaña corta.

## 10.2 Alcance

Incluye:

* Equipo inicial.
* Progresión entre partidos.
* Eventos narrativos.
* Mejoras de jugadores.
* Desbloqueo de cartas.
* Moral simple.
* Química simple.
* Rivales con estilos diferentes.
* Final de campaña.

No incluye:

* Fichajes complejos.
* Economía avanzada.
* Base de datos online.
* Ranking.
* Multijugador.

## 10.3 Eventos posibles

* El delantero llegó tarde.
* El portero está lesionado.
* Aparece un patrocinador local.
* La cancha está en mal estado.
* El rival provocó al equipo.
* Un jugador pide más protagonismo.
* El capitán quiere hablar con el grupo.

## 10.4 Criterio de éxito

El jugador debe sentir que su equipo tiene historia y que sus decisiones fuera del partido importan.

---

# 11. Versión 0.4 — Persistencia local

## 11.1 Objetivo

Permitir guardar progreso sin necesidad de backend.

Esta versión sirve como puente antes de agregar cuentas reales.

## 11.2 Alcance

Incluye:

* Guardado en `localStorage`.
* Equipo del jugador.
* Cartas desbloqueadas.
* Progreso de campaña.
* Estadísticas básicas.
* Configuración local.

No incluye:

* Sincronización en nube.
* Login.
* Perfiles públicos.
* Multijugador online.

## 11.3 Criterio de éxito

El usuario puede cerrar y volver a abrir la app sin perder el progreso local.

## 11.4 Riesgo

El progreso local puede perderse si el usuario limpia el navegador. Por eso esta versión debe considerarse temporal.

---

# 12. Versión 0.5 — Cuentas y perfiles

## 12.1 Objetivo

Agregar identidad de usuario y persistencia real.

Aquí el proyecto empieza a parecerse más a una aplicación web completa.

## 12.2 Tecnología sugerida

* Supabase Auth.
* Supabase Database.
* Supabase Storage si se agregan avatares o escudos.
* Row Level Security.

## 12.3 Alcance

Incluye:

* Registro.
* Login.
* Perfil de usuario.
* Nombre visible.
* Avatar opcional.
* Equipo guardado.
* Cartas desbloqueadas.
* Estadísticas del usuario.
* Historial de partidos contra IA.

No incluye todavía:

* Amigos.
* Mensajes.
* Multijugador online.
* Ranking competitivo.

## 12.4 Tablas iniciales posibles

* profiles.
* user_teams.
* user_players.
* user_cards.
* user_progress.
* match_history.

## 12.5 Criterio de éxito

El usuario puede crear cuenta, entrar, jugar y conservar su progreso en la nube.

---

# 13. Versión 0.6 — Social básico

## 13.1 Objetivo

Agregar funcionalidades sociales inspiradas técnicamente en aprendizajes de Poorty Goblin Web, pero con identidad propia para este juego.

## 13.2 Alcance

Incluye:

* Buscar usuarios.
* Enviar solicitud de amistad.
* Aceptar o rechazar solicitudes.
* Lista de amigos.
* Estado en línea.
* Estado de actividad.
* Invitación básica a partida futura.
* Notificaciones simples.

Puede incluir:

* Mensajes privados básicos.

No incluye todavía:

* Partidas multijugador reales.
* Chat en vivo dentro del partido.
* Torneos privados.
* Clubes.

## 13.3 Estados de presencia

Estados sugeridos:

* En línea.
* Ausente.
* En partido.
* En menú.
* Desconectado.

## 13.4 Criterio de éxito

El usuario puede encontrar amigos, agregarlos y ver si están disponibles.

---

# 14. Versión 0.7 — Multijugador privado 1v1

## 14.1 Objetivo

Permitir partidas 1v1 contra amigos o mediante código de sala.

Esta es una de las fases más importantes y más delicadas técnicamente.

## 14.2 Alcance

Incluye:

* Crear sala privada.
* Unirse por invitación o código.
* Selección de equipo.
* Selección de mazo.
* Estados de partida.
* Turnos sincronizados.
* Resolución compartida.
* Historial de jugadas.
* Manejo de abandono.
* Resultado final guardado.

No incluye todavía:

* Ranking global.
* Temporadas competitivas.
* Matchmaking automático.
* Torneos online masivos.

## 14.3 Tecnología sugerida

* Supabase Realtime para sincronización.
* Tablas de partidas.
* RPC o lógica backend para validar jugadas críticas.
* RLS para proteger datos.

## 14.4 Estados de partida

* Creada.
* Esperando rival.
* Preparación.
* En curso.
* Esperando acción del jugador.
* Resolviendo jugada.
* Finalizada.
* Abandonada.

## 14.5 Riesgos

* Sincronización incorrecta.
* Jugadores que abandonan.
* Manipulación de resultados desde cliente.
* Latencia o estados duplicados.
* Turnos bloqueados.

## 14.6 Criterio de éxito

Dos usuarios pueden jugar una partida completa desde distintos navegadores y ver el mismo resultado.

---

# 15. Versión 0.8 — Temporadas y ranking

## 15.1 Objetivo

Agregar una capa competitiva organizada.

## 15.2 Alcance

Incluye:

* Ranking básico.
* Estadísticas online.
* Temporadas cortas.
* Recompensas por temporada.
* Historial competitivo.
* Posible matchmaking simple.

No incluye todavía:

* E-sports.
* Torneos grandes automatizados.
* Monetización compleja.
* Mercado avanzado.

## 15.3 Estadísticas posibles

* Partidas jugadas.
* Victorias.
* Derrotas.
* Empates.
* Goles anotados.
* Goles recibidos.
* Racha actual.
* Cartas más usadas.
* Equipo favorito.

## 15.4 Criterio de éxito

El usuario tiene una razón para seguir jugando más allá de las partidas casuales.

---

# 16. Versión 1.0 — Lanzamiento inicial

## 16.1 Objetivo

Lanzar una versión completa, estable y presentable del juego.

No significa que el juego tenga todas las ideas imaginables. Significa que tiene un ciclo central sólido y suficiente contenido para sostener una experiencia real.

## 16.2 Alcance esperado

Incluye:

* Partido táctico pulido.
* Buen balance inicial.
* Equipos suficientes.
* Cartas suficientes.
* Torneo o carrera corta.
* Progresión.
* Cuentas.
* Perfiles.
* Guardado en nube.
* Amigos.
* Presencia.
* Partidas privadas 1v1.
* Historial.
* Interfaz responsive.
* Experiencia visual coherente.

Puede incluir:

* Ranking simple.
* Temporadas simples.
* Mensajes privados.

No necesariamente incluye:

* App móvil nativa.
* Modo carrera gigante.
* Gran cantidad de cartas.
* Marketplace.
* Torneos automáticos complejos.
* Chat en vivo avanzado.

## 16.3 Criterio de éxito

La versión 1.0 debe sentirse como un juego real, no como prototipo.

El usuario debe poder:

1. Crear cuenta.
2. Armar o elegir equipo.
3. Jugar partidos.
4. Progresar.
5. Agregar amigos.
6. Invitar a un amigo a jugar.
7. Ver historial y estadísticas.
8. Volver otro día y continuar.

---

# 17. Expansiones futuras

Después de la versión 1.0, el juego puede crecer en varias direcciones.

## 17.1 Más contenido

* Nuevos equipos.
* Nuevas cartas.
* Nuevos jugadores.
* Nuevas canchas.
* Nuevos eventos.
* Nuevos torneos.

## 17.2 Modo carrera más profundo

* Calendario.
* Lesiones.
* Fichajes.
* Contratos.
* Cantera.
* Patrocinadores.
* Rivalidades.
* Decisiones de vestuario.

## 17.3 Modo roguelike

Campañas cortas donde cada recorrido sea diferente.

Características:

* Eventos aleatorios.
* Recompensas distintas.
* Cartas temporales.
* Lesiones permanentes durante la campaña.
* Rivales variables.
* Finales diferentes.

## 17.4 Modo fiesta o tablero

Un modo alternativo inspirado en party games, pero no como núcleo inicial.

Podría incluir:

* Casillas.
* Eventos caóticos.
* Minijuegos.
* Robos de cartas.
* Penalizaciones.
* Bonificaciones.
* Final impredecible.

## 17.5 Clubes o grupos

* Crear club.
* Invitar miembros.
* Ranking interno.
* Torneos privados.
* Estadísticas de club.

## 17.6 App móvil

Posibilidades:

* PWA instalable.
* Capacitor.
* React Native.

No debe priorizarse antes de validar el producto web.

---

# 18. Funcionalidades que deben evitarse al inicio

Estas funcionalidades pueden sonar atractivas, pero no deben adelantarse:

* Fútbol en tiempo real.
* Motor 3D.
* 11 contra 11 completo.
* App nativa inmediata.
* Marketplace.
* Cartas pagadas.
* Economía compleja.
* Matchmaking competitivo prematuro.
* Torneos masivos.
* Chat en vivo avanzado.
* Personalización excesiva.
* Demasiados equipos.
* Demasiadas cartas.
* Demasiadas estadísticas.

Cada una puede multiplicar la complejidad antes de que el juego base esté validado.

---

# 19. Orden recomendado de implementación

## Ciclo 1: Núcleo jugable

1. Tipos.
2. Datos mock.
3. Motor.
4. Resolución.
5. IA simple.
6. Pantalla de partido.
7. Resumen final.

## Ciclo 2: Pulido del partido

1. Mejor UI.
2. Animaciones.
3. Mejor narración.
4. Mejor balance.
5. Indicadores de riesgo.
6. Historial de jugadas.

## Ciclo 3: Progresión

1. Recompensas.
2. XP.
3. Mejoras.
4. Desbloqueos.
5. Progreso temporal.

## Ciclo 4: Torneo/carrera local

1. Rivales.
2. Calendario simple.
3. Eventos.
4. Final de torneo.

## Ciclo 5: Persistencia

1. LocalStorage.
2. Guardado temporal.
3. Migración posterior a Supabase.

## Ciclo 6: Cuentas

1. Auth.
2. Perfiles.
3. Progreso en base de datos.
4. Historial.

## Ciclo 7: Social

1. Amigos.
2. Presencia.
3. Invitaciones.
4. Mensajes básicos.

## Ciclo 8: Multijugador

1. Salas.
2. Turnos.
3. Realtime.
4. Validación.
5. Abandono.
6. Resultado final.

## Ciclo 9: Competitivo

1. Ranking.
2. Temporadas.
3. Estadísticas.
4. Recompensas.

---

# 20. Priorización por valor y riesgo

## Alto valor, bajo riesgo

* Datos mock.
* Motor local.
* Cartas.
* Energía.
* Momentum.
* Narración.
* UI básica.
* Resumen final.

Estas deben hacerse primero.

## Alto valor, riesgo medio

* Progresión.
* Torneo corto.
* Eventos narrativos.
* Persistencia local.
* Balance avanzado.

Estas van después de validar el partido.

## Alto valor, alto riesgo

* Login con progreso.
* Funciones sociales.
* Multijugador.
* Realtime.
* Ranking.

Estas son importantes, pero deben esperar.

## Bajo valor inicial, alto riesgo

* App nativa.
* Motor 3D.
* Animaciones complejas.
* Chat avanzado.
* Economía compleja.
* Marketplace.

Estas deben evitarse al inicio.

---

# 21. Criterios para pasar de una versión a otra

## Pasar de Prototipo 0 a MVP 1

Cuando el motor pueda simular un partido completo correctamente.

## Pasar de MVP 1 a MVP 2

Cuando la primera UI permita jugar un partido de inicio a fin.

## Pasar de MVP 2 a Versión 0.1

Cuando el partido se sienta suficientemente claro y divertido.

## Pasar de Versión 0.1 a 0.2

Cuando las recompensas y mejoras funcionen de forma básica.

## Pasar de Versión 0.2 a 0.3

Cuando el torneo corto genere ganas de jugar varios partidos.

## Pasar de Versión 0.3 a 0.4

Cuando exista progreso que valga la pena guardar.

## Pasar de Versión 0.4 a 0.5

Cuando el guardado local ya no sea suficiente y tenga sentido crear cuentas.

## Pasar de Versión 0.5 a 0.6

Cuando el usuario tenga identidad y progreso que pueda compartir o comparar.

## Pasar de Versión 0.6 a 0.7

Cuando el sistema de amigos y presencia esté estable.

## Pasar de Versión 0.7 a 0.8

Cuando las partidas privadas funcionen bien y sea razonable competir.

## Pasar de Versión 0.8 a 1.0

Cuando el juego tenga estabilidad, contenido suficiente, buena experiencia y un ciclo completo.

---

# 22. Decisiones pendientes por resolver en el futuro

Estas decisiones no bloquean el inicio, pero deben resolverse antes de versiones avanzadas.

## Producto

* Nombre definitivo.
* Identidad visual.
* Tono narrativo.
* Público objetivo.
* Nivel de humor.
* Si se mantendrá una identidad muy tica o más latinoamericana/global.

## Gameplay

* Cantidad final de jugadores por equipo.
* Si la energía será por equipo o por jugador en versiones avanzadas.
* Si habrá mazos personalizados.
* Si habrá cartas raras o solo cartas desbloqueables.
* Si habrá eventos permanentes.
* Si habrá lesiones largas.
* Si habrá fichajes.

## Técnica

* Cuándo integrar Supabase.
* Qué lógica debe vivir en cliente, SQL RPC o Edge Functions.
* Cómo prevenir manipulación de resultados.
* Cómo manejar abandono en multijugador.
* Cómo manejar reconexión.
* Cómo estructurar RLS.

## Comunidad

* Si habrá chat.
* Si habrá clubes.
* Si habrá torneos privados.
* Si habrá rankings públicos.
* Si habrá moderación de nombres o mensajes.

---

# 23. Roadmap resumido

## Primero

Construir el partido.

## Después

Pulirlo.

## Luego

Agregar progresión.

## Luego

Crear torneo/carrera local.

## Luego

Guardar progreso.

## Luego

Agregar cuentas.

## Luego

Agregar amigos y presencia.

## Luego

Agregar multijugador.

## Finalmente

Competitivo, temporadas, rankings y expansiones.

---

# 24. Conclusión

El proyecto tiene potencial para crecer mucho, pero debe hacerlo en orden.

La dirección correcta no es construir desde el primer día una aplicación enorme con login, amigos, mensajes, online, torneos, ranking, progresión y cartas coleccionables. La dirección correcta es validar primero el corazón:

> Un partido corto, táctico, emocionante y entendible, donde elegir cartas en momentos clave se sienta divertido.

Cuando ese núcleo funcione, cada versión futura tendrá una base sólida sobre la cual crecer.

Este roadmap debe servir como brújula para decidir qué hacer, qué posponer y qué evitar en cada etapa del desarrollo.