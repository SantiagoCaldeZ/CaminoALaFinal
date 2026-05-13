# Documentación complementaria final

# La Mejenga: Camino a la Final

## 1. Propósito de este documento

Este documento reúne en una sola pieza todo lo que faltaba por definir antes de pasar de la planificación a la implementación real del proyecto.

La intención no es repetir todos los documentos anteriores, sino cerrar vacíos importantes que todavía podían quedar abiertos después de haber definido:

* visión general del proyecto;
* MVP 1;
* arquitectura técnica inicial;
* roadmap de versiones;
* requerimientos funcionales y no funcionales;
* historias de usuario y backlog;
* implementación de los Sprints 1, 2, 3 y 4.

A partir de este punto, la recomendación es no seguir creando documentación extensa salvo que surja una necesidad concreta. Lo siguiente debería ser implementar, probar, ajustar y documentar solo los cambios importantes.

---

# 2. Estado actual de la planificación

El proyecto ya tiene una base documental suficiente para empezar desarrollo.

## Documentación ya cubierta

| Área                       | Estado                          |
| -------------------------- | ------------------------------- |
| Concepto general del juego | Definido                        |
| Tipo de producto           | App web responsive / PWA futura |
| MVP 1                      | Definido                        |
| Motor de partido           | Especificado                    |
| Equipos iniciales          | Definidos                       |
| Cartas iniciales           | Definidas                       |
| Situaciones iniciales      | Definidas                       |
| Tecnología inicial         | Definida                        |
| Arquitectura de carpetas   | Definida                        |
| Roadmap de versiones       | Definido                        |
| Requerimientos             | Definidos                       |
| Historias de usuario       | Definidas                       |
| Sprints iniciales          | Definidos                       |

## Lo que faltaba cerrar

Este documento completa principalmente:

* identidad de producto;
* estilo visual inicial;
* convenciones de diseño;
* estrategia de assets;
* plan de pruebas;
* criterios de balance;
* decisiones pendientes;
* guía de implementación práctica;
* estrategia futura de base de datos;
* estrategia de seguridad futura;
* estrategia de despliegue;
* gestión de riesgos;
* glosario común del proyecto.

---

# 3. Identidad del producto

## 3.1 Nombre provisional

**La Mejenga: Camino a la Final**

Este nombre funciona bien para la fase inicial porque comunica:

* fútbol de barrio;
* progresión;
* torneo;
* camino competitivo;
* identidad propia.

## 3.2 Posibles nombres alternativos

Si más adelante se desea evaluar nombres, algunas opciones son:

| Nombre            | Sensación                                     |
| ----------------- | --------------------------------------------- |
| La Mejenga        | Directo, local, auténtico                     |
| Camino a la Final | Más narrativo y progresivo                    |
| Barrio FC         | Más comercial y entendible internacionalmente |
| Cancha Brava      | Más competitivo                               |
| Potrero Kings     | Más arcade                                    |
| Liga de Barrio    | Simple y claro                                |
| Domingo de Final  | Más emocional/narrativo                       |

## 3.3 Recomendación

Mantener **La Mejenga: Camino a la Final** durante desarrollo.

No conviene gastar demasiado tiempo definiendo nombre definitivo antes de validar si el juego es divertido.

---

# 4. Identidad narrativa

## 4.1 Tono del juego

El juego debe sentirse:

* futbolero;
* de barrio;
* estratégico;
* competitivo;
* ligeramente humorístico;
* con personalidad;
* no excesivamente caricaturesco;
* no demasiado serio ni corporativo.

## 4.2 Qué evitar

Evitar que el juego suene como:

* simulador deportivo realista;
* Football Manager;
* copia de FIFA/eFootball;
* juego de apuestas;
* juego de cartas genérico sin sabor futbolero;
* app administrativa disfrazada de juego.

## 4.3 Narrativa base

El jugador no está administrando un club profesional. Está construyendo un equipo de barrio que quiere abrirse camino en torneos locales, clásicos, mejengas importantes y finales cada vez más difíciles.

La historia no necesita grandes cinemáticas. Se construye con pequeñas situaciones:

* un delantero que llegó tarde;
* una cancha en mal estado;
* un rival que provoca;
* una final bajo lluvia;
* un portero improvisado que se convierte en héroe;
* un crack talentoso pero problemático;
* una hinchada que empuja en la última jugada.

---

# 5. Dirección visual inicial

