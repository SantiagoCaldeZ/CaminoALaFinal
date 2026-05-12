# Documento base del proyecto

# La Mejenga: Camino a la Final

> Nombre provisional. El nombre puede cambiar, pero sirve para definir una identidad inicial del proyecto.

## 1. Visión general

**La Mejenga: Camino a la Final** es una aplicación web de fútbol táctico, narrativo y competitivo, inspirada en la cultura de las mejengas, los torneos de barrio y la construcción de equipos con personalidad propia.

El juego no busca competir con simuladores tradicionales como FIFA/eFootball ni con gestores deportivos complejos como Football Manager. Su propuesta es distinta: convertir el fútbol en una experiencia estratégica, rápida, social y rejugable, donde cada partido se resuelve mediante decisiones tácticas, cartas, momentos clave, estadísticas, energía, moral y eventos narrativos.

La idea principal es que el jugador no controle a los futbolistas en tiempo real. En su lugar, toma decisiones importantes en jugadas clave: qué carta usar, cuándo arriesgar, cómo defender, a quién darle protagonismo, cuándo gastar energía, cuándo conservar la ventaja y cómo manejar la presión del partido.

## 2. Tipo de producto recomendado

### Decisión inicial recomendada

El proyecto debería iniciar como una **aplicación web responsive con enfoque PWA**.

Esto significa que el juego se desarrollaría primero como una web app accesible desde navegador, adaptable a escritorio y móvil, con posibilidad de instalarse como aplicación progresiva más adelante.

### Por qué web app y no app nativa desde el inicio

Una app web permite avanzar más rápido, probar la idea antes, reutilizar experiencia técnica previa y construir funcionalidades sociales similares a las de Poorty Goblin Web: login, perfiles, amigos, presencia en línea, mensajes, salas, partidas y estados en tiempo real.

Además, evita al inicio la complejidad de publicar en App Store o Google Play, mantener dos bases de código nativas, lidiar con restricciones de tiendas y resolver integraciones móviles antes de validar si el gameplay realmente es divertido.

### Futuro posible

Si el juego valida bien su propuesta, podría evolucionar hacia:

* PWA instalable en móvil.
* App móvil empaquetada con Capacitor.
* App nativa en React Native.
* Cliente web competitivo más pulido.
* Versión de escritorio si llegara a tener sentido.

La prioridad inicial debe ser validar el núcleo jugable, no la plataforma definitiva.

## 3. Referencia conceptual desde Poorty Goblin Web

Poorty Goblin Web puede servir como referencia técnica y estructural, pero no como copia de identidad ni de mecánicas.

### Elementos reutilizables como referencia

* Sistema de login y registro.
* Perfiles de usuario.
* Estados de presencia en línea.
* Lista de amigos.
* Mensajes o DMs.
* Creación de salas o partidas.
* Estados persistentes de una partida.
* Fases de juego.
* Sincronización en tiempo real.
* Separación entre interfaz, lógica de juego y backend.
* Uso de Supabase como base de datos, autenticación y realtime.

### Elementos que deben ser originales

* Identidad visual.
* Tema del juego.
* Nombres de equipos, cartas y jugadores.
* Sistema de resolución de partidos.
* Progresión.
* Narrativa.
* Economía interna.
* Modos de juego.
* Sensación de partido.
* Experiencia de usuario.

La referencia principal de Poorty Goblin Web no debería ser “hacer lo mismo con fútbol”, sino aprovechar aprendizajes técnicos sobre cómo estructurar partidas multijugador y funcionalidades sociales.

## 4. Propuesta de valor

El juego debe sentirse como una mezcla entre:

* Fútbol de barrio.
* Cartas tácticas.
* Decisiones por turnos.
* Construcción de equipo.
* Eventos narrativos.
* Partidos rápidos.
* Multijugador social.

La promesa central sería:

> Arma tu equipo de barrio, construye tu mazo táctico y gana partidos tomando mejores decisiones que tu rival en momentos clave.

## 5. Principios de diseño

