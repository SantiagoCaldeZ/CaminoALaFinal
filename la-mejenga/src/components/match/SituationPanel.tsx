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