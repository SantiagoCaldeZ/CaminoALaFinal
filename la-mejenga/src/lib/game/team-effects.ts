import type { MatchSituation, ResolvePlayParams, TacticalCard, Team } from "./types";
import { clamp } from "./utils";

function statDelta(value: number, divisor = 8): number {
  return Math.round((value - 70) / divisor);
}

export function getInitialEnergy(team: Team): number {
  return clamp(90 + Math.round((team.stats.energy - 70) / 2), 80, 100);
}

export function getInitialMomentum(team: Team): number {
  return clamp(48 + Math.round((team.stats.mentality - 70) / 2), 40, 60);
}

export function getTeamStyleScoreModifier(
  team: Team,
  card: TacticalCard,
  situation: MatchSituation,
): number {
  let modifier = 0;

  if (card.type === "attack") {
    modifier += statDelta(team.stats.attack);
  }

  if (card.type === "midfield") {
    modifier += statDelta(team.stats.midfield);
  }

  if (card.type === "defense") {
    modifier += statDelta(team.stats.defense);
  }

  if (card.type === "special") {
    modifier += statDelta(team.stats.mentality, 9);
  }

  switch (team.style) {
    case "balanced":
      if (
        situation.preferredCardTypes.includes(card.type) ||
        card.preferredSituations.includes(situation.id)
      ) {
        modifier += 2;
      }
      break;

    case "fast":
      if (
        card.type === "attack" &&
        (situation.id === "contraataque" || situation.id === "ataque-banda")
      ) {
        modifier += 6;
      }

      if (card.id === "pase-filtrado" || card.id === "regate-individual") {
        modifier += 3;
      }

      if (card.type === "defense") {
        modifier -= 2;
      }
      break;

    case "technical":
      if (card.type === "midfield") {
        modifier += 5;
      }

      if (
        card.id === "toque-corto" ||
        card.id === "pase-filtrado" ||
        card.id === "pared-rapida" ||
        card.id === "cambio-de-banda"
      ) {
        modifier += 3;
      }

      if (card.id === "pelotazo" || card.id === "barrida-fuerte") {
        modifier -= 2;
      }
      break;

    case "physical":
      if (card.type === "defense") {
        modifier += 4;
      }

      if (
        card.id === "presion-alta" ||
        card.id === "barrida-fuerte" ||
        card.id === "centro-al-area" ||
        card.id === "pelotazo"
      ) {
        modifier += 3;
      }
      break;

    case "defensive":
      if (card.type === "defense") {
        modifier += 6;
      }

      if (
        card.id === "bloque-bajo" ||
        card.id === "marcar-al-hombre" ||
        card.id === "anticipacion" ||
        card.id === "enfriar-el-partido"
      ) {
        modifier += 4;
      }

      if (card.type === "attack" && situation.id !== "ultima-jugada") {
        modifier -= 3;
      }
      break;

    case "chaotic":
      if (card.risk >= 55) {
        modifier += 6;
      }

      if (card.type === "special") {
        modifier += 4;
      }

      if (card.risk <= 30) {
        modifier -= 2;
      }
      break;
  }

  return modifier;
}

export function getTeamStylePressureModifier(
  team: Team,
  card: TacticalCard,
  situation: MatchSituation,
): number {
  let modifier = 0;

  if (card.type === "defense") {
    modifier += statDelta(team.stats.defense);
  }

  if (card.type === "midfield") {
    modifier += statDelta(team.stats.midfield, 9);
  }

  if (card.type === "attack") {
    modifier += statDelta(team.stats.attack, 10);
  }

  switch (team.style) {
    case "defensive":
      if (card.type === "defense") {
        modifier += 5;
      }

      if (situation.id === "ultima-jugada" || situation.id === "contraataque") {
        modifier += 3;
      }
      break;

    case "physical":
      if (card.type === "defense" || card.id === "presion-alta") {
        modifier += 3;
      }
      break;

    case "technical":
      if (card.type === "midfield" || card.id === "anticipacion") {
        modifier += 3;
      }
      break;

    case "fast":
      if (card.type === "attack" || card.id === "pelotazo") {
        modifier += 3;
      }
      break;

    case "chaotic":
      if (card.risk >= 55) {
        modifier += 4;
      }
      break;

    case "balanced":
      modifier += 1;
      break;
  }

  return modifier;
}

export function getTeamEnergyCost(team: Team, card: TacticalCard): number {
  let cost = card.energyCost;

  switch (team.style) {
    case "physical":
      if (card.type === "defense" || card.id === "presion-alta") {
        cost -= 2;
      }
      break;

    case "technical":
      if (card.type === "midfield" || card.id === "pausa-y-control") {
        cost -= 1;
      }
      break;

    case "fast":
      if (card.type === "attack" || card.id === "pelotazo") {
        cost -= 1;
      }

      if (card.type === "defense") {
        cost += 1;
      }
      break;

    case "defensive":
      if (
        card.type === "defense" ||
        card.id === "bloque-bajo" ||
        card.id === "enfriar-el-partido"
      ) {
        cost -= 2;
      }
      break;

    case "balanced":
      cost -= 1;
      break;

    case "chaotic":
      if (card.risk >= 55) {
        cost += 1;
      }
      break;
  }

  const staminaDiscount = Math.round((team.stats.energy - 70) / 10);

  return clamp(cost - staminaDiscount, 3, 25);
}

export function getRivalThreatModifier(params: ResolvePlayParams): number {
  const { matchState, playerCard, rivalCard, situation } = params;

  const playerTeam = matchState.playerTeam;
  const rivalTeam = matchState.rivalTeam;

  let modifier = 0;

  modifier += Math.round((rivalTeam.stats.attack - playerTeam.stats.defense) / 4);
  modifier += Math.round((rivalTeam.stats.mentality - playerTeam.stats.mentality) / 8);

  switch (rivalTeam.style) {
    case "fast":
      if (situation.id === "contraataque" || rivalCard.type === "attack") {
        modifier += 7;
      }
      break;

    case "technical":
      if (rivalCard.type === "midfield" || rivalCard.id === "pase-filtrado") {
        modifier += 4;
      }
      break;

    case "physical":
      if (rivalCard.id === "pelotazo" || rivalCard.id === "barrida-fuerte") {
        modifier += 4;
      }
      break;

    case "defensive":
      modifier -= 4;
      break;

    case "chaotic":
      if (rivalCard.risk >= 55) {
        modifier += 7;
      }
      break;

    case "balanced":
      modifier += 1;
      break;
  }

  switch (playerTeam.style) {
    case "defensive":
      modifier -= 10;
      break;

    case "physical":
      modifier -= 5;
      break;

    case "balanced":
      modifier -= 2;
      break;

    case "chaotic":
      modifier += 5;
      break;
  }

  if (playerCard.type === "defense") {
    modifier -= 8;
  }

  if (playerCard.id === "bloque-bajo" || playerCard.id === "enfriar-el-partido") {
    modifier -= 6;
  }

  return modifier;
}