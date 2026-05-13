# Historias de usuario y backlog inicial

# La Mejenga: Camino a la Final

## 1. Propósito del documento

Este documento convierte la documentación conceptual, técnica y de requerimientos de **La Mejenga: Camino a la Final** en un backlog inicial de desarrollo.

Su objetivo es responder:

* Qué se debe construir primero.
* En qué orden conviene hacerlo.
* Qué historias de usuario representan cada funcionalidad.
* Qué criterios de aceptación debe cumplir cada tarea.
* Qué tareas pertenecen al MVP y cuáles deben esperar.

Este documento sirve como puente entre la planificación y la implementación.

---

## 2. Enfoque del backlog

El backlog debe seguir una regla principal:

> Primero se construye el partido. Después se construye todo lo demás.

Por eso, las primeras historias se enfocan en:

1. Crear estructura del proyecto.
2. Definir tipos y datos mock.
3. Construir el motor del partido.
4. Crear la interfaz mínima para jugar.
5. Probar el flujo completo.
6. Pulir visualmente.
7. Balancear.

No se deben iniciar todavía historias relacionadas con:

* Login.
* Amigos.
* Mensajes.
* Supabase.
* Multijugador.
* Ranking.
* Tienda.
* App móvil.

---

## 3. Niveles de prioridad

| Prioridad | Significado                                        |
| --------- | -------------------------------------------------- |
| P0        | Bloqueante para que exista el MVP 1                |
| P1        | Necesario para que el MVP 1 se sienta jugable      |
| P2        | Mejora importante, pero no bloquea la primera demo |
| P3        | Futuro cercano, después de validar MVP 1           |
| P4        | Futuro avanzado                                    |

---

## 4. Épicas principales

| Épica                            | Descripción                              | Prioridad |
| -------------------------------- | ---------------------------------------- | --------- |
| E-001 Configuración del proyecto | Crear base técnica del frontend          | P0        |
| E-002 Datos del juego            | Equipos, jugadores, cartas y situaciones | P0        |
| E-003 Motor de partido           | Reglas, resolución, IA y estado          | P0        |
| E-004 Interfaz de partido        | Pantalla jugable del MVP                 | P0        |
| E-005 Experiencia visual         | Cartas, barras, animaciones y claridad   | P1        |
| E-006 Balance inicial            | Ajuste de reglas y probabilidades        | P1        |
| E-007 Progresión simple          | Recompensas y mejoras futuras            | P3        |
| E-008 Torneo/carrera             | Estructura de varios partidos            | P3        |
| E-009 Persistencia               | Guardado local y luego nube              | P3/P4     |
| E-010 Social y multijugador      | Amigos, presencia y partidas 1v1         | P4        |

---

# 5. Épica E-001 — Configuración del proyecto

## HU-001 — Crear proyecto base

**Como** desarrollador,
**quiero** crear el proyecto base con Next.js, React, TypeScript y Tailwind,
**para** tener una estructura lista para construir el MVP.

### Prioridad

P0

### Criterios de aceptación

* El proyecto corre localmente.
* TypeScript está habilitado.
* Tailwind está configurado.
* Existe una ruta inicial funcional.
* La aplicación puede abrirse en navegador sin errores.

### Tareas técnicas

* Crear proyecto Next.js.
* Configurar TypeScript.
* Configurar Tailwind.
* Limpiar archivos iniciales innecesarios.
* Crear estructura base de carpetas.

---

## HU-002 — Crear estructura inicial de carpetas

**Como** desarrollador,
**quiero** organizar el proyecto por módulos,
**para** separar interfaz, lógica de juego y datos.

### Prioridad

P0

### Criterios de aceptación

* Existe carpeta `src/lib/game`.
* Existe carpeta `src/components/match`.
* Existe carpeta `src/components/team`.
* Existe carpeta `src/components/ui`.
* Existe ruta `src/app/match/page.tsx`.

### Estructura esperada

```txt
src/
  app/
    page.tsx
    match/
      page.tsx
  components/
    match/
    team/
    ui/
  lib/
    game/
```

---

## HU-003 — Crear pantalla inicial temporal

**Como** jugador,
**quiero** ver una pantalla inicial simple,
**para** poder entrar al partido rápido.

### Prioridad

P1

### Criterios de aceptación

* La pantalla muestra el nombre provisional del juego.
* Hay un botón para iniciar partido rápido.
* El botón dirige a la ruta de partido.
* La pantalla es visualmente limpia.

---

# 6. Épica E-002 — Datos del juego

## HU-004 — Definir tipos base del juego

