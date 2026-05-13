# Implementación Sprint 3

# Interfaz jugable real — La Mejenga

## Objetivo del Sprint 3

Convertir la prueba técnica del Sprint 2 en una primera interfaz jugable, separada por componentes y más cercana a una demo real.

En el Sprint 2, la ruta `/match` tenía casi todo dentro de un solo archivo. Eso servía para validar el motor, pero no es una estructura mantenible.

En este sprint se busca:

* Separar la pantalla de partido en componentes.
* Crear una selección real de equipo.
* Mostrar marcador, energía, momentum y situación de forma clara.
* Mostrar cartas tácticas como componentes independientes.
* Mostrar resolución de jugada.
* Mostrar historial breve.
* Mostrar resumen final.
* Mantener la lógica de juego fuera de los componentes visuales.

---

# 1. Archivos que se crearán

Crear estos archivos:

```txt
src/components/ui/Button.tsx
src/components/ui/Panel.tsx
src/components/ui/Badge.tsx
src/components/ui/StatBar.tsx

src/components/team/TeamSelect.tsx
src/components/team/TeamPreview.tsx
src/components/team/PlayerList.tsx

src/components/match/MatchScreen.tsx
src/components/match/Scoreboard.tsx
src/components/match/EnergyBar.tsx
src/components/match/MomentumBar.tsx
src/components/match/SituationPanel.tsx
src/components/match/TacticalCardView.tsx
src/components/match/CardHand.tsx
src/components/match/PlayResolutionPanel.tsx
src/components/match/MatchHistory.tsx
src/components/match/FinalSummary.tsx
```

Actualizar:

```txt
src/app/match/page.tsx
```

---

# 2. Componentes UI reutilizables

## 2.1 `src/components/ui/Button.tsx`

```tsx
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-emerald-400 text-zinc-950 hover:bg-emerald-300",
  secondary: "border border-zinc-700 bg-zinc-900 text-zinc-100 hover:bg-zinc-800",
  ghost: "text-zinc-300 hover:bg-zinc-900 hover:text-zinc-50",
  danger: "bg-red-500 text-white hover:bg-red-400",
};

export function Button({
  children,
  className = "",
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`rounded-xl px-5 py-3 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-50 ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
```

---

## 2.2 `src/components/ui/Panel.tsx`

```tsx
import type { ReactNode } from "react";

type PanelProps = {
  children: ReactNode;
  className?: string;
};

export function Panel({ children, className = "" }: PanelProps) {
  return (
    <section className={`rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 shadow-xl shadow-black/10 ${className}`}>
      {children}
    </section>
  );
}
```

---

## 2.3 `src/components/ui/Badge.tsx`

```tsx
import type { ReactNode } from "react";

type BadgeVariant = "default" | "success" | "warning" | "danger" | "info";

type BadgeProps = {
  children: ReactNode;
  variant?: BadgeVariant;
};

const variantClasses: Record<BadgeVariant, string> = {
  default: "border-zinc-700 bg-zinc-800 text-zinc-200",
  success: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  warning: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  danger: "border-red-400/30 bg-red-400/10 text-red-200",
  info: "border-sky-400/30 bg-sky-400/10 text-sky-200",
};