## 5.1 Estilo recomendado para el MVP

Para el MVP se recomienda un estilo:

* oscuro;
* urbano;
* limpio;
* con acentos verdes/amarillos/rojos;
* inspirado en cancha nocturna, barrio, cemento, potrero y luces artificiales;
* con cartas grandes, legibles y tácticas.

No hace falta arte complejo desde el inicio.

## 5.2 Paleta conceptual inicial

Sin necesidad de fijar colores exactos todavía:

| Uso                | Sensación                     |
| ------------------ | ----------------------------- |
| Fondo principal    | Oscuro, nocturno, competitivo |
| Acento principal   | Verde cancha / victoria       |
| Acento ofensivo    | Rojo / peligro                |
| Acento defensivo   | Verde / contención            |
| Acento medio campo | Azul / control                |
| Acento especial    | Amarillo / momento decisivo   |
| Texto secundario   | Gris claro                    |

## 5.3 Diseño de cartas

Las cartas deben ser el elemento visual más importante del MVP.

Cada carta debe comunicar rápidamente:

* nombre;
* tipo;
* costo de energía;
* poder;
* riesgo;
* descripción breve;
* recomendación táctica;
* si está deshabilitada por energía.

## 5.4 Jerarquía visual durante partido

Durante el partido, lo más importante debe verse en este orden:

1. Marcador.
2. Situación actual.
3. Cartas disponibles.
4. Energía.
5. Momentum.
6. Narración/resolución.
7. Historial.

El historial no debe competir visualmente con la decisión actual.

---

# 6. Sistema de diseño mínimo

## 6.1 Componentes base

El MVP debe tener pocos componentes reutilizables, pero consistentes:

* Button.
* Panel.
* Badge.
* StatBar.
* TacticalCardView.
* Scoreboard.
* SituationPanel.
* PlayResolutionPanel.

## 6.2 Reglas visuales

* Usar bordes redondeados grandes.
* Usar tarjetas/paneles claramente separados.
* Mantener buen espacio entre secciones.
* Evitar pantallas saturadas.
* No mostrar demasiados números al mismo tiempo.
* Usar el color para apoyar, no como única explicación.
* Priorizar lectura en móvil.

## 6.3 Microinteracciones recomendadas

Para el MVP:

* hover/press en cartas;
* selección de carta con elevación o borde;
* revelación de carta rival;
* barra de energía con transición;
* barra de momentum con transición;
* panel de gol con énfasis visual;
* botón claro para continuar.

No implementar todavía:

* animaciones largas;
* jugadores moviéndose;
* balón con física;
* cinemáticas;
* canvas avanzado;
* 3D.

---

# 7. Estrategia de assets

## 7.1 MVP sin assets complejos

El MVP debe poder funcionar sin imágenes personalizadas.

Se puede usar:

* CSS;
* gradientes;
* iconografía simple si ya está disponible;
* texto fuerte;
* tarjetas visuales.

## 7.2 Assets futuros

Más adelante se pueden agregar:

* escudos inventados;
* avatares de jugadores;
* fondos de cancha;
* ilustraciones de cartas;
* efectos de gol;
* iconos por tipo de carta;
* sonidos.

## 7.3 Reglas sobre derechos

No usar:

* logos reales de clubes;
* jugadores reales;
* marcas deportivas reales;
* escudos protegidos;
* nombres de ligas reales;
* imágenes tomadas sin permiso.

El juego debe tener universo propio.

---

# 8. Convenciones de nombres

## 8.1 Proyecto

Nombre de carpeta recomendado:

```txt
la-mejenga
```

Nombre de repositorio recomendado:

```txt
la-mejenga-web
```

Si se quiere dejar claro que es prototipo:

```txt
la-mejenga-mvp
```

## 8.2 Código

| Elemento            | Convención          | Ejemplo           |
| ------------------- | ------------------- | ----------------- |
| Componentes React   | PascalCase          | `MatchScreen.tsx` |
| Funciones           | camelCase           | `resolvePlay`     |
| Tipos               | PascalCase          | `MatchState`      |
| IDs de datos        | kebab-case          | `pase-filtrado`   |
| Archivos de lógica  | kebab-case o simple | `match-engine.ts` |
| Constantes globales | UPPER_CASE          | `BALANCE`         |

## 8.3 Datos del juego

Los IDs deben ser estables. No cambiarlos sin razón, porque en futuras versiones podrían guardarse en base de datos.

