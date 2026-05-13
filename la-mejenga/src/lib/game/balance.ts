export const BALANCE = {
  initialEnergy: 100,
  initialMomentum: 50,
  totalMoments: 8,
  cardsPerHand: 4,

  randomMin: -6,
  randomMax: 6,

  goalThreshold: 92,
  shotThreshold: 80,
  chanceThreshold: 67,
  possessionThreshold: 52,
  neutralThreshold: 36,

  minValue: 0,
  maxValue: 100,

  recommendedCardBonus: 8,
  preferredTypeBonus: 6,
  specialCardEarlyPenalty: 5,

  strongCounterBonus: 10,
  weakCounterPenalty: -12,
  rivalStrongCounterPenalty: -10,
  rivalWeakCounterBonus: 8,
} as const;