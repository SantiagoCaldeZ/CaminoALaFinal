import { MatchScreen } from "@/components/match/MatchScreen";
import { getDefaultRivalTeam, getTeamById } from "@/lib/game/teams";

type MatchPageProps = {
  searchParams: Promise<{
    team?: string;
    rival?: string;
  }>;
};

export default async function MatchPage({ searchParams }: MatchPageProps) {
  const params = await searchParams;

  const playerTeam = params.team ? getTeamById(params.team) : undefined;

  const rivalTeam = playerTeam
    ? params.rival
      ? getTeamById(params.rival)
      : getDefaultRivalTeam(playerTeam.id)
    : undefined;

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