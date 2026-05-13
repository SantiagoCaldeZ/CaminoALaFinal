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