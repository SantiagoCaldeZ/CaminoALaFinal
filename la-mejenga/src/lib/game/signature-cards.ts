import type { TacticalCard } from "./types";

export const TEAM_SIGNATURE_CARDS: Record<string, TacticalCard> = {
  "cemento-fc": {
    id: "cemento-cierre-con-oficio",
    name: "Cierre con oficio",
    type: "defense",
    description:
      "Cemento FC baja revoluciones, ordena líneas y juega con experiencia para cerrar el partido.",
    basePower: 76,
    risk: 28,
    energyCost: 9,
    strongAgainst: ["todo-o-nada", "regate-individual", "pase-filtrado"],
    weakAgainst: ["tiro-lejano", "centro-al-area"],
    preferredSituations: ["ultima-jugada", "presion-rival", "posesion-media"],
  },

  "los-del-parque": {
    id: "parque-contra-relampago",
    name: "Contra relámpago",
    type: "attack",
    description:
      "Los del Parque salen disparados al espacio y buscan romper el partido con velocidad pura.",
    basePower: 82,
    risk: 66,
    energyCost: 14,
    strongAgainst: ["bloque-bajo", "linea-adelantada", "pausa-y-control"],
    weakAgainst: ["anticipacion", "marcar-al-hombre"],
    preferredSituations: ["contraataque", "ataque-banda", "ultima-jugada"],
  },

  "barrio-norte": {
    id: "norte-toque-paciente",
    name: "Toque paciente",
    type: "midfield",
    description:
      "Barrio Norte mueve la pelota con calma, atrae presión y espera el momento correcto para acelerar.",
    basePower: 78,
    risk: 34,
    energyCost: 10,
    strongAgainst: ["presion-alta", "barrida-fuerte", "pelotazo"],
    weakAgainst: ["marcar-al-hombre", "anticipacion"],
    preferredSituations: ["posesion-media", "presion-rival", "ataque-banda"],
  },

  "atletico-pulperia": {
    id: "pulperia-choque-de-barrio",
    name: "Choque de barrio",
    type: "defense",
    description:
      "Atlético Pulpería impone físico, gana el duelo dividido y convierte la intensidad en ventaja.",
    basePower: 80,
    risk: 58,
    energyCost: 13,
    strongAgainst: ["regate-individual", "centro-al-area", "todo-o-nada"],
    weakAgainst: ["toque-corto", "pase-filtrado"],
    preferredSituations: ["presion-rival", "contraataque", "ultima-jugada"],
  },

  "union-callejon": {
    id: "callejon-muro-cerrado",
    name: "Muro cerrado",
    type: "defense",
    description:
      "Unión Callejón junta líneas, achica espacios y obliga al rival a jugar incómodo.",
    basePower: 81,
    risk: 24,
    energyCost: 10,
    strongAgainst: ["pase-filtrado", "regate-individual", "centro-al-area"],
    weakAgainst: ["tiro-lejano", "cambio-de-banda"],
    preferredSituations: ["presion-rival", "posesion-media", "ultima-jugada"],
  },

  "real-lajuelita": {
    id: "lajuelita-cambio-de-plan",
    name: "Cambio de plan",
    type: "special",
    description:
      "Real Lajuelita lee el partido, cambia la intención táctica y encuentra una solución inesperada.",
    basePower: 77,
    risk: 42,
    energyCost: 11,
    strongAgainst: ["bloque-bajo", "presion-alta", "linea-adelantada"],
    weakAgainst: ["anticipacion", "marcar-al-hombre"],
    preferredSituations: ["posesion-media", "contraataque", "ultima-jugada"],
  },
};

export function getTeamSignatureCard(teamId: string): TacticalCard | undefined {
  return TEAM_SIGNATURE_CARDS[teamId];
}

export function isSignatureCard(cardId: string): boolean {
  return Object.values(TEAM_SIGNATURE_CARDS).some((card) => card.id === cardId);
}