import type { MatchEvent, MatchState, PlayOutcome } from "./types";

type WinnerSide = "player" | "rival" | "draw";

export type FinalMatchReport = {
  winnerSide: WinnerSide;
  resultTitle: string;
  resultSubtitle: string;
  figureName: string;
  figureReason: string;
  keyMomentTitle: string;
  keyMomentDescription: string;
  tacticalReading: string;
  performanceLabel: string;
  performanceDescription: string;
  stats: {
    playerGoals: number;
    rivalGoals: number;
    playerChances: number;
    rivalThreats: number;
    saves: number;
    turnovers: number;
    finalPlayerEnergy: number;
    finalRivalEnergy: number;
    finalPlayerMomentum: number;
    finalRivalMomentum: number;
  };
};

function getWinnerSide(matchState: MatchState): WinnerSide {
  if (matchState.playerScore > matchState.rivalScore) {
    return "player";
  }

  if (matchState.rivalScore > matchState.playerScore) {
    return "rival";
  }

  return "draw";
}

function countOutcomes(events: MatchEvent[], outcomes: PlayOutcome[]): number {
  return events.filter((event) => outcomes.includes(event.outcome)).length;
}

function getKeyMoment(events: MatchEvent[]): MatchEvent | null {
  const priority: PlayOutcome[] = [
    "goal",
    "rival_goal",
    "penalty",
    "shot_saved",
    "chance_created",
    "shot_missed",
    "blocked",
    "turnover",
    "interception",
  ];

  for (const outcome of priority) {
    const event = events
      .slice()
      .reverse()
      .find((item) => item.outcome === outcome);

    if (event) {
      return event;
    }
  }

  return events.at(-1) ?? null;
}

function getFigureEvent(events: MatchEvent[]): MatchEvent | null {
  const scoringEvent = events
    .slice()
    .reverse()
    .find((event) => event.outcome === "goal" || event.outcome === "rival_goal");

  if (scoringEvent) {
    return scoringEvent;
  }

  const decisiveEvent = events
    .slice()
    .reverse()
    .find((event) =>
      ["shot_saved", "chance_created", "blocked", "interception"].includes(
        event.outcome,
      ),
    );

  return decisiveEvent ?? events.at(-1) ?? null;
}

function getFigureName(event: MatchEvent | null): string {
  if (!event) {
    return "Sin figura definida";
  }

  if (event.outcome === "rival_goal") {
    return event.rivalProtagonistName;
  }

  return event.protagonistName;
}

function getFigureReason(event: MatchEvent | null): string {
  if (!event) {
    return "No hubo suficientes acciones para destacar a un protagonista.";
  }

  switch (event.outcome) {
    case "goal":
      return "Apareció en una jugada decisiva y cambió el marcador.";
    case "rival_goal":
      return "Fue clave para castigar una pérdida y darle vida al rival.";
    case "shot_saved":
      return "Sostuvo al equipo en un momento de peligro.";
    case "chance_created":
      return "Generó una de las acciones más claras del partido.";
    case "blocked":
      return "Cerró una jugada importante cuando el partido pedía concentración.";
    case "interception":
      return "Leyó bien la jugada y frenó una acción peligrosa.";
    default:
      return "Tuvo participación importante en el desarrollo del partido.";
  }
}

function getKeyMomentTitle(event: MatchEvent | null): string {
  if (!event) {
    return "Sin momento clave";
  }

  switch (event.outcome) {
    case "goal":
      return `Min ${event.minute} · Gol decisivo`;
    case "rival_goal":
      return `Min ${event.minute} · Gol rival`;
    case "shot_saved":
      return `Min ${event.minute} · Atajada importante`;
    case "chance_created":
      return `Min ${event.minute} · Ocasión clara`;
    case "shot_missed":
      return `Min ${event.minute} · Tiro desviado`;
    case "blocked":
      return `Min ${event.minute} · Bloqueo defensivo`;
    case "turnover":
      return `Min ${event.minute} · Pérdida peligrosa`;
    case "interception":
      return `Min ${event.minute} · Intercepción`;
    default:
      return `Min ${event.minute} · Jugada importante`;
  }
}

function getResultTitle(matchState: MatchState): string {
  const winnerSide = getWinnerSide(matchState);

  if (winnerSide === "player") {
    return `Ganó ${matchState.playerTeam.name}`;
  }

  if (winnerSide === "rival") {
    return `Ganó ${matchState.rivalTeam.name}`;
  }

  return "Empate";
}