**Como** desarrollador,
**quiero** definir tipos TypeScript para jugadores, equipos, cartas, situaciones y estado de partido,
**para** construir el motor de forma segura y ordenada.

### Prioridad

P0

### Criterios de aceptación

* Existe archivo `src/lib/game/types.ts`.
* Están definidos los tipos principales.
* No se usa `any` para entidades centrales.
* Los tipos pueden importarse desde otros archivos.

### Tipos mínimos

* `PlayerRole`
* `Player`
* `TeamStyle`
* `Team`
* `CardType`
* `TacticalCard`
* `SituationType`
* `MatchSituation`
* `MatchState`
* `MatchEvent`
* `PlayOutcome`

---

## HU-005 — Crear equipos iniciales

**Como** jugador,
**quiero** elegir entre equipos predefinidos,
**para** probar estilos distintos desde el MVP.

### Prioridad

P0

### Criterios de aceptación

* Existe archivo `src/lib/game/teams.ts`.
* Hay al menos dos equipos.
* Cada equipo tiene nombre, estilo, descripción, fortalezas, debilidades y jugadores.
* Cada equipo tiene 5 jugadores.
* Cada jugador tiene estadísticas y rasgo especial.

### Equipos iniciales

* Los del Parque.
* Cemento FC.

---

## HU-006 — Crear cartas tácticas iniciales

**Como** jugador,
**quiero** tener cartas tácticas disponibles,
**para** tomar decisiones durante cada momento clave.

### Prioridad

P0

### Criterios de aceptación

* Existe archivo `src/lib/game/cards.ts`.
* Hay 20 cartas iniciales.
* Cada carta tiene ID, nombre, tipo, descripción, poder base, riesgo y costo de energía.
* Las cartas están clasificadas por ataque, defensa, medio campo y especiales.

### Cartas mínimas

Ataque:

* Pase filtrado.
* Regate individual.
* Centro al área.
* Tiro lejano.
* Pared rápida.
* Tiro colocado.

Defensa:

* Presión alta.
* Bloque bajo.
* Barrida fuerte.
* Línea adelantada.
* Marcar al hombre.
* Anticipación.

Medio campo:

* Toque corto.
* Cambio de banda.
* Pelotazo.
* Pausa y control.

Especiales:

* Última jugada.
* La hinchada empuja.
* Todo o nada.
* Enfriar el partido.

---

## HU-007 — Crear situaciones de partido

**Como** jugador,
**quiero** enfrentar momentos clave diferentes durante el partido,
**para** sentir que cada jugada tiene contexto.

### Prioridad

P0

### Criterios de aceptación

* Existe archivo `src/lib/game/situations.ts`.
* Hay al menos 8 situaciones iniciales.
* Cada situación tiene ID, minuto, título, descripción y tipo.
* Las situaciones se pueden usar desde el motor.

### Situaciones iniciales

* Ataque por banda.
* Ataque por el centro.
* Contraataque.
* Posesión en medio campo.
* Presión rival.
* Tiro libre.
* Córner.
* Última jugada.

---

## HU-008 — Centralizar constantes de balance

**Como** desarrollador,
**quiero** centralizar los valores numéricos del juego,
**para** poder balancear sin modificar muchos archivos.

### Prioridad

P0

### Criterios de aceptación

* Existe archivo `src/lib/game/balance.ts`.
* Contiene energía inicial, momentum inicial, cantidad de momentos, cartas por mano y umbrales de resultado.
* El motor usa estas constantes.

---

# 7. Épica E-003 — Motor de partido

## HU-009 — Crear utilidades del motor

**Como** desarrollador,
**quiero** tener funciones auxiliares reutilizables,
**para** simplificar cálculos del motor.

### Prioridad

P0

### Criterios de aceptación

* Existe archivo `src/lib/game/utils.ts`.
* Existe función `clamp`.
* Existe función `randomBetween`.
* Existe función `pickRandom`.
* Existe función `shuffle` o equivalente.

---

## HU-010 — Iniciar estado de partido

**Como** jugador,
**quiero** que el sistema cree un partido correctamente,
**para** comenzar con marcador, energía y momentum inicial.

### Prioridad

P0

### Criterios de aceptación

* Existe función `startMatch`.
* El partido inicia 0-0.
* La energía inicial de ambos equipos es 100 o el valor definido en balance.
* El momentum inicial de ambos equipos es 50 o el valor definido en balance.
* El estado inicial queda en `in_progress`.
* El historial inicia vacío.

---

## HU-011 — Obtener situación actual

**Como** sistema,
**quiero** obtener la situación correspondiente al momento actual,
**para** presentarla al jugador durante el partido.

