import type { MatchEvent, MatchState } from "./types";

export type LiveMatchTone = "neutral" | "positive" | "warning" | "danger";

export type LiveMatchInsight = {
  tone: LiveMatchTone;
  title: string;
  description: string;
  matchStateLabel: string;
};

function getRecentEvents(matchState: MatchState, amount = 3): MatchEvent[] {
  return matchState.history.slice(-amount);
}

function hasRecentRivalGoal(matchState: MatchState): boolean {
  return getRecentEvents(matchState).some((event) => event.outcome === "rival_goal");
}

function hasRecentPlayerGoal(matchState: MatchState): boolean {
  return getRecentEvents(matchState).some((event) => event.outcome === "goal");
}

function hasRecentDanger(matchState: MatchState): boolean {
  return getRecentEvents(matchState).some((event) =>
    ["goal", "rival_goal", "chance_created", "shot_saved", "shot_missed"].includes(
      event.outcome,
    ),
  );
}

function getScoreDifference(matchState: MatchState): number {
  return matchState.playerScore - matchState.rivalScore;
}

function getEnergyGap(matchState: MatchState): number {
  return matchState.playerEnergy - matchState.rivalEnergy;
}

function getMomentumGap(matchState: MatchState): number {
  return matchState.playerMomentum - matchState.rivalMomentum;
}

function getCurrentMinute(matchState: MatchState, currentMinute?: number): number {
  if (typeof currentMinute === "number") {
    return currentMinute;
  }

  const lastEvent = matchState.history.at(-1);

  return lastEvent?.minute ?? 1;
}

export function getLiveMatchInsight(
  matchState: MatchState,
  currentMinute?: number,
): LiveMatchInsight {
  const minute = getCurrentMinute(matchState, currentMinute);
  const scoreDifference = getScoreDifference(matchState);
  const energyGap = getEnergyGap(matchState);
  const momentumGap = getMomentumGap(matchState);

  const finalStretch = minute >= 75;
  const earlyGame = minute <= 25;

  if (scoreDifference > 0 && finalStretch) {
    return {
      tone: energyGap < -10 ? "warning" : "positive",
      title: "Tu equipo está sosteniendo la ventaja",
      description:
        energyGap < -10
          ? "Vas arriba, pero el equipo llega con menos energía. Conviene evitar riesgos innecesarios."
          : "La ventaja está de tu lado. Si administrás bien la energía, podés cerrar el partido.",
      matchStateLabel: "Ventaja en el cierre",
    };
  }

  if (scoreDifference < 0 && finalStretch) {
    return {
      tone: "danger",
      title: "Toca asumir más riesgo",
      description:
        "El partido entra en sus últimos minutos y vas abajo. Puede ser momento de usar cartas más agresivas.",
      matchStateLabel: "Últimos minutos",
    };
  }

  if (scoreDifference === 0 && finalStretch) {
    return {
      tone: "warning",
      title: "El cierre está para cualquiera",
      description:
        "El partido sigue empatado. Una buena decisión puede definirlo, pero una pérdida también puede costar caro.",
      matchStateLabel: "Final apretado",
    };
  }

  if (hasRecentRivalGoal(matchState)) {
    return {
      tone: "danger",
      title: "El rival acaba de golpear",
      description:
        "Después del gol rival, conviene recuperar control antes de tomar una decisión demasiado arriesgada.",
      matchStateLabel: "Rival en crecimiento",
    };
  }

  if (hasRecentPlayerGoal(matchState)) {
    return {
      tone: "positive",
      title: "Tu equipo tomó impulso",
      description:
        "El gol puede cambiar el ritmo del partido. Es buen momento para sostener momentum sin regalar espacios.",
      matchStateLabel: "Impulso favorable",
    };
  }

  if (momentumGap >= 18) {
    return {
      tone: "positive",
      title: "Tu equipo domina el ánimo del partido",
      description:
        "El momentum está de tu lado. Podés presionar un poco más, pero sin descuidar la energía.",
      matchStateLabel: "Dominio emocional",
    };
  }

  if (momentumGap <= -18) {
    return {
      tone: "danger",
      title: "El rival está ganando confianza",
      description:
        "El momentum favorece al rival. Una carta segura puede ayudarte a frenar el golpe anímico.",
      matchStateLabel: "Presión rival",
    };
  }

  if (energyGap <= -18) {
    return {
      tone: "warning",
      title: "Tu equipo se está quedando sin piernas",
      description:
        "La energía está cayendo más que la del rival. Cuidar el desgaste puede ser más importante que forzar una jugada.",
      matchStateLabel: "Desgaste alto",
    };
  }

  if (hasRecentDanger(matchState)) {
    return {
      tone: "warning",
      title: "El partido se está abriendo",
      description:
        "Ya hubo situaciones de peligro recientes. Elegir bien cuándo arriesgar puede marcar la diferencia.",
      matchStateLabel: "Partido abierto",
    };
  }

  if (earlyGame) {
    return {
      tone: "neutral",
      title: "El partido apenas se acomoda",
      description:
        "Todavía hay margen para leer al rival. Una carta equilibrada puede ayudarte a entrar bien en ritmo.",
      matchStateLabel: "Inicio de partido",
    };
  }

  return {
    tone: "neutral",
    title: "Partido en equilibrio",
    description:
      "Ningún equipo ha roto claramente el ritmo. La clave está en escoger cartas que calcen con la situación.",
    matchStateLabel: "Equilibrio táctico",
  };
}