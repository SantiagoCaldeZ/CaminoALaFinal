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