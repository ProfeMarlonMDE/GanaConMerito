export type PositionOption = {
  id: string; // The target_profile_code
  name: string; // The visible name
  opecCode: string | null; // null means 'OPEC pendiente'
};

export const CANONICAL_POSITIONS: PositionOption[] = [
  {
    id: "docente_aula_secundaria_media",
    name: "Docente de aula bachillerato",
    opecCode: null,
  },
  {
    id: "docente_aula_basica_primaria",
    name: "Docente de aula primaria",
    opecCode: null,
  },
  {
    id: "coordinador",
    name: "Coordinador",
    opecCode: null,
  },
  {
    id: "rector_director_rural",
    name: "Rector",
    opecCode: null,
  }
];

export function getPositionDisplay(position: PositionOption): string {
  return `${position.name} — OPEC ${position.opecCode ?? 'pendiente'}`;
}
