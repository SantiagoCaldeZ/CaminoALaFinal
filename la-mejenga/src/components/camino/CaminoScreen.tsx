"use client";

import { useEffect, useState } from "react";
import { CaminoTeamSelect } from "./CaminoTeamSelect";
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
import {
  clearCaminoRun,
  loadCaminoRun,
  saveCaminoRun,
} from "@/lib/game/camino-storage";
import {
  awardCaminoProgression,
  type CaminoProgressionReward,
} from "@/lib/game/progression";
import { CaminoProgressionRewardPanel } from "./CaminoProgressionRewardPanel";

type CaminoPhase = "team_select" | "bracket" | "match";

export function CaminoScreen() {
  const [phase, setPhase] = useState<CaminoPhase>("team_select");
  const [camino, setCamino] = useState<CaminoRun | null>(null);
  const [lastCaminoReward, setLastCaminoReward] =
    useState<CaminoProgressionReward | null>(null);

  useEffect(() => {
    const savedCamino = loadCaminoRun();

    if (!savedCamino) {
      return;
    }

    setCamino(savedCamino);
    setPhase("bracket");
  }, []);

  function handleSelectTeam(team: Team) {
    const newCamino = createCaminoRun(team.id);

    saveCaminoRun(newCamino);
    setCamino(newCamino);
    setPhase("bracket");
    setLastCaminoReward(null);
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
    const caminoReward = awardCaminoProgression(nextCamino);

    saveCaminoRun(nextCamino);
    setLastCaminoReward(caminoReward);
    setCamino(nextCamino);
    setPhase("bracket");
  }

  function handleReset() {
    clearCaminoRun();
    setCamino(null);
    setPhase("team_select");
    setLastCaminoReward(null);
  }

  if (phase === "team_select" || !camino) {
    return <CaminoTeamSelect onSelectTeam={handleSelectTeam} />;
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
    <>
      <CaminoProgressionRewardPanel reward={lastCaminoReward} />

      <CaminoBracket
        camino={camino}
        onStartMatch={handleStartMatch}
        onReset={handleReset}
      />
    </>
  );
}