### Prioridad

P0

### Criterios de aceptación

* Existe función `getCurrentSituation`.
* La situación corresponde al índice actual del partido.
* No se devuelve una situación inválida.
* Al terminar los momentos, el partido puede marcarse como finalizado.

---

## HU-012 — Generar mano de cartas

**Como** jugador,
**quiero** recibir una mano de cartas adecuada a cada situación,
**para** tomar una decisión táctica.

### Prioridad

P0

### Criterios de aceptación

* Existe función `getAvailableCardsForSituation`.
* Devuelve 4 cartas para el MVP.
* Incluye cartas razonables para la situación.
* No devuelve cartas duplicadas.
* La función puede usarse en cada momento clave.

---

## HU-013 — Seleccionar protagonista de jugada

**Como** sistema,
**quiero** seleccionar un jugador protagonista según la situación,
**para** que la resolución use estadísticas relevantes.

### Prioridad

P1

### Criterios de aceptación

* Existe función `selectProtagonist`.
* Para ataques se priorizan delanteros o mediocampistas.
* Para defensa se priorizan defensas o mediocampistas.
* Para tiros libres se prioriza técnica/ataque.
* Para última jugada se prioriza ataque/mentalidad.

---

## HU-014 — Crear IA simple

**Como** jugador,
**quiero** que el rival elija cartas de forma básica pero lógica,
**para** que el partido no se sienta completamente aleatorio.

### Prioridad

P0

### Criterios de aceptación

* Existe función `chooseAiCard`.
* La IA elige cartas válidas.
* La IA considera situación, marcador y energía.
* Si va ganando, tiende a ser más conservadora.
* Si va perdiendo, tiende a tomar más riesgo.

---

## HU-015 — Resolver una jugada

**Como** jugador,
**quiero** que el sistema resuelva la jugada después de elegir carta,
**para** ver si mi decisión funcionó.

### Prioridad

P0

### Criterios de aceptación

* Existe función `resolvePlay`.
* La función recibe estado de partido, situación, carta del usuario y carta rival.
* La función devuelve un evento de partido.
* El evento incluye outcome, narración, cambios de energía, cambios de momentum y posible cambio de marcador.
* La resolución considera poder de carta, stats, counters, energía, momentum, situación y azar controlado.

---

## HU-016 — Aplicar resultado al estado de partido

**Como** sistema,
**quiero** actualizar el estado después de cada jugada,
**para** mantener marcador, energía, momentum e historial correctos.

### Prioridad

P0

### Criterios de aceptación

* Existe función `applyMatchEvent` o lógica equivalente dentro de `playMoment`.
* Se actualiza marcador si hay gol.
* Se actualiza energía.
* Se actualiza momentum.
* El evento se agrega al historial.
* Energía y momentum se mantienen entre 0 y 100.

---

## HU-017 — Avanzar al siguiente momento

**Como** jugador,
**quiero** poder avanzar después de ver una resolución,
**para** continuar el partido.

### Prioridad

P0

### Criterios de aceptación

* Después de cada jugada, el índice del momento aumenta.
* Si quedan momentos, se carga la siguiente situación.
* Si no quedan momentos, el partido pasa a `finished`.
* No se puede jugar después de que el partido finalizó.

---

## HU-018 — Generar narración de jugada

**Como** jugador,
**quiero** leer una narración de lo ocurrido,
**para** entender el resultado y sentir personalidad en el partido.

### Prioridad

P0

### Criterios de aceptación

* Existe función `generateNarration`.
* La narración depende del outcome.
* La narración puede mencionar equipo, jugador o carta.
* La narración no es excesivamente larga.
* Existe al menos una narración para cada outcome principal.

---

# 8. Épica E-004 — Interfaz de partido

## HU-019 — Crear flujo de selección de equipo

**Como** jugador,
**quiero** seleccionar mi equipo desde una pantalla visual,
**para** comenzar un partido rápido.

### Prioridad

P0

### Criterios de aceptación

* Existe componente `TeamSelect`.
* Muestra los equipos disponibles.
* Permite seleccionar un equipo.
* Muestra información básica del equipo.
* Al seleccionar, se inicia el partido.

---

## HU-020 — Crear pantalla principal de partido

**Como** jugador,
**quiero** ver una pantalla de partido clara,
**para** tomar decisiones durante cada momento clave.

### Prioridad

P0

### Criterios de aceptación

* Existe componente `MatchScreen`.
* Muestra marcador.
* Muestra situación actual.
* Muestra energía y momentum.
* Muestra cartas disponibles.
* Permite elegir una carta.
* Muestra resultado después de resolver.
* Permite avanzar a la siguiente jugada.

