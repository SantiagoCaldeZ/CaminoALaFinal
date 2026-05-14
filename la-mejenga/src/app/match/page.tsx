import { redirect } from "next/navigation";
import { MatchScreen } from "@/components/match/MatchScreen";
import { GameShell } from "@/components/ui/GameShell";
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
    <GameShell maxWidth="6xl" contentClassName="py-2">
      <MatchScreen
        initialPlayerTeam={playerTeam}
        initialRivalTeam={rivalTeam}
      />
    </GameShell>
  );
}