### 5.1 Partidos cortos

Cada partido debe durar pocos minutos. La experiencia debe invitar a jugar “uno más”.

### 5.2 Decisiones importantes

Cada jugada debe presentar una decisión clara: arriesgar, conservar, presionar, defender, atacar directo, buscar una jugada colectiva o confiar en una individualidad.

### 5.3 Identidad propia

El juego debe tener sabor de barrio, sin depender de licencias oficiales, equipos reales o jugadores conocidos.

### 5.4 Estrategia accesible

Debe ser fácil de entender, pero con suficiente profundidad para que el jugador mejore con práctica.

### 5.5 Azar controlado

Debe existir incertidumbre, porque el fútbol la tiene, pero el jugador debe sentir que sus decisiones importan más que la suerte.

### 5.6 Progresión constante

Después de cada partido debe ocurrir algo: recompensa, mejora, desbloqueo, lesión, evento, fichaje, carta nueva o avance en torneo.

### 5.7 Personalidad narrativa

El juego debe generar pequeñas historias: el crack que se enoja, el portero improvisado que salva el partido, la cancha en mal estado, el clásico caliente, la final contra los invictos.

## 6. Núcleo jugable

El núcleo del juego es un sistema de partido por **momentos clave**.

Un partido no se juega minuto a minuto en tiempo real. Se divide en situaciones relevantes:

* Ataque por banda.
* Contraataque.
* Tiro libre.
* Presión rival.
* Última jugada del primer tiempo.
* Penal.
* Cierre del partido.
* Saque de esquina.
* Mano a mano.
* Jugada trabada en medio campo.

En cada situación, el jugador elige una carta táctica. El rival responde con otra carta o acción defensiva. El motor del juego compara cartas, estadísticas, energía, moral, momentum, contexto y azar controlado para resolver el resultado.

## 7. Sistema de cartas

Las cartas representan decisiones tácticas, no jugadores coleccionables reales.

### Tipos de cartas iniciales

* Cartas de ataque.
* Cartas de defensa.
* Cartas de medio campo.
* Cartas especiales.
* Cartas de riesgo.
* Cartas de cierre de partido.

### Ejemplos de cartas de ataque

* Pase filtrado.
* Regate individual.
* Centro al área.
* Tiro lejano.
* Pared rápida.
* Tiro colocado.
* Ataque directo.
* Cambio de banda.

### Ejemplos de cartas defensivas

* Presión alta.
* Bloque bajo.
* Barrida fuerte.
* Marcar al hombre.
* Línea adelantada.
* Anticipación.
* Tapar disparo.
* Cerrar espacios.

### Ejemplos de cartas especiales

* Última jugada.
* La hinchada empuja.
* Todo o nada.
* Enfriar el partido.
* Inspiración del crack.
* Candado atrás.
* Gol de camerino.
* Se juega diferente.

### Propiedades de una carta

Cada carta debería tener, como mínimo:

* ID.
* Nombre.
* Tipo.
* Descripción.
* Costo de energía.
* Poder base.
* Riesgo.
* Situaciones donde funciona mejor.
* Situaciones donde funciona peor.
* Posibles resultados.
* Modificadores contra otras cartas.

## 8. Sistema de jugadores

Los jugadores no deben ser genéricos. Cada uno debe tener estadísticas y personalidad.

### Estadísticas básicas

* Ataque.
* Defensa.
* Técnica.
* Físico.
* Mentalidad.
* Resistencia.

### Atributos complementarios

* Energía actual.
* Moral.
* Química con el equipo.
* Estado físico.
* Rol.
* Rasgo especial.

### Roles iniciales

* Portero.
* Defensa.
* Mediocampista.
* Delantero.
* Comodín.

### Ejemplos de rasgos

