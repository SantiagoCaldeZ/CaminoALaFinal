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