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
  const canScore =
    playerCard.type === "attack" ||
    playerCard.id === "todo-o-nada" ||
    playerCard.id === "ultima-jugada";
  if (scoreValue >= BALANCE.goalThreshold) {
    return "goal";
  }

  if (scoreValue >= BALANCE.goalThreshold) {
    if (canScore) {
        return "goal";
    }

    if (playerCard.id === "enfriar-el-partido") {
        return "possession_kept";
    }

    if (playerCard.id === "la-hinchada-empuja") {
        return "chance_created";
    }

    return "chance_created";
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