* El Crack: mejora en jugadas decisivas, pero puede frustrarse si no participa.
* El Rápido: excelente en carreras y contraataques, pero irregular definiendo.
* El Leñero: fuerte defendiendo, pero con alto riesgo de falta o tarjeta.
* El Veterano: baja el riesgo de errores, pero se cansa rápido.
* El Portero Improvisado: puede hacer atajadas difíciles, pero también cometer errores inesperados.
* La Promesa: mejora más rápido, pero su rendimiento es inestable.
* El Capitán: mejora la moral del equipo en momentos complicados.

## 9. Sistema de equipos

El jugador podrá elegir o construir un equipo de barrio.

### Equipos iniciales sugeridos

* Los del Parque: equilibrados.
* Cemento FC: físicos y defensivos.
* Potrero United: rápidos y caóticos.
* Barrio Norte: técnicos, pero frágiles físicamente.
* La Plaza FC: buen juego colectivo.
* Los Invictos: rival fuerte de campaña.

### Elementos del equipo

* Nombre.
* Escudo.
* Colores.
* Plantilla.
* Estilo de juego.
* Reputación.
* Química.
* Moral general.
* Cancha local.
* Mazo táctico.

## 10. Sistema de partido

### Flujo básico de partido

1. Presentación del rival.
2. Selección de alineación o jugadores clave.
3. Selección del mazo o cartas disponibles.
4. Inicio del partido.
5. Generación de momento clave.
6. Selección de carta del jugador.
7. Selección o revelación de carta rival.
8. Resolución de la jugada.
9. Actualización de marcador, energía, moral y momentum.
10. Narración del resultado.
11. Siguiente momento clave.
12. Final del partido.
13. Resumen y recompensas.

### Elementos visibles durante el partido

* Marcador.
* Minuto.
* Situación actual.
* Zona de juego.
* Jugador protagonista.
* Mano de cartas.
* Energía del equipo o jugadores clave.
* Momentum.
* Narración.
* Historial de jugadas.
* Resultado de la acción.

## 11. Sistema de resolución

El motor de juego debe resolver cada jugada tomando en cuenta varios factores.

### Factores principales

* Carta del jugador.
* Carta del rival.
* Estadísticas del jugador protagonista.
* Estadísticas del rival directo.
* Energía.
* Moral.
* Momentum.
* Tipo de jugada.
* Cancha.
* Contexto del partido.
* Riesgo de la carta.
* Azar controlado.

### Objetivo del sistema

El jugador debe sentir que:

* Sus decisiones importan.
* Las cartas tienen counters lógicos.
* Las cartas fuertes no son perfectas.
* El riesgo puede pagar, pero también castigar.
* La suerte existe, pero no domina todo.

## 12. Momentum

El momentum representa el impulso emocional del partido.

Sube cuando el equipo:

* Gana duelos importantes.
* Marca goles.
* Genera ocasiones claras.
* Ataja penales.
* Remonta.
* Presiona con éxito.
* Sobrevive bajo presión.

Baja cuando:

* Falla ocasiones claras.
* Recibe goles.
* Comete errores.
* Pierde duelos clave.
* Se queda sin energía.
* Sufre una tarjeta o lesión.

El momentum puede habilitar cartas especiales o mejorar ligeramente ciertas acciones.

## 13. Energía

La energía evita que el jugador use siempre las cartas más fuertes.

Cada carta consume energía. Las acciones más intensas, como presión alta, regate individual, barrida fuerte o todo o nada, deben tener mayor costo.

Un jugador o equipo con poca energía:

* Falla más.
* Defiende peor.
* Tiene más riesgo de lesión.
* Pierde precisión.
* Reduce el impacto de cartas exigentes.

## 14. Moral y química

### Moral

La moral representa el estado anímico del equipo o jugador.

Puede cambiar por:

* Resultados.
* Eventos narrativos.
* Decisiones del jugador.
* Rivalidades.
* Goles recibidos.
* Remontadas.
* Conflictos internos.

### Química

La química representa qué tan bien funciona el equipo colectivamente.

Afecta:

* Paredes.
* Toque corto.
* Presión organizada.
* Coberturas defensivas.
* Jugadas colectivas.
* Errores no forzados.

## 15. Eventos narrativos