export function Badge({ children, variant = "default" }: BadgeProps) {
  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide ${variantClasses[variant]}`}>
      {children}
    </span>
  );
}
```

---

## 2.4 `src/components/ui/StatBar.tsx`

```tsx
type StatBarVariant = "emerald" | "red" | "amber" | "sky" | "zinc";

type StatBarProps = {
  label: string;
  value: number;
  max?: number;
  variant?: StatBarVariant;
  helperText?: string;
};

const fillClasses: Record<StatBarVariant, string> = {
  emerald: "bg-emerald-400",
  red: "bg-red-400",
  amber: "bg-amber-400",
  sky: "bg-sky-400",
  zinc: "bg-zinc-400",
};

export function StatBar({
  label,
  value,
  max = 100,
  variant = "emerald",
  helperText,
}: StatBarProps) {
  const safeValue = Math.max(0, Math.min(value, max));
  const width = `${(safeValue / max) * 100}%`;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-zinc-100">{label}</p>
          {helperText && <p className="text-xs text-zinc-500">{helperText}</p>}
        </div>
        <p className="text-sm font-black text-zinc-100">{safeValue}</p>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-zinc-800">
        <div
          className={`h-full rounded-full transition-all duration-500 ${fillClasses[variant]}`}
          style={{ width }}
        />
      </div>
    </div>
  );
}
```

---

# 3. Componentes de equipo

## 3.1 `src/components/team/PlayerList.tsx`

```tsx
import type { Player } from "@/lib/game/types";
import { Badge } from "@/components/ui/Badge";

type PlayerListProps = {
  players: Player[];
};

const roleLabels: Record<Player["role"], string> = {
  goalkeeper: "Portero",
  defender: "Defensa",
  midfielder: "Medio",
  forward: "Delantero",
  utility: "Comodín",
};

export function PlayerList({ players }: PlayerListProps) {
  return (
    <div className="space-y-3">
      {players.map((player) => (
        <article key={player.id} className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h4 className="font-black text-zinc-50">
                {player.name} “{player.nickname}”
              </h4>
              <p className="mt-1 text-xs leading-5 text-zinc-400">{player.trait}</p>
            </div>

            <Badge variant="info">{roleLabels[player.role]}</Badge>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs sm:grid-cols-6">
            <span className="rounded-lg bg-zinc-900 p-2">ATQ {player.attack}</span>
            <span className="rounded-lg bg-zinc-900 p-2">DEF {player.defense}</span>
            <span className="rounded-lg bg-zinc-900 p-2">TEC {player.technique}</span>
            <span className="rounded-lg bg-zinc-900 p-2">FIS {player.physical}</span>
            <span className="rounded-lg bg-zinc-900 p-2">MEN {player.mentality}</span>
            <span className="rounded-lg bg-zinc-900 p-2">RES {player.stamina}</span>
          </div>
        </article>
      ))}
    </div>
  );
}
```

---

## 3.2 `src/components/team/TeamPreview.tsx`

```tsx
import type { Team } from "@/lib/game/types";
import { Badge } from "@/components/ui/Badge";
import { Panel } from "@/components/ui/Panel";
import { PlayerList } from "./PlayerList";

type TeamPreviewProps = {
  team: Team;
  selected?: boolean;
};

export function TeamPreview({ team, selected = false }: TeamPreviewProps) {
  return (
    <Panel className={selected ? "border-emerald-400/60 bg-emerald-400/10" : ""}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-2xl font-black text-zinc-50">{team.name}</h3>
          <p className="mt-2 text-sm leading-6 text-zinc-300">{team.description}</p>
        </div>

        <Badge variant={selected ? "success" : "default"}>{team.style}</Badge>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div>
          <p className="text-sm font-black text-emerald-300">Fortalezas</p>
          <ul className="mt-2 space-y-1 text-sm text-zinc-300">
            {team.strengths.map((strength) => (
              <li key={strength}>• {strength}</li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-black text-red-300">Debilidades</p>
          <ul className="mt-2 space-y-1 text-sm text-zinc-300">
            {team.weaknesses.map((weakness) => (
              <li key={weakness}>• {weakness}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-5">
        <p className="mb-3 text-sm font-black text-zinc-100">Plantilla</p>
        <PlayerList players={team.players} />
      </div>
    </Panel>
  );
}
```

---

## 3.3 `src/components/team/TeamSelect.tsx`

```tsx
"use client";

import type { Team } from "@/lib/game/types";
import { TEAMS } from "@/lib/game/teams";
import { Button } from "@/components/ui/Button";
import { TeamPreview } from "./TeamPreview";

type TeamSelectProps = {
  onSelectTeam: (team: Team) => void;
};

export function TeamSelect({ onSelectTeam }: TeamSelectProps) {
  return (
    <div>
      <div className="mb-6">
        <p className="text-sm font-bold text-emerald-300">Partido rápido</p>
        <h1 className="mt-1 text-3xl font-black text-zinc-50">Elegí tu equipo</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
          Para el MVP inicial solo hay dos equipos. Más adelante se podrán agregar más estilos,
          plantillas, cartas y progresión.
        </p>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        {TEAMS.map((team) => (
          <div key={team.id} className="space-y-4">
            <TeamPreview team={team} />
            <Button className="w-full" onClick={() => onSelectTeam(team)}>
              Jugar con {team.name}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

# 4. Componentes de partido

## 4.1 `src/components/match/EnergyBar.tsx`

```tsx
import { StatBar } from "@/components/ui/StatBar";

type EnergyBarProps = {
  label: string;
  value: number;
  variant?: "emerald" | "red" | "amber" | "sky" | "zinc";
};

export function EnergyBar({ label, value, variant = "emerald" }: EnergyBarProps) {
  return (
    <StatBar
      label={label}
      value={value}
      variant={variant}
      helperText="Recursos físicos para usar cartas"
    />
  );
}
```

---

## 4.2 `src/components/match/MomentumBar.tsx`

```tsx
import { StatBar } from "@/components/ui/StatBar";

type MomentumBarProps = {
  label: string;
  value: number;
  variant?: "emerald" | "red" | "amber" | "sky" | "zinc";
};

export function MomentumBar({ label, value, variant = "sky" }: MomentumBarProps) {
  return (
    <StatBar
      label={label}
      value={value}
      variant={variant}
      helperText="Impulso emocional del partido"
    />
  );
}
```

---

## 4.3 `src/components/match/Scoreboard.tsx`

```tsx
import type { MatchState } from "@/lib/game/types";
import { Panel } from "@/components/ui/Panel";

type ScoreboardProps = {
  matchState: MatchState;
  currentMinute?: number;
};

export function Scoreboard({ matchState, currentMinute }: ScoreboardProps) {
  return (
    <Panel>
      <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-emerald-300">Tu equipo</p>
          <h2 className="mt-1 text-xl font-black text-zinc-50">{matchState.playerTeam.name}</h2>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 px-6 py-4 text-center">
          <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">
            {matchState.status === "finished" ? "Final" : currentMinute ? `Min ${currentMinute}` : "Partido"}
          </p>
          <p className="mt-1 text-4xl font-black text-zinc-50">
            {matchState.playerScore} - {matchState.rivalScore}
          </p>
        </div>

        <div className="md:text-right">
          <p className="text-xs font-bold uppercase tracking-wide text-red-300">Rival</p>
          <h2 className="mt-1 text-xl font-black text-zinc-50">{matchState.rivalTeam.name}</h2>
        </div>
      </div>
    </Panel>
  );
}
```

---

## 4.4 `src/components/match/SituationPanel.tsx`

```tsx
import type { MatchSituation } from "@/lib/game/types";
import { Badge } from "@/components/ui/Badge";
import { Panel } from "@/components/ui/Panel";

type SituationPanelProps = {
  situation: MatchSituation;
  momentNumber: number;
  totalMoments: number;
};

export function SituationPanel({ situation, momentNumber, totalMoments }: SituationPanelProps) {
  return (
    <Panel>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-emerald-300">
            Momento {momentNumber}/{totalMoments} · Minuto {situation.minute}
          </p>
          <h2 className="mt-1 text-2xl font-black text-zinc-50">{situation.title}</h2>
        </div>

        <Badge variant={situation.type === "special" ? "warning" : "info"}>{situation.type}</Badge>
      </div>

      <p className="mt-4 text-sm leading-7 text-zinc-300">{situation.description}</p>
    </Panel>
  );
}
```

---

## 4.5 `src/components/match/TacticalCardView.tsx`

```tsx
import type { TacticalCard } from "@/lib/game/types";
import { Badge } from "@/components/ui/Badge";

type TacticalCardViewProps = {
  card: TacticalCard;
  disabled?: boolean;
  onSelect?: (card: TacticalCard) => void;
};

function getBadgeVariant(type: TacticalCard["type"]): "success" | "danger" | "info" | "warning" {
  if (type === "attack") return "danger";
  if (type === "defense") return "success";
  if (type === "midfield") return "info";
  return "warning";
}

export function TacticalCardView({ card, disabled = false, onSelect }: TacticalCardViewProps) {
  return (
    <button
      disabled={disabled}
      onClick={() => onSelect?.(card)}
      className="group flex min-h-[260px] w-full flex-col rounded-2xl border border-zinc-800 bg-zinc-900 p-5 text-left transition hover:-translate-y-1 hover:border-emerald-400/60 hover:bg-zinc-800 disabled:hover:translate-y-0 disabled:hover:border-zinc-800 disabled:hover:bg-zinc-900"
    >
      <div className="flex items-start justify-between gap-3">
        <Badge variant={getBadgeVariant(card.type)}>{card.type}</Badge>
        <span className="rounded-full bg-zinc-950 px-3 py-1 text-xs font-black text-emerald-300">
          {card.energyCost} EN
        </span>
      </div>

      <h3 className="mt-5 text-xl font-black text-zinc-50">{card.name}</h3>
      <p className="mt-3 flex-1 text-sm leading-6 text-zinc-400">{card.description}</p>

      <div className="mt-5 grid grid-cols-2 gap-2 text-center text-xs font-bold text-zinc-200">
        <div className="rounded-xl bg-zinc-950 p-3">
          <p className="text-zinc-500">Poder</p>
          <p className="mt-1 text-lg text-zinc-50">{card.basePower}</p>
        </div>
        <div className="rounded-xl bg-zinc-950 p-3">
          <p className="text-zinc-500">Riesgo</p>
          <p className="mt-1 text-lg text-zinc-50">{card.risk}</p>
        </div>
      </div>
    </button>
  );
}
```

---

## 4.6 `src/components/match/CardHand.tsx`

```tsx
import type { TacticalCard } from "@/lib/game/types";
import { TacticalCardView } from "./TacticalCardView";

type CardHandProps = {
  cards: TacticalCard[];
  currentEnergy: number;
  onSelectCard: (card: TacticalCard) => void;
};

export function CardHand({ cards, currentEnergy, onSelectCard }: CardHandProps) {
  return (
    <section>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-emerald-300">Elegí tu carta</p>
          <h2 className="text-2xl font-black text-zinc-50">Decisión táctica</h2>
        </div>
        <p className="text-sm text-zinc-400">Energía disponible: {currentEnergy}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <TacticalCardView
            key={card.id}
            card={card}
            disabled={card.energyCost > currentEnergy}
            onSelect={onSelectCard}
          />
        ))}
      </div>
    </section>
  );
}
```

---

## 4.7 `src/components/match/PlayResolutionPanel.tsx`

```tsx
import { getCardById } from "@/lib/game/cards";
import type { MatchEvent } from "@/lib/game/types";
import { Badge } from "@/components/ui/Badge";
import { Panel } from "@/components/ui/Panel";
import { Button } from "@/components/ui/Button";