Ejemplos:

```ts
"los-del-parque"
"cemento-fc"
"pase-filtrado"
"ataque-banda"
```

---

# 9. Estructura final recomendada para etapa MVP

La estructura inicial recomendada es:

```txt
src/
  app/
    page.tsx
    match/
      page.tsx

  components/
    ui/
      Button.tsx
      Panel.tsx
      Badge.tsx
      StatBar.tsx

    team/
      TeamSelect.tsx
      TeamPreview.tsx
      PlayerList.tsx

    match/
      MatchScreen.tsx
      Scoreboard.tsx
      EnergyBar.tsx
      MomentumBar.tsx
      SituationPanel.tsx
      TacticalCardView.tsx
      CardHand.tsx
      PlayResolutionPanel.tsx
      MatchHistory.tsx
      FinalSummary.tsx

  lib/
    game/
      types.ts
      balance.ts
      teams.ts
      cards.ts
      situations.ts
      utils.ts
      ai.ts
      narration.ts
      resolver.ts
      match-engine.ts
      card-advice.ts
      outcome-meta.ts
```

No crear todavía carpetas de Supabase, social o database hasta necesitarlas.

---

# 10. Estrategia de implementación inmediata

## 10.1 Orden recomendado

No implementar todo al mismo tiempo.

Orden práctico:

1. Crear proyecto.
2. Crear carpetas.
3. Crear tipos.
4. Crear datos mock.
5. Validar que datos cargan.
6. Crear motor.
7. Probar motor desde pantalla temporal.
8. Separar UI en componentes.
9. Pulir visualmente.
10. Probar partidas manuales.
11. Ajustar balance.

## 10.2 Primer objetivo real

El primer objetivo no es que se vea perfecto.

El primer objetivo es:

> Poder jugar un partido completo de inicio a fin sin errores.

Después se mejora la experiencia.

## 10.3 Qué hacer si algo se complica

Si una funcionalidad se vuelve muy compleja, reducirla:

* energía por equipo en vez de por jugador;
* IA simple en vez de IA profunda;
* datos mock en vez de base de datos;
* cartas sin imágenes en vez de ilustraciones;
* torneo después, no ahora;
* login después, no ahora.

---

# 11. Plan de pruebas manuales

## 11.1 Pruebas mínimas del MVP

Antes de considerar el MVP funcional, probar:

| Prueba                | Resultado esperado                   |
| --------------------- | ------------------------------------ |
| Entrar a `/`          | Carga pantalla inicial               |
| Entrar a `/match`     | Carga selección de equipo            |
| Elegir Los del Parque | Inicia partido contra Cemento FC     |
| Elegir Cemento FC     | Inicia partido contra Los del Parque |
| Elegir carta          | Se resuelve jugada                   |
| Usar carta costosa    | Baja energía correctamente           |
| Anotar gol            | Cambia marcador                      |
| Perder jugada         | Cambia momentum de forma razonable   |
| Jugar 8 momentos      | Aparece resumen final                |
| Jugar de nuevo        | Reinicia partido limpio              |
| Cambiar equipo        | Vuelve a selección                   |

## 11.2 Pruebas de estado

Validar que nunca pase:

* energía menor a 0;
* energía mayor a 100;
* momentum menor a 0;
* momentum mayor a 100;
* marcador negativo;
* jugar después de finalizar;
* historial vacío al final de partido con jugadas;
* carta duplicada en la misma mano;
* error por lista vacía.

## 11.3 Pruebas de responsive

Probar en:

* escritorio grande;
* laptop;
* tablet;
* móvil vertical;
* móvil horizontal.

Validar:

* cartas legibles;
* botones tocables;
* marcador visible;
* panel lateral no rompe layout;
* no hay scroll horizontal innecesario.

---

# 12. Plan de balance inicial

## 12.1 Métrica básica de balance

Probar al menos 10 partidos manuales y registrar:

| Partido | Equipo         | Resultado | Goles totales | Sensación | Problema detectado |
| ------- | -------------- | --------: | ------------: | --------- | ------------------ |
| 1       | Los del Parque |       1-0 |             1 | Bien      | Ninguno            |
| 2       | Cemento FC     |       0-0 |             0 | Lento     | Pocas ocasiones    |

## 12.2 Marcadores esperados para MVP

Con 8 momentos por partido:

### Frecuentes aceptables

