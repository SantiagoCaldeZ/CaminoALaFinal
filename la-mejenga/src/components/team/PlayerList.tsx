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