# Implementación Sprint 2

# Motor del partido — La Mejenga

## Objetivo del Sprint 2

Construir el motor funcional del partido para que el juego pueda simular una partida completa desde código.

Al terminar este sprint, el proyecto todavía puede tener una interfaz simple, pero ya debe existir el corazón del gameplay:

* iniciar partido;
* obtener situación actual;
* generar mano de cartas;
* seleccionar protagonista;
* elegir carta rival con IA simple;
* resolver jugada;
* actualizar marcador, energía y momentum;
* generar narración;
* avanzar al siguiente momento;
* finalizar partido.

---

# 1. Archivos que se crearán en este sprint

Crear estos archivos:

```txt
src/lib/game/ai.ts
src/lib/game/narration.ts
src/lib/game/resolver.ts
src/lib/game/match-engine.ts
```

También se recomienda actualizar:

```txt
src/lib/game/types.ts
```

para agregar algunos campos útiles en los eventos del partido.

---

# 2. Actualización recomendada de `types.ts`

En el archivo:

```txt
src/lib/game/types.ts
```

reemplazar el tipo `MatchEvent` actual por esta versión ampliada:

```ts
export type MatchEvent = {
  id: string;
  minute: number;
  situationId: string;
  situationTitle: string;
  protagonistId: string;
  protagonistName: string;
  rivalProtagonistId: string;
  rivalProtagonistName: string;
  playerCardId: string;
  rivalCardId: string;
  outcome: PlayOutcome;
  narration: string;
  playerScore: number;
  rivalScore: number;
  playerEnergy: number;
  rivalEnergy: number;
  playerMomentum: number;
  rivalMomentum: number;
  playerEnergyChange: number;
  rivalEnergyChange: number;
  playerMomentumChange: number;
  rivalMomentumChange: number;
  scoreValue: number;
};
```

Y agregar estos tipos al final del archivo:

```ts
export type ResolvePlayParams = {
  matchState: MatchState;
  situation: MatchSituation;
  playerCard: TacticalCard;
  rivalCard: TacticalCard;
  protagonist: Player;
  rivalProtagonist: Player;
};

export type PlayMomentParams = {
  matchState: MatchState;
  playerCard: TacticalCard;
};
```

---

# 3. `src/lib/game/ai.ts`

Este archivo selecciona una carta para la IA rival.

La IA del MVP será simple, pero no totalmente aleatoria. Considera:

* situación actual;
* marcador;
* energía rival;
* tipo de carta;
* si la IA va ganando o perdiendo.

```ts
import { BALANCE } from "./balance";
import type { MatchSituation, MatchState, TacticalCard } from "./types";
import { pickRandom } from "./utils";

type ChooseAiCardParams = {
  situation: MatchSituation;
  availableCards: TacticalCard[];
  matchState: MatchState;
};

function getAffordableCards(cards: TacticalCard[], rivalEnergy: number): TacticalCard[] {
  const affordable = cards.filter((card) => card.energyCost <= rivalEnergy);

  return affordable.length > 0 ? affordable : cards;
}

function getCardsBySituation(cards: TacticalCard[], situation: MatchSituation): TacticalCard[] {
  const preferred = cards.filter(
    (card) =>
      situation.preferredCardTypes.includes(card.type) ||
      card.preferredSituations.includes(situation.id),
  );

  return preferred.length > 0 ? preferred : cards;
}

function getCardsByScoreContext(cards: TacticalCard[], matchState: MatchState): TacticalCard[] {
  const isWinning = matchState.rivalScore > matchState.playerScore;
  const isLosing = matchState.rivalScore < matchState.playerScore;

  if (isWinning) {
    const conservative = cards.filter(
      (card) => card.type === "defense" || card.id === "enfriar-el-partido" || card.risk <= 35,
    );

    return conservative.length > 0 ? conservative : cards;
  }

  if (isLosing) {
    const aggressive = cards.filter(
      (card) => card.type === "attack" || card.id === "todo-o-nada" || card.risk >= 45,
    );

    return aggressive.length > 0 ? aggressive : cards;
  }

  return cards;
}

function avoidExpensiveCardsWhenTired(cards: TacticalCard[], rivalEnergy: number): TacticalCard[] {
  if (rivalEnergy > 35) {
    return cards;
  }

  const cheaperCards = cards.filter((card) => card.energyCost <= 10);

  return cheaperCards.length > 0 ? cheaperCards : cards;
}

function avoidSpecialCardsTooEarly(cards: TacticalCard[], matchState: MatchState): TacticalCard[] {
  const isLateGame = matchState.currentMomentIndex >= BALANCE.totalMoments - 2;

  if (isLateGame) {
    return cards;
  }

  const nonSpecial = cards.filter((card) => card.type !== "special");

  return nonSpecial.length > 0 ? nonSpecial : cards;
}

export function chooseAiCard({
  situation,
  availableCards,
  matchState,
}: ChooseAiCardParams): TacticalCard {
  let candidates = getAffordableCards(availableCards, matchState.rivalEnergy);
  candidates = getCardsBySituation(candidates, situation);
  candidates = getCardsByScoreContext(candidates, matchState);
  candidates = avoidExpensiveCardsWhenTired(candidates, matchState.rivalEnergy);
  candidates = avoidSpecialCardsTooEarly(candidates, matchState);

  return pickRandom(candidates);
}
```