---

## HU-021 — Mostrar marcador

**Como** jugador,
**quiero** ver el marcador y el minuto,
**para** entender el estado del partido.

### Prioridad

P0

### Criterios de aceptación

* Existe componente `Scoreboard`.
* Muestra nombres de equipos.
* Muestra marcador actual.
* Muestra minuto de la situación.
* Se actualiza después de un gol.

---

## HU-022 — Mostrar energía

**Como** jugador,
**quiero** ver la energía de ambos equipos,
**para** decidir si usar cartas costosas o conservar recursos.

### Prioridad

P0

### Criterios de aceptación

* Existe componente `EnergyBar`.
* Muestra valor de 0 a 100.
* Se actualiza después de cada jugada.
* Es visualmente clara.

---

## HU-023 — Mostrar momentum

**Como** jugador,
**quiero** ver el momentum de ambos equipos,
**para** entender quién tiene el impulso emocional del partido.

### Prioridad

P0

### Criterios de aceptación

* Existe componente `MomentumBar`.
* Muestra valor de 0 a 100.
* Se actualiza después de cada jugada.
* Es visualmente clara.

---

## HU-024 — Mostrar situación actual

**Como** jugador,
**quiero** ver la situación actual del partido,
**para** elegir una carta adecuada.

### Prioridad

P0

### Criterios de aceptación

* Existe componente `SituationPanel`.
* Muestra minuto, título y descripción.
* Muestra tipo de situación.
* Puede mostrar jugador protagonista si está disponible.

---

## HU-025 — Mostrar cartas tácticas

**Como** jugador,
**quiero** ver cartas tácticas claras y legibles,
**para** elegir mi acción.

### Prioridad

P0

### Criterios de aceptación

* Existe componente `TacticalCardView`.
* Cada carta muestra nombre, tipo, descripción, poder, riesgo y costo.
* La carta puede seleccionarse.
* La carta seleccionada se diferencia visualmente.

---

## HU-026 — Mostrar mano de cartas

**Como** jugador,
**quiero** ver mis cartas disponibles en conjunto,
**para** comparar opciones antes de decidir.

### Prioridad

P0

### Criterios de aceptación

* Existe componente `CardHand`.
* Renderiza 4 cartas.
* Recibe función `onSelectCard`.
* No permite seleccionar cartas deshabilitadas.

---

## HU-027 — Mostrar resolución de jugada

**Como** jugador,
**quiero** ver el resultado de la jugada después de elegir carta,
**para** entender qué pasó.

### Prioridad

P0

### Criterios de aceptación

* Existe componente `PlayResolutionPanel`.
* Muestra carta del usuario.
* Muestra carta rival.
* Muestra outcome.
* Muestra narración.
* Muestra cambios de energía y momentum.
* Muestra si hubo gol.

---

## HU-028 — Mostrar historial breve

**Como** jugador,
**quiero** ver las últimas jugadas,
**para** recordar cómo se ha desarrollado el partido.

### Prioridad

P1

### Criterios de aceptación

* Existe componente `MatchHistory`.
* Muestra al menos las últimas 3 jugadas.
* Cada entrada muestra minuto, resultado y marcador parcial.
* No satura la pantalla.

---

## HU-029 — Mostrar resumen final

**Como** jugador,
**quiero** ver un resumen al terminar el partido,
**para** conocer el resultado final y decidir si juego de nuevo.

### Prioridad

P0

### Criterios de aceptación

* Existe componente `FinalSummary`.
* Muestra marcador final.
* Indica ganador o empate.
* Muestra energía y momentum final.
* Muestra jugadas destacadas o historial resumido.
* Incluye botón para jugar de nuevo.

---

# 9. Épica E-005 — Experiencia visual

## HU-030 — Aplicar estilo visual inicial

**Como** jugador,
**quiero** una interfaz atractiva y coherente,
**para** que el MVP se sienta como juego y no como formulario.

### Prioridad

P1

### Criterios de aceptación

* La pantalla de partido tiene una composición clara.
* Las cartas se ven como cartas de juego.
* Los paneles tienen jerarquía visual.
* La identidad se siente urbana/de barrio sin depender de assets complejos.

---

## HU-031 — Agregar animación de selección de carta

**Como** jugador,
**quiero** que la carta seleccionada tenga una reacción visual,
**para** sentir que mi acción fue reconocida.

### Prioridad

P1

### Criterios de aceptación

* La carta seleccionada cambia visualmente.
* Hay transición suave.
* La animación no retrasa innecesariamente el partido.