Los eventos entre partidos son fundamentales para darle personalidad al juego.

### Ejemplos de eventos

* El delantero llegó tarde.
* El capitán pide hablar con el equipo.
* Un patrocinador local ofrece apoyo.
* La cancha está inundada.
* Un rival provoca al equipo antes del clásico.
* Un jugador amenaza con irse.
* Aparece una promesa en una mejenga.
* Se lesionó un titular.
* El portero no puede llegar al partido.
* Hay discusión interna después de una derrota.

### Estructura de un evento

Cada evento debería tener:

* Título.
* Descripción.
* Opciones de decisión.
* Consecuencias inmediatas.
* Consecuencias posibles a futuro.
* Impacto en moral, química, dinero, jugadores o cartas.

## 16. Canchas

Las canchas deben afectar el juego y reforzar la identidad.

### Ejemplos

* Cancha de cemento: juego rápido, más riesgo físico.
* Potrero: menor precisión en pases.
* Barro: baja velocidad, sube impacto físico.
* Cancha pequeña: más presión y choques.
* Sintética: mayor velocidad de balón.
* Plaza llena: mejora la moral del local.
* Cancha nocturna: más errores bajo baja mentalidad.

## 17. Modos de juego

### 17.1 Duelo rápido

Modo inicial para validar el gameplay.

El jugador elige equipo y juega un partido corto contra IA o rival local.

### 17.2 Torneo de barrio

Modo estructurado con varios partidos y recompensas.

Puede incluir fase de grupos, semifinal y final.

### 17.3 Camino a la Final

Modo campaña/carrera donde el jugador mejora su equipo, desbloquea cartas, ficha jugadores y enfrenta eventos.

### 17.4 Amistoso con amigos

Modo multijugador casual mediante código de sala.

### 17.5 Liga online

Modo futuro con ranking, temporadas y recompensas.

### 17.6 Modo fiesta o tablero

Modo opcional futuro. No debe ser el modo principal al inicio.

Podría usar casillas, eventos, minijuegos y caos, pero solo cuando el núcleo del partido ya esté validado.

## 18. Funcionalidades sociales

Estas funcionalidades pueden tomar como referencia técnica a Poorty Goblin Web.

### Básicas

* Registro.
* Login.
* Perfil público.
* Avatar.
* Estado en línea.
* Lista de amigos.
* Solicitudes de amistad.
* Invitaciones a partida.

### Intermedias

* Mensajes privados.
* Historial de partidas contra amigos.
* Salas privadas.
* Estado “jugando”, “en menú”, “disponible”.
* Notificaciones.

### Futuras

* Clubes o grupos.
* Torneos privados.
* Rankings entre amigos.
* Espectador de partidas.
* Chat dentro de sala.

## 19. Funcionalidades de cuenta y perfil

Cada usuario debería tener:

* ID único.
* Nombre visible.
* Avatar.
* Equipo favorito creado.
* Estadísticas generales.
* Partidas jugadas.
* Victorias.
* Derrotas.
* Goles anotados.
* Cartas desbloqueadas.
* Reputación.
* Estado en línea.

## 20. Funcionalidades de partida multijugador

### Estados posibles de una partida

* Creada.
* Esperando rival.
* Preparación.
* En curso.
* Pausada.
* Finalizada.
* Abandonada.

### Fases posibles

* Lobby.
* Selección de equipo.
* Selección de mazo.
* Presentación del partido.
* Momento clave.
* Selección de carta.
* Resolución.
* Resumen de jugada.
* Final del partido.
* Recompensas.

## 21. Interfaz principal

### Pantallas iniciales recomendadas

* Landing o pantalla de inicio.
* Login.
* Registro.
* Home del jugador.
* Mi equipo.
* Cartas.
* Partido rápido.
* Torneo.
* Amigos.
* Mensajes.
* Perfil.
* Configuración.

### Pantallas de juego

* Lobby de partida.
* Selección de equipo.
* Selección de mazo.
* Pantalla de partido.
* Modal de jugada.
* Resumen final.
* Recompensas.