---

# 4. `src/lib/game/narration.ts`

Este archivo genera textos para explicar cada jugada.

La narración debe cumplir dos objetivos:

1. explicar qué pasó;
2. darle personalidad al juego.

```ts
import type {
  MatchSituation,
  PlayOutcome,
  Player,
  TacticalCard,
  Team,
} from "./types";
import { pickRandom } from "./utils";

type GenerateNarrationParams = {
  outcome: PlayOutcome;
  situation: MatchSituation;
  playerCard: TacticalCard;
  rivalCard: TacticalCard;
  protagonist: Player;
  rivalProtagonist: Player;
  playerTeam: Team;
  rivalTeam: Team;
};

function playerLabel(player: Player): string {
  return `${player.name} “${player.nickname}”`;
}

export function generateNarration({
  outcome,
  situation,
  playerCard,
  rivalCard,
  protagonist,
  rivalProtagonist,
  playerTeam,
  rivalTeam,
}: GenerateNarrationParams): string {
  const player = playerLabel(protagonist);
  const rival = playerLabel(rivalProtagonist);

  const narrations: Record<PlayOutcome, string[]> = {
    goal: [
      `${player} encontró el espacio justo con ${playerCard.name}. La jugada salió limpia y ${playerTeam.name} la manda a guardar. ¡Golazo!`,
      `La decisión fue perfecta: ${playerCard.name}, defensa mal parada y definición fría. ¡Gol de ${playerTeam.name}!`,
      `${player} se hizo cargo en ${situation.title.toLowerCase()} y resolvió como crack. ¡La pelota terminó adentro!`,
    ],
    shot_saved: [
      `${player} logró sacar el remate, pero ${rival} respondió con lo justo. Atajadón de ${rivalTeam.name}.`,
      `La jugada prometía muchísimo, pero el rival resistió. ${rivalCard.name} alcanzó para evitar el gol.`,
      `${playerTeam.name} estuvo cerca, muy cerca. El portero rival sostuvo el partido con una gran intervención.`,
    ],
    shot_missed: [
      `${player} se animó con ${playerCard.name}, pero la pelota salió desviada. Buena intención, mala ejecución.`,
      `Había espacio para hacer daño, pero el remate terminó lejos. En la banca no lo pueden creer.`,
      `${playerTeam.name} tuvo la oportunidad, pero la definición se fue más cerca del parqueo que del arco.`,
    ],
    blocked: [
      `${rival} leyó bien la intención y bloqueó el intento. ${rivalTeam.name} respira.`,
      `${playerCard.name} parecía buena idea, pero ${rivalCard.name} cerró la puerta justo a tiempo.`,
      `La defensa rival se plantó firme. No fue bonito, pero fue efectivo.`,
    ],
    corner: [
      `${playerTeam.name} fuerza el córner después de una jugada insistente. Todavía hay peligro.`,
      `${rivalTeam.name} logró evitar el remate claro, pero concede tiro de esquina.`,
      `La pelota se desvía y se va al córner. El público siente que algo puede pasar.`,
    ],
    foul: [
      `${rival} llegó tarde y cortó la jugada. Hay falta y reclamos por todo lado.`,
      `${player} iba tomando ventaja, pero el rival lo bajó antes de que la cosa se pusiera peor.`,
      `La jugada terminó en falta. No fue elegante, pero el rival frenó el peligro.`,
    ],
    yellow_card: [
      `${rival} fue con demasiada fuerza. El árbitro no dudó: amarilla clara.`,
      `La entrada levantó a todos. Falta fuerte y tarjeta para ${rivalTeam.name}.`,
      `Eso en una mejenga normal se discute media hora. Aquí el árbitro sacó amarilla.`,
    ],
    penalty: [
      `${player} entró al área y el contacto fue claro. ¡Penal para ${playerTeam.name}!`,
      `La defensa se desesperó y terminó cometiendo penal. Momento enorme del partido.`,
      `${rivalTeam.name} queda contra las cuerdas: falta dentro del área y penal señalado.`,
    ],
    offside: [
      `${playerCard.name} parecía perfecto, pero ${rivalTeam.name} tiró bien la línea. Fuera de juego.`,
      `${player} arrancó antes de tiempo. La jugada prometía, pero queda anulada.`,
      `El pase rompía todo, pero el asistente levantó la bandera. Se salva ${rivalTeam.name}.`,
    ],
    turnover: [
      `${playerTeam.name} arriesgó y perdió la pelota. ${rivalTeam.name} recupera en una zona peligrosa.`,
      `${playerCard.name} no salió. Mala decisión o mala ejecución, pero el rival ya tiene la bola.`,
      `${player} intentó hacer una de más y terminó regalando la posesión.`,
    ],
    interception: [
      `${rival} anticipó la jugada como si hubiera leído el guion. Intercepción limpia.`,
      `${rivalCard.name} funcionó perfecto. ${rivalTeam.name} corta el avance.`,
      `El pase no llegó a destino. El rival estaba mejor ubicado y recuperó la pelota.`,
    ],
    possession_kept: [
      `${playerTeam.name} no generó peligro claro, pero mantiene la pelota y ordena el partido.`,
      `${player} decidió no rifarla. La jugada sigue viva, aunque sin daño inmediato.`,
      `No hubo golpe fuerte, pero ${playerTeam.name} conserva el control.`,
    ],
    chance_created: [
      `${playerTeam.name} construyó una ocasión clara. No fue gol, pero el rival quedó avisado.`,
      `${playerCard.name} abrió una grieta en la defensa. La jugada terminó con mucho peligro.`,
      `${player} encontró ventaja y dejó a ${playerTeam.name} cerca del gol.`,
    ],
    neutral: [
      `La jugada se trabó y ninguno logró sacar ventaja real. El partido sigue parejo.`,
      `${playerCard.name} contra ${rivalCard.name}: choque táctico sin ganador claro.`,
      `Mucho intento, poco espacio. La pelota sigue en disputa y el marcador no se mueve.`,
    ],
  };

  return pickRandom(narrations[outcome]);
}
```

