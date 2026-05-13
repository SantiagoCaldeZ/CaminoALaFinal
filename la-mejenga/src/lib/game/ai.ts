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