* 0-0.
* 1-0.
* 1-1.
* 2-0.
* 2-1.

### Ocasionales aceptables

* 2-2.
* 3-1.
* 3-2.

### Sospechosos

* 4-3.
* 5-2.
* 0-4.
* demasiados 0-0 seguidos.

## 12.3 Si hay demasiados goles

Ajustar:

* subir `goalThreshold`;
* bajar `basePower` de cartas ofensivas;
* aumentar presión rival;
* reducir bonus de situación;
* reducir momentum positivo.

## 12.4 Si hay muy pocos goles

Ajustar:

* bajar `goalThreshold`;
* subir `chanceThreshold` o hacer más outcomes peligrosos;
* subir poder de cartas ofensivas;
* reducir penalización por riesgo;
* mejorar bonus de cartas recomendadas.

## 12.5 Si una carta domina

Ajustar:

* subir costo de energía;
* subir riesgo;
* agregar counters;
* reducir poder;
* limitar situaciones preferidas.

---

# 13. Criterios para validar diversión

El MVP 1 no debe evaluarse solo por “funciona o no funciona”. Debe evaluarse por sensación.

Preguntas clave:

1. ¿Entiendo qué está pasando?
2. ¿La situación me ayuda a decidir?
3. ¿Las cartas se sienten diferentes?
4. ¿El riesgo importa?
5. ¿La energía me obliga a pensar?
6. ¿El momentum agrega emoción?
7. ¿La narración hace más entretenido el partido?
8. ¿Los resultados parecen razonables?
9. ¿Quiero jugar otro partido?
10. ¿Se siente diferente a un juego de fútbol tradicional?

Si la respuesta a varias de estas es negativa, no se debe avanzar todavía a progresión o multijugador.

---

# 14. Registro de feedback recomendado

Cuando alguien pruebe el MVP, registrar:

```txt
Nombre del tester:
Fecha:
Equipo usado:
Resultado:

¿Qué entendió rápido?
¿Qué no entendió?
¿Qué carta le gustó más?
¿Qué carta le pareció inútil?
¿Sintió que ganó/perdió justamente?
¿Jugaría otro partido?
¿Qué cambiaría primero?
Observaciones:
```

Este feedback vale más que agregar nuevas funcionalidades sin probar.

---

# 15. Decisiones pendientes

Estas decisiones no bloquean el inicio, pero deben resolverse más adelante.

## 15.1 Identidad

* Nombre definitivo.
* Logo.
* Estilo visual final.
* Nivel de identidad tica vs latinoamericana/global.
* Nivel de humor.

## 15.2 Gameplay

* Si habrá 5v5, 7v7 o formato abstracto por líneas.
* Si la energía será por jugador en versiones avanzadas.
* Si habrá mazos personalizados.
* Si habrá rarezas de cartas.
* Si habrá cartas únicas por equipo.
* Si habrá lesiones permanentes.
* Si habrá fichajes.
* Si habrá clima/canchas con efectos.

## 15.3 Técnico

* Cuándo integrar Supabase.
* Qué lógica pasará al backend.
* Cómo validar partidas competitivas.
* Cómo manejar desconexión.
* Cómo manejar reconexión.
* Cómo estructurar tablas reales.

## 15.4 Producto

* Si se buscará PWA instalable.
* Si luego se empaquetará con Capacitor.
* Si se hará app móvil nativa.
* Si habrá ranking público.
* Si habrá temporadas.
* Si habrá monetización futura.

---

# 16. Estrategia futura de base de datos

No se usará base de datos en el MVP 1, pero conviene tener una idea futura.

## 16.1 Fase sin backend

Durante MVP 1:

* equipos en archivos `.ts`;
* cartas en archivos `.ts`;
* situaciones en archivos `.ts`;
* partido en estado local React;
* sin persistencia.

## 16.2 Persistencia local

En Versión 0.4:

* guardar progreso en `localStorage`;
* guardar equipo del usuario;
* guardar cartas desbloqueadas;
* guardar progreso de torneo/carrera.

## 16.3 Supabase futuro

En Versión 0.5:

Tablas posibles:

```txt
profiles
user_teams
user_players
user_cards
decks
deck_cards
match_history
```

En Versión 0.6 social:

```txt
friendships
friend_requests
user_presence
direct_messages
direct_message_threads
notifications
```

En Versión 0.7 multijugador:

```txt
lobbies
lobby_players
matches
match_players
match_turns
match_events
match_results
```