---

# 5. `src/lib/game/resolver.ts`

Este archivo resuelve una jugada individual.

La fórmula inicial es sencilla, pero permite balancear:

```txt
puntaje = poderCarta
        + stats
        + counter
        + energía
        + momentum
        + situación
        + azar
        - penalización de riesgo
```

```ts
import { BALANCE } from "./balance";
import { generateNarration } from "./narration";
import type {
  MatchEvent,
  PlayOutcome,
  ResolvePlayParams,
  TacticalCard,
} from "./types";
import { clamp, randomBetween } from "./utils";

function getRelevantStatModifier(params: ResolvePlayParams): number {
  const { situation, playerCard, protagonist } = params;

  if (playerCard.type === "attack") {
    if (situation.type === "set_piece") {
      return Math.round((protagonist.attack + protagonist.technique + protagonist.mentality) / 18);
    }

    return Math.round((protagonist.attack + protagonist.technique) / 14);
  }

  if (playerCard.type === "defense") {
    return Math.round((protagonist.defense + protagonist.physical + protagonist.mentality) / 18);
  }

  if (playerCard.type === "midfield") {
    return Math.round((protagonist.technique + protagonist.mentality + protagonist.stamina) / 18);
  }

  return Math.round((protagonist.mentality + protagonist.attack + protagonist.technique) / 20);
}

function getRivalPressureModifier(params: ResolvePlayParams): number {
  const { rivalCard, rivalProtagonist } = params;

  if (rivalCard.type === "defense") {
    return Math.round((rivalProtagonist.defense + rivalProtagonist.physical) / 18);
  }

  if (rivalCard.type === "midfield") {
    return Math.round((rivalProtagonist.technique + rivalProtagonist.mentality) / 22);
  }

  if (rivalCard.type === "special") {
    return Math.round((rivalProtagonist.mentality + rivalProtagonist.defense) / 24);
  }

  return Math.round(rivalProtagonist.defense / 25);
}

function getCounterModifier(playerCard: TacticalCard, rivalCard: TacticalCard): number {
  if (playerCard.weakAgainst.includes(rivalCard.id)) {
    return -12;
  }

  if (playerCard.strongAgainst.includes(rivalCard.id)) {
    return 10;
  }

  if (rivalCard.strongAgainst.includes(playerCard.id)) {
    return -10;
  }

  if (rivalCard.weakAgainst.includes(playerCard.id)) {
    return 8;
  }

  return 0;
}

function getEnergyModifier(energy: number, card: TacticalCard): number {
  if (energy <= 15) {
    return card.energyCost >= 12 ? -16 : -10;
  }

  if (energy <= 35) {
    return card.energyCost >= 12 ? -10 : -5;
  }

  if (energy <= 60) {
    return card.energyCost >= 15 ? -5 : 0;
  }

  return 0;
}

function getMomentumModifier(momentum: number): number {
  if (momentum >= 80) {
    return 8;
  }

  if (momentum >= 65) {
    return 4;
  }

  if (momentum <= 20) {
    return -8;
  }

  if (momentum <= 35) {
    return -4;
  }

  return 0;
}

function getSituationModifier(params: ResolvePlayParams): number {
  const { situation, playerCard } = params;

  let modifier = 0;

  if (situation.preferredCardTypes.includes(playerCard.type)) {
    modifier += 6;
  }

  if (playerCard.preferredSituations.includes(situation.id)) {
    modifier += 8;
  }

  if (playerCard.type === "special" && situation.id !== "ultima-jugada") {
    modifier -= 5;
  }

  return modifier;
}

function getRiskPenalty(card: TacticalCard): number {
  if (card.risk >= 70) {
    return 10;
  }

  if (card.risk >= 55) {
    return 6;
  }

  if (card.risk <= 30) {
    return -3;
  }

  return 0;
}

function determineOutcome(scoreValue: number, playerCard: TacticalCard, rivalCard: TacticalCard): PlayOutcome {
  if (scoreValue >= BALANCE.goalThreshold) {
    return "goal";
  }

  if (scoreValue >= BALANCE.shotThreshold) {
    return playerCard.risk >= 55 ? "shot_missed" : "shot_saved";
  }

  if (scoreValue >= BALANCE.chanceThreshold) {
    return "chance_created";
  }

  if (scoreValue >= BALANCE.possessionThreshold) {
    return "possession_kept";
  }

  if (scoreValue >= BALANCE.neutralThreshold) {
    return "neutral";
  }

  if (rivalCard.id === "linea-adelantada" && playerCard.id === "pase-filtrado") {
    return "offside";
  }

  if (rivalCard.id === "barrida-fuerte" && playerCard.id === "regate-individual") {
    return rivalCard.risk >= 60 ? "foul" : "turnover";
  }

  if (rivalCard.type === "defense") {
    return "interception";
  }

  return "turnover";
}

function getMomentumChanges(outcome: PlayOutcome): {
  playerMomentumChange: number;
  rivalMomentumChange: number;
} {
  switch (outcome) {
    case "goal":
      return { playerMomentumChange: 18, rivalMomentumChange: -15 };
    case "shot_saved":
      return { playerMomentumChange: 4, rivalMomentumChange: 8 };
    case "shot_missed":
      return { playerMomentumChange: -6, rivalMomentumChange: 4 };
    case "chance_created":
      return { playerMomentumChange: 8, rivalMomentumChange: -4 };
    case "corner":
      return { playerMomentumChange: 5, rivalMomentumChange: -2 };
    case "foul":
      return { playerMomentumChange: 4, rivalMomentumChange: -6 };
    case "yellow_card":
      return { playerMomentumChange: 6, rivalMomentumChange: -8 };
    case "penalty":
      return { playerMomentumChange: 12, rivalMomentumChange: -12 };
    case "offside":
      return { playerMomentumChange: -5, rivalMomentumChange: 5 };
    case "turnover":
    case "interception":
      return { playerMomentumChange: -7, rivalMomentumChange: 7 };
    case "possession_kept":
      return { playerMomentumChange: 3, rivalMomentumChange: -1 };
    case "blocked":
      return { playerMomentumChange: -2, rivalMomentumChange: 5 };
    case "neutral":
    default:
      return { playerMomentumChange: 0, rivalMomentumChange: 0 };
  }
}

function createEventId(): string {
  return `event-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function resolvePlay(params: ResolvePlayParams): MatchEvent {
  const { matchState, situation, playerCard, rivalCard, protagonist, rivalProtagonist } = params;

  const statModifier = getRelevantStatModifier(params);
  const rivalPressureModifier = getRivalPressureModifier(params);
  const counterModifier = getCounterModifier(playerCard, rivalCard);
  const energyModifier = getEnergyModifier(matchState.playerEnergy, playerCard);
  const momentumModifier = getMomentumModifier(matchState.playerMomentum);
  const situationModifier = getSituationModifier(params);
  const riskPenalty = getRiskPenalty(playerCard);
  const randomModifier = randomBetween(BALANCE.randomMin, BALANCE.randomMax);

  const rawScore =
    playerCard.basePower +
    statModifier +
    counterModifier +
    energyModifier +
    momentumModifier +
    situationModifier +
    randomModifier -
    rivalPressureModifier -
    riskPenalty;

  const scoreValue = clamp(Math.round(rawScore), 0, 120);
  const outcome = determineOutcome(scoreValue, playerCard, rivalCard);

  const playerEnergyChange = -playerCard.energyCost;
  const rivalEnergyChange = -rivalCard.energyCost;
  const { playerMomentumChange, rivalMomentumChange } = getMomentumChanges(outcome);

  const playerScore = outcome === "goal" ? matchState.playerScore + 1 : matchState.playerScore;
  const rivalScore = matchState.rivalScore;

  const playerEnergy = clamp(
    matchState.playerEnergy + playerEnergyChange,
    BALANCE.minValue,
    BALANCE.maxValue,
  );

  const rivalEnergy = clamp(
    matchState.rivalEnergy + rivalEnergyChange,
    BALANCE.minValue,
    BALANCE.maxValue,
  );

  const playerMomentum = clamp(
    matchState.playerMomentum + playerMomentumChange,
    BALANCE.minValue,
    BALANCE.maxValue,
  );

  const rivalMomentum = clamp(
    matchState.rivalMomentum + rivalMomentumChange,
    BALANCE.minValue,
    BALANCE.maxValue,
  );

  const narration = generateNarration({
    outcome,
    situation,
    playerCard,
    rivalCard,
    protagonist,
    rivalProtagonist,
    playerTeam: matchState.playerTeam,
    rivalTeam: matchState.rivalTeam,
  });

  return {
    id: createEventId(),
    minute: situation.minute,
    situationId: situation.id,
    situationTitle: situation.title,
    protagonistId: protagonist.id,
    protagonistName: `${protagonist.name} “${protagonist.nickname}”`,
    rivalProtagonistId: rivalProtagonist.id,
    rivalProtagonistName: `${rivalProtagonist.name} “${rivalProtagonist.nickname}”`,
    playerCardId: playerCard.id,
    rivalCardId: rivalCard.id,
    outcome,
    narration,
    playerScore,
    rivalScore,
    playerEnergy,
    rivalEnergy,
    playerMomentum,
    rivalMomentum,
    playerEnergyChange,
    rivalEnergyChange,
    playerMomentumChange,
    rivalMomentumChange,
    scoreValue,
  };
}
```

---

# 6. `src/lib/game/match-engine.ts`

Este archivo orquesta el partido.

Aquí se conectan:

* equipos;
* situaciones;
* cartas;
* IA;
* resolución;
* avance de momentos;
* finalización.

```ts
import { BALANCE } from "./balance";
import { TACTICAL_CARDS } from "./cards";
import { chooseAiCard } from "./ai";
import { resolvePlay } from "./resolver";
import { MATCH_SITUATIONS } from "./situations";
import type {
  MatchSituation,
  MatchState,
  PlayMomentParams,
  Player,
  TacticalCard,
  Team,
} from "./types";
import { pickRandom, shuffle, uniqueById } from "./utils";

