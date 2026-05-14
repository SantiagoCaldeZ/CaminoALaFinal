import type { Team } from "./types";

type StatKey = keyof Team["stats"];

type StatComparison = {
  key: StatKey;
  label: string;
  playerValue: number;
  rivalValue: number;
  difference: number;
  leader: "player" | "rival" | "even";
};

export type MatchPreview = {
  favoriteLabel: string;
  tempoLabel: string;
  playerAdvantage: string;
  rivalThreat: string;
  tacticalKey: string;
  recommendation: string;
  comparisons: StatComparison[];
};

const statLabels: {
  key: StatKey;
  label: string;
  lowerLabel: string;
  article: "el" | "la";
}[] = [
  {
    key: "attack",
    label: "Ataque",
    lowerLabel: "ataque",
    article: "el",
  },
  {
    key: "defense",
    label: "Defensa",
    lowerLabel: "defensa",
    article: "la",
  },
  {
    key: "midfield",
    label: "Medio campo",
    lowerLabel: "medio campo",
    article: "el",
  },
  {
    key: "energy",
    label: "Energía",
    lowerLabel: "energía",
    article: "la",
  },
  {
    key: "mentality",
    label: "Mentalidad",
    lowerLabel: "mentalidad",
    article: "la",
  },
];

function getTeamRating(team: Team): number {
  return Math.round(
    team.stats.attack * 0.24 +
      team.stats.defense * 0.24 +
      team.stats.midfield * 0.22 +
      team.stats.energy * 0.15 +
      team.stats.mentality * 0.15,
  );
}

type StatWithValue = {
  key: StatKey;
  label: string;
  lowerLabel: string;
  article: "el" | "la";
  value: number;
};

function getBestStat(team: Team): StatWithValue {
  return statLabels
    .map((stat) => ({
      ...stat,
      value: team.stats[stat.key],
    }))
    .sort((a, b) => b.value - a.value)[0];
}

function getWorstStat(team: Team): StatWithValue {
  return statLabels
    .map((stat) => ({
      ...stat,
      value: team.stats[stat.key],
    }))
    .sort((a, b) => a.value - b.value)[0];
}

function getStyleDescription(team: Team): string {
  switch (team.style) {
    case "balanced":
      return "suele competir bien en distintos contextos y no depende de una sola vía de juego";
    case "fast":
      return "puede castigar con velocidad si encuentra espacios";
    case "technical":
      return "puede controlar mejor el ritmo si logra imponer el medio campo";
    case "physical":
      return "puede desgastar al rival con intensidad y duelos fuertes";
    case "defensive":
      return "puede cerrar espacios y castigar errores del rival";
    case "chaotic":
      return "puede generar partidos impredecibles, con mucho riesgo y cambios bruscos";
    default:
      return "tiene una identidad competitiva clara";
  }
}

function getTempoLabel(playerTeam: Team, rivalTeam: Team): string {
  const averageEnergy = Math.round((playerTeam.stats.energy + rivalTeam.stats.energy) / 2);
  const averageAttack = Math.round((playerTeam.stats.attack + rivalTeam.stats.attack) / 2);
  const averageDefense = Math.round((playerTeam.stats.defense + rivalTeam.stats.defense) / 2);

  if (averageAttack - averageDefense >= 8) {
    return "Partido abierto";
  }

  if (averageDefense - averageAttack >= 8) {
    return "Partido cerrado";
  }

  if (averageEnergy >= 78) {
    return "Partido intenso";
  }

  return "Partido equilibrado";
}

function getFavoriteLabel(playerTeam: Team, rivalTeam: Team): string {
  const playerRating = getTeamRating(playerTeam);
  const rivalRating = getTeamRating(rivalTeam);
  const difference = playerRating - rivalRating;

  if (difference >= 5) {
    return `${playerTeam.name} llega con una ligera ventaja general.`;
  }

  if (difference <= -5) {
    return `${rivalTeam.name} llega con una ligera ventaja general.`;
  }

  return "El partido llega bastante parejo.";
}

function getPlayerAdvantage(playerTeam: Team, rivalTeam: Team): string {
  const bestPlayerStat = getBestStat(playerTeam);
  const rivalSameStat = rivalTeam.stats[bestPlayerStat.key];

  if (bestPlayerStat.value - rivalSameStat >= 5) {
    return `${playerTeam.name} puede apoyarse en ${bestPlayerStat.article} ${bestPlayerStat.lowerLabel}, donde supera al rival.`;
  }

  return `${playerTeam.name} no tiene una ventaja enorme, pero su mejor recurso es ${bestPlayerStat.article} ${bestPlayerStat.lowerLabel}.`;
}