---

## HU-032 — Agregar revelación de carta rival

**Como** jugador,
**quiero** ver la carta rival revelarse,
**para** sentir tensión antes del resultado.

### Prioridad

P1

### Criterios de aceptación

* La carta rival se muestra después de la elección del usuario.
* La revelación es clara.
* La animación es breve.

---

## HU-033 — Agregar feedback visual para goles y atajadas

**Como** jugador,
**quiero** ver efectos visuales cuando hay gol o atajada,
**para** que los momentos importantes se sientan emocionantes.

### Prioridad

P1

### Criterios de aceptación

* Hay efecto visual diferenciado para gol.
* Hay efecto visual diferenciado para atajada o bloqueo importante.
* No se usan animaciones excesivamente largas.

---

## HU-034 — Mejorar experiencia responsive

**Como** jugador móvil,
**quiero** poder jugar cómodamente desde pantalla pequeña,
**para** que el juego funcione como web app responsive.

### Prioridad

P1

### Criterios de aceptación

* Las cartas pueden tocarse en móvil.
* El marcador sigue siendo visible.
* Energía y momentum son legibles.
* No hay desbordes horizontales graves.

---

# 10. Épica E-006 — Balance inicial

## HU-035 — Ajustar frecuencia de goles

**Como** diseñador del juego,
**quiero** ajustar la frecuencia de goles,
**para** que los partidos sean emocionantes sin volverse absurdos.

### Prioridad

P1

### Criterios de aceptación

* Un partido promedio no termina siempre 0-0.
* Un partido promedio no termina siempre con marcadores exagerados.
* Las cartas ofensivas generan peligro razonable.
* Las defensivas pueden contener sin bloquear todo.

---

## HU-036 — Ajustar impacto de energía

**Como** diseñador del juego,
**quiero** que la energía afecte decisiones,
**para** evitar que el jugador use siempre cartas fuertes.

### Prioridad

P1

### Criterios de aceptación

* Usar cartas caras tiene consecuencias.
* Llegar con poca energía penaliza rendimiento.
* Cartas conservadoras tienen valor.
* La energía no castiga de forma excesiva.

---

## HU-037 — Ajustar impacto de momentum

**Como** diseñador del juego,
**quiero** que el momentum agregue emoción,
**para** crear sensación de impulso y remontadas.

### Prioridad

P1

### Criterios de aceptación

* El momentum afecta ligeramente la resolución.
* No garantiza victorias automáticas.
* Subir momentum se siente satisfactorio.
* Perder momentum se siente relevante pero no injusto.

---

## HU-038 — Revisar counters de cartas

**Como** jugador,
**quiero** que cada carta tenga fortalezas y debilidades,
**para** que elegir no sea automático.

### Prioridad

P1

### Criterios de aceptación

* Ninguna carta es siempre la mejor.
* Cartas fuertes tienen riesgo o costo alto.
* Existen interacciones lógicas entre cartas.
* El usuario puede intuir por qué una carta funcionó o falló.

---

# 11. Épica E-007 — Progresión simple

Estas historias no pertenecen al MVP 1. Deben iniciar después de validar el partido.

## HU-039 — Entregar recompensa postpartido

**Como** jugador,
**quiero** recibir una recompensa después del partido,
**para** sentir que avanzar tiene valor.

### Prioridad

P3

### Criterios de aceptación

* Al finalizar un partido se calcula recompensa.
* Ganar da mayor recompensa que perder.
* Completar partido siempre da algo mínimo.
* La recompensa se muestra claramente.

---

## HU-040 — Mejorar un jugador

**Como** jugador,
**quiero** mejorar estadísticas de un jugador,
**para** fortalecer mi equipo entre partidos.

### Prioridad

P3

### Criterios de aceptación

* El usuario puede elegir un jugador.
* Puede elegir una estadística a mejorar.
* La mejora se refleja en futuros partidos.
* Hay límites para evitar desequilibrio.

---

## HU-041 — Desbloquear carta nueva

**Como** jugador,
**quiero** desbloquear cartas nuevas,
**para** variar mi estrategia.

### Prioridad

P3

### Criterios de aceptación

* El sistema otorga una carta nueva.
* La carta queda disponible para siguientes partidos.
* El usuario recibe una confirmación visual.

---

# 12. Épica E-008 — Torneo y carrera local

## HU-042 — Crear torneo corto

**Como** jugador,
**quiero** jugar una copa corta,
**para** tener un objetivo más grande que un partido aislado.

### Prioridad

P3

### Criterios de aceptación