## 22. Animaciones y experiencia visual

El juego no debe iniciar con animaciones complejas tipo motor 3D.

### Animaciones iniciales recomendadas

* Carta seleccionada.
* Carta rival revelada.
* Choque de cartas.
* Barra de energía bajando.
* Momentum subiendo o bajando.
* Efecto de gol.
* Efecto de falta.
* Efecto de atajada.
* Cambio de minuto.
* Transición entre jugadas.

### Nivel visual recomendado para MVP

* Componentes React.
* CSS/Tailwind.
* Animaciones CSS.
* Posible uso futuro de Framer Motion si se decide agregar una librería de animación.
* Evitar Canvas al inicio, salvo para una cancha visual simple si fuera estrictamente necesario.

## 23. Tecnología recomendada

### Frontend

* Next.js.
* React.
* TypeScript.
* Tailwind CSS.
* Componentes propios.
* Arquitectura por módulos.

### Backend / servicios

* Supabase Auth para autenticación.
* Supabase Database para persistencia.
* Supabase Realtime para presencia, salas y partidas.
* Supabase Storage para avatares, escudos o imágenes.
* RPC/funciones SQL para lógica crítica de partida cuando sea necesario.
* Edge Functions solo si una lógica no conviene mantenerla en SQL o cliente.

### Estado del cliente

* Estado local de React para pantallas simples.
* Context o store ligero para usuario/sesión.
* Un motor de juego separado en TypeScript para lógica de cartas y resolución.
* Más adelante puede evaluarse Zustand u otra herramienta, pero no debería ser obligatorio al inicio.

### Animaciones

* CSS/Tailwind inicialmente.
* Framer Motion como opción futura si se quiere una experiencia más pulida.

### Testing recomendado

* Pruebas unitarias para el motor de juego.
* Pruebas de reglas de cartas.
* Pruebas de resolución de jugadas.
* Pruebas de estados de partida.
* Validación manual de balance durante prototipos.

## 24. Arquitectura sugerida

### Separación principal

El proyecto debería separar claramente:

* Interfaz.
* Datos estáticos.
* Lógica de juego.
* Persistencia.
* Comunicación realtime.
* Tipos compartidos.

### Estructura preliminar sugerida

```txt
app/
  page.tsx
  auth/
  home/
  team/
  cards/
  match/
  friends/
  messages/

components/
  layout/
  auth/
  team/
  cards/
  match/
  friends/
  ui/

lib/
  game/
    types.ts
    cards.ts
    players.ts
    teams.ts
    match-engine.ts
    resolver.ts
    momentum.ts
    energy.ts
    narration.ts
  supabase/
    client.ts
    auth.ts
    realtime.ts
  social/
    friends.ts
    presence.ts
    messages.ts

db/
  migrations/
  seed/
```

## 25. Base de datos preliminar

### Tablas posibles

* profiles.
* friendships.
* direct_messages.
* user_presence.
* teams.
* team_players.
* cards.
* user_cards.
* decks.
* deck_cards.
* matches.
* match_players.
* match_events.
* match_turns.
* match_results.
* tournaments.
* tournament_players.

### Importante

No todas estas tablas son necesarias para el MVP. Algunas pueden agregarse conforme el juego crece.

## 26. Restricciones iniciales

### Restricciones de alcance

* No hacer fútbol en tiempo real.
* No hacer 11 contra 11 completo al inicio.
* No hacer motor 3D.
* No hacer app nativa desde el primer día.
* No hacer online competitivo complejo antes de validar el partido.
* No agregar demasiadas cartas al inicio.
* No agregar demasiados equipos al inicio.
* No crear economía compleja ni tienda avanzada inicialmente.
* No depender de marcas, clubes o jugadores reales.

### Restricciones técnicas

* Mantener TypeScript estricto.
* Separar lógica de juego de componentes visuales.
* Evitar que el cliente pueda manipular resultados en partidas competitivas.
* Diseñar desde el inicio pensando en persistencia de partidas.
* Mantener estados de partida claros.
* Evitar dependencias innecesarias.
* Priorizar componentes reutilizables.