function getRivalThreat(playerTeam: Team, rivalTeam: Team): string {
  const bestRivalStat = getBestStat(rivalTeam);
  const playerSameStat = playerTeam.stats[bestRivalStat.key];

  if (bestRivalStat.value - playerSameStat >= 5) {
    return `Cuidado con ${bestRivalStat.article} ${bestRivalStat.lowerLabel} de ${rivalTeam.name}; ahí puede hacer daño.`;
  }

  return `${rivalTeam.name} puede competir si logra imponer su estilo: ${getStyleDescription(rivalTeam)}.`;
}

function getTacticalKey(playerTeam: Team, rivalTeam: Team): string {
  const playerWeakness = getWorstStat(playerTeam);
  const rivalStrength = getBestStat(rivalTeam);

  if (rivalStrength.key === "attack" && playerWeakness.key === "defense") {
    return "La clave está en no quedar expuesto atrás, porque el ataque rival puede castigar cualquier espacio.";
  }

  if (rivalStrength.key === "defense" && playerWeakness.key === "attack") {
    return "La clave está en atacar con paciencia, porque el rival defiende bien y puede apagar jugadas apresuradas.";
  }

  if (rivalStrength.key === "midfield" && playerWeakness.key === "midfield") {
    return "La clave está en no perder el medio campo, porque el rival puede controlar el ritmo del partido.";
  }

  if (rivalStrength.key === "energy" && playerWeakness.key === "energy") {
    return "La clave está en administrar la energía, porque el rival puede sostener mejor la intensidad.";
  }

  if (rivalStrength.key === "mentality" && playerWeakness.key === "mentality") {
    return "La clave está en no desesperarse: el rival tiene buena mentalidad para aguantar momentos difíciles.";
  }

  if (playerTeam.stats.midfield > rivalTeam.stats.midfield + 5) {
    return "La clave está en manejar el medio campo y no rifar jugadas demasiado pronto.";
  }

  if (playerTeam.stats.attack > rivalTeam.stats.defense + 8) {
    return "La clave está en atacar con decisión: tu ataque puede superar la defensa rival.";
  }

  if (rivalTeam.stats.attack > playerTeam.stats.defense + 8) {
    return "La clave está en no quedar expuesto: el rival tiene herramientas para castigar pérdidas.";
  }

  return "La clave está en elegir bien las cartas según el momento, no solo por poder bruto.";
}

function getRecommendation(playerTeam: Team, rivalTeam: Team): string {
  if (playerTeam.style === "defensive") {
    return "Conviene jugar con paciencia, cuidar energía y castigar cuando el rival se exponga.";
  }

  if (playerTeam.style === "fast") {
    return "Conviene acelerar cuando aparezcan espacios, pero evitando perder la pelota en zonas peligrosas.";
  }

  if (playerTeam.style === "technical") {
    return "Conviene priorizar cartas de medio campo y jugadas limpias antes de arriesgar.";
  }

  if (playerTeam.style === "physical") {
    return "Conviene usar la intensidad como ventaja, pero sin gastar toda la energía demasiado pronto.";
  }

  if (rivalTeam.style === "fast") {
    return "Conviene cerrar espacios y no abusar de cartas muy riesgosas cuando el partido esté abierto.";
  }

  return "Conviene empezar con cartas seguras y guardar las más arriesgadas para momentos decisivos.";
}

function getComparisons(playerTeam: Team, rivalTeam: Team): StatComparison[] {
  return statLabels.map((stat) => {
    const playerValue = playerTeam.stats[stat.key];
    const rivalValue = rivalTeam.stats[stat.key];
    const difference = playerValue - rivalValue;

    return {
      key: stat.key,
      label: stat.label,
      playerValue,
      rivalValue,
      difference,
      leader:
        Math.abs(difference) <= 2
          ? "even"
          : difference > 0
            ? "player"
            : "rival",
    };
  });
}

export function getMatchPreview(playerTeam: Team, rivalTeam: Team): MatchPreview {
  return {
    favoriteLabel: getFavoriteLabel(playerTeam, rivalTeam),
    tempoLabel: getTempoLabel(playerTeam, rivalTeam),
    playerAdvantage: getPlayerAdvantage(playerTeam, rivalTeam),
    rivalThreat: getRivalThreat(playerTeam, rivalTeam),
    tacticalKey: getTacticalKey(playerTeam, rivalTeam),
    recommendation: getRecommendation(playerTeam, rivalTeam),
    comparisons: getComparisons(playerTeam, rivalTeam),
  };
}