export function startMatch(playerTeam: Team, rivalTeam: Team): MatchState {
  return {
    playerTeam,
    rivalTeam,
    playerScore: 0,
    rivalScore: 0,
    currentMomentIndex: 0,
    totalMoments: BALANCE.totalMoments,
    playerEnergy: BALANCE.initialEnergy,
    rivalEnergy: BALANCE.initialEnergy,
    playerMomentum: BALANCE.initialMomentum,
    rivalMomentum: BALANCE.initialMomentum,
    history: [],
    status: "in_progress",
  };
}

export function isMatchFinished(matchState: MatchState): boolean {
  return matchState.status === "finished" || matchState.currentMomentIndex >= matchState.totalMoments;
}

export function getCurrentSituation(matchState: MatchState): MatchSituation {
  const situation = MATCH_SITUATIONS[matchState.currentMomentIndex];

  if (!situation) {
    return MATCH_SITUATIONS[MATCH_SITUATIONS.length - 1];
  }

  return situation;
}

export function getAvailableCardsForSituation(situation: MatchSituation): TacticalCard[] {
  const preferredCards = TACTICAL_CARDS.filter(
    (card) =>
      situation.preferredCardTypes.includes(card.type) ||
      card.preferredSituations.includes(situation.id),
  );

  const otherCards = TACTICAL_CARDS.filter(
    (card) => !preferredCards.some((preferredCard) => preferredCard.id === card.id),
  );

  const selectedPreferred = shuffle(preferredCards).slice(0, 3);
  const selectedOther = shuffle(otherCards).slice(0, BALANCE.cardsPerHand - selectedPreferred.length);

  const hand = uniqueById([...selectedPreferred, ...selectedOther]);

  if (hand.length >= BALANCE.cardsPerHand) {
    return hand.slice(0, BALANCE.cardsPerHand);
  }

  const fallback = shuffle(
    TACTICAL_CARDS.filter((card) => !hand.some((selectedCard) => selectedCard.id === card.id)),
  );

  return uniqueById([...hand, ...fallback]).slice(0, BALANCE.cardsPerHand);
}