## 16.4 Regla importante

No migrar prematuramente a base de datos.

Primero validar el juego local. Después persistencia local. Después nube.

---

# 17. Seguridad futura

Cuando el juego tenga cuentas y multijugador, será necesario cuidar:

## 17.1 Datos privados

* Un usuario solo debe editar su propio perfil.
* Un usuario solo debe ver sus mensajes.
* Un usuario solo debe modificar su propio equipo.
* Un usuario no debe manipular cartas desbloqueadas sin permiso.

## 17.2 Partidas competitivas

En multijugador, no se debe confiar totalmente en el cliente.

Riesgos:

* alterar marcador;
* alterar energía;
* enviar cartas no disponibles;
* repetir turnos;
* modificar resultados;
* abandonar sin consecuencia.

Solución futura:

* validar turnos en backend;
* usar RPC o Edge Functions;
* guardar eventos inmutables;
* recalcular o verificar resultados;
* usar RLS en Supabase.

## 17.3 Moderación futura

Si existen nombres, mensajes o equipos personalizados, considerar:

* limitar longitud;
* filtrar contenido ofensivo básico;
* permitir reportes en versiones futuras;
* evitar exposición de datos sensibles.

---

# 18. Estrategia de despliegue

## 18.1 Desarrollo local

Durante MVP:

```bash
npm run dev
```

## 18.2 Build de producción

Antes de desplegar:

```bash
npm run build
npm run start
```

## 18.3 Plataforma recomendada

Para Next.js, la opción más sencilla es Vercel.

También se podría usar:

* Netlify;
* Render;
* Railway;
* servidor propio;
* Docker más adelante.

## 18.4 Cuándo desplegar

No hace falta desplegar desde el primer archivo.

Primer despliegue recomendado:

* después de Sprint 3 si se quiere compartir demo básica;
* idealmente después de Sprint 4 para recibir feedback real.

---

# 19. Control de versiones

## 19.1 Ramas recomendadas

Para un proyecto personal/simple:

```txt
main
feature/sprint-1-base
feature/sprint-2-engine
feature/sprint-3-ui
feature/sprint-4-polish
```

## 19.2 Commits sugeridos

Ejemplos:

```txt
chore: create initial next project
feat: add base game types and mock teams
feat: add tactical cards and match situations
feat: implement local match engine
feat: add match screen components
style: polish tactical card UI
balance: adjust goal thresholds and momentum impact
```

## 19.3 Recomendación

Hacer commits pequeños por bloque funcional.

No hacer un solo commit gigante con todo el MVP.

---

# 20. Definición de listo para implementar

Una tarea está lista para implementarse cuando:

* tiene archivo destino claro;
* tiene comportamiento esperado;
* tiene criterios de aceptación;
* no depende de una decisión mayor pendiente;
* puede probarse manualmente.

Si una tarea no cumple eso, todavía es idea, no tarea.

---

# 21. Definición de terminado

Una tarea está terminada cuando:

* compila sin errores;
* funciona en flujo manual;
* no rompe funcionalidades existentes;
* mantiene separación UI/lógica;
* no introduce `any` innecesario;
* no duplica datos;
* tiene nombres claros;
* puede explicarse fácilmente.

---

# 22. Riesgos principales del proyecto

## 22.1 Scope creep

Riesgo:

Agregar demasiadas funciones antes de validar el partido.

Mitigación:

No avanzar a login, amigos, torneo o multijugador hasta cerrar MVP 1.

## 22.2 Gameplay poco divertido

Riesgo:

Que el sistema funcione técnicamente, pero no divierta.

Mitigación:

Probar temprano, ajustar cartas, narración, riesgo y ritmo.

## 22.3 Balance frustrante

Riesgo:

Demasiado azar, demasiados goles o cartas dominantes.

Mitigación:

Centralizar balance y probar múltiples partidas.

## 22.4 Interfaz confusa

Riesgo:

El jugador no entiende qué elegir o qué pasó.

Mitigación:

Mejorar descripciones, recomendaciones, resolución y narración.

## 22.5 Multijugador prematuro

Riesgo:

Construir realtime antes de tener gameplay sólido.

Mitigación:

Posponer multijugador hasta que el modo local sea bueno.

## 22.6 Falta de identidad

Riesgo:

Que el juego se sienta como cartas genéricas con nombres de fútbol.

Mitigación:

