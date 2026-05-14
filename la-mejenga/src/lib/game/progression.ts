import type { MatchEvent, MatchState, PlayOutcome } from "./types";

export type PlayerProgress = {
  playerId: string;
  playerName: string;
  level: number;
  xp: number;
  totalXp: number;
};

export type TeamProgress = {
  teamId: string;
  reputation: number;
  matchesPlayed: number;
  wins: number;
  draws: number;
  losses: number;
  trophies: number;
  players: Record<string, PlayerProgress>;
};

export type ProgressionProfile = {
  teams: Record<string, TeamProgress>;
  awardedMatchIds: string[];
};

export type PlayerXpGain = {
  playerId: string;
  playerName: string;
  previousLevel: number;
  newLevel: number;
  xpGained: number;
  leveledUp: boolean;
  reason: string;
};

export type MatchProgressionReward = {
  matchId: string;
  teamId: string;
  reputationGained: number;
  resultLabel: string;
  playerGains: PlayerXpGain[];
};

const PROGRESSION_STORAGE_KEY = "la-mejenga-progression";

function getEmptyProfile(): ProgressionProfile {
  return {
    teams: {},
    awardedMatchIds: [],
  };
}

function getXpRequiredForNextLevel(level: number): number {
  return 80 + level * 20;
}

function createPlayerProgress(playerId: string, playerName: string): PlayerProgress {
  return {
    playerId,
    playerName,
    level: 1,
    xp: 0,
    totalXp: 0,
  };
}

function normalizeTeamProgress(
  profile: ProgressionProfile,
  matchState: MatchState,
): TeamProgress {
  const existingTeamProgress = profile.teams[matchState.playerTeam.id];

  if (existingTeamProgress) {
    return existingTeamProgress;
  }

  const players = Object.fromEntries(
    matchState.playerTeam.players.map((player) => [
      player.id,
      createPlayerProgress(player.id, player.name),
    ]),
  );

  return {
    teamId: matchState.playerTeam.id,
    reputation: 0,
    matchesPlayed: 0,
    wins: 0,
    draws: 0,
    losses: 0,
    trophies: 0,
    players,
  };
}

function getResultLabel(matchState: MatchState): string {
  if (matchState.playerScore > matchState.rivalScore) {
    return "Victoria";
  }

  if (matchState.playerScore < matchState.rivalScore) {
    return "Derrota";
  }

  return "Empate";
}

function getReputationGained(matchState: MatchState): number {
  const goalDifference = matchState.playerScore - matchState.rivalScore;

  if (goalDifference >= 3) {
    return 16;
  }

  if (goalDifference > 0) {
    return 10;
  }

  if (goalDifference === 0) {
    return 5;
  }

  if (goalDifference === -1) {
    return 2;
  }

  return 0;
}

function getOutcomeXp(outcome: PlayOutcome): number {
  const xpByOutcome: Record<PlayOutcome, number> = {
    goal: 18,
    rival_goal: 0,
    shot_saved: 8,
    shot_missed: 6,
    chance_created: 12,
    corner: 6,
    foul: 5,
    yellow_card: 5,
    penalty: 14,
    offside: 3,
    turnover: 2,
    interception: 8,
    possession_kept: 6,
    blocked: 9,
    neutral: 3,
  };

  return xpByOutcome[outcome] ?? 0;
}

function getOutcomeReason(outcome: PlayOutcome): string {
  const reasonByOutcome: Record<PlayOutcome, string> = {
    goal: "Gol decisivo",
    rival_goal: "Gol rival",
    shot_saved: "Participó en una jugada de peligro",
    shot_missed: "Generó remate",
    chance_created: "Creó una ocasión clara",
    corner: "Sostuvo presión ofensiva",
    foul: "Forzó una falta peligrosa",
    yellow_card: "Provocó ventaja emocional",
    penalty: "Generó una oportunidad máxima",
    offside: "Participó en jugada anulada",
    turnover: "Aprendizaje por pérdida",
    interception: "Leyó bien la jugada",
    possession_kept: "Ayudó a mantener control",
    blocked: "Cerró una acción importante",
    neutral: "Sumó minutos de competencia",
  };

  return reasonByOutcome[outcome] ?? "Participación en el partido";
}

function getRelevantPlayerId(event: MatchEvent): string {
  if (event.outcome === "rival_goal") {
    return event.protagonistId;
  }

  return event.protagonistId;
}

function getRelevantPlayerName(event: MatchEvent): string {
  if (event.outcome === "rival_goal") {
    return event.protagonistName;
  }

  return event.protagonistName;
}

