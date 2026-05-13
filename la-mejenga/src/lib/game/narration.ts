import type {
  MatchSituation,
  PlayOutcome,
  Player,
  TacticalCard,
  Team,
} from "./types";
import { pickRandom } from "./utils";

type GenerateNarrationParams = {
  outcome: PlayOutcome;
  situation: MatchSituation;
  playerCard: TacticalCard;
  rivalCard: TacticalCard;
  protagonist: Player;
  rivalProtagonist: Player;
  playerTeam: Team;
  rivalTeam: Team;
};

function playerLabel(player: Player): string {
  return `${player.name} “${player.nickname}”`;
}

export function generateNarration({
  outcome,
  situation,
  playerCard,
  rivalCard,
  protagonist,
  rivalProtagonist,
  playerTeam,
  rivalTeam,
}: GenerateNarrationParams): string {
  const player = playerLabel(protagonist);
  const rival = playerLabel(rivalProtagonist);

  const narrations: Record<PlayOutcome, string[]> = {
    goal: [
      `${player} encontró el espacio justo con ${playerCard.name}. La jugada salió limpia y ${playerTeam.name} la manda a guardar. ¡Golazo!`,
      `La decisión fue perfecta: ${playerCard.name}, defensa mal parada y definición fría. ¡Gol de ${playerTeam.name}!`,
      `${player} se hizo cargo en ${situation.title.toLowerCase()} y resolvió como crack. ¡La pelota terminó adentro!`,
    ],
    shot_saved: [
      `${player} logró sacar el remate, pero ${rival} respondió con lo justo. Atajadón de ${rivalTeam.name}.`,
      `La jugada prometía muchísimo, pero el rival resistió. ${rivalCard.name} alcanzó para evitar el gol.`,
      `${playerTeam.name} estuvo cerca, muy cerca. El portero rival sostuvo el partido con una gran intervención.`,
    ],
    shot_missed: [
      `${player} se animó con ${playerCard.name}, pero la pelota salió desviada. Buena intención, mala ejecución.`,
      `Había espacio para hacer daño, pero el remate terminó lejos. En la banca no lo pueden creer.`,
      `${playerTeam.name} tuvo la oportunidad, pero la definición se fue más cerca del parqueo que del arco.`,
    ],
    blocked: [
      `${rival} leyó bien la intención y bloqueó el intento. ${rivalTeam.name} respira.`,
      `${playerCard.name} parecía buena idea, pero ${rivalCard.name} cerró la puerta justo a tiempo.`,
      `La defensa rival se plantó firme. No fue bonito, pero fue efectivo.`,
    ],
    corner: [
      `${playerTeam.name} fuerza el córner después de una jugada insistente. Todavía hay peligro.`,
      `${rivalTeam.name} logró evitar el remate claro, pero concede tiro de esquina.`,
      `La pelota se desvía y se va al córner. El público siente que algo puede pasar.`,
    ],
    foul: [
      `${rival} llegó tarde y cortó la jugada. Hay falta y reclamos por todo lado.`,
      `${player} iba tomando ventaja, pero el rival lo bajó antes de que la cosa se pusiera peor.`,
      `La jugada terminó en falta. No fue elegante, pero el rival frenó el peligro.`,
    ],
    yellow_card: [
      `${rival} fue con demasiada fuerza. El árbitro no dudó: amarilla clara.`,
      `La entrada levantó a todos. Falta fuerte y tarjeta para ${rivalTeam.name}.`,
      `Eso en una mejenga normal se discute media hora. Aquí el árbitro sacó amarilla.`,
    ],
    penalty: [
      `${player} entró al área y el contacto fue claro. ¡Penal para ${playerTeam.name}!`,
      `La defensa se desesperó y terminó cometiendo penal. Momento enorme del partido.`,
      `${rivalTeam.name} queda contra las cuerdas: falta dentro del área y penal señalado.`,
    ],
    offside: [
      `${playerCard.name} parecía perfecto, pero ${rivalTeam.name} tiró bien la línea. Fuera de juego.`,
      `${player} arrancó antes de tiempo. La jugada prometía, pero queda anulada.`,
      `El pase rompía todo, pero el asistente levantó la bandera. Se salva ${rivalTeam.name}.`,
    ],
    turnover: [
      `${playerTeam.name} arriesgó y perdió la pelota. ${rivalTeam.name} recupera en una zona peligrosa.`,
      `${playerCard.name} no salió. Mala decisión o mala ejecución, pero el rival ya tiene la bola.`,
      `${player} intentó hacer una de más y terminó regalando la posesión.`,
    ],
    interception: [
      `${rival} anticipó la jugada como si hubiera leído el guion. Intercepción limpia.`,
      `${rivalCard.name} funcionó perfecto. ${rivalTeam.name} corta el avance.`,
      `El pase no llegó a destino. El rival estaba mejor ubicado y recuperó la pelota.`,
    ],
    possession_kept: [
      `${playerTeam.name} no generó peligro claro, pero mantiene la pelota y ordena el partido.`,
      `${player} decidió no rifarla. La jugada sigue viva, aunque sin daño inmediato.`,
      `No hubo golpe fuerte, pero ${playerTeam.name} conserva el control.`,
    ],
    chance_created: [
      `${playerTeam.name} construyó una ocasión clara. No fue gol, pero el rival quedó avisado.`,
      `${playerCard.name} abrió una grieta en la defensa. La jugada terminó con mucho peligro.`,
      `${player} encontró ventaja y dejó a ${playerTeam.name} cerca del gol.`,
    ],
    neutral: [
      `La jugada se trabó y ninguno logró sacar ventaja real. El partido sigue parejo.`,
      `${playerCard.name} contra ${rivalCard.name}: choque táctico sin ganador claro.`,
      `Mucho intento, poco espacio. La pelota sigue en disputa y el marcador no se mueve.`,
    ],
  };

  return pickRandom(narrations[outcome]);
}