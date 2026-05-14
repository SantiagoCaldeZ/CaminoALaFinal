import type { Player as MatchPlayer, Team as MatchTeam } from "./types";

export type TeamStyle = MatchTeam["style"];

type TeamStats = {
  attack: number;
  defense: number;
  midfield: number;
  energy: number;
  mentality: number;
};

function clampStat(value: number): number {
  return Math.max(40, Math.min(95, Math.round(value)));
}

function createRoster(teamId: string, stats: TeamStats): MatchPlayer[] {
  return [
    {
      id: `${teamId}-portero`,
      name: "Kevin",
      nickname: "Motorcito",
      role: "goalkeeper",
      attack: clampStat(stats.attack - 25),
      defense: clampStat(stats.defense + 12),
      technique: clampStat(stats.midfield - 8),
      physical: clampStat(stats.energy),
      mentality: clampStat(stats.mentality + 4),
      stamina: clampStat(stats.energy),
      trait: "Responde bien cuando el equipo está bajo presión.",
    },
    {
      id: `${teamId}-defensa`,
      name: "Ariel",
      nickname: "El Leñero",
      role: "defender",
      attack: clampStat(stats.attack - 12),
      defense: clampStat(stats.defense + 8),
      technique: clampStat(stats.midfield - 4),
      physical: clampStat(stats.energy + 4),
      mentality: clampStat(stats.mentality),
      stamina: clampStat(stats.energy + 2),
      trait: "Fuerte en cruces, bloqueos y jugadas divididas.",
    },
    {
      id: `${teamId}-medio`,
      name: "Sebas",
      nickname: "El Cerebro",
      role: "midfielder",
      attack: clampStat(stats.attack - 2),
      defense: clampStat(stats.defense),
      technique: clampStat(stats.midfield + 8),
      physical: clampStat(stats.energy - 2),
      mentality: clampStat(stats.mentality + 6),
      stamina: clampStat(stats.energy),
      trait: "Mejora el control del partido y las cartas de medio campo.",
    },
    {
      id: `${teamId}-extremo`,
      name: "Leo",
      nickname: "El Crack",
      role: "forward",
      attack: clampStat(stats.attack + 7),
      defense: clampStat(stats.defense - 14),
      technique: clampStat(stats.midfield + 4),
      physical: clampStat(stats.energy),
      mentality: clampStat(stats.mentality),
      stamina: clampStat(stats.energy),
      trait: "Peligroso en regates, paredes y ataques rápidos.",
    },
    {
      id: `${teamId}-delantero`,
      name: "Bryan",
      nickname: "Tanque",
      role: "forward",
      attack: clampStat(stats.attack + 10),
      defense: clampStat(stats.defense - 18),
      technique: clampStat(stats.midfield),
      physical: clampStat(stats.energy + 5),
      mentality: clampStat(stats.mentality + 2),
      stamina: clampStat(stats.energy - 2),
      trait: "Mejora en centros, choques y jugadas dentro del área.",
    },
  ];
}

export type Team = MatchTeam & {
  shortName: string;
  city: string;
  colors: {
    primary: string;
    secondary: string;
  };
  style: TeamStyle;
  description: string;
  stats: {
    attack: number;
    defense: number;
    midfield: number;
    energy: number;
    mentality: number;
  };
};

