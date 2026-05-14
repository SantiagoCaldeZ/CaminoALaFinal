import { redirect } from "next/navigation";
import { MatchScreen } from "@/components/match/MatchScreen";
import { findTeamById, getValidRivalTeam } from "@/lib/game/teams";

type MatchPageProps = {
  searchParams: Promise<{
    team?: string;
    rival?: string;
  }>;
};

export default async function MatchPage({ searchParams }: MatchPageProps) {
  const params = await searchParams;

  const playerTeam = findTeamById(params.team);

  if (!playerTeam) {
    redirect("/teams");
  }

  const rivalTeam = getValidRivalTeam(playerTeam.id, params.rival);

  if (params.rival !== rivalTeam.id) {
    redirect(`/match?team=${playerTeam.id}&rival=${rivalTeam.id}`);
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-8 text-zinc-50 md:px-8">
      <div className="mx-auto max-w-6xl">
        <MatchScreen
          initialPlayerTeam={playerTeam}
          initialRivalTeam={rivalTeam}
        />
      </div>
    </main>
  );
}