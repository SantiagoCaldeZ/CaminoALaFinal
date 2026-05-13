import type { MatchSituation } from "./types";

export const MATCH_SITUATIONS: MatchSituation[] = [
  {
    id: "ataque-banda",
    minute: 8,
    title: "Ataque por banda",
    description:
      "Tu equipo encuentra espacio por un costado. Es una buena oportunidad para encarar, centrar o cambiar el ritmo.",
    type: "attack",
    preferredCardTypes: ["attack", "midfield"],
  },
  {
    id: "ataque-centro",
    minute: 17,
    title: "Ataque por el centro",
    description:
      "La pelota llega a una zona peligrosa frente al área. Hay opción de filtrar, combinar o rematar.",
    type: "attack",
    preferredCardTypes: ["attack", "midfield"],
  },
  {
    id: "contraataque",
    minute: 28,
    title: "Contraataque",
    description:
      "El rival quedó mal parado. Hay espacio para atacar rápido, pero una mala decisión puede desperdiciar la jugada.",
    type: "attack",
    preferredCardTypes: ["attack", "midfield"],
  },
  {
    id: "posesion-media",
    minute: 41,
    title: "Posesión en medio campo",
    description:
      "El partido se traba en la mitad. Podés controlar, cambiar de banda o intentar acelerar.",
    type: "midfield",
    preferredCardTypes: ["midfield", "attack"],
  },
  {
    id: "presion-rival",
    minute: 53,
    title: "El rival presiona",
    description:
      "El rival adelanta líneas y busca forzar un error. Hay que decidir si salir jugando o saltarse la presión.",
    type: "defense",
    preferredCardTypes: ["midfield", "defense"],
  },
  {
    id: "tiro-libre",
    minute: 66,
    title: "Tiro libre peligroso",
    description:
      "Tenés una pelota parada cerca del área. Puede ser centro, remate directo o jugada preparada.",
    type: "set_piece",
    preferredCardTypes: ["attack", "special"],
  },
  {
    id: "corner",
    minute: 78,
    title: "Córner",
    description:
      "La pelota va al área. Es momento de buscar fuerza, precisión o una segunda jugada.",
    type: "set_piece",
    preferredCardTypes: ["attack", "special"],
  },
  {
    id: "ultima-jugada",
    minute: 89,
    title: "Última jugada",
    description:
      "Queda una más. El partido puede definirse ahora mismo: asegurar, arriesgar o tirar todo al área.",
    type: "special",
    preferredCardTypes: ["attack", "special", "defense"],
  },
];

export const MATCH_MOMENTS = MATCH_SITUATIONS.map((situation) => situation.minute);

export function getSituationById(situationId: string): MatchSituation | undefined {
  return MATCH_SITUATIONS.find((situation) => situation.id === situationId);
}