* El torneo tiene varios partidos.
* Hay rivales definidos.
* El usuario avanza según resultados.
* Existe una final o cierre claro.

---

## HU-043 — Crear evento entre partidos

**Como** jugador,
**quiero** enfrentar eventos narrativos entre partidos,
**para** sentir que mi equipo tiene historia.

### Prioridad

P3

### Criterios de aceptación

* El evento tiene título y descripción.
* El usuario puede tomar una decisión.
* La decisión tiene consecuencia.
* La consecuencia afecta algún valor del equipo o próximo partido.

---

# 13. Épica E-009 — Persistencia

## HU-044 — Guardar progreso local

**Como** jugador,
**quiero** que mi progreso se guarde localmente,
**para** poder cerrar y volver sin perder todo.

### Prioridad

P3

### Criterios de aceptación

* El progreso se guarda en `localStorage`.
* Se recupera al abrir nuevamente la app.
* Existe opción de reiniciar progreso.

---

## HU-045 — Crear cuenta de usuario

**Como** jugador,
**quiero** crear una cuenta,
**para** guardar mi progreso en la nube.

### Prioridad

P4

### Criterios de aceptación

* El usuario puede registrarse.
* Puede iniciar sesión.
* Puede cerrar sesión.
* El progreso queda asociado a la cuenta.

---

# 14. Épica E-010 — Social y multijugador

## HU-046 — Agregar amigos

**Como** jugador,
**quiero** agregar amigos,
**para** jugar y comparar progreso con personas conocidas.

### Prioridad

P4

### Criterios de aceptación

* El usuario puede buscar otro usuario.
* Puede enviar solicitud.
* El otro usuario puede aceptar o rechazar.
* La amistad aceptada aparece en lista.

---

## HU-047 — Ver amigos en línea

**Como** jugador,
**quiero** ver cuáles amigos están conectados,
**para** saber a quién puedo invitar a jugar.

### Prioridad

P4

### Criterios de aceptación

* Se muestra estado de presencia.
* El estado se actualiza automáticamente.
* Se diferencia entre en línea, en partido y desconectado.

---

## HU-048 — Crear partida privada 1v1

**Como** jugador,
**quiero** crear una partida privada,
**para** jugar contra un amigo.

### Prioridad

P4

### Criterios de aceptación

* El usuario puede crear sala.
* Otro usuario puede unirse.
* Ambos ven el mismo estado de partida.
* La partida puede completarse.

---

## HU-049 — Sincronizar jugadas multijugador

**Como** jugador,
**quiero** que las jugadas se sincronicen entre ambos usuarios,
**para** que el partido 1v1 sea justo.

### Prioridad

P4

### Criterios de aceptación

* Ambos jugadores envían su carta.
* El sistema resuelve la jugada una sola vez.
* Ambos ven el mismo resultado.
* El historial coincide.

---

# 15. Backlog técnico inicial del MVP 1

Este es el orden recomendado para empezar desarrollo.

## Bloque 1 — Base del proyecto

| ID    | Tarea                                            | Prioridad |
| ----- | ------------------------------------------------ | --------- |
| T-001 | Crear proyecto Next.js con TypeScript y Tailwind | P0        |
| T-002 | Crear estructura de carpetas                     | P0        |
| T-003 | Crear ruta inicial `/`                           | P1        |
| T-004 | Crear ruta `/match`                              | P0        |

---

## Bloque 2 — Tipos y datos

| ID    | Tarea                                   | Prioridad |
| ----- | --------------------------------------- | --------- |
| T-005 | Crear `types.ts`                        | P0        |
| T-006 | Crear `balance.ts`                      | P0        |
| T-007 | Crear `teams.ts` con 2 equipos          | P0        |
| T-008 | Crear `cards.ts` con 20 cartas          | P0        |
| T-009 | Crear `situations.ts` con 8 situaciones | P0        |
| T-010 | Crear `utils.ts`                        | P0        |

---

## Bloque 3 — Motor

| ID    | Tarea                                 | Prioridad |
| ----- | ------------------------------------- | --------- |
| T-011 | Crear `startMatch`                    | P0        |
| T-012 | Crear `getCurrentSituation`           | P0        |
| T-013 | Crear `getAvailableCardsForSituation` | P0        |
| T-014 | Crear `selectProtagonist`             | P1        |
| T-015 | Crear `chooseAiCard`                  | P0        |
| T-016 | Crear `generateNarration`             | P0        |
| T-017 | Crear `resolvePlay`                   | P0        |
| T-018 | Crear `playMoment`                    | P0        |
| T-019 | Crear `isMatchFinished`               | P0        |

