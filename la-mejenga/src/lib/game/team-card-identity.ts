import type { MatchSituation, TacticalCard } from "./types";
import { randomBetween, shuffle } from "./utils";
import { getTeamSignatureCard } from "./signature-cards";

type TeamCardProfile = {
  id: string;
  style?: string;
  stats?: {
    attack: number;
    defense: number;
    midfield: number;
    energy: number;
    mentality: number;
  };
};

type CardType = TacticalCard["type"];

const STYLE_CARD_TYPE_BONUS: Record<string, Partial<Record<CardType, number>>> = {
  balanced: {
    attack: 4,
    midfield: 4,
    defense: 4,
    special: 3,
  },
  fast: {
    attack: 10,
    midfield: 7,
    special: 4,
  },
  technical: {
    midfield: 10,
    attack: 6,
    special: 6,
  },
  physical: {
    defense: 8,
    attack: 7,
    special: 4,
  },
  defensive: {
    defense: 11,
    midfield: 5,
    special: 5,
  },
};

const TEAM_CARD_TYPE_BONUS: Record<string, Partial<Record<CardType, number>>> = {
  "cemento-fc": {
    midfield: 6,
    defense: 5,
    attack: 4,
  },
  "los-del-parque": {
    attack: 9,
    midfield: 6,
  },
  "barrio-norte": {
    midfield: 10,
    special: 5,
    attack: 4,
  },
  "atletico-pulperia": {
    defense: 7,
    attack: 7,
    special: 4,
  },
  "union-callejon": {
    defense: 10,
    special: 6,
    midfield: 4,
  },
  "real-lajuelita": {
    special: 7,
    midfield: 6,
    attack: 4,
    defense: 4,
  },
};

function getStatForCardType(team: TeamCardProfile, cardType: CardType): number {
  if (!team.stats) {
    return 70;
  }

  if (cardType === "attack") {
    return team.stats.attack;
  }

  if (cardType === "defense") {
    return team.stats.defense;
  }

  if (cardType === "midfield") {
    return team.stats.midfield;
  }

  return Math.round((team.stats.mentality + team.stats.energy) / 2);
}

function getStatBonus(statValue: number): number {
  if (statValue >= 80) return 10;
  if (statValue >= 75) return 7;
  if (statValue >= 70) return 4;
  if (statValue >= 65) return 1;
  if (statValue <= 58) return -4;

  return 0;
}

function getRiskPersonalityBonus(team: TeamCardProfile, card: TacticalCard): number {
  const mentality = team.stats?.mentality ?? 70;
  const energy = team.stats?.energy ?? 70;

  if (card.risk >= 70 && mentality >= 76) {
    return 4;
  }

  if (card.risk >= 70 && mentality < 68) {
    return -6;
  }

  if (card.energyCost >= 14 && energy >= 78) {
    return 4;
  }

  if (card.energyCost >= 14 && energy < 68) {
    return -5;
  }

  return 0;
}

function getCardIdentityScore({
  card,
  situation,
  team,
}: {
  card: TacticalCard;
  situation: MatchSituation;
  team: TeamCardProfile;
}): number {
  const situationTypeBonus = situation.preferredCardTypes.includes(card.type)
    ? 20
    : 0;

  const situationSpecificBonus = card.preferredSituations.includes(situation.id)
    ? 18
    : 0;

  const styleBonus =
    STYLE_CARD_TYPE_BONUS[team.style ?? "balanced"]?.[card.type] ?? 0;

  const teamBonus = TEAM_CARD_TYPE_BONUS[team.id]?.[card.type] ?? 0;

  const statBonus = getStatBonus(getStatForCardType(team, card.type));

  const riskBonus = getRiskPersonalityBonus(team, card);

  const varietyNoise = randomBetween(-4, 4);

  return (
    situationTypeBonus +
    situationSpecificBonus +
    styleBonus +
    teamBonus +
    statBonus +
    riskBonus +
    varietyNoise
  );
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function getSignatureAppearanceChance({
  card,
  situation,
  team,
}: {
  card: TacticalCard;
  situation: MatchSituation;
  team: TeamCardProfile;
}): number {
  let chance = 5;

  if (situation.preferredCardTypes.includes(card.type)) {
    chance += 6;
  }

  if (card.preferredSituations.includes(situation.id)) {
    chance += 7;
  }

  const styleBonus =
    STYLE_CARD_TYPE_BONUS[team.style ?? "balanced"]?.[card.type] ?? 0;

  if (styleBonus >= 8) {
    chance += 2;
  }

  const statValue = getStatForCardType(team, card.type);

  if (statValue >= 78) {
    chance += 2;
  }

  if (card.risk >= 65) {
    chance -= 3;
  }

  return clamp(chance, 4, 18);
}

function shouldIncludeSignatureCard({
  card,
  situation,
  team,
}: {
  card: TacticalCard;
  situation: MatchSituation;
  team: TeamCardProfile;
}): boolean {
  const chance = getSignatureAppearanceChance({
    card,
    situation,
    team,
  });

  return randomBetween(1, 100) <= chance;
}

export function getCardsForTeamSituation({
  cards,
  situation,
  team,
  limit = 4,
}: {
  cards: TacticalCard[];
  situation: MatchSituation;
  team: TeamCardProfile;
  limit?: number;
}): TacticalCard[] {
  const signatureCard = getTeamSignatureCard(team.id);

  const includeSignatureCard = signatureCard
    ? shouldIncludeSignatureCard({
        card: signatureCard,
        situation,
        team,
      })
    : false;

  const baseCards = signatureCard
    ? cards.filter((card) => card.id !== signatureCard.id)
    : cards;

  const cardsWithOptionalSignature =
    signatureCard && includeSignatureCard
      ? [signatureCard, ...baseCards]
      : baseCards;

  return shuffle(cardsWithOptionalSignature)
    .map((card) => {
      const isSignature = signatureCard?.id === card.id;

      return {
        card,
        score:
          getCardIdentityScore({
            card,
            situation,
            team,
          }) + (isSignature ? 4 : 0),
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.card);
}