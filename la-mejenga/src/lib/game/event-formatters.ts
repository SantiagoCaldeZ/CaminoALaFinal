import type { MatchEvent, PlayOutcome } from "./types";

type EventTone = "positive" | "negative" | "neutral" | "warning";

export type FormattedEvent = {
  title: string;
  label: string;
  tone: EventTone;
  impact: string;
  shortDescription: string;
};

function getOutcomeTitle(outcome: PlayOutcome): string {
  const titles: Record<PlayOutcome, string> = {
    goal: "Gol",
    rival_goal: "Gol rival",
    shot_saved: "Atajada",
    shot_missed: "Tiro desviado",
    chance_created: "Ocasión clara",
    corner: "Córner",
    foul: "Falta peligrosa",
    yellow_card: "Amarilla rival",
    penalty: "Penal",
    offside: "Fuera de juego",
    turnover: "Pérdida",
    interception: "Intercepción",
    possession_kept: "Posesión mantenida",
    blocked: "Bloqueo",
    neutral: "Jugada neutral",
  };

  return titles[outcome] ?? "Jugada";
}

function getOutcomeLabel(outcome: PlayOutcome): string {
  const labels: Record<PlayOutcome, string> = {
    goal: "GOL",
    rival_goal: "GOL RIVAL",
    shot_saved: "ATAJADA",
    shot_missed: "TIRO DESVIADO",
    chance_created: "OCASIÓN CLARA",
    corner: "CÓRNER",
    foul: "FALTA",
    yellow_card: "AMARILLA",
    penalty: "PENAL",
    offside: "FUERA DE JUEGO",
    turnover: "PÉRDIDA",
    interception: "INTERCEPCIÓN",
    possession_kept: "POSESIÓN",
    blocked: "BLOQUEO",
    neutral: "NEUTRAL",
  };

  return labels[outcome] ?? "JUGADA";
}

function getOutcomeTone(outcome: PlayOutcome): EventTone {
  if (outcome === "goal" || outcome === "penalty") {
    return "positive";
  }

  if (outcome === "rival_goal" || outcome === "turnover" || outcome === "interception") {
    return "negative";
  }

  if (
    outcome === "shot_missed" ||
    outcome === "shot_saved" ||
    outcome === "chance_created" ||
    outcome === "corner" ||
    outcome === "blocked"
  ) {
    return "warning";
  }

  return "neutral";
}

function getOutcomeImpact(outcome: PlayOutcome): string {
  const impacts: Record<PlayOutcome, string> = {
    goal: "Marcador cambiado",
    rival_goal: "Castigo del rival",
    shot_saved: "El portero sostuvo el partido",
    shot_missed: "Buena llegada, mala definición",
    chance_created: "El equipo generó peligro",
    corner: "Presión ofensiva",
    foul: "Balón parado peligroso",
    yellow_card: "Ventaja emocional",
    penalty: "Oportunidad máxima",
    offside: "La defensa achicó bien",
    turnover: "Pérdida en zona delicada",
    interception: "El rival leyó la jugada",
    possession_kept: "Control sin daño inmediato",
    blocked: "La defensa cerró a tiempo",
    neutral: "Sin impacto fuerte",
  };

  return impacts[outcome] ?? "Impacto moderado";
}

function shortenText(text: string, maxLength = 120): string {
  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength).trim()}...`;
}

export function formatMatchEvent(event: MatchEvent): FormattedEvent {
  return {
    title: getOutcomeTitle(event.outcome),
    label: getOutcomeLabel(event.outcome),
    tone: getOutcomeTone(event.outcome),
    impact: getOutcomeImpact(event.outcome),
    shortDescription: shortenText(event.narration),
  };
}