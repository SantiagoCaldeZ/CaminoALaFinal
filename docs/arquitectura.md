# Arquitectura técnica inicial

# La Mejenga — MVP 1

## 1. Propósito del documento

Este documento define la arquitectura técnica inicial para construir el **MVP 1: Partido táctico por cartas**.

El objetivo es tener una guía práctica para iniciar el código sin improvisar la estructura del proyecto, evitando mezclar la lógica del juego con la interfaz visual.

Este documento no define todo el producto final. Se enfoca únicamente en el primer prototipo frontend local:

* Sin login.
* Sin base de datos.
* Sin Supabase.
* Sin multijugador.
* Sin backend.
* Sin persistencia real.

La prioridad es construir una demo jugable donde el usuario pueda disputar un partido contra una IA simple usando cartas tácticas, energía, momentum, marcador y narración.

---

## 2. Decisión técnica inicial

### Recomendación

Usar:

* **Next.js**
* **React**
* **TypeScript**
* **Tailwind CSS**
* Datos mock en archivos `.ts`
* Motor de juego puro en TypeScript
* Animaciones simples con CSS/Tailwind

### Por qué Next.js desde el inicio

Aunque el MVP será local y no tendrá backend, Next.js permite construir desde el inicio con una estructura cercana al producto real. Más adelante facilitará agregar rutas, autenticación, perfiles, salas, Supabase, páginas de equipo, cartas, amigos y partidas.

Vite también sería válido para un prototipo muy rápido, pero Next.js encaja mejor con una evolución futura hacia aplicación web completa.

---

## 3. Principios técnicos

## 3.1 Separar lógica de juego e interfaz

La lógica del partido no debe estar escrita dentro de los componentes visuales.

Incorrecto:

```tsx
function MatchScreen() {
  // cálculo de goles, energía, momentum, IA y narración mezclados aquí
}
```

Correcto:

```tsx
function MatchScreen() {
  // solo maneja estado de pantalla y llama funciones del motor
}
```

La lógica debe vivir en:

```txt
src/lib/game/
```

La interfaz debe vivir en:

```txt
src/components/
```

---

## 3.2 Usar datos mock centralizados

Equipos, jugadores, cartas y situaciones deben definirse en archivos separados.

Ejemplo:

```txt
src/lib/game/teams.ts
src/lib/game/cards.ts
src/lib/game/situations.ts
```

Esto permite balancear el juego sin tocar componentes visuales.

---

## 3.3 Mantener el motor testeable

Las funciones principales del motor deben poder ejecutarse sin interfaz.

Por ejemplo:

```ts
const event = resolvePlay({
  matchState,
  situation,
  playerCard,
  rivalCard,
  playerTeam,
  rivalTeam,
});
```

Esto permite probar reglas, balance y resultados sin depender de React.

---

## 3.4 Evitar dependencias innecesarias

Para el MVP no se recomienda agregar librerías de estado global, animación pesada ni motores gráficos.

Inicialmente basta con:

* Estado local con `useState`.
* Componentes React.
* Funciones TypeScript.
* Tailwind CSS.

Más adelante se puede evaluar Zustand, Framer Motion, Supabase o librerías adicionales, pero no son necesarias para validar el núcleo jugable.

---

## 4. Estructura inicial del proyecto

Estructura recomendada:

```txt
src/
  app/
    page.tsx
    match/
      page.tsx

  components/
    layout/
      AppShell.tsx

    match/
      MatchScreen.tsx
      Scoreboard.tsx
      EnergyBar.tsx
      MomentumBar.tsx
      SituationPanel.tsx
      CardHand.tsx
      TacticalCardView.tsx
      PlayResolutionPanel.tsx
      MatchHistory.tsx
      FinalSummary.tsx

    team/
      TeamSelect.tsx
      TeamPreview.tsx
      PlayerList.tsx

    ui/
      Button.tsx
      Panel.tsx
      Badge.tsx
      StatBar.tsx

  lib/
    game/
      types.ts
      players.ts
      teams.ts
      cards.ts
      situations.ts
      balance.ts
      ai.ts
      resolver.ts
      match-engine.ts
      narration.ts
      utils.ts

  styles/
    globals.css
```

---

## 5. Responsabilidad de cada carpeta

## 5.1 `src/app`

Contiene las rutas principales de Next.js.

### `src/app/page.tsx`

Pantalla inicial del MVP.