---

## Bloque 4 — UI mínima

| ID    | Tarea                       | Prioridad |
| ----- | --------------------------- | --------- |
| T-020 | Crear `TeamSelect`          | P0        |
| T-021 | Crear `MatchScreen`         | P0        |
| T-022 | Crear `Scoreboard`          | P0        |
| T-023 | Crear `EnergyBar`           | P0        |
| T-024 | Crear `MomentumBar`         | P0        |
| T-025 | Crear `SituationPanel`      | P0        |
| T-026 | Crear `TacticalCardView`    | P0        |
| T-027 | Crear `CardHand`            | P0        |
| T-028 | Crear `PlayResolutionPanel` | P0        |
| T-029 | Crear `FinalSummary`        | P0        |

---

## Bloque 5 — Flujo completo

| ID    | Tarea                                              | Prioridad |
| ----- | -------------------------------------------------- | --------- |
| T-030 | Conectar selección de equipo con inicio de partido | P0        |
| T-031 | Conectar elección de carta con resolución          | P0        |
| T-032 | Conectar botón de siguiente jugada                 | P0        |
| T-033 | Detectar final de partido                          | P0        |
| T-034 | Permitir jugar de nuevo                            | P1        |

---

## Bloque 6 — Pulido inicial

| ID    | Tarea                             | Prioridad |
| ----- | --------------------------------- | --------- |
| T-035 | Mejorar estilos de cartas         | P1        |
| T-036 | Mejorar layout responsive         | P1        |
| T-037 | Agregar historial breve           | P1        |
| T-038 | Agregar animación de selección    | P1        |
| T-039 | Agregar revelación de carta rival | P1        |
| T-040 | Agregar efecto de gol/atajada     | P1        |

---

## Bloque 7 — Balance

| ID    | Tarea                         | Prioridad |
| ----- | ----------------------------- | --------- |
| T-041 | Probar 10 partidos manuales   | P1        |
| T-042 | Ajustar frecuencia de goles   | P1        |
| T-043 | Ajustar costos de energía     | P1        |
| T-044 | Ajustar impacto de momentum   | P1        |
| T-045 | Revisar cartas dominantes     | P1        |
| T-046 | Mejorar narraciones repetidas | P2        |

---

# 16. Backlog futuro resumido

## Versión 0.1 — Progresión simple

| ID    | Tarea                         | Prioridad |
| ----- | ----------------------------- | --------- |
| F-001 | Crear recompensas postpartido | P3        |
| F-002 | Crear XP de jugadores         | P3        |
| F-003 | Crear mejora de estadísticas  | P3        |
| F-004 | Crear desbloqueo de cartas    | P3        |
| F-005 | Crear pantalla de progreso    | P3        |

---

## Versión 0.2 — Torneo corto

| ID    | Tarea                             | Prioridad |
| ----- | --------------------------------- | --------- |
| F-006 | Crear estructura de torneo        | P3        |
| F-007 | Crear rivales del torneo          | P3        |
| F-008 | Crear avance por rondas           | P3        |
| F-009 | Crear pantalla de torneo          | P3        |
| F-010 | Crear cierre de campeón/eliminado | P3        |

---

## Versión 0.3 — Carrera local

| ID    | Tarea                              | Prioridad |
| ----- | ---------------------------------- | --------- |
| F-011 | Crear eventos narrativos           | P3        |
| F-012 | Crear decisiones de evento         | P3        |
| F-013 | Crear moral de equipo              | P3        |
| F-014 | Crear química de equipo            | P3        |
| F-015 | Crear consecuencias entre partidos | P3        |

---

## Versión 0.4 — Persistencia local

| ID    | Tarea                            | Prioridad |
| ----- | -------------------------------- | --------- |
| F-016 | Guardar progreso en localStorage | P3        |
| F-017 | Cargar progreso al iniciar       | P3        |
| F-018 | Reiniciar progreso local         | P3        |

---

## Versión 0.5 — Cuentas

| ID    | Tarea                             | Prioridad |
| ----- | --------------------------------- | --------- |
| F-019 | Integrar Supabase Auth            | P4        |
| F-020 | Crear perfiles                    | P4        |
| F-021 | Guardar progreso en base de datos | P4        |
| F-022 | Crear historial de partidos       | P4        |

---

## Versión 0.6 — Social

| ID    | Tarea                     | Prioridad |
| ----- | ------------------------- | --------- |
| F-023 | Buscar usuarios           | P4        |
| F-024 | Solicitudes de amistad    | P4        |
| F-025 | Lista de amigos           | P4        |
| F-026 | Presencia en línea        | P4        |
| F-027 | Mensajes privados básicos | P4        |

