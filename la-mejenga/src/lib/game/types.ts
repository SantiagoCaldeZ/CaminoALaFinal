export type PlayerRole =
  | "goalkeeper"
  | "defender"
  | "midfielder"
  | "forward"
  | "utility";

export type TeamStyle =
  | "balanced"
  | "physical"
  | "technical"
  | "fast"
  | "defensive"
  | "chaotic";

export type CardType = "attack" | "defense" | "midfield" | "special";

export type SituationType =
  | "attack"
  | "defense"
  | "midfield"
  | "set_piece"
  | "special";

export type MatchStatus = "not_started" | "in_progress" | "finished";

export type PlayOutcome =
  | "goal"
  | "shot_saved"
  | "shot_missed"
  | "blocked"
  | "corner"
  | "foul"
  | "yellow_card"
  | "penalty"
  | "offside"
  | "turnover"
  | "interception"
  | "possession_kept"
  | "chance_created"
  | "neutral";

export type Player = {
  id: string;
  name: string;
  nickname: string;
  role: PlayerRole;
  attack: number;
  defense: number;
  technique: number;
  physical: number;
  mentality: number;
  stamina: number;
  trait: string;
};

export type Team = {
  id: string;
  name: string;
  style: TeamStyle;
  description: string;
  strengths: string[];
  weaknesses: string[];
  players: Player[];
};

export type TacticalCard = {
  id: string;
  name: string;
  type: CardType;
  description: string;
  basePower: number;
  risk: number;
  energyCost: number;
  strongAgainst: string[];
  weakAgainst: string[];
  preferredSituations: string[];
};

export type MatchSituation = {
  id: string;
  minute: number;
  title: string;
  description: string;
  type: SituationType;
  preferredCardTypes: CardType[];
};

export type MatchState = {
  playerTeam: Team;
  rivalTeam: Team;
  playerScore: number;
  rivalScore: number;
  currentMomentIndex: number;
  totalMoments: number;
  playerEnergy: number;
  rivalEnergy: number;
  playerMomentum: number;
  rivalMomentum: number;
  history: MatchEvent[];
  status: MatchStatus;
};

export type MatchEvent = {
  id: string;
  minute: number;
  situationId: string;
  playerCardId: string;
  rivalCardId: string;
  outcome: PlayOutcome;
  narration: string;
  playerScore: number;
  rivalScore: number;
  playerEnergy: number;
  rivalEnergy: number;
  playerMomentum: number;
  rivalMomentum: number;
};