function applyXp(
  playerProgress: PlayerProgress,
  xpGained: number,
): {
  updatedPlayer: PlayerProgress;
  leveledUp: boolean;
  previousLevel: number;
  newLevel: number;
} {
  let level = playerProgress.level;
  let xp = playerProgress.xp + xpGained;
  const totalXp = playerProgress.totalXp + xpGained;
  const previousLevel = level;
  let leveledUp = false;

  while (xp >= getXpRequiredForNextLevel(level)) {
    xp -= getXpRequiredForNextLevel(level);
    level += 1;
    leveledUp = true;
  }

  return {
    updatedPlayer: {
      ...playerProgress,
      level,
      xp,
      totalXp,
    },
    leveledUp,
    previousLevel,
    newLevel: level,
  };
}

function getPlayerXpFromEvents(matchState: MatchState): PlayerXpGain[] {
  const gainsByPlayer = new Map<
    string,
    { playerId: string; playerName: string; xp: number; reasons: string[] }
  >();

  const playerIds = new Set(matchState.playerTeam.players.map((player) => player.id));

  for (const event of matchState.history) {
    const playerId = getRelevantPlayerId(event);

    if (!playerIds.has(playerId)) {
      continue;
    }

    const xp = getOutcomeXp(event.outcome);

    if (xp <= 0) {
      continue;
    }

    const current = gainsByPlayer.get(playerId) ?? {
      playerId,
      playerName: getRelevantPlayerName(event),
      xp: 0,
      reasons: [],
    };

    current.xp += xp;
    current.reasons.push(getOutcomeReason(event.outcome));

    gainsByPlayer.set(playerId, current);
  }

  if (matchState.playerScore > matchState.rivalScore) {
    for (const player of matchState.playerTeam.players.slice(0, 3)) {
      const current = gainsByPlayer.get(player.id) ?? {
        playerId: player.id,
        playerName: player.name,
        xp: 0,
        reasons: [],
      };

      current.xp += 4;
      current.reasons.push("Bonificación por victoria");

      gainsByPlayer.set(player.id, current);
    }
  }

  return Array.from(gainsByPlayer.values()).map((gain) => ({
    playerId: gain.playerId,
    playerName: gain.playerName,
    previousLevel: 1,
    newLevel: 1,
    xpGained: gain.xp,
    leveledUp: false,
    reason: gain.reasons[0] ?? "Participación",
  }));
}

export function loadProgressionProfile(): ProgressionProfile {
  if (typeof window === "undefined") {
    return getEmptyProfile();
  }

  const rawProfile = window.localStorage.getItem(PROGRESSION_STORAGE_KEY);

  if (!rawProfile) {
    return getEmptyProfile();
  }

  try {
    return JSON.parse(rawProfile) as ProgressionProfile;
  } catch {
    window.localStorage.removeItem(PROGRESSION_STORAGE_KEY);
    return getEmptyProfile();
  }
}

export function saveProgressionProfile(profile: ProgressionProfile): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(PROGRESSION_STORAGE_KEY, JSON.stringify(profile));
}

export function clearProgressionProfile(): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(PROGRESSION_STORAGE_KEY);
}

export function awardMatchProgression(
  matchState: MatchState,
): MatchProgressionReward | null {
  const profile = loadProgressionProfile();

  if (profile.awardedMatchIds.includes(matchState.id)) {
    return null;
  }

  const teamProgress = normalizeTeamProgress(profile, matchState);
  const reputationGained = getReputationGained(matchState);
  const resultLabel = getResultLabel(matchState);

  const rawPlayerGains = getPlayerXpFromEvents(matchState);

  const playerGains = rawPlayerGains.map((gain) => {
    const existingPlayer =
      teamProgress.players[gain.playerId] ??
      createPlayerProgress(gain.playerId, gain.playerName);

    const applied = applyXp(existingPlayer, gain.xpGained);

    teamProgress.players[gain.playerId] = applied.updatedPlayer;

    return {
      ...gain,
      previousLevel: applied.previousLevel,
      newLevel: applied.newLevel,
      leveledUp: applied.leveledUp,
    };
  });

  teamProgress.reputation += reputationGained;
  teamProgress.matchesPlayed += 1;

  if (matchState.playerScore > matchState.rivalScore) {
    teamProgress.wins += 1;
  } else if (matchState.playerScore < matchState.rivalScore) {
    teamProgress.losses += 1;
  } else {
    teamProgress.draws += 1;
  }

  const nextProfile: ProgressionProfile = {
    teams: {
      ...profile.teams,
      [matchState.playerTeam.id]: teamProgress,
    },
    awardedMatchIds: [...profile.awardedMatchIds, matchState.id],
  };

  saveProgressionProfile(nextProfile);

  return {
    matchId: matchState.id,
    teamId: matchState.playerTeam.id,
    reputationGained,
    resultLabel,
    playerGains,
  };
}