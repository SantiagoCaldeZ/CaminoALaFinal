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