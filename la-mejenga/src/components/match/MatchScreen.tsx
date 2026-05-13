"use client";

import { useMemo, useState } from "react";
import { getDefaultRivalTeam } from "@/lib/game/teams";
import {
  getAvailableCardsForSituation,
  getCurrentSituation,
  playMoment,
  startMatch,
} from "@/lib/game/match-engine";
import type { MatchEvent, MatchState, TacticalCard, Team } from "@/lib/game/types";
import { Panel } from "@/components/ui/Panel";
import { TeamSelect } from "@/components/team/TeamSelect";
import { Scoreboard } from "./Scoreboard";
import { EnergyBar } from "./EnergyBar";
import { MomentumBar } from "./MomentumBar";
import { SituationPanel } from "./SituationPanel";
import { CardHand } from "./CardHand";
import { PlayResolutionPanel } from "./PlayResolutionPanel";
import { MatchHistory } from "./MatchHistory";
import { FinalSummary } from "./FinalSummary";

type MatchUiPhase = "team_select" | "choosing_card" | "resolution" | "finished";

export function MatchScreen() {
  const [phase, setPhase] = useState<MatchUiPhase>("team_select");
  const [matchState, setMatchState] = useState<MatchState | null>(null);
  const [lastEvent, setLastEvent] = useState<MatchEvent | null>(null);

  const currentSituation = useMemo(() => {
    if (!matchState || matchState.status === "finished") {
      return null;
    }

    return getCurrentSituation(matchState);
  }, [matchState]);

  const availableCards = useMemo(() => {
    if (!currentSituation) {
      return [];
    }

    return getAvailableCardsForSituation(currentSituation);
  }, [currentSituation]);

  function handleSelectTeam(team: Team) {
    const rivalTeam = getDefaultRivalTeam(team.id);
    const newMatch = startMatch(team, rivalTeam);

    setMatchState(newMatch);
    setLastEvent(null);
    setPhase("choosing_card");
  }

  function handleSelectCard(card: TacticalCard) {
    if (!matchState || matchState.status === "finished") {
      return;
    }

    const nextState = playMoment({ matchState, playerCard: card });
    const event = nextState.history.at(-1) ?? null;

    setMatchState(nextState);
    setLastEvent(event);
    setPhase(nextState.status === "finished" ? "finished" : "resolution");
  }

  function handleContinue() {
    if (!matchState) {
      return;
    }

    if (matchState.status === "finished") {
      setPhase("finished");
      return;
    }

    setPhase("choosing_card");
  }

  function handleRestart() {
    if (!matchState) {
      setPhase("team_select");
      return;
    }

    const newMatch = startMatch(matchState.playerTeam, matchState.rivalTeam);
    setMatchState(newMatch);
    setLastEvent(null);
    setPhase("choosing_card");
  }

  function handleChangeTeam() {
    setMatchState(null);
    setLastEvent(null);
    setPhase("team_select");
  }

  if (phase === "team_select" || !matchState) {
    return <TeamSelect onSelectTeam={handleSelectTeam} />;
  }

  if (phase === "finished" || matchState.status === "finished") {
    return (
      <FinalSummary
        matchState={matchState}
        onRestart={handleRestart}
        onChangeTeam={handleChangeTeam}
      />
    );
  }

  return (
    <div className="space-y-5">
      <Scoreboard matchState={matchState} currentMinute={currentSituation?.minute} />

      <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
        <div className="space-y-5">
          {currentSituation && phase === "choosing_card" && (
            <>
              <SituationPanel
                situation={currentSituation}
                momentNumber={matchState.currentMomentIndex + 1}
                totalMoments={matchState.totalMoments}
              />

              <CardHand
                cards={availableCards}
                currentEnergy={matchState.playerEnergy}
                onSelectCard={handleSelectCard}
              />
            </>
          )}

          {phase === "resolution" && lastEvent && (
            <PlayResolutionPanel
              event={lastEvent}
              onContinue={handleContinue}
              isLastMoment={matchState.currentMomentIndex >= matchState.totalMoments}
            />
          )}
        </div>

        <aside className="space-y-5">
          <Panel>
            <h2 className="mb-4 text-lg font-black text-zinc-50">Estado del partido</h2>
            <div className="space-y-5">
              <EnergyBar label={`Energía · ${matchState.playerTeam.name}`} value={matchState.playerEnergy} variant="emerald" />
              <MomentumBar label={`Momentum · ${matchState.playerTeam.name}`} value={matchState.playerMomentum} variant="sky" />
              <EnergyBar label={`Energía · ${matchState.rivalTeam.name}`} value={matchState.rivalEnergy} variant="red" />
              <MomentumBar label={`Momentum · ${matchState.rivalTeam.name}`} value={matchState.rivalMomentum} variant="amber" />
            </div>
          </Panel>

          <MatchHistory history={matchState.history} />
        </aside>
      </div>
    </div>
  );
}