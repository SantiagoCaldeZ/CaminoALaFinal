import { BALANCE } from "./balance";
import { generateNarration } from "./narration";
import type {
  MatchEvent,
  MatchSituation,
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
    return BALANCE.weakCounterPenalty;
  }

  if (playerCard.strongAgainst.includes(rivalCard.id)) {
    return BALANCE.strongCounterBonus;
  }

  if (rivalCard.strongAgainst.includes(playerCard.id)) {
    return BALANCE.rivalStrongCounterPenalty;
  }

  if (rivalCard.weakAgainst.includes(playerCard.id)) {
    return BALANCE.rivalWeakCounterBonus;
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
    return 5;
  }

  if (momentum >= 65) {
    return 2;
  }

  if (momentum <= 20) {
    return -5;
  }

  if (momentum <= 35) {
    return -2;
  }

  return 0;
}

function getSituationModifier(params: ResolvePlayParams): number {
  const { situation, playerCard } = params;

  let modifier = 0;

  if (situation.preferredCardTypes.includes(playerCard.type)) {
    modifier += BALANCE.preferredTypeBonus;
  }

  if (playerCard.preferredSituations.includes(situation.id)) {
    modifier += BALANCE.recommendedCardBonus;
  }

  if (playerCard.type === "special" && situation.id !== "ultima-jugada") {
    modifier -= BALANCE.specialCardEarlyPenalty;
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

function determineOutcome(
  scoreValue: number,
  playerCard: TacticalCard,
  rivalCard: TacticalCard,
  situation: MatchSituation,
): PlayOutcome {
  const canPlayerScoreDirectly =
    playerCard.type === "attack" ||
    playerCard.id === "todo-o-nada" ||
    playerCard.id === "ultima-jugada";

  const rivalCanPunish =
    rivalCard.type === "attack" ||
    rivalCard.id === "anticipacion" ||
    rivalCard.id === "linea-adelantada" ||
    rivalCard.id === "barrida-fuerte" ||
    rivalCard.id === "pelotazo" ||
    rivalCard.id === "todo-o-nada" ||
    rivalCard.id === "ultima-jugada";

  const playerIsExposed =
    playerCard.type === "attack" ||
    playerCard.risk >= 55 ||
    playerCard.id === "todo-o-nada" ||
    playerCard.id === "regate-individual" ||
    playerCard.id === "tiro-lejano" ||
    playerCard.id === "linea-adelantada";

  const dangerousSituation =
    situation.id === "presion-rival" ||
    situation.id === "contraataque" ||
    situation.id === "posesion-media" ||
    situation.id === "ultima-jugada";

  if (scoreValue >= BALANCE.goalThreshold) {
    if (canPlayerScoreDirectly) {
      const goalSafetyMargin = scoreValue - BALANCE.goalThreshold;

      if (goalSafetyMargin >= 8) {
        return "goal";
      }

      return "chance_created";
    }

    return "chance_created";
  }

  const veryBadResolution =
    scoreValue <= BALANCE.possessionThreshold + 8;

  const badResolutionInDanger =
    scoreValue <= BALANCE.chanceThreshold + 4 &&
    (playerIsExposed || dangerousSituation);

  const rivalThreatValue =
    rivalCard.basePower +
    (rivalCard.type === "attack" ? 16 : 0) +
    (rivalCanPunish ? 10 : 0) +
    (playerIsExposed ? 8 : 0) +
    (dangerousSituation ? 10 : 0) +
    (veryBadResolution ? 16 : badResolutionInDanger ? 8 : 0) -
    (playerCard.type === "defense" ? 14 : 0) -
    (playerCard.id === "bloque-bajo" ? 12 : 0) -
    (playerCard.id === "enfriar-el-partido" ? 8 : 0);

  const rivalCounterWindow =
    veryBadResolution || badResolutionInDanger;

  if (rivalCanPunish && rivalCounterWindow && rivalThreatValue >= 0) {
    return "rival_goal";
  }

  if (scoreValue >= BALANCE.shotThreshold) {
    if (!canPlayerScoreDirectly) {
      return "chance_created";
    }

    if (rivalCard.id === "bloque-bajo" || rivalCard.id === "anticipacion") {
      return "blocked";
    }

    return playerCard.risk >= 55 ? "shot_missed" : "shot_saved";
  }

  if (scoreValue >= BALANCE.chanceThreshold) {
    if (playerCard.id === "centro-al-area") {
      return "corner";
    }

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
    if (rivalCard.risk >= 65 && scoreValue <= 25) {
      return "yellow_card";
    }

    return "foul";
  }

  if (rivalCard.id === "marcar-al-hombre" && playerCard.type === "attack") {
    return "blocked";
  }

  if (rivalCard.type === "defense") {
    return "interception";
  }

  return "turnover";
}

function getScoringIntentModifier(card: TacticalCard): number {
  if (card.id === "todo-o-nada") {
    return 8;
  }

  if (card.id === "ultima-jugada") {
    return 7;
  }

  if (card.type === "attack") {
    return 3;
  }

  return 0;
}

function getMomentumChanges(outcome: PlayOutcome): {
  playerMomentumChange: number;
  rivalMomentumChange: number;
} {
  switch (outcome) {
    case "goal":
      return { playerMomentumChange: 10, rivalMomentumChange: -6 };

    case "rival_goal":
      return { playerMomentumChange: -10, rivalMomentumChange: 12 };

    case "shot_saved":
      return { playerMomentumChange: -3, rivalMomentumChange: 8 };

    case "shot_missed":
      return { playerMomentumChange: -7, rivalMomentumChange: 5 };

    case "chance_created":
      return { playerMomentumChange: 5, rivalMomentumChange: 0 };

    case "corner":
      return { playerMomentumChange: 3, rivalMomentumChange: 0 };

    case "foul":
      return { playerMomentumChange: 2, rivalMomentumChange: -3 };

    case "yellow_card":
      return { playerMomentumChange: 3, rivalMomentumChange: -5 };

    case "penalty":
      return { playerMomentumChange: 10, rivalMomentumChange: -8 };

    case "offside":
      return { playerMomentumChange: -6, rivalMomentumChange: 5 };

    case "turnover":
    case "interception":
      return { playerMomentumChange: -8, rivalMomentumChange: 8 };

    case "possession_kept":
      return { playerMomentumChange: 1, rivalMomentumChange: 1 };

    case "blocked":
      return { playerMomentumChange: -5, rivalMomentumChange: 7 };

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
  const scoringIntentModifier = getScoringIntentModifier(playerCard);

  const rawScore =
    playerCard.basePower +
    statModifier +
    counterModifier +
    energyModifier +
    momentumModifier +
    situationModifier +
    scoringIntentModifier +
    randomModifier -
    rivalPressureModifier -
    riskPenalty;

  const scoreValue = clamp(Math.round(rawScore), 0, 120);
  const outcome = determineOutcome(scoreValue, playerCard, rivalCard, situation);

  const playerEnergyChange = -playerCard.energyCost;
  const rivalEnergyChange = -rivalCard.energyCost;
  const { playerMomentumChange, rivalMomentumChange } = getMomentumChanges(outcome);

  const playerScore =
    outcome === "goal" ? matchState.playerScore + 1 : matchState.playerScore;

  const rivalScore =
    outcome === "rival_goal" ? matchState.rivalScore + 1 : matchState.rivalScore;

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