export function selectProtagonist(team: Team, situation: MatchSituation): Player {
  if (situation.type === "attack") {
    const attackers = team.players.filter(
      (player) => player.role === "forward" || player.role === "midfielder" || player.role === "utility",
    );

    return pickRandom(attackers);
  }

  if (situation.type === "defense") {
    const defenders = team.players.filter(
      (player) => player.role === "defender" || player.role === "midfielder" || player.role === "utility",
    );

    return pickRandom(defenders);
  }

  if (situation.type === "set_piece") {
    const sortedByTechnique = [...team.players].sort(
      (a, b) => b.attack + b.technique + b.mentality - (a.attack + a.technique + a.mentality),
    );

    return sortedByTechnique[0];
  }

  if (situation.type === "special") {
    const sortedByMentality = [...team.players].sort(
      (a, b) => b.attack + b.mentality - (a.attack + a.mentality),
    );

    return sortedByMentality[0];
  }

  const midfielders = team.players.filter(
    (player) => player.role === "midfielder" || player.role === "utility",
  );

  return pickRandom(midfielders.length > 0 ? midfielders : team.players);
}

function applyEvent(matchState: MatchState, event: ReturnType<typeof resolvePlay>): MatchState {
  const nextMomentIndex = matchState.currentMomentIndex + 1;
  const finished = nextMomentIndex >= matchState.totalMoments;

  return {
    ...matchState,
    playerScore: event.playerScore,
    rivalScore: event.rivalScore,
    playerEnergy: event.playerEnergy,
    rivalEnergy: event.rivalEnergy,
    playerMomentum: event.playerMomentum,
    rivalMomentum: event.rivalMomentum,
    currentMomentIndex: nextMomentIndex,
    history: [...matchState.history, event],
    status: finished ? "finished" : "in_progress",
  };
}