type PlayResolutionPanelProps = {
  event: MatchEvent;
  onContinue: () => void;
  isLastMoment: boolean;
};

function formatOutcome(outcome: string): string {
  return outcome.replaceAll("_", " ");
}

function getOutcomeVariant(outcome: string): "success" | "danger" | "warning" | "info" | "default" {
  if (outcome === "goal") return "success";
  if (["turnover", "interception", "offside", "shot_missed"].includes(outcome)) return "danger";
  if (["foul", "yellow_card", "penalty"].includes(outcome)) return "warning";
  if (["chance_created", "shot_saved", "corner"].includes(outcome)) return "info";
  return "default";
}

export function PlayResolutionPanel({ event, onContinue, isLastMoment }: PlayResolutionPanelProps) {
  const playerCard = getCardById(event.playerCardId);
  const rivalCard = getCardById(event.rivalCardId);

  return (
    <Panel className={event.outcome === "goal" ? "border-emerald-400/60 bg-emerald-400/10" : ""}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-emerald-300">Resolución de jugada</p>
          <h2 className="mt-1 text-2xl font-black capitalize text-zinc-50">
            {formatOutcome(event.outcome)}
          </h2>
        </div>

        <Badge variant={getOutcomeVariant(event.outcome)}>{event.outcome}</Badge>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-emerald-300">Tu carta</p>
          <p className="mt-1 text-lg font-black text-zinc-50">{playerCard?.name ?? event.playerCardId}</p>
          <p className="mt-1 text-sm text-zinc-500">Protagonista: {event.protagonistName}</p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-red-300">Carta rival</p>
          <p className="mt-1 text-lg font-black text-zinc-50">{rivalCard?.name ?? event.rivalCardId}</p>
          <p className="mt-1 text-sm text-zinc-500">Rival: {event.rivalProtagonistName}</p>
        </div>
      </div>

      <p className="mt-5 text-base leading-8 text-zinc-200">{event.narration}</p>

      <div className="mt-5 grid gap-3 text-sm md:grid-cols-4">
        <div className="rounded-xl bg-zinc-950 p-3">
          <p className="text-zinc-500">Energía</p>
          <p className="font-black text-zinc-50">{event.playerEnergyChange}</p>
        </div>
        <div className="rounded-xl bg-zinc-950 p-3">
          <p className="text-zinc-500">Momentum</p>
          <p className="font-black text-zinc-50">{event.playerMomentumChange}</p>
        </div>
        <div className="rounded-xl bg-zinc-950 p-3">
          <p className="text-zinc-500">Marcador</p>
          <p className="font-black text-zinc-50">
            {event.playerScore} - {event.rivalScore}
          </p>
        </div>
        <div className="rounded-xl bg-zinc-950 p-3">
          <p className="text-zinc-500">Puntaje interno</p>
          <p className="font-black text-zinc-50">{event.scoreValue}</p>
        </div>
      </div>

      <Button className="mt-6" onClick={onContinue}>
        {isLastMoment ? "Ver resumen final" : "Siguiente jugada"}
      </Button>
    </Panel>
  );
}
```

---

## 4.8 `src/components/match/MatchHistory.tsx`

```tsx
import type { MatchEvent } from "@/lib/game/types";
import { Panel } from "@/components/ui/Panel";

