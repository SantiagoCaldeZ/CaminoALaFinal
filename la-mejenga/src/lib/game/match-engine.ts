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
import { getInitialEnergy, getInitialMomentum } from "./team-effects";

export function startMatch(playerTeam: Team, rivalTeam: Team): MatchState {
  return {
    playerTeam,
    rivalTeam,
    playerScore: 0,
    rivalScore: 0,
    currentMomentIndex: 0,
    totalMoments: BALANCE.totalMoments,
    playerEnergy: getInitialEnergy(playerTeam),
    rivalEnergy: getInitialEnergy(rivalTeam),
    playerMomentum: getInitialMomentum(playerTeam),
    rivalMomentum: getInitialMomentum(rivalTeam),
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

function selectProtagonist(team: Team, card: TacticalCard): Player {
  const players = team.players ?? [];

  const preferredPlayers = players.filter((player) => {
    if (card.type === "attack") {
      return player.role === "forward" || player.role === "midfielder" || player.role === "utility";
    }

    if (card.type === "midfield") {
      return player.role === "midfielder" || player.role === "utility";
    }

    if (card.type === "defense") {
      return player.role === "defender" || player.role === "goalkeeper" || player.role === "utility";
    }

    return true;
  });

  if (preferredPlayers.length > 0) {
    return pickRandom(preferredPlayers);
  }

  if (players.length > 0) {
    return pickRandom(players);
  }

  return {
    id: `${team.id}-jugador-generico`,
    name: team.name,
    nickname: "El Equipo",
    role: "midfielder",
    attack: 60,
    defense: 60,
    technique: 60,
    physical: 60,
    mentality: 60,
    stamina: 60,
    trait: "Jugador genérico utilizado como respaldo.",
  };
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
  const rivalAvailableCards = getAvailableCardsForSituation(situation);

  const rivalCard = chooseAiCard({
    situation,
    availableCards: rivalAvailableCards,
    matchState,
  });

  const protagonist = selectProtagonist(matchState.playerTeam, playerCard);
  const rivalProtagonist = selectProtagonist(matchState.rivalTeam, rivalCard);

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