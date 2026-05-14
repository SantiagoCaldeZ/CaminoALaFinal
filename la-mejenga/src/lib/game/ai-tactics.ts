import type { MatchSituation, MatchState, TacticalCard, Team } from "./types";
import { randomBetween } from "./utils";

type ChooseAiCardParams = {
  matchState: MatchState;
  situation: MatchSituation;
  availableCards: TacticalCard[];
  playerCard: TacticalCard;
};

type AiCardScoreParams = {
  matchState: MatchState;
  situation: MatchSituation;
  rivalTeam: Team;
  playerTeam: Team;
  card: TacticalCard;
  playerCard: TacticalCard;
};

function getScoreState(matchState: MatchState): "winning" | "drawing" | "losing" {
  if (matchState.rivalScore > matchState.playerScore) {
    return "winning";
  }

  if (matchState.rivalScore < matchState.playerScore) {
    return "losing";
  }

  return "drawing";
}

function getMatchPhase(matchState: MatchState): "early" | "middle" | "late" | "final" {
  const progress = matchState.currentMomentIndex / Math.max(matchState.totalMoments - 1, 1);

  if (progress >= 0.85) {
    return "final";
  }

  if (progress >= 0.6) {
    return "late";
  }

  if (progress >= 0.3) {
    return "middle";
  }

  return "early";
}

function getStyleCardScore(team: Team, card: TacticalCard): number {
  if (team.style === "balanced") {
    if (card.risk <= 55) {
      return 6;
    }

    return 2;
  }

  if (team.style === "fast") {
    if (card.type === "attack") {
      return 11;
    }

    if (card.type === "midfield") {
      return 5;
    }

    if (card.type === "defense") {
      return -3;
    }
  }

  if (team.style === "technical") {
    if (card.type === "midfield") {
      return 11;
    }

    if (card.type === "special") {
      return 6;
    }

    if (card.risk <= 55) {
      return 4;
    }
  }

  if (team.style === "physical") {
    if (card.type === "defense") {
      return 7;
    }

    if (card.type === "attack") {
      return 6;
    }

    if (card.energyCost >= 12) {
      return 3;
    }
  }

  if (team.style === "defensive") {
    if (card.type === "defense") {
      return 13;
    }

    if (card.type === "midfield") {
      return 6;
    }

    if (card.type === "attack" && card.risk >= 60) {
      return -7;
    }
  }

  return 0;
}

function getScoreContextModifier({
  matchState,
  card,
}: AiCardScoreParams): number {
  const scoreState = getScoreState(matchState);
  const phase = getMatchPhase(matchState);

  let modifier = 0;

  if (scoreState === "winning") {
    if (card.type === "defense") {
      modifier += 10;
    }

    if (card.type === "midfield") {
      modifier += 6;
    }

    if (card.risk >= 65) {
      modifier -= phase === "final" ? 12 : 7;
    }
  }

  if (scoreState === "losing") {
    if (card.type === "attack") {
      modifier += phase === "final" ? 14 : 8;
    }

    if (card.type === "special") {
      modifier += phase === "final" ? 12 : 5;
    }

    if (card.type === "defense" && phase === "final") {
      modifier -= 10;
    }
  }

  if (scoreState === "drawing") {
    if (phase === "final") {
      if (card.type === "special") {
        modifier += 10;
      }

      if (card.type === "attack") {
        modifier += 7;
      }

      if (card.risk >= 70) {
        modifier -= 2;
      }
    }

    if (phase === "early" && card.risk >= 70) {
      modifier -= 6;
    }
  }

  return modifier;
}

function getEnergyContextModifier(matchState: MatchState, card: TacticalCard): number {
  const energyAfterCard = matchState.rivalEnergy - card.energyCost;

  if (matchState.rivalEnergy <= 20) {
    return card.energyCost <= 8 ? 8 : -14;
  }

  if (matchState.rivalEnergy <= 40) {
    return card.energyCost <= 10 ? 5 : -7;
  }

  if (energyAfterCard <= 5) {
    return -8;
  }

  return 0;
}

function getMomentumContextModifier(matchState: MatchState, card: TacticalCard): number {
  let modifier = 0;

  if (matchState.rivalMomentum >= 75) {
    if (card.type === "attack" || card.type === "special") {
      modifier += 6;
    }
  }

  if (matchState.rivalMomentum <= 35) {
    if (card.type === "defense" || card.type === "midfield") {
      modifier += 6;
    }

    if (card.risk >= 65) {
      modifier -= 6;
    }
  }

  return modifier;
}

function getCounterResponseModifier(card: TacticalCard, playerCard: TacticalCard): number {
  let modifier = 0;

  if (card.strongAgainst.includes(playerCard.id)) {
    modifier += 14;
  }

  if (card.weakAgainst.includes(playerCard.id)) {
    modifier -= 12;
  }

  if (playerCard.strongAgainst.includes(card.id)) {
    modifier -= 8;
  }

  if (playerCard.weakAgainst.includes(card.id)) {
    modifier += 6;
  }

  return modifier;
}

function getSituationFitModifier(card: TacticalCard, situation: MatchSituation): number {
  let modifier = 0;

  if (situation.preferredCardTypes.includes(card.type)) {
    modifier += 10;
  }

  if (card.preferredSituations.includes(situation.id)) {
    modifier += 12;
  }

  if (card.type === "special" && situation.id !== "ultima-jugada") {
    modifier -= 4;
  }

  return modifier;
}

function getAiCardScore(params: AiCardScoreParams): number {
  const { matchState, situation, rivalTeam, card, playerCard } = params;

  return (
    card.basePower * 0.35 +
    getStyleCardScore(rivalTeam, card) +
    getSituationFitModifier(card, situation) +
    getScoreContextModifier(params) +
    getEnergyContextModifier(matchState, card) +
    getMomentumContextModifier(matchState, card) +
    getCounterResponseModifier(card, playerCard) -
    card.risk * 0.12 +
    randomBetween(-4, 4)
  );
}

export function chooseAiCard({
  matchState,
  situation,
  availableCards,
  playerCard,
}: ChooseAiCardParams): TacticalCard {
  if (availableCards.length === 0) {
    throw new Error("La IA no tiene cartas disponibles para elegir.");
  }

  const affordableCards = availableCards.filter(
    (card) => card.energyCost <= matchState.rivalEnergy,
  );

  const candidateCards = affordableCards.length > 0 ? affordableCards : availableCards;

  const scoredCards = candidateCards
    .map((card) => ({
      card,
      score: getAiCardScore({
        matchState,
        situation,
        rivalTeam: matchState.rivalTeam,
        playerTeam: matchState.playerTeam,
        card,
        playerCard,
      }),
    }))
    .sort((a, b) => b.score - a.score);

  const bestScore = scoredCards[0]?.score ?? 0;

  const bestOptions = scoredCards.filter((item) => item.score >= bestScore - 4);

  return bestOptions[randomBetween(0, bestOptions.length - 1)].card;
}