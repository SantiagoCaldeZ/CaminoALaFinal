"use client";

import { useState } from "react";
import { TeamSelect } from "@/components/team/TeamSelect";
import { MatchScreen } from "@/components/match/MatchScreen";
import type { MatchState } from "@/lib/game/types";
import type { Team } from "@/lib/game/teams";
import {
  createCaminoRun,
  getCaminoCurrentOpponent,
  getCaminoPlayerTeam,
  resolveCaminoMatch,
  type CaminoRun,
} from "@/lib/game/camino";
import { CaminoBracket } from "./CaminoBracket";

type CaminoPhase = "team_select" | "bracket" | "match";

export function CaminoScreen() {
  const [phase, setPhase] = useState<CaminoPhase>("team_select");
  const [camino, setCamino] = useState<CaminoRun | null>(null);

  function handleSelectTeam(team: Team) {
    const newCamino = createCaminoRun(team.id);

    setCamino(newCamino);
    setPhase("bracket");
  }

  function handleStartMatch() {
    if (!camino || camino.status !== "in_progress") {
      return;
    }

    setPhase("match");
  }

  function handleContinueAfterMatch(matchState: MatchState) {
    if (!camino) {
      setPhase("team_select");
      return;
    }

    const nextCamino = resolveCaminoMatch(camino, matchState);

    setCamino(nextCamino);
    setPhase("bracket");
  }

  function handleReset() {
    setCamino(null);
    setPhase("team_select");
  }

  if (phase === "team_select" || !camino) {
    return <TeamSelect onSelectTeam={handleSelectTeam} />;
  }

  const playerTeam = getCaminoPlayerTeam(camino);
  const rivalTeam = getCaminoCurrentOpponent(camino);

  if (phase === "match") {
    return (
      <main className="min-h-screen bg-zinc-950 px-4 py-8 text-zinc-50 md:px-8">
        <div className="mx-auto max-w-6xl">
          <MatchScreen
            initialPlayerTeam={playerTeam}
            initialRivalTeam={rivalTeam}
            continueAfterFinalLabel="Continuar camino"
            showFinalQuickActions={false}
            onContinueAfterFinal={handleContinueAfterMatch}
          />
        </div>
      </main>
    );
  }

  return (
    <CaminoBracket
      camino={camino}
      onStartMatch={handleStartMatch}
      onReset={handleReset}
    />
  );
}