type MatchHistoryProps = {
  history: MatchEvent[];
};

function formatOutcome(outcome: string): string {
  return outcome.replaceAll("_", " ");
}

export function MatchHistory({ history }: MatchHistoryProps) {
  const latest = history.slice(-5).reverse();

  return (
    <Panel>
      <h2 className="text-lg font-black text-zinc-50">Historial reciente</h2>

      {latest.length === 0 ? (
        <p className="mt-3 text-sm text-zinc-500">Todavía no hay jugadas registradas.</p>
      ) : (
        <div className="mt-4 space-y-3">
          {latest.map((event) => (
            <article key={event.id} className="rounded-xl bg-zinc-950 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-bold text-emerald-300">Min {event.minute}</p>
                  <p className="mt-1 text-sm font-black capitalize text-zinc-100">
                    {formatOutcome(event.outcome)}
                  </p>
                </div>
                <p className="text-sm font-black text-zinc-300">
                  {event.playerScore} - {event.rivalScore}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </Panel>
  );
}
```

---

## 4.9 `src/components/match/FinalSummary.tsx`

```tsx
import { getMatchWinner } from "@/lib/game/match-engine";
import type { MatchState } from "@/lib/game/types";
import { Button } from "@/components/ui/Button";
import { Panel } from "@/components/ui/Panel";
import { MatchHistory } from "./MatchHistory";

type FinalSummaryProps = {
  matchState: MatchState;
  onRestart: () => void;
  onChangeTeam: () => void;
};

export function FinalSummary({ matchState, onRestart, onChangeTeam }: FinalSummaryProps) {
  const winner = getMatchWinner(matchState);

  const title =
    winner === "player"
      ? `Ganó ${matchState.playerTeam.name}`
      : winner === "rival"
        ? `Ganó ${matchState.rivalTeam.name}`
        : "Empate cerrado";

  return (
    <div className="space-y-5">
      <Panel className="border-emerald-400/40 bg-emerald-400/10">
        <p className="text-sm font-bold text-emerald-300">Resumen final</p>
        <h1 className="mt-1 text-3xl font-black text-zinc-50">{title}</h1>

        <p className="mt-4 text-5xl font-black text-zinc-50">
          {matchState.playerScore} - {matchState.rivalScore}
        </p>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <div className="rounded-xl bg-zinc-950 p-4">
            <p className="text-sm text-zinc-500">Energía final</p>
            <p className="text-xl font-black text-zinc-50">{matchState.playerEnergy}</p>
          </div>
          <div className="rounded-xl bg-zinc-950 p-4">
            <p className="text-sm text-zinc-500">Momentum final</p>
            <p className="text-xl font-black text-zinc-50">{matchState.playerMomentum}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button onClick={onRestart}>Jugar de nuevo</Button>
          <Button variant="secondary" onClick={onChangeTeam}>
            Cambiar equipo
          </Button>
        </div>
      </Panel>

      <MatchHistory history={matchState.history} />
    </div>
  );
}
```

---

# 5. Componente principal del partido

## `src/components/match/MatchScreen.tsx`

```tsx
"use client";

import { useMemo, useState } from "react";
import { getDefaultRivalTeam } from "@/lib/game/teams";
import {
  getAvailableCardsForSituation,
  getCurrentSituation,
  playMoment,
  startMatch,
} from "@/lib/game/match-engine";
import type { MatchEvent, MatchState, TacticalCard, Team } from "@/lib/game/types";
import { Panel } from "@/components/ui/Panel";
import { TeamSelect } from "@/components/team/TeamSelect";
import { Scoreboard } from "./Scoreboard";
import { EnergyBar } from "./EnergyBar";
import { MomentumBar } from "./MomentumBar";
import { SituationPanel } from "./SituationPanel";
import { CardHand } from "./CardHand";
import { PlayResolutionPanel } from "./PlayResolutionPanel";
import { MatchHistory } from "./MatchHistory";
import { FinalSummary } from "./FinalSummary";

type MatchUiPhase = "team_select" | "choosing_card" | "resolution" | "finished";

export function MatchScreen() {
  const [phase, setPhase] = useState<MatchUiPhase>("team_select");
  const [matchState, setMatchState] = useState<MatchState | null>(null);
  const [lastEvent, setLastEvent] = useState<MatchEvent | null>(null);

  const currentSituation = useMemo(() => {
    if (!matchState || matchState.status === "finished") {
      return null;
    }

    return getCurrentSituation(matchState);
  }, [matchState]);

  const availableCards = useMemo(() => {
    if (!currentSituation) {
      return [];
    }

    return getAvailableCardsForSituation(currentSituation);
  }, [currentSituation]);

  function handleSelectTeam(team: Team) {
    const rivalTeam = getDefaultRivalTeam(team.id);
    const newMatch = startMatch(team, rivalTeam);

    setMatchState(newMatch);
    setLastEvent(null);
    setPhase("choosing_card");
  }

  function handleSelectCard(card: TacticalCard) {
    if (!matchState || matchState.status === "finished") {
      return;
    }

    const nextState = playMoment({ matchState, playerCard: card });
    const event = nextState.history.at(-1) ?? null;

    setMatchState(nextState);
    setLastEvent(event);
    setPhase(nextState.status === "finished" ? "finished" : "resolution");
  }

  function handleContinue() {
    if (!matchState) {
      return;
    }

    if (matchState.status === "finished") {
      setPhase("finished");
      return;
    }

    setPhase("choosing_card");
  }

  function handleRestart() {
    if (!matchState) {
      setPhase("team_select");
      return;
    }

    const newMatch = startMatch(matchState.playerTeam, matchState.rivalTeam);
    setMatchState(newMatch);
    setLastEvent(null);
    setPhase("choosing_card");
  }

  function handleChangeTeam() {
    setMatchState(null);
    setLastEvent(null);
    setPhase("team_select");
  }

  if (phase === "team_select" || !matchState) {
    return <TeamSelect onSelectTeam={handleSelectTeam} />;
  }

  if (phase === "finished" || matchState.status === "finished") {
    return (
      <FinalSummary
        matchState={matchState}
        onRestart={handleRestart}
        onChangeTeam={handleChangeTeam}
      />
    );
  }

  return (
    <div className="space-y-5">
      <Scoreboard matchState={matchState} currentMinute={currentSituation?.minute} />

      <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
        <div className="space-y-5">
          {currentSituation && phase === "choosing_card" && (
            <>
              <SituationPanel
                situation={currentSituation}
                momentNumber={matchState.currentMomentIndex + 1}
                totalMoments={matchState.totalMoments}
              />

              <CardHand
                cards={availableCards}
                currentEnergy={matchState.playerEnergy}
                onSelectCard={handleSelectCard}
              />
            </>
          )}

          {phase === "resolution" && lastEvent && (
            <PlayResolutionPanel
              event={lastEvent}
              onContinue={handleContinue}
              isLastMoment={matchState.currentMomentIndex >= matchState.totalMoments}
            />
          )}
        </div>

        <aside className="space-y-5">
          <Panel>
            <h2 className="mb-4 text-lg font-black text-zinc-50">Estado del partido</h2>
            <div className="space-y-5">
              <EnergyBar label={`Energía · ${matchState.playerTeam.name}`} value={matchState.playerEnergy} variant="emerald" />
              <MomentumBar label={`Momentum · ${matchState.playerTeam.name}`} value={matchState.playerMomentum} variant="sky" />
              <EnergyBar label={`Energía · ${matchState.rivalTeam.name}`} value={matchState.rivalEnergy} variant="red" />
              <MomentumBar label={`Momentum · ${matchState.rivalTeam.name}`} value={matchState.rivalMomentum} variant="amber" />
            </div>
          </Panel>

          <MatchHistory history={matchState.history} />
        </aside>
      </div>
    </div>
  );
}
```

---

# 6. Página `/match`

## `src/app/match/page.tsx`

Reemplazar el contenido temporal del Sprint 2 por esto:

```tsx
import Link from "next/link";
import { MatchScreen } from "@/components/match/MatchScreen";

export default function MatchPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-6 text-zinc-50 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col justify-between gap-4 border-b border-zinc-800 pb-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-bold text-emerald-300">La Mejenga</p>
            <h1 className="mt-1 text-3xl font-black tracking-tight">Partido rápido</h1>
          </div>

          <Link
            href="/"
            className="w-fit rounded-xl border border-zinc-700 px-4 py-2 text-sm font-semibold text-zinc-200 transition hover:bg-zinc-900"
          >
            Volver al inicio
          </Link>
        </header>

        <MatchScreen />
      </div>
    </main>
  );
}
```

---

# 7. Página inicial opcionalmente actualizada

Si se quiere dejar la pantalla inicial más limpia, usar:

## `src/app/page.tsx`

```tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-zinc-50">
      <section className="mx-auto flex min-h-[80vh] max-w-5xl flex-col items-center justify-center text-center">
        <p className="mb-4 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1 text-sm font-bold text-emerald-200">
          MVP 1 · Partido táctico por cartas
        </p>

        <h1 className="max-w-3xl text-4xl font-black tracking-tight sm:text-6xl">
          La Mejenga: Camino a la Final
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg">
          Un juego de fútbol de barrio donde cada partido se decide en momentos clave:
          cartas tácticas, energía, momentum y decisiones que pueden cambiarlo todo.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/match"
            className="rounded-2xl bg-emerald-400 px-6 py-3 font-bold text-zinc-950 transition hover:bg-emerald-300"
          >
            Jugar partido rápido
          </Link>
        </div>
      </section>
    </main>
  );
}
```

---

# 8. Validación del Sprint 3

Ejecutar:

```bash
npm run dev
```

Abrir:

```txt
http://localhost:3000/match
```

Probar:

1. Debe aparecer pantalla de selección de equipo.
2. Deben verse Los del Parque y Cemento FC.
3. Se debe poder seleccionar un equipo.
4. Debe iniciar el partido.
5. Debe aparecer marcador.
6. Deben aparecer energía y momentum.
7. Debe aparecer situación actual.
8. Deben aparecer 4 cartas.
9. Al elegir carta, debe aparecer resolución.
10. Debe verse carta del usuario y carta rival.
11. Debe verse narración.
12. Debe verse historial reciente.
13. Se debe poder avanzar jugada por jugada.
14. Después de 8 momentos debe aparecer resumen final.
15. Debe permitir jugar de nuevo.
16. Debe permitir cambiar equipo.

---

# 9. Resultado esperado al terminar Sprint 3

Al finalizar este sprint, el proyecto ya debe sentirse como una primera demo jugable:

* selección de equipo;
* partido completo;
* cartas visuales;
* marcador;
* energía;
* momentum;
* resolución;
* narración;
* historial;
* resumen final;
* reinicio de partido.

Aún no será la versión pulida final, pero ya no será solo una prueba técnica.

---

# 10. Qué NO hacemos todavía

Todavía no se implementa:

* animaciones complejas;
* balance profundo;
* progresión;
* recompensas;
* torneo;
* localStorage;
* login;
* Supabase;
* amigos;
* mensajes;
* multijugador;
* ranking;
* app móvil.

---

# 11. Siguiente paso después del Sprint 3

El Sprint 4 debe enfocarse en pulido y balance:

* mejorar estilos de cartas;
* agregar animación de selección;
* agregar revelación más clara de carta rival;
* mejorar efectos de gol, atajada y error;
* ajustar frecuencia de goles;
* ajustar impacto de energía;
* ajustar impacto de momentum;
* mejorar narraciones repetidas;
* mejorar experiencia móvil;
* mostrar indicaciones de riesgo o recomendación de carta.

Después del Sprint 4, el MVP 1 debería quedar suficientemente presentable para probarlo con otras personas.