function getResultSubtitle(matchState: MatchState): string {
  const { playerTeam, rivalTeam, playerScore, rivalScore } = matchState;

  if (playerScore === rivalScore) {
    if (playerScore === 0) {
      return `${playerTeam.name} y ${rivalTeam.name} se neutralizaron durante todo el partido.`;
    }

    return `${playerTeam.name} y ${rivalTeam.name} intercambiaron golpes y terminaron igualados.`;
  }

  const goalDifference = Math.abs(playerScore - rivalScore);

  if (goalDifference >= 3) {
    const winner = playerScore > rivalScore ? playerTeam.name : rivalTeam.name;
    return `${winner} fue contundente y aprovechó mejor los momentos clave.`;
  }

  if (goalDifference === 1) {
    const winner = playerScore > rivalScore ? playerTeam.name : rivalTeam.name;
    return `${winner} ganó por detalles en un partido bastante cerrado.`;
  }

  const winner = playerScore > rivalScore ? playerTeam.name : rivalTeam.name;
  return `${winner} tomó ventaja y supo sostenerla.`;
}

function getTacticalReading(matchState: MatchState): string {
  const winnerSide = getWinnerSide(matchState);
  const playerEnergyGap = matchState.playerEnergy - matchState.rivalEnergy;
  const playerMomentumGap = matchState.playerMomentum - matchState.rivalMomentum;
  const totalGoals = matchState.playerScore + matchState.rivalScore;

  if (winnerSide === "draw") {
    if (totalGoals === 0) {
      return "Fue un partido de pocas concesiones. Ningún equipo logró romper claramente el bloque rival.";
    }

    return "El partido tuvo momentos para ambos lados, pero ninguno logró sostener la ventaja suficiente.";
  }

  if (winnerSide === "player") {
    if (playerMomentumGap >= 15) {
      return `${matchState.playerTeam.name} terminó con mejor impulso emocional y eso se notó en los momentos importantes.`;
    }

    if (playerEnergyGap <= -15) {
      return `${matchState.playerTeam.name} ganó pese al desgaste. El cierre exigió administrar muy bien las últimas decisiones.`;
    }

    return `${matchState.playerTeam.name} fue más efectivo en las jugadas clave y encontró la forma de imponerse.`;
  }

  if (playerMomentumGap <= -15) {
    return `${matchState.rivalTeam.name} inclinó el partido desde el momentum y castigó cuando encontró espacios.`;
  }

  if (playerEnergyGap <= -15) {
    return `${matchState.rivalTeam.name} aprovechó el desgaste de ${matchState.playerTeam.name} para llevarse el resultado.`;
  }

  return `${matchState.rivalTeam.name} resolvió mejor los momentos decisivos y dejó poco margen de reacción.`;
}

function getPerformanceLabel(matchState: MatchState): string {
  const winnerSide = getWinnerSide(matchState);

  if (winnerSide === "player") {
    if (matchState.rivalScore === 0 && matchState.playerScore >= 2) {
      return "Victoria sólida";
    }

    return "Buen resultado";
  }

  if (winnerSide === "draw") {
    return "Partido parejo";
  }

  if (matchState.playerScore === 0) {
    return "Partido difícil";
  }

  return "Derrota ajustada";
}

function getPerformanceDescription(matchState: MatchState): string {
  const winnerSide = getWinnerSide(matchState);

  if (winnerSide === "player") {
    return "El equipo respondió bien en los momentos importantes. La clave será sostener esa eficacia en partidos más cerrados.";
  }

  if (winnerSide === "draw") {
    return "El equipo compitió, pero faltó un detalle para romper el empate. La próxima mejora está en elegir mejor cuándo arriesgar.";
  }

  return "El equipo tuvo momentos para competir, pero el rival castigó mejor. Conviene revisar energía, momentum y cartas arriesgadas.";
}

export function getFinalMatchReport(matchState: MatchState): FinalMatchReport {
  const events = matchState.history;
  const keyMoment = getKeyMoment(events);
  const figureEvent = getFigureEvent(events);

  return {
    winnerSide: getWinnerSide(matchState),
    resultTitle: getResultTitle(matchState),
    resultSubtitle: getResultSubtitle(matchState),
    figureName: getFigureName(figureEvent),
    figureReason: getFigureReason(figureEvent),
    keyMomentTitle: getKeyMomentTitle(keyMoment),
    keyMomentDescription:
      keyMoment?.narration ?? "El partido no generó suficientes jugadas destacadas.",
    tacticalReading: getTacticalReading(matchState),
    performanceLabel: getPerformanceLabel(matchState),
    performanceDescription: getPerformanceDescription(matchState),
    stats: {
      playerGoals: countOutcomes(events, ["goal"]),
      rivalGoals: countOutcomes(events, ["rival_goal"]),
      playerChances: countOutcomes(events, [
        "goal",
        "chance_created",
        "shot_saved",
        "shot_missed",
        "corner",
      ]),
      rivalThreats: countOutcomes(events, [
        "rival_goal",
        "turnover",
        "interception",
      ]),
      saves: countOutcomes(events, ["shot_saved"]),
      turnovers: countOutcomes(events, ["turnover", "interception"]),
      finalPlayerEnergy: matchState.playerEnergy,
      finalRivalEnergy: matchState.rivalEnergy,
      finalPlayerMomentum: matchState.playerMomentum,
      finalRivalMomentum: matchState.rivalMomentum,
    },
  };
}