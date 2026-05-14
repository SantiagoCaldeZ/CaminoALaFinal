import type { MatchSituation, TacticalCard, Team } from "./types";

type TacticalContext = {
  team: Team;
  rivalTeam: Team;
  card: TacticalCard;
  situation: MatchSituation;
  isRival?: boolean;
};

export function getTeamStyleModifier({
  team,
  rivalTeam,
  card,
  situation,
}: TacticalContext): number {
  let modifier = 0;

  if (team.style === "balanced") {
    modifier += 2;

    if (situation.id === "ultima-jugada") {
      modifier += 2;
    }

    if (card.risk <= 45) {
      modifier += 1;
    }
  }

  if (team.style === "fast") {
    if (card.type === "attack") {
      modifier += 5;
    }

    if (
      situation.id === "contraataque" ||
      situation.title.toLowerCase().includes("banda")
    ) {
      modifier += 4;
    }

    if (card.risk >= 60) {
      modifier += 2;
    }

    if (rivalTeam.stats.defense >= 75) {
      modifier -= 3;
    }
  }

  if (team.style === "technical") {
    if (card.type === "midfield") {
      modifier += 5;
    }

    if (card.type === "special") {
      modifier += 2;
    }

    if (card.risk <= 55) {
      modifier += 2;
    }

    if (rivalTeam.stats.midfield >= 75) {
      modifier -= 2;
    }
  }

  if (team.style === "physical") {
    if (card.type === "defense") {
      modifier += 3;
    }

    if (card.type === "attack" && card.risk >= 50) {
      modifier += 2;
    }

    if (team.stats.energy >= rivalTeam.stats.energy) {
      modifier += 3;
    }

    if (situation.id === "ultima-jugada") {
      modifier += 1;
    }
  }

  if (team.style === "defensive") {
    if (card.type === "defense") {
      modifier += 6;
    }

    if (card.type === "midfield") {
      modifier += 2;
    }

    if (card.type === "attack" && card.risk >= 60) {
      modifier -= 4;
    }

    if (rivalTeam.stats.attack >= 75) {
      modifier += 2;
    }
  }

  return modifier;
}

export function getTeamStatModifier({
  team,
  rivalTeam,
  card,
  situation,
}: TacticalContext): number {
  let modifier = 0;

  const attackDiff = team.stats.attack - rivalTeam.stats.defense;
  const defenseDiff = team.stats.defense - rivalTeam.stats.attack;
  const midfieldDiff = team.stats.midfield - rivalTeam.stats.midfield;
  const energyDiff = team.stats.energy - rivalTeam.stats.energy;
  const mentalityDiff = team.stats.mentality - rivalTeam.stats.mentality;

  if (card.type === "attack") {
    modifier += Math.round(attackDiff / 8);
  }

  if (card.type === "defense") {
    modifier += Math.round(defenseDiff / 8);
  }

  if (card.type === "midfield") {
    modifier += Math.round(midfieldDiff / 8);
  }

  if (card.type === "special") {
    modifier += Math.round(mentalityDiff / 8);
  }

  if (energyDiff >= 8) {
    modifier += 2;
  }

  if (energyDiff <= -8) {
    modifier -= 2;
  }

  if (situation.id === "ultima-jugada") {
    modifier += Math.round(mentalityDiff / 10);
  }

  return modifier;
}

export function getTeamTacticalModifier(context: TacticalContext): number {
  return getTeamStyleModifier(context) + getTeamStatModifier(context);
}

export function getTacticalIdentityLabel(team: Team): string {
  if (team.style === "balanced") {
    return "Equipo estable";
  }

  if (team.style === "fast") {
    return "Equipo vertical";
  }

  if (team.style === "technical") {
    return "Equipo de control";
  }

  if (team.style === "physical") {
    return "Equipo intenso";
  }

  if (team.style === "defensive") {
    return "Equipo resistente";
  }

  return "Equipo competitivo";
}