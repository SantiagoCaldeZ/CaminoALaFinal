import type { MatchSituation, TacticalCard } from "./types";

export type CardAdviceTone = "recommended" | "risky" | "neutral" | "expensive";

export type CardAdvice = {
  tone: CardAdviceTone;
  label: string;
  description: string;
};

export function getCardAdvice(
  card: TacticalCard,
  situation: MatchSituation,
  currentEnergy: number,
): CardAdvice {
  if (card.energyCost > currentEnergy) {
    return {
      tone: "expensive",
      label: "Sin energía",
      description: "No tenés suficiente energía para usar esta carta.",
    };
  }

  if (card.preferredSituations.includes(situation.id)) {
    return {
      tone: "recommended",
      label: "Recomendada",
      description: "Esta carta encaja muy bien con la situación actual.",
    };
  }

  if (situation.preferredCardTypes.includes(card.type)) {
    return {
      tone: "recommended",
      label: "Buena opción",
      description: "El tipo de carta es adecuado para este momento.",
    };
  }

  if (card.risk >= 65) {
    return {
      tone: "risky",
      label: "Arriesgada",
      description: "Puede cambiar la jugada, pero fallar puede salir caro.",
    };
  }

  if (card.energyCost >= 15) {
    return {
      tone: "expensive",
      label: "Costosa",
      description: "Consume bastante energía. Usala si realmente vale la pena.",
    };
  }

  return {
    tone: "neutral",
    label: "Neutral",
    description: "Puede funcionar, pero no tiene ventaja especial en esta situación.",
  };
}