### Restricciones de diseño

* Interfaz limpia.
* Cartas legibles.
* Partidos rápidos.
* Animaciones útiles, no decorativas.
* Narración clara.
* El jugador siempre debe entender qué pasó y por qué pasó.

## 27. MVP recomendado

El primer MVP no debería incluir todo el sistema social ni todo el modo carrera.

### MVP 1: Partido táctico local

Funcionalidades mínimas:

* Dos equipos predefinidos.
* Jugadores predefinidos.
* Mazo básico de cartas.
* Partido de 6 a 8 momentos clave.
* Selección de carta por parte del jugador.
* Selección automática de carta rival.
* Resolución de jugada.
* Marcador.
* Energía.
* Momentum.
* Narración.
* Resumen final.

Objetivo del MVP 1:

> Validar si el partido por cartas y momentos clave es divertido.

### MVP 2: Progresión simple

Agregar:

* Recompensas.
* XP de jugadores.
* Desbloqueo de cartas.
* Mejora básica de jugadores.
* Torneo corto.

### MVP 3: Cuenta y persistencia

Agregar:

* Login.
* Perfil.
* Guardado de equipo.
* Guardado de cartas.
* Historial de partidos.

### MVP 4: Social básico

Agregar:

* Amigos.
* Presencia en línea.
* Invitaciones.
* Partidas privadas.

### MVP 5: Multijugador 1v1

Agregar:

* Lobby.
* Sincronización realtime.
* Turnos.
* Validación de jugadas.
* Resultado compartido.
* Manejo de abandono.

## 28. Riesgos del proyecto

### Riesgo 1: Inflar demasiado el alcance

El juego puede crecer muy rápido en ideas. La solución es validar primero el núcleo: cartas, momentos clave y resolución.

### Riesgo 2: Balance difícil

Las cartas pueden sentirse injustas si no se equilibran bien. Se necesitan pruebas constantes.

### Riesgo 3: Azar excesivo

Si gana demasiado la suerte, el jugador se frustra. El azar debe acompañar, no dominar.

### Riesgo 4: Multijugador prematuro

El online puede complicar mucho el proyecto. Debe venir después de que el modo local o contra IA sea divertido.

### Riesgo 5: Falta de identidad

Si el juego se vuelve muy genérico, pierde su mayor ventaja. El tono de barrio, los jugadores con personalidad y los eventos narrativos deben estar desde temprano.

## 29. Decisiones abiertas

Estas decisiones aún deben definirse:

* Nombre definitivo del juego.
* Tono visual: caricaturesco, semi-realista, urbano, cómic, minimalista.
* Si los partidos serán 5v5, 7v7 o formato abstracto por líneas.
* Si la energía será por jugador o por equipo en el MVP.
* Si el mazo será común por equipo o personalizado desde el inicio.
* Si habrá IA rival simple en el MVP.
* Si la campaña será lineal, tipo torneo o tipo roguelike.
* Si las cartas se desbloquean por progreso o se obtienen por recompensas aleatorias.
* Si habrá chat en partidas o solo mensajes privados.

## 30. Conclusión inicial

La mejor dirección para el proyecto es construir primero una web app de fútbol táctico por cartas, con identidad de barrio, partidos cortos, momentos clave y progresión ligera.

Poorty Goblin Web sirve como referencia técnica para pensar en usuarios, amigos, presencia, salas, partidas y realtime, pero este proyecto debe tener su propia personalidad, su propio sistema de juego y una experiencia completamente original.

La prioridad no debe ser construir todas las funcionalidades desde el inicio. La prioridad debe ser responder una pregunta:

> ¿Elegir cartas en momentos clave de un partido se siente divertido, estratégico y emocionante?

Si la respuesta es sí, entonces el proyecto puede crecer hacia torneos, carrera, eventos, multijugador, amigos, mensajes, rankings y una experiencia social más completa.