Reforzar tono de barrio, jugadores memorables, canchas, eventos y narración.

---

# 23. Qué NO hacer todavía

Aunque pueda parecer atractivo, no hacer todavía:

* Supabase;
* login;
* amigos;
* mensajes;
* ranking;
* multijugador;
* tienda;
* cartas pagadas;
* app móvil;
* motor 3D;
* canvas avanzado;
* física de balón;
* 11 contra 11;
* personalización profunda;
* modo carrera grande;
* torneos online.

La prioridad sigue siendo:

> partido corto, claro, divertido y rejugable.

---

# 24. Qué sí hacer inmediatamente

## Etapa inmediata

1. Crear proyecto.
2. Implementar Sprint 1.
3. Verificar que datos cargan.
4. Implementar Sprint 2.
5. Verificar que el motor resuelve partidos.
6. Implementar Sprint 3.
7. Jugar un partido completo.
8. Implementar Sprint 4.
9. Probar 10 partidos.
10. Ajustar balance.

## Resultado esperado

Al final de esta etapa:

* el juego corre localmente;
* se puede jugar un partido completo;
* se puede elegir equipo;
* se entienden cartas y situaciones;
* hay narración;
* hay resumen final;
* la experiencia ya se puede enseñar para feedback.

---

# 25. Posible siguiente documentación mínima después de implementar

No crear más documentos grandes.

Después de implementar, lo único útil sería mantener archivos cortos como:

```txt
CHANGELOG.md
PLAYTEST_NOTES.md
BALANCE_NOTES.md
TODO.md
```

## 25.1 `PLAYTEST_NOTES.md`

Para anotar pruebas reales:

```txt
Fecha:
Versión:
Tester:
Resultado:
Problemas:
Cartas fuertes:
Cartas débiles:
Comentarios:
Acciones a tomar:
```

## 25.2 `BALANCE_NOTES.md`

Para anotar cambios de balance:

```txt
Cambio:
Motivo:
Efecto esperado:
Resultado después de probar:
```

## 25.3 `TODO.md`

Para tareas concretas, no ideas gigantes.

---

# 26. Glosario del proyecto

## Carta táctica

Acción que el jugador elige para resolver una situación del partido.

## Momento clave

Escena importante del partido donde se toma una decisión.

## Energía

Recurso que limita el uso de cartas intensas.

## Momentum

Impulso emocional del partido. Afecta ligeramente la resolución de jugadas.

## Outcome

Resultado de una jugada: gol, atajada, pérdida, falta, ocasión, etc.

## Protagonista

Jugador principal que ejecuta o participa en una jugada.

## IA rival

Sistema simple que elige cartas para el equipo contrario.

## MVP 1

Primera versión jugable: partido local contra IA, sin backend ni progresión.

## Progresión

Sistema futuro de recompensas, XP, mejoras y desbloqueos.

## Social

Funciones futuras como amigos, presencia, mensajes e invitaciones.

## Multijugador

Partidas futuras 1v1 contra otros usuarios sincronizadas en tiempo real.

---

# 27. Resumen ejecutivo del proyecto

**La Mejenga: Camino a la Final** es una app web de fútbol táctico por cartas, ambientada en equipos de barrio y partidos decididos por momentos clave.

La propuesta no busca simular fútbol en tiempo real. Busca crear una experiencia rápida, estratégica y con personalidad, donde el jugador tome decisiones tácticas durante jugadas importantes.

El primer objetivo es construir un MVP local contra IA, con:

* dos equipos;
* veinte cartas;
* ocho momentos por partido;
* energía;
* momentum;
* narración;
* marcador;
* resumen final.

Solo después de validar que esa experiencia es divertida se debe avanzar hacia:

* progresión;
* torneo;
* carrera;
* persistencia;
* cuentas;
* amigos;
* presencia;
* multijugador;
* ranking.

---

# 28. Cierre

La documentación ya es suficiente para empezar a construir.

A partir de ahora, el progreso real del proyecto dependerá menos de seguir planeando y más de implementar, probar y ajustar.

La regla principal debe mantenerse durante todo el desarrollo:

> Si el partido no es divertido, ninguna funcionalidad adicional va a salvar el juego.

Por eso, el foco inmediato debe ser terminar el MVP 1, jugarlo muchas veces, escuchar feedback y ajustar hasta que elegir cartas en momentos clave se sienta claro, emocionante y rejugable.