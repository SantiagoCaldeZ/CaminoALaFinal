import type { Team } from "./types";

export const TEAMS: Team[] = [
  {
    id: "los-del-parque",
    name: "Los del Parque",
    style: "balanced",
    description:
      "Un equipo equilibrado, ordenado y confiable. No domina en una sola área, pero puede competir bien en casi cualquier situación.",
    strengths: ["Juego colectivo", "Equilibrio", "Mentalidad estable"],
    weaknesses: ["No tiene una especialidad dominante", "Puede sufrir contra equipos muy físicos"],
    players: [
      {
        id: "nico-el-seguro",
        name: "Nico",
        nickname: "El Seguro",
        role: "goalkeeper",
        attack: 25,
        defense: 72,
        technique: 45,
        physical: 60,
        mentality: 70,
        stamina: 65,
        trait: "Ataja mejor en momentos de alta presión.",
      },
      {
        id: "mau-el-ordenado",
        name: "Mau",
        nickname: "El Ordenado",
        role: "defender",
        attack: 35,
        defense: 76,
        technique: 55,
        physical: 68,
        mentality: 64,
        stamina: 70,
        trait: "Reduce errores defensivos en jugadas cerradas.",
      },
      {
        id: "sebas-el-cerebro",
        name: "Sebas",
        nickname: "El Cerebro",
        role: "midfielder",
        attack: 58,
        defense: 55,
        technique: 78,
        physical: 55,
        mentality: 72,
        stamina: 68,
        trait: "Mejora cartas relacionadas con pase y control.",
      },
      {
        id: "leo-el-crack",
        name: "Leo",
        nickname: "El Crack",
        role: "forward",
        attack: 80,
        defense: 28,
        technique: 76,
        physical: 58,
        mentality: 63,
        stamina: 62,
        trait: "Mejora en jugadas decisivas, pero consume más energía.",
      },
      {
        id: "dani-comodin",
        name: "Dani",
        nickname: "Comodín",
        role: "utility",
        attack: 60,
        defense: 60,
        technique: 60,
        physical: 60,
        mentality: 60,
        stamina: 70,
        trait: "Se adapta bien a cualquier situación del partido.",
      },
    ],
  },
  {
    id: "cemento-fc",
    name: "Cemento FC",
    style: "physical",
    description:
      "Un equipo físico y defensivo. Es fuerte en choques, presión y partidos cerrados, pero puede sufrir contra rivales técnicos.",
    strengths: ["Defensa fuerte", "Juego físico", "Resistencia"],
    weaknesses: ["Poca creatividad", "Menor técnica ofensiva", "Riesgo de faltas"],
    players: [
      {
        id: "rolo-manos-duras",
        name: "Rolo",
        nickname: "Manos Duras",
        role: "goalkeeper",
        attack: 20,
        defense: 78,
        technique: 38,
        physical: 72,
        mentality: 62,
        stamina: 65,
        trait: "Mejor contra tiros potentes, peor contra tiros colocados.",
      },
      {
        id: "chino-el-muro",
        name: "Chino",
        nickname: "El Muro",
        role: "defender",
        attack: 28,
        defense: 84,
        technique: 42,
        physical: 82,
        mentality: 66,
        stamina: 74,
        trait: "Mejora bloqueos y marcas físicas.",
      },
      {
        id: "kevin-motorcito",
        name: "Kevin",
        nickname: "Motorcito",
        role: "midfielder",
        attack: 50,
        defense: 68,
        technique: 58,
        physical: 76,
        mentality: 64,
        stamina: 82,
        trait: "Gasta menos energía cuando el equipo presiona.",
      },
      {
        id: "bryan-tanque",
        name: "Bryan",
        nickname: "Tanque",
        role: "forward",
        attack: 72,
        defense: 40,
        technique: 48,
        physical: 84,
        mentality: 58,
        stamina: 68,
        trait: "Mejora en centros, choques y jugadas aéreas.",
      },
      {
        id: "ariel-el-lenero",
        name: "Ariel",
        nickname: "El Leñero",
        role: "utility",
        attack: 48,
        defense: 72,
        technique: 45,
        physical: 86,
        mentality: 52,
        stamina: 70,
        trait: "Roba más balones, pero aumenta el riesgo de falta.",
      },
    ],
  },
];

export function getTeamById(teamId: string): Team | undefined {
  return TEAMS.find((team) => team.id === teamId);
}

export function getDefaultRivalTeam(selectedTeamId: string): Team {
  const rival = TEAMS.find((team) => team.id !== selectedTeamId);

  if (!rival) {
    throw new Error("No hay equipo rival disponible.");
  }

  return rival;
}