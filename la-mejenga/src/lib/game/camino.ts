import type { MatchState } from "./types";
import { TEAMS, getTeamById, type Team } from "./teams";
import { randomBetween, shuffle } from "./utils";

export type CaminoRound = "semifinal" | "final";
export type CaminoStatus = "in_progress" | "champion" | "eliminated";

export type CaminoResult = {
  id: string;
  round: CaminoRound;
  playerTeamId: string;
  rivalTeamId: string;
  playerScore: number;
  rivalScore: number;
  userAdvanced: boolean;
  wentToPenalties: boolean;
  penaltyWinnerTeamId?: string;
  penaltySummary?: string;
};

export type CaminoRun = {
  id: string;
  playerTeamId: string;
  currentRound: CaminoRound;
  status: CaminoStatus;
  semifinalRivalTeamId: string;
  otherSemifinalTeamAId: string;
  otherSemifinalTeamBId: string;
  otherSemifinalWinnerTeamId: string;
  finalRivalTeamId: string;
  results: CaminoResult[];
};

function createId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function getTeamRating(team: Team): number {
  return Math.round(
    team.stats.attack * 0.24 +
      team.stats.defense * 0.24 +
      team.stats.midfield * 0.22 +
      team.stats.energy * 0.15 +
      team.stats.mentality * 0.15,
  );
}

function simulateCpuWinner(teamA: Team, teamB: Team): Team {
  const teamAPower = getTeamRating(teamA) + randomBetween(-10, 10);
  const teamBPower = getTeamRating(teamB) + randomBetween(-10, 10);

  return teamAPower >= teamBPower ? teamA : teamB;
}

function resolvePenaltyWinner(matchState: MatchState): {
  winnerTeamId: string;
  summary: string;
} {
  const playerPenaltyPower =
    matchState.playerTeam.stats.mentality +
    Math.round(matchState.playerMomentum / 4) +
    Math.round(matchState.playerEnergy / 5) +
    randomBetween(-12, 12);

  const rivalPenaltyPower =
    matchState.rivalTeam.stats.mentality +
    Math.round(matchState.rivalMomentum / 4) +
    Math.round(matchState.rivalEnergy / 5) +
    randomBetween(-12, 12);

  const playerWon = playerPenaltyPower >= rivalPenaltyPower;

  const winnerTeam = playerWon ? matchState.playerTeam : matchState.rivalTeam;

  const summaries = playerWon
    ? [
        `${matchState.playerTeam.name} mantuvo mejor la cabeza y ganó la tanda de penales.`,
        `${matchState.playerTeam.name} fue más frío desde el punto penal y avanzó.`,
        `${matchState.playerTeam.name} sobrevivió al empate y resolvió en penales.`,
      ]
    : [
        `${matchState.rivalTeam.name} resistió el empate y ganó la tanda de penales.`,
        `${matchState.rivalTeam.name} tuvo más temple desde el punto penal y avanzó.`,
        `${matchState.rivalTeam.name} castigó en la definición y dejó fuera a ${matchState.playerTeam.name}.`,
      ];

  return {
    winnerTeamId: winnerTeam.id,
    summary: summaries[randomBetween(0, summaries.length - 1)],
  };
}

export function createCaminoRun(playerTeamId: string): CaminoRun {
  const playerTeam = getTeamById(playerTeamId);

  const rivals = shuffle(TEAMS.filter((team) => team.id !== playerTeam.id)).slice(0, 3);

  const semifinalRival = rivals[0] ?? TEAMS.find((team) => team.id !== playerTeam.id) ?? TEAMS[0];
  const otherSemifinalTeamA = rivals[1] ?? semifinalRival;
  const otherSemifinalTeamB = rivals[2] ?? semifinalRival;

  const otherSemifinalWinner = simulateCpuWinner(
    otherSemifinalTeamA,
    otherSemifinalTeamB,
  );

  return {
    id: createId("camino"),
    playerTeamId: playerTeam.id,
    currentRound: "semifinal",
    status: "in_progress",
    semifinalRivalTeamId: semifinalRival.id,
    otherSemifinalTeamAId: otherSemifinalTeamA.id,
    otherSemifinalTeamBId: otherSemifinalTeamB.id,
    otherSemifinalWinnerTeamId: otherSemifinalWinner.id,
    finalRivalTeamId: otherSemifinalWinner.id,
    results: [],
  };
}

export function getCaminoPlayerTeam(camino: CaminoRun): Team {
  return getTeamById(camino.playerTeamId);
}

export function getCaminoCurrentOpponent(camino: CaminoRun): Team {
  if (camino.currentRound === "final") {
    return getTeamById(camino.finalRivalTeamId);
  }

  return getTeamById(camino.semifinalRivalTeamId);
}

export function getCaminoRoundLabel(round: CaminoRound): string {
  if (round === "semifinal") {
    return "Semifinal";
  }

  return "Final";
}

export function resolveCaminoMatch(
  camino: CaminoRun,
  matchState: MatchState,
): CaminoRun {
  let userAdvanced = matchState.playerScore > matchState.rivalScore;
  let wentToPenalties = false;
  let penaltyWinnerTeamId: string | undefined;
  let penaltySummary: string | undefined;

  if (matchState.playerScore === matchState.rivalScore) {
    wentToPenalties = true;

    const penaltyResult = resolvePenaltyWinner(matchState);

    penaltyWinnerTeamId = penaltyResult.winnerTeamId;
    penaltySummary = penaltyResult.summary;
    userAdvanced = penaltyWinnerTeamId === matchState.playerTeam.id;
  }

  const result: CaminoResult = {
    id: createId("camino-result"),
    round: camino.currentRound,
    playerTeamId: matchState.playerTeam.id,
    rivalTeamId: matchState.rivalTeam.id,
    playerScore: matchState.playerScore,
    rivalScore: matchState.rivalScore,
    userAdvanced,
    wentToPenalties,
    penaltyWinnerTeamId,
    penaltySummary,
  };

  if (!userAdvanced) {
    return {
      ...camino,
      status: "eliminated",
      results: [...camino.results, result],
    };
  }

  if (camino.currentRound === "semifinal") {
    return {
      ...camino,
      currentRound: "final",
      results: [...camino.results, result],
    };
  }

  return {
    ...camino,
    status: "champion",
    results: [...camino.results, result],
  };
}