---

## Versión 0.7 — Multijugador privado

| ID    | Tarea                           | Prioridad |
| ----- | ------------------------------- | --------- |
| F-028 | Crear sala privada              | P4        |
| F-029 | Unirse a sala                   | P4        |
| F-030 | Sincronizar selección de cartas | P4        |
| F-031 | Resolver jugada compartida      | P4        |
| F-032 | Manejar abandono                | P4        |
| F-033 | Guardar resultado 1v1           | P4        |

---

# 17. Definición de listo

Una historia se considera lista para empezar cuando cumple:

* Tiene objetivo claro.
* Tiene prioridad asignada.
* Tiene criterios de aceptación.
* No depende de una decisión pendiente importante.
* Puede implementarse en un bloque de trabajo razonable.

---

# 18. Definición de terminado

Una historia se considera terminada cuando:

* Cumple todos sus criterios de aceptación.
* No rompe el flujo existente.
* El código está integrado en la estructura correcta.
* No introduce lógica duplicada innecesaria.
* Funciona en flujo manual básico.
* Mantiene separación entre UI y lógica.

---

# 19. Primer sprint recomendado

## Objetivo del sprint

Tener una base técnica y de datos lista para construir el motor del partido.

## Historias incluidas

* HU-001 Crear proyecto base.
* HU-002 Crear estructura inicial de carpetas.
* HU-004 Definir tipos base del juego.
* HU-005 Crear equipos iniciales.
* HU-006 Crear cartas tácticas iniciales.
* HU-007 Crear situaciones de partido.
* HU-008 Centralizar constantes de balance.
* HU-009 Crear utilidades del motor.

## Resultado esperado

Al finalizar este sprint, el proyecto todavía no necesariamente será jugable, pero tendrá la base necesaria para implementar el motor.

---

# 20. Segundo sprint recomendado

## Objetivo del sprint

Tener el motor del partido funcionando sin interfaz final.

## Historias incluidas

* HU-010 Iniciar estado de partido.
* HU-011 Obtener situación actual.
* HU-012 Generar mano de cartas.
* HU-013 Seleccionar protagonista de jugada.
* HU-014 Crear IA simple.
* HU-015 Resolver una jugada.
* HU-016 Aplicar resultado al estado.
* HU-017 Avanzar al siguiente momento.
* HU-018 Generar narración.

## Resultado esperado

Al finalizar este sprint, debe ser posible simular un partido desde funciones TypeScript.

---

# 21. Tercer sprint recomendado

## Objetivo del sprint

Crear una primera interfaz jugable del partido.

## Historias incluidas

* HU-019 Crear flujo de selección de equipo.
* HU-020 Crear pantalla principal de partido.
* HU-021 Mostrar marcador.
* HU-022 Mostrar energía.
* HU-023 Mostrar momentum.
* HU-024 Mostrar situación actual.
* HU-025 Mostrar cartas tácticas.
* HU-026 Mostrar mano de cartas.
* HU-027 Mostrar resolución de jugada.
* HU-029 Mostrar resumen final.

## Resultado esperado

Al finalizar este sprint, el usuario debe poder jugar un partido completo de inicio a fin.

---

# 22. Cuarto sprint recomendado

## Objetivo del sprint

Pulir la primera experiencia jugable.

## Historias incluidas

* HU-028 Mostrar historial breve.
* HU-030 Aplicar estilo visual inicial.
* HU-031 Agregar animación de selección de carta.
* HU-032 Agregar revelación de carta rival.
* HU-033 Agregar feedback visual para goles y atajadas.
* HU-034 Mejorar experiencia responsive.
* HU-035 Ajustar frecuencia de goles.
* HU-036 Ajustar impacto de energía.
* HU-037 Ajustar impacto de momentum.
* HU-038 Revisar counters de cartas.

## Resultado esperado

Al finalizar este sprint, el MVP 1 debe sentirse como una demo real y no solo como una prueba técnica.

---

# 23. Cierre

Este backlog convierte el proyecto en una secuencia de construcción clara.

La prioridad inmediata debe ser completar las historias P0 del MVP 1. Todo lo demás puede esperar.

El orden correcto es:

1. Base técnica.
2. Datos.
3. Motor.
4. UI mínima.
5. Flujo completo.
6. Pulido.
7. Balance.
8. Progresión.
9. Persistencia.
10. Social.
11. Multijugador.

Con este documento, el proyecto ya está listo para pasar a implementación sin perder la visión completa de hacia dónde puede crecer.