export const TEAMS: Team[] = [
  {
    id: "cemento-fc",
    name: "Cemento FC",
    shortName: "Cemento",
    city: "Barrio La Cantera",
    colors: {
      primary: "#22c55e",
      secondary: "#0f172a",
    },
    style: "balanced",
    description:
      "Un equipo ordenado, intenso y bastante completo. No siempre brilla, pero compite todos los partidos.",
    strengths: ["Orden táctico", "Presión constante", "Buen cierre de jugadas"],
    weaknesses: ["No siempre domina", "Puede sufrir ante equipos muy rápidos"],
    players: createRoster("cemento-fc", {
      attack: 72,
      defense: 68,
      midfield: 70,
      energy: 78,
      mentality: 74,
    }),
    stats: {
      attack: 72,
      defense: 68,
      midfield: 70,
      energy: 78,
      mentality: 74,
    },
  },
  {
    id: "los-del-parque",
    name: "Los del Parque",
    shortName: "Parque",
    city: "La Plaza",
    colors: {
      primary: "#fb7185",
      secondary: "#111827",
    },
    style: "fast",
    description:
      "Un equipo atrevido, rápido y peligroso arriba. Puede hacer mucho daño, pero también deja espacios.",
    strengths: ["Ataque rápido", "Transiciones peligrosas", "Mucho peso ofensivo"],
    weaknesses: ["Defensa vulnerable", "Deja espacios atrás"],
    players: createRoster("los-del-parque", {
      attack: 78,
      defense: 58,
      midfield: 68,
      energy: 72,
      mentality: 70,
    }),
    stats: {
      attack: 78,
      defense: 58,
      midfield: 68,
      energy: 72,
      mentality: 70,
    },
  },
  {
    id: "barrio-norte",
    name: "Barrio Norte",
    shortName: "Norte",
    city: "Barrio Norte",
    colors: {
      primary: "#38bdf8",
      secondary: "#020617",
    },
    style: "technical",
    description:
      "Equipo de toque, paciencia y buenas decisiones. No es el más físico, pero sabe manejar los partidos.",
    strengths: ["Control del balón", "Buen mediocampo", "Lectura táctica"],
    weaknesses: ["Menor fuerza física", "Puede sufrir partidos intensos"],
    players: createRoster("barrio-norte", {
      attack: 70,
      defense: 64,
      midfield: 80,
      energy: 68,
      mentality: 76,
    }),
    stats: {
      attack: 70,
      defense: 64,
      midfield: 80,
      energy: 68,
      mentality: 76,
    },
  },
  {
    id: "atletico-pulperia",
    name: "Atlético Pulpería",
    shortName: "Pulpería",
    city: "La Esquina",
    colors: {
      primary: "#facc15",
      secondary: "#18181b",
    },
    style: "physical",
    description:
      "Un equipo fuerte, intenso y difícil de sacar del partido. Gana duelos, presiona y aguanta bien.",
    strengths: ["Físico fuerte", "Presión intensa", "Buen desgaste del rival"],
    weaknesses: ["Menos creatividad", "Puede depender demasiado del choque"],
    players: createRoster("atletico-pulperia", {
      attack: 66,
      defense: 72,
      midfield: 65,
      energy: 84,
      mentality: 72,
    }),
    stats: {
      attack: 66,
      defense: 72,
      midfield: 65,
      energy: 84,
      mentality: 72,
    },
  },
  {
    id: "union-callejon",
    name: "Unión Callejón",
    shortName: "Callejón",
    city: "El Callejón",
    colors: {
      primary: "#a78bfa",
      secondary: "#111827",
    },
    style: "defensive",
    description:
      "Equipo cerrado, incómodo y paciente. No genera tanto, pero castiga cuando el rival se desespera.",
    strengths: ["Bloque defensivo", "Paciencia", "Castigo al error rival"],
    weaknesses: ["Poca producción ofensiva", "Le cuesta remontar partidos"],
    players: createRoster("union-callejon", {
      attack: 62,
      defense: 80,
      midfield: 66,
      energy: 74,
      mentality: 78,
    }),
    stats: {
      attack: 62,
      defense: 80,
      midfield: 66,
      energy: 74,
      mentality: 78,
    },
  },
  {
    id: "real-lajuelita",
    name: "Real Lajuelita",
    shortName: "Lajuelita",
    city: "Lajuelita",
    colors: {
      primary: "#f97316",
      secondary: "#0f172a",
    },
    style: "balanced",
    description:
      "Equipo competitivo, con buen ritmo y capacidad para adaptarse según el partido.",
    strengths: ["Ritmo competitivo", "Adaptabilidad", "Buen equilibrio general"],
    weaknesses: ["No tiene una fortaleza dominante", "Puede ser irregular"],
    players: createRoster("real-lajuelita", {
      attack: 71,
      defense: 69,
      midfield: 72,
      energy: 76,
      mentality: 73,
    }),
    stats: {
      attack: 71,
      defense: 69,
      midfield: 72,
      energy: 76,
      mentality: 73,
    },
  },
];

export function findTeamById(teamId: string | null | undefined): Team | undefined {
  if (!teamId) {
    return undefined;
  }

  return TEAMS.find((team) => team.id === teamId);
}

export function getTeamById(teamId: string | null | undefined): Team {
  return findTeamById(teamId) ?? TEAMS[0];
}

export function getRandomRivalTeam(playerTeamId: string): Team {
  const availableTeams = TEAMS.filter((team) => team.id !== playerTeamId);

  if (availableTeams.length === 0) {
    return TEAMS[0];
  }

  return availableTeams[Math.floor(Math.random() * availableTeams.length)];
}

export function getTeamStyleLabel(style: TeamStyle): string {
  const labels: Record<TeamStyle, string> = {
    balanced: "Equilibrado",
    defensive: "Defensivo",
    physical: "Físico",
    technical: "Técnico",
    fast: "Rápido",
    chaotic: "Caótico",
  };

  return labels[style];
}

export function getDefaultRivalTeam(playerTeamId?: string): Team {
  const defaultRivalByTeamId: Record<string, string> = {
    "cemento-fc": "los-del-parque",
    "los-del-parque": "union-callejon",
    "barrio-norte": "atletico-pulperia",
    "atletico-pulperia": "cemento-fc",
    "union-callejon": "los-del-parque",
    "real-lajuelita": "barrio-norte",
  };

  const defaultRivalId = playerTeamId
    ? defaultRivalByTeamId[playerTeamId]
    : undefined;

  const defaultRival = TEAMS.find(
    (team) => team.id === defaultRivalId && team.id !== playerTeamId,
  );

  if (defaultRival) {
    return defaultRival;
  }

  return TEAMS.find((team) => team.id !== playerTeamId) ?? TEAMS[0];
}

export function getValidRivalTeam(
  playerTeamId: string,
  rivalTeamId: string | null | undefined,
): Team {
  const requestedRival = findTeamById(rivalTeamId);

  if (requestedRival && requestedRival.id !== playerTeamId) {
    return requestedRival;
  }

  return getDefaultRivalTeam(playerTeamId);
}