Debe permitir:

* Ver el nombre provisional del juego.
* Ir a jugar partido rápido.
* Mostrar una breve descripción del prototipo.

### `src/app/match/page.tsx`

Página del partido rápido.

Debe cargar el flujo principal:

* Selección de equipo.
* Inicio de partido.
* Pantalla de partido.
* Resumen final.

---

## 5.2 `src/components/match`

Componentes visuales del partido.

No deben contener reglas profundas de juego. Su responsabilidad es mostrar información y emitir acciones.

### `MatchScreen.tsx`

Componente principal del partido.

Responsabilidades:

* Mantener el estado visual del partido.
* Mostrar situación actual.
* Mostrar cartas disponibles.
* Recibir carta elegida por el usuario.
* Llamar al motor para resolver jugada.
* Mostrar resultado.
* Avanzar al siguiente momento.
* Detectar final del partido.

No debería contener fórmulas de resolución complejas.

### `Scoreboard.tsx`

Muestra:

* Nombre del equipo del usuario.
* Nombre del rival.
* Marcador.
* Minuto actual.

### `EnergyBar.tsx`

Muestra la energía de un equipo.

Props sugeridas:

```ts
type EnergyBarProps = {
  label: string;
  value: number;
};
```

### `MomentumBar.tsx`

Muestra el momentum de un equipo.

Props sugeridas:

```ts
type MomentumBarProps = {
  label: string;
  value: number;
};
```

### `SituationPanel.tsx`

Muestra la situación actual del partido.

Debe incluir:

* Minuto.
* Título.
* Descripción.
* Tipo de situación.
* Jugador protagonista si aplica.

### `CardHand.tsx`

Muestra las cartas disponibles para el usuario.

Responsabilidades:

* Renderizar lista de cartas.
* Permitir seleccionar una carta.
* Deshabilitar cartas no jugables si fuera necesario.

### `TacticalCardView.tsx`

Componente visual individual para una carta.

Debe mostrar:

* Nombre.
* Tipo.
* Descripción breve.
* Costo de energía.
* Riesgo.
* Poder base.
* Indicadores de fuerte/débil si aplica.

### `PlayResolutionPanel.tsx`

Muestra el resultado de una jugada.

Debe incluir:

* Carta del usuario.
* Carta rival.
* Resultado.
* Narración.
* Cambios de energía.
* Cambios de momentum.
* Cambio de marcador si hubo gol.

### `MatchHistory.tsx`

Muestra historial resumido de jugadas.

Debe evitar ocupar demasiado espacio. Puede mostrar solo las últimas 3 a 5 jugadas.

### `FinalSummary.tsx`

Muestra el resumen final.

Debe incluir:

* Resultado final.
* Ganador.
* Energía final.
* Momentum final.
* Historial completo o resumen destacado.
* Botón para jugar otra vez.

---

## 5.3 `src/components/team`

Componentes relacionados con selección y vista de equipos.

### `TeamSelect.tsx`

Permite elegir equipo.

Debe mostrar tarjetas de equipos disponibles.

### `TeamPreview.tsx`

Muestra detalles de un equipo:

* Nombre.
* Estilo.
* Descripción.
* Fortalezas.
* Debilidades.

### `PlayerList.tsx`

Muestra la plantilla de un equipo.

Debe listar:

* Nombre.
* Apodo.
* Rol.
* Stats principales.
* Rasgo.

---

## 5.4 `src/components/ui`

Componentes visuales genéricos reutilizables.

### `Button.tsx`

Botón base para acciones.

### `Panel.tsx`

Contenedor visual para secciones.

### `Badge.tsx`

Etiqueta pequeña para tipos, estados o categorías.

### `StatBar.tsx`

Barra visual reutilizable para stats.

---

## 5.5 `src/lib/game`

Esta es la carpeta más importante del MVP.

Aquí vive el motor del juego.

---

## 6. Archivos del motor de juego

## 6.1 `types.ts`

Define todos los tipos centrales.

Debe incluir:

* `PlayerRole`
* `Player`
* `TeamStyle`
* `Team`
* `CardType`
* `TacticalCard`
* `MatchSituation`
* `MatchState`
* `MatchEvent`
* `PlayOutcome`
* `ResolvePlayParams`
* `ResolvePlayResult`

Ejemplo inicial:

```ts
export type PlayerRole = "goalkeeper" | "defender" | "midfielder" | "forward" | "utility";

export type Player = {
  id: string;
  name: string;
  nickname: string;
  role: PlayerRole;
  attack: number;
  defense: number;
  technique: number;
  physical: number;
  mentality: number;
  stamina: number;
  trait: string;
};
```

---

## 6.2 `players.ts`

Puede usarse si se desea separar jugadores de equipos.

Para el MVP, también es válido definir los jugadores directamente dentro de `teams.ts`.

Recomendación inicial:

* Mantener jugadores dentro de `teams.ts` para simplificar.
* Crear `players.ts` más adelante si crece la cantidad de jugadores.

---

## 6.3 `teams.ts`

Define los equipos iniciales.

Debe exportar:

```ts
export const TEAMS: Team[] = [];
```

Equipos iniciales:

* Los del Parque.
* Cemento FC.

También puede exportar helpers:

```ts
export function getTeamById(teamId: string): Team | undefined;
```

---

## 6.4 `cards.ts`

Define las 20 cartas iniciales.

Debe exportar:

```ts
export const TACTICAL_CARDS: TacticalCard[] = [];
```

También puede separar por tipo:

```ts
export const ATTACK_CARDS = TACTICAL_CARDS.filter(card => card.type === "attack");
export const DEFENSE_CARDS = TACTICAL_CARDS.filter(card => card.type === "defense");
```

---

## 6.5 `situations.ts`

Define las situaciones posibles del partido.

Debe exportar:

```ts
export const MATCH_SITUATIONS: MatchSituation[] = [];
```

Situaciones iniciales:

* Ataque por banda.
* Ataque por el centro.
* Contraataque.
* Posesión en medio campo.
* Presión rival.
* Tiro libre.
* Córner.
* Última jugada.

También puede exportar:

```ts
export const MATCH_MOMENTS = [8, 17, 28, 41, 53, 66, 78, 89];
```

---

## 6.6 `balance.ts`

Centraliza constantes numéricas del juego.

Ejemplo:

```ts
export const BALANCE = {
  initialEnergy: 100,
  initialMomentum: 50,
  totalMoments: 8,
  cardsPerHand: 4,
  randomMin: -8,
  randomMax: 8,
  goalThreshold: 89,
  shotThreshold: 79,
  chanceThreshold: 66,
};
```

Esto permite ajustar balance sin tocar muchas funciones.

---

## 6.7 `utils.ts`

Funciones auxiliares generales.

Ejemplos:

```ts
export function clamp(value: number, min: number, max: number): number;
export function randomBetween(min: number, max: number): number;
export function pickRandom<T>(items: T[]): T;
```

---

## 6.8 `ai.ts`

Contiene la lógica de selección de carta por parte de la IA.

Función principal:

```ts
export function chooseAiCard(params: ChooseAiCardParams): TacticalCard;
```

Reglas iniciales:

* Si la IA va ganando, prioriza defensa.
* Si la IA va perdiendo, prioriza ataque.
* Si tiene baja energía, evita cartas caras.
* Si la situación es defensiva, prioriza cartas defensivas.
* Si la situación es ofensiva, puede elegir cartas de contraataque o contención.

La IA puede ser simple, pero no completamente aleatoria.

---

## 6.9 `resolver.ts`

Contiene la lógica para resolver una jugada individual.

Función principal:

```ts
export function resolvePlay(params: ResolvePlayParams): MatchEvent;
```

Debe calcular:

* Modificador por carta.
* Modificador por stats.
* Modificador por counter.
* Modificador por energía.
* Modificador por momentum.
* Modificador por situación.
* Azar controlado.
* Resultado final.
* Narración.

Este archivo es el corazón del MVP.

---

## 6.10 `match-engine.ts`

Orquesta el flujo del partido.

Funciones principales:

```ts
export function startMatch(playerTeam: Team, rivalTeam: Team): MatchState;

export function getCurrentSituation(matchState: MatchState): MatchSituation;

export function playMoment(params: PlayMomentParams): MatchState;

export function isMatchFinished(matchState: MatchState): boolean;
```

Este archivo no debería tener todo el cálculo fino de una jugada. Para eso está `resolver.ts`.

---

## 6.11 `narration.ts`

Genera narraciones según resultado.

Función principal:

```ts
export function generateNarration(params: GenerateNarrationParams): string;
```

Debe tomar en cuenta:

* Resultado.
* Carta usada.
* Carta rival.
* Jugador protagonista.
* Equipo.
* Situación.

La narración debe explicar lo ocurrido y reforzar el tono del juego.

---

## 7. Flujo técnico del MVP

## 7.1 Flujo de pantalla

```txt
Inicio
  ↓
Seleccionar equipo
  ↓
Crear partido
  ↓
Mostrar situación
  ↓
Elegir carta
  ↓
IA elige carta
  ↓
Resolver jugada
  ↓
Mostrar resultado
  ↓
Siguiente jugada
  ↓
Final del partido
  ↓
Resumen final
```

---

## 7.2 Flujo de estado

Estado principal en `MatchScreen`:

```ts
const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
const [matchState, setMatchState] = useState<MatchState | null>(null);
const [currentSituation, setCurrentSituation] = useState<MatchSituation | null>(null);
const [availableCards, setAvailableCards] = useState<TacticalCard[]>([]);
const [lastEvent, setLastEvent] = useState<MatchEvent | null>(null);
const [phase, setPhase] = useState<MatchUiPhase>("team_select");
```

Fases posibles:

```ts
type MatchUiPhase =
  | "team_select"
  | "ready"
  | "choosing_card"
  | "revealing"
  | "resolution"
  | "finished";
```

---

## 8. Modelo de interacción

## 8.1 Al seleccionar equipo

1. Usuario elige equipo.
2. Se asigna automáticamente el rival.
3. Se crea `MatchState` con `startMatch`.
4. Se carga la primera situación.
5. Se generan cartas disponibles.
6. La fase pasa a `choosing_card`.

---

## 8.2 Al elegir carta

1. Usuario selecciona carta.
2. Se valida si tiene energía suficiente.
3. IA elige carta con `chooseAiCard`.
4. Se llama `resolvePlay` o `playMoment`.
5. Se actualiza `MatchState`.
6. Se guarda `lastEvent`.
7. La fase pasa a `resolution`.

---

## 8.3 Al avanzar jugada

1. Se revisa si el partido terminó.
2. Si terminó, fase `finished`.
3. Si no terminó, se carga siguiente situación.
4. Se generan nuevas cartas disponibles.
5. Fase `choosing_card`.

---

## 9. Regla inicial para mano de cartas

Para el MVP, la mano puede generarse de forma simple.

### Recomendación inicial

Cada momento muestra 4 cartas:

* 2 cartas recomendadas para la situación.
* 1 carta de otro tipo.
* 1 carta aleatoria.

Esto evita que el jugador tenga opciones absurdas en cada jugada, pero mantiene variedad.

Ejemplo:

Si la situación es ataque por banda:

* Centro al área.
* Regate individual.
* Cambio de banda.
* Tiro lejano.

---

## 10. Regla inicial para jugador protagonista

Para simplificar, el jugador protagonista puede elegirse según la situación.

| Situación         | Protagonista recomendado  |
| ----------------- | ------------------------- |
| Ataque por banda  | Delantero o comodín       |
| Ataque por centro | Mediocampista o delantero |
| Contraataque      | Delantero                 |
| Posesión media    | Mediocampista             |
| Presión rival     | Mediocampista o defensa   |
| Tiro libre        | Mejor ataque/técnica      |
| Córner            | Mejor físico/ataque       |
| Última jugada     | Mejor mentalidad/ataque   |

Función sugerida:

```ts
export function selectProtagonist(team: Team, situation: MatchSituation): Player;
```

---

## 11. Resolución inicial simplificada

Para el primer código, se puede usar una resolución por puntaje.

```ts
score = card.basePower
  + statModifier
  + counterModifier
  + energyModifier
  + momentumModifier
  + situationModifier
  + randomModifier;
```

Luego se convierte en resultado:

```ts
if (score >= 89) outcome = "goal";
else if (score >= 79) outcome = "shot_saved";
else if (score >= 66) outcome = "chance_created";
else if (score >= 51) outcome = "possession_kept";
else if (score >= 36) outcome = "neutral";
else outcome = "turnover";
```

Después se pueden agregar resultados más específicos como:

* Falta.
* Córner.
* Offside.
* Penal.
* Tarjeta.

No es necesario meter todos los casos en el primer commit.

---

## 12. Estado de partido sugerido

