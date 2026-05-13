import type { PlayOutcome } from "./types";

export type OutcomeTone = "success" | "danger" | "warning" | "info" | "neutral";

export type OutcomeMeta = {
  label: string;
  tone: OutcomeTone;
  headline: string;
  description: string;
};

export const OUTCOME_META: Record<PlayOutcome, OutcomeMeta> = {
  goal: {
    label: "Gol",
    tone: "success",
    headline: "¡Gol!",
    description: "La jugada terminó en anotación.",
  },
  shot_saved: {
    label: "Atajada",
    tone: "info",
    headline: "Atajada importante",
    description: "El ataque fue peligroso, pero el rival evitó el gol.",
  },
  shot_missed: {
    label: "Tiro desviado",
    tone: "danger",
    headline: "Se fue la oportunidad",
    description: "La jugada generó peligro, pero la definición falló.",
  },
  blocked: {
    label: "Bloqueo",
    tone: "info",
    headline: "La defensa respondió",
    description: "El rival bloqueó el intento antes de que llegara al arco.",
  },
  corner: {
    label: "Córner",
    tone: "info",
    headline: "Sigue el peligro",
    description: "La jugada no terminó en gol, pero dejó una pelota parada.",
  },
  foul: {
    label: "Falta",
    tone: "warning",
    headline: "Falta en la jugada",
    description: "El rival cortó la acción con contacto.",
  },
  yellow_card: {
    label: "Amarilla",
    tone: "warning",
    headline: "Entrada fuerte",
    description: "La jugada terminó con tarjeta amarilla.",
  },
  penalty: {
    label: "Penal",
    tone: "success",
    headline: "¡Penal señalado!",
    description: "La jugada provocó una falta dentro del área.",
  },
  offside: {
    label: "Fuera de juego",
    tone: "danger",
    headline: "Jugada anulada",
    description: "El rival tiró bien la línea defensiva.",
  },
  turnover: {
    label: "Pérdida",
    tone: "danger",
    headline: "Se perdió la pelota",
    description: "La decisión no salió bien y el rival recuperó.",
  },
  interception: {
    label: "Intercepción",
    tone: "danger",
    headline: "El rival leyó la jugada",
    description: "La defensa anticipó la intención y cortó el avance.",
  },
  possession_kept: {
    label: "Posesión mantenida",
    tone: "neutral",
    headline: "La jugada sigue viva",
    description: "No hubo daño directo, pero el equipo conservó la pelota.",
  },
  chance_created: {
    label: "Ocasión clara",
    tone: "info",
    headline: "Buena oportunidad",
    description: "La carta generó una situación peligrosa.",
  },
  neutral: {
    label: "Neutral",
    tone: "neutral",
    headline: "Sin ventaja clara",
    description: "La jugada no inclinó el partido para ningún lado.",
  },
    rival_goal: {
    label: "Gol rival",
    tone: "danger",
    headline: "Gol del rival",
    description: "El rival castigó una mala decisión y anotó.",
  },
};

export function getOutcomeMeta(outcome: PlayOutcome): OutcomeMeta {
  return OUTCOME_META[outcome];
}