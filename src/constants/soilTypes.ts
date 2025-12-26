import { SoilType, DrillingMethod, ConstructiveElementType, GrainSize, Consistency, MoistureState } from '../types/well.types';

export interface SoilTypeConfig {
  name: string;
  pattern: string;                   // ID do SVG pattern
  baseColor: string;
}

export const SOIL_TYPES: Record<SoilType, SoilTypeConfig> = {
  asphalt: {
    name: 'Asfalto',
    pattern: 'asphalt',
    baseColor: '#333333',
  },
  concrete: {
    name: 'Concreto',
    pattern: 'concrete',
    baseColor: '#999999',
  },
  fill: {
    name: 'Aterro',
    pattern: 'fill',
    baseColor: '#8B4513',
  },
  topsoil: {
    name: 'Solo Orgânico',
    pattern: 'topsoil',
    baseColor: '#654321',
  },
  clay: {
    name: 'Argila',
    pattern: 'clay',
    baseColor: '#CD853F',
  },
  sandy_clay: {
    name: 'Argila arenosa',
    pattern: 'sandy_clay',
    baseColor: '#DEB887',
  },
  silty_clay: {
    name: 'Argila siltosa',
    pattern: 'silty_clay',
    baseColor: '#D2B48C',
  },
  organic_clay: {
    name: 'Argila orgânica',
    pattern: 'organic_clay',
    baseColor: '#2F4F4F',
  },
  silt: {
    name: 'Silte',
    pattern: 'silt',
    baseColor: '#D2B48C',
  },
  sandy_silt: {
    name: 'Silte arenoso',
    pattern: 'sandy_silt',
    baseColor: '#E6D5AC',
  },
  clayey_silt: {
    name: 'Silte argiloso',
    pattern: 'clayey_silt',
    baseColor: '#C9B896',
  },
  sand: {
    name: 'Areia',
    pattern: 'sand',
    baseColor: '#F5DEB3',
  },
  clayey_sand: {
    name: 'Areia argilosa',
    pattern: 'clayey_sand',
    baseColor: '#E6D5AC',
  },
  silty_sand: {
    name: 'Areia siltosa',
    pattern: 'silty_sand',
    baseColor: '#F0E68C',
  },
  gravel: {
    name: 'Pedregulho',
    pattern: 'gravel',
    baseColor: '#A0A0A0',
  },
  peat: {
    name: 'Turfa',
    pattern: 'peat',
    baseColor: '#3E2723',
  },
  saprolite: {
    name: 'Saprólito',
    pattern: 'saprolite',
    baseColor: '#D2691E',
  },
  weathered_rock: {
    name: 'Rocha alterada',
    pattern: 'weathered_rock',
    baseColor: '#808080',
  },
  rock: {
    name: 'Rocha',
    pattern: 'rock',
    baseColor: '#696969',
  },
  other: {
    name: 'Outro',
    pattern: 'other',
    baseColor: '#CCCCCC',
  },
};

export const DRILLING_METHODS: Record<DrillingMethod, string> = {
  hollow_stem_auger: 'Trado Oco (Hollow Stem Auger)',
  direct_push: 'Direct Push',
  rotary: 'Rotativa',
  percussion: 'Percussão',
  manual_auger: 'Trado Manual',
  sonic: 'Sônica',
  other: 'Outro',
};

export const CONSTRUCTIVE_ELEMENT_NAMES: Record<ConstructiveElementType, string> = {
  surface_completion: 'Acabamento Superficial',
  cement_seal: 'Selo de Cimento',
  bentonite_seal: 'Selo de Bentonita',
  bentonite_pellet: 'Pellet de Bentonita',
  geomechanical_casing: 'Tubo Geomecânico',
  slotted_casing: 'Filtro (Ranhurado)',
  prefilter: 'Pré-filtro',
  cap: 'Tampa',
  centralizer: 'Centralizador',
  bottom_cap: 'Fundo',
};

export const GRAIN_SIZE_LABELS: Record<GrainSize, string> = {
  fine: 'finos',
  medium: 'médios',
  coarse: 'grossos',
  fine_to_medium: 'finos a médios',
  medium_to_coarse: 'médios a grossos',
};

export const CONSISTENCY_LABELS: Record<Consistency, string> = {
  // Solos coesivos
  very_soft: 'muito mole',
  soft: 'mole',
  medium: 'média',
  stiff: 'rija',
  very_stiff: 'muito rija',
  hard: 'dura',
  // Solos granulares
  very_loose: 'muito fofa',
  loose: 'fofa',
  medium_dense: 'medianamente compacta',
  dense: 'compacta',
  very_dense: 'muito compacta',
};

export const MOISTURE_LABELS: Record<MoistureState, string> = {
  dry: 'seco',
  slightly_moist: 'pouco úmido',
  moist: 'úmido',
  very_moist: 'muito úmido',
  saturated: 'saturado',
};

export const MATERIAL_NAMES: Record<string, string> = {
  pvc: 'PVC',
  pead: 'PEAD',
  steel: 'Aço',
  ptfe: 'PTFE',
};
