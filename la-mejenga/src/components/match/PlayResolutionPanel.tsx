import { getCardById } from "@/lib/game/cards";
import { getOutcomeMeta } from "@/lib/game/outcome-meta";
import type { MatchEvent } from "@/lib/game/types";
import { Badge } from "@/components/ui/Badge";
import { Panel } from "@/components/ui/Panel";
import { Button } from "@/components/ui/Button";

type PlayResolutionPanelProps = {
  event: MatchEvent;
  onContinue: () => void;
  isLastMoment: boolean;
};

function getToneClasses(tone: ReturnType<typeof getOutcomeMeta>["tone"]): string {
  if (tone === "success") {
    return "border-emerald-400/60 bg-emerald-400/10";
  }

  if (tone === "danger") {
    return "border-red-400/50 bg-red-400/10";
  }

  if (tone === "warning") {
    return "border-amber-400/50 bg-amber-400/10";
  }

  if (tone === "info") {
    return "border-sky-400/50 bg-sky-400/10";
  }

  return "";
}

function getBadgeVariant(tone: ReturnType<typeof getOutcomeMeta>["tone"]): "success" | "danger" | "warning" | "info" | "default" {
  if (tone === "success") return "success";
  if (tone === "danger") return "danger";
  if (tone === "warning") return "warning";
  if (tone === "info") return "info";
  return "default";
}

export function PlayResolutionPanel({ event, onContinue, isLastMoment }: PlayResolutionPanelProps) {
  const playerCard = getCardById(event.playerCardId);
  const rivalCard = getCardById(event.rivalCardId);
  const meta = getOutcomeMeta(event.outcome);

  return (
    <Panel className={getToneClasses(meta.tone)}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-emerald-300">Resolución de jugada</p>
          <h2 className="mt-1 text-3xl font-black text-zinc-50">{meta.headline}</h2>
          <p className="mt-2 text-sm text-zinc-400">{meta.description}</p>
        </div>

        <Badge variant={getBadgeVariant(meta.tone)}>{meta.label}</Badge>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-emerald-400/20 bg-zinc-950 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-emerald-300">Tu carta</p>
          <p className="mt-1 text-xl font-black text-zinc-50">{playerCard?.name ?? event.playerCardId}</p>
          <p className="mt-2 text-sm text-zinc-500">Protagonista: {event.protagonistName}</p>
        </div>

        <div className="rounded-2xl border border-red-400/20 bg-zinc-950 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-red-300">Carta rival revelada</p>
          <p className="mt-1 text-xl font-black text-zinc-50">{rivalCard?.name ?? event.rivalCardId}</p>
          <p className="mt-2 text-sm text-zinc-500">Rival: {event.rivalProtagonistName}</p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-zinc-950 p-5">
        <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">Narración</p>
        <p className="mt-2 text-base leading-8 text-zinc-200">{event.narration}</p>
      </div>

      <div className="mt-5 grid gap-3 text-sm md:grid-cols-4">
        <div className="rounded-xl bg-zinc-950 p-3">
          <p className="text-zinc-500">Energía</p>
          <p className={event.playerEnergyChange < 0 ? "font-black text-red-300" : "font-black text-emerald-300"}>
            {event.playerEnergyChange}
          </p>
        </div>
        <div className="rounded-xl bg-zinc-950 p-3">
          <p className="text-zinc-500">Momentum</p>
          <p className={event.playerMomentumChange >= 0 ? "font-black text-emerald-300" : "font-black text-red-300"}>
            {event.playerMomentumChange >= 0 ? "+" : ""}{event.playerMomentumChange}
          </p>
        </div>
        <div className="rounded-xl bg-zinc-950 p-3">
          <p className="text-zinc-500">Marcador</p>
          <p className="font-black text-zinc-50">
            {event.playerScore} - {event.rivalScore}
          </p>
        </div>
        <div className="rounded-xl bg-zinc-950 p-3">
          <p className="text-zinc-500">Lectura interna</p>
          <p className="font-black text-zinc-50">{event.scoreValue}</p>
        </div>
      </div>

      <Button className="mt-6" onClick={onContinue}>
        {isLastMoment ? "Ver resumen final" : "Siguiente jugada"}
      </Button>
    </Panel>
  );
}