```ts
export type MatchState = {
  playerTeam: Team;
  rivalTeam: Team;
  playerScore: number;
  rivalScore: number;
  currentMomentIndex: number;
  totalMoments: number;
  playerEnergy: number;
  rivalEnergy: number;
  playerMomentum: number;
  rivalMomentum: number;
  history: MatchEvent[];
  status: "not_started" | "in_progress" | "finished";
};
```

Se recomienda usar `playerTeam` y `rivalTeam` en vez de `homeTeam` y `awayTeam` para el MVP, porque simplifica la interfaz.

Más adelante, cuando existan partidos reales local/visitante, se puede ajustar.

---

## 13. Tipos mínimos para implementar primero

Antes de hacer componentes, crear estos tipos:

```ts
export type CardType = "attack" | "defense" | "midfield" | "special";

export type SituationType = "attack" | "defense" | "midfield" | "set_piece" | "special";

export type PlayOutcome =
  | "goal"
  | "shot_saved"
  | "shot_missed"
  | "blocked"
  | "corner"
  | "foul"
  | "offside"
  | "turnover"
  | "interception"
  | "possession_kept"
  | "chance_created"
  | "neutral";
```

---

## 14. Componentes mínimos para una primera demo

Para la primera versión funcional, no hace falta crear todos los componentes desde el día uno.

### Primer corte mínimo

* `MatchScreen.tsx`
* `TeamSelect.tsx`
* `TacticalCardView.tsx`
* `Scoreboard.tsx`
* `EnergyBar.tsx`
* `MomentumBar.tsx`
* `PlayResolutionPanel.tsx`

Con eso se puede jugar un partido completo.

### Segundo corte

* `CardHand.tsx`
* `SituationPanel.tsx`
* `MatchHistory.tsx`
* `FinalSummary.tsx`
* `TeamPreview.tsx`
* `PlayerList.tsx`

---

## 15. Primera ruta de implementación

## Paso 1: Crear tipos

Archivo:

```txt
src/lib/game/types.ts
```

Definir los tipos base.

---

## Paso 2: Crear datos mock

Archivos:

```txt
src/lib/game/teams.ts
src/lib/game/cards.ts
src/lib/game/situations.ts
src/lib/game/balance.ts
```

Agregar:

* 2 equipos.
* 10 jugadores.
* 20 cartas.
* 8 situaciones.
* constantes de balance.

---

## Paso 3: Crear utilidades

Archivo:

```txt
src/lib/game/utils.ts
```

Agregar:

* `clamp`
* `randomBetween`
* `pickRandom`
* `shuffle`

---

## Paso 4: Crear IA simple

Archivo:

```txt
src/lib/game/ai.ts
```

Agregar:

* `chooseAiCard`

---

## Paso 5: Crear narración

Archivo:

```txt
src/lib/game/narration.ts
```

Agregar:

* `generateNarration`

---

## Paso 6: Crear resolver

Archivo:

```txt
src/lib/game/resolver.ts
```

Agregar:

* `resolvePlay`
* cálculo de puntaje.
* determinación de outcome.
* cambios de energía.
* cambios de momentum.

---

## Paso 7: Crear engine

Archivo:

```txt
src/lib/game/match-engine.ts
```

Agregar:

* `startMatch`
* `getCurrentSituation`
* `getAvailableCardsForSituation`
* `playMoment`
* `isMatchFinished`

---

## Paso 8: Crear UI básica

Crear componentes mínimos y conectarlos en:

```txt
src/app/match/page.tsx
```

---

## Paso 9: Pulir interfaz

Agregar:

* Layout limpio.
* Cartas legibles.
* Barras visuales.
* Historial.
* Resumen final.
* Animaciones básicas.

---

## Paso 10: Balance inicial

Probar varios partidos y ajustar:

* frecuencia de goles.
* costo de energía.
* impacto de momentum.
* fuerza de cartas.
* comportamiento de IA.
* duración del partido.

---

## 16. Convenciones de nombres

### Archivos

Usar kebab-case:

```txt
match-engine.ts
team-select.tsx
```

Sin embargo, en React también es aceptable usar PascalCase para componentes:

```txt
MatchScreen.tsx
TeamSelect.tsx
```

Recomendación:

* Componentes: `PascalCase.tsx`
* Lógica/helpers: `kebab-case.ts`
* Datos: `kebab-case.ts` o nombres simples como `cards.ts`

### IDs de datos

Usar kebab-case:

```ts
"pase-filtrado"
"los-del-parque"
"ataque-banda"
```

### Tipos

Usar PascalCase:

```ts
TacticalCard
MatchState
PlayOutcome
```

### Funciones

Usar camelCase:

```ts
resolvePlay
startMatch
chooseAiCard
```

---

## 17. Reglas de calidad del código

* No duplicar datos de cartas en componentes.
* No calcular resultados dentro del JSX.
* No usar `any` salvo emergencia temporal.
* No mezclar estilos excesivos con lógica.
* Mantener componentes pequeños.
* Mantener funciones puras cuando sea posible.
* Centralizar constantes en `balance.ts`.
* Evitar lógica oculta difícil de balancear.
* Agregar comentarios solo donde expliquen reglas de juego, no cosas obvias.

---

## 18. Posibles pruebas manuales

Antes de avanzar a progresión o login, probar:

### Prueba 1: Partido completo

* Elegir Los del Parque.
* Jugar los 8 momentos.
* Confirmar que termina correctamente.

### Prueba 2: Marcador

* Forzar un gol.
* Confirmar que el marcador cambia.

### Prueba 3: Energía

* Usar cartas caras.
* Confirmar que baja la energía.

### Prueba 4: Momentum

* Anotar gol.
* Confirmar que sube momentum del equipo anotador.

### Prueba 5: IA

* Verificar que la IA no siempre use la misma carta.
* Confirmar que evita cartas caras cuando tiene poca energía.

### Prueba 6: Final del partido

* Confirmar que después del momento 8 aparece resumen final.

---

## 19. Cosas que no deben programarse todavía

Aunque sean tentadoras, no deben incluirse en el primer ciclo de código:

* Registro/login.
* Supabase.
* Amigos.
* Mensajes.
* Realtime.
* Inventario de cartas.
* Tienda.
* Desbloqueos.
* Modo carrera.
* Torneo completo.
* Ranking.
* Chat.
* Avatares personalizados.
* Escudos subidos por usuario.
* Imágenes complejas de cartas.
* Jugadores animados en cancha.
* Canvas o motor 2D avanzado.

Primero hay que lograr que el partido funcione y se sienta bien.

---

## 20. Roadmap inmediato después del MVP técnico

Una vez exista el primer partido funcional, el orden recomendado sería:

### 20.1 Balance y feedback

Jugar varias partidas, ajustar cartas y validar si las decisiones se sienten importantes.

### 20.2 Mejorar experiencia visual

Agregar animaciones, mejores transiciones y mayor claridad en las cartas.

### 20.3 Progresión simple

Agregar:

* Recompensa al final.
* XP para jugadores.
* Desbloqueo de una carta.
* Mejora simple de un stat.

### 20.4 Torneo corto

Agregar una mini copa de 3 partidos.

### 20.5 Persistencia local

Guardar progreso temporal en `localStorage` antes de usar base de datos real.

### 20.6 Supabase y cuentas

Solo después de validar el núcleo:

* Auth.
* Perfil.
* Equipo guardado.
* Cartas desbloqueadas.
* Historial.

### 20.7 Funcionalidades sociales

Después:

* Amigos.
* Presencia.
* Invitaciones.
* Partidas privadas.
* Mensajes.

---

## 21. Criterio para pasar a código

Se puede iniciar código cuando estén aceptadas estas decisiones:

* Next.js + React + TypeScript + Tailwind.
* MVP frontend local sin backend.
* Dos equipos iniciales.
* Veinte cartas iniciales.
* Ocho momentos por partido.
* Energía por equipo.
* Momentum por equipo.
* IA simple.
* Resolución por puntaje.
* Narración textual.

Con esas decisiones, ya es suficiente para crear el proyecto e implementar el primer prototipo.

---

## 22. Conclusión

La arquitectura inicial debe ser simple, pero bien separada.

El mayor error sería programar la interfaz como si todo fuera una maqueta y luego intentar meter reglas encima. El segundo mayor error sería hacer demasiado sistema antes de validar el partido.

La dirección correcta es:

1. Crear datos.
2. Crear tipos.
3. Crear motor.
4. Crear UI.
5. Conectar flujo completo.
6. Probar.
7. Balancear.
8. Recién después pensar en progresión, login, amigos y multijugador.

Este documento deja el proyecto listo para empezar el primer ciclo real de implementación del MVP 1.