export function playMoment({ matchState, playerCard }: PlayMomentParams): MatchState {
  if (isMatchFinished(matchState)) {
    return matchState;
  }

  const situation = getCurrentSituation(matchState);
  const protagonist = selectProtagonist(matchState.playerTeam, situation);
  const rivalProtagonist = selectProtagonist(matchState.rivalTeam, situation);
  const rivalAvailableCards = getAvailableCardsForSituation(situation);

  const rivalCard = chooseAiCard({
    situation,
    availableCards: rivalAvailableCards,
    matchState,
  });

  const event = resolvePlay({
    matchState,
    situation,
    playerCard,
    rivalCard,
    protagonist,
    rivalProtagonist,
  });

  return applyEvent(matchState, event);
}

export function getMatchWinner(matchState: MatchState): "player" | "rival" | "draw" {
  if (matchState.playerScore > matchState.rivalScore) {
    return "player";
  }

  if (matchState.rivalScore > matchState.playerScore) {
    return "rival";
  }

  return "draw";
}
```

---

# 7. Validación rápida del motor en `/match/page.tsx`

Para probar que el motor funciona antes de construir la UI completa, se puede reemplazar temporalmente el contenido de:

```txt
src/app/match/page.tsx
```

por este código:

```tsx
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { getAvailableCardsForSituation, getCurrentSituation, getMatchWinner, playMoment, startMatch } from "@/lib/game/match-engine";
import { getDefaultRivalTeam, TEAMS } from "@/lib/game/teams";
import type { MatchState, TacticalCard } from "@/lib/game/types";

export default function MatchPage() {
  const playerTeam = TEAMS[0];
  const rivalTeam = getDefaultRivalTeam(playerTeam.id);

  const [matchState, setMatchState] = useState<MatchState>(() =>
    startMatch(playerTeam, rivalTeam),
  );

  const situation = useMemo(() => getCurrentSituation(matchState), [matchState]);
  const availableCards = useMemo(
    () => getAvailableCardsForSituation(situation),
    [situation],
  );

  function handlePlayCard(card: TacticalCard) {
    const nextState = playMoment({ matchState, playerCard: card });
    setMatchState(nextState);
  }

  function handleRestart() {
    setMatchState(startMatch(playerTeam, rivalTeam));
  }

  const lastEvent = matchState.history.at(-1);
  const winner = getMatchWinner(matchState);

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-8 text-zinc-50">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-emerald-300">Sprint 2</p>
            <h1 className="text-3xl font-black">Motor del partido</h1>
          </div>

          <Link
            href="/"
            className="rounded-xl border border-zinc-700 px-4 py-2 text-sm font-semibold text-zinc-200 hover:bg-zinc-900"
          >
            Volver
          </Link>
        </div>

        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <p className="text-sm text-zinc-400">Marcador</p>
              <h2 className="mt-1 text-3xl font-black">
                {matchState.playerTeam.name} {matchState.playerScore} - {matchState.rivalScore} {matchState.rivalTeam.name}
              </h2>
            </div>

            <div className="text-left md:text-right">
              <p className="text-sm text-zinc-400">Momento</p>
              <p className="text-xl font-bold">
                {matchState.status === "finished"
                  ? "Finalizado"
                  : `${matchState.currentMomentIndex + 1}/${matchState.totalMoments}`}
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl bg-zinc-950 p-4">
              <p className="text-sm text-zinc-400">Energía usuario</p>
              <p className="text-2xl font-black text-emerald-300">{matchState.playerEnergy}</p>
            </div>

            <div className="rounded-xl bg-zinc-950 p-4">
              <p className="text-sm text-zinc-400">Momentum usuario</p>
              <p className="text-2xl font-black text-emerald-300">{matchState.playerMomentum}</p>
            </div>

            <div className="rounded-xl bg-zinc-950 p-4">
              <p className="text-sm text-zinc-400">Energía rival</p>
              <p className="text-2xl font-black text-red-300">{matchState.rivalEnergy}</p>
            </div>

            <div className="rounded-xl bg-zinc-950 p-4">
              <p className="text-sm text-zinc-400">Momentum rival</p>
              <p className="text-2xl font-black text-red-300">{matchState.rivalMomentum}</p>
            </div>
          </div>
        </section>

        {matchState.status === "finished" ? (
          <section className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6">
            <h2 className="text-2xl font-black">Partido finalizado</h2>
            <p className="mt-2 text-zinc-300">
              {winner === "player" && `Ganó ${matchState.playerTeam.name}.`}
              {winner === "rival" && `Ganó ${matchState.rivalTeam.name}.`}
              {winner === "draw" && "El partido terminó empatado."}
            </p>

            <button
              onClick={handleRestart}
              className="mt-5 rounded-xl bg-emerald-400 px-5 py-3 font-bold text-zinc-950 hover:bg-emerald-300"
            >
              Jugar de nuevo
            </button>
          </section>
        ) : (
          <>
            <section className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6">
              <p className="text-sm text-emerald-300">Minuto {situation.minute}</p>
              <h2 className="mt-1 text-2xl font-black">{situation.title}</h2>
              <p className="mt-2 text-zinc-300">{situation.description}</p>
            </section>

            <section className="mt-6">
              <h2 className="text-xl font-bold">Elegí una carta</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-4">
                {availableCards.map((card) => (
                  <button
                    key={card.id}
                    onClick={() => handlePlayCard(card)}
                    className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 text-left transition hover:-translate-y-1 hover:border-emerald-400/60 hover:bg-zinc-800"
                  >
                    <p className="text-xs font-bold uppercase tracking-wide text-emerald-300">
                      {card.type}
                    </p>
                    <h3 className="mt-2 text-lg font-black">{card.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-300">{card.description}</p>
                    <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                      <span className="rounded-lg bg-zinc-950 p-2">Poder {card.basePower}</span>
                      <span className="rounded-lg bg-zinc-950 p-2">Riesgo {card.risk}</span>
                      <span className="rounded-lg bg-zinc-950 p-2">Energía {card.energyCost}</span>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          </>
        )}

        {lastEvent && (
          <section className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6">
            <p className="text-sm text-zinc-400">Última jugada</p>
            <h2 className="mt-1 text-xl font-black capitalize">{lastEvent.outcome.replaceAll("_", " ")}</h2>
            <p className="mt-3 leading-7 text-zinc-300">{lastEvent.narration}</p>
            <div className="mt-4 text-sm text-zinc-400">
              Puntaje interno de jugada: {lastEvent.scoreValue}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
```

---

# 8. Validación del Sprint 2

Ejecutar:

```bash
npm run dev
```

Abrir:

```txt
http://localhost:3000/match
```

Probar:

1. Debe iniciar el partido 0-0.
2. Debe mostrar una situación.
3. Debe mostrar 4 cartas.
4. Al elegir una carta, debe resolverse la jugada.
5. Debe cambiar energía.
6. Debe cambiar momentum.
7. Puede cambiar marcador si hay gol.
8. Debe mostrar narración.
9. Después de 8 jugadas debe finalizar.
10. Debe permitir jugar de nuevo.

---

# 9. Resultado esperado al terminar Sprint 2

Al finalizar este sprint, el proyecto debe tener:

* motor local funcional;
* IA simple;
* resolución de jugadas;
* cambios de marcador;
* energía;
* momentum;
* narración;
* avance de momentos;
* finalización de partido;
* prueba visual temporal en `/match`.

---

# 10. Qué NO hacemos todavía

Todavía no se implementa:

* componentes visuales finales;
* selección de equipo real;
* cartas con diseño final;
* historial detallado;
* animaciones pulidas;
* progresión;
* torneo;
* localStorage;
* login;
* Supabase;
* amigos;
* mensajes;
* multijugador.

---

# 11. Siguiente paso después de Sprint 2

El Sprint 3 debe construir la interfaz jugable real con componentes separados:

```txt
src/components/team/TeamSelect.tsx
src/components/match/MatchScreen.tsx
src/components/match/Scoreboard.tsx
src/components/match/EnergyBar.tsx
src/components/match/MomentumBar.tsx
src/components/match/SituationPanel.tsx
src/components/match/CardHand.tsx
src/components/match/TacticalCardView.tsx
src/components/match/PlayResolutionPanel.tsx
src/components/match/FinalSummary.tsx
```

Después de eso, el juego ya debería sentirse como una primera demo real.