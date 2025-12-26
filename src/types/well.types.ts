// ============================================
// DADOS GERAIS DO POÇO
// ============================================

export interface Well {
  id: string;
  projectInfo: ProjectInfo;
  wellInfo: WellInfo;
  constructiveProfile: ConstructiveProfile;
  lithologicProfile: LithologicLayer[];
  vocReadings: VOCReading[];
  waterLevel: WaterLevel;
}

export interface ProjectInfo {
  title: string;                    // "Perfil Litológico e Construtivo do Poço"
  wellId: string;                   // Identificação do poço (ex: "PM-01")
  client: string;                   // Nome do cliente
  projectName: string;              // Nome do projeto/área
  location: string;                 // Localização
  figure: string;                   // Número da figura
  date: string;                     // Data do documento
  responsible: string;              // Responsável técnico
  crea: string;                     // Registro CREA
}

export interface WellInfo {
  // Datas e horários
  drilling: {
    startDate: string;              // Data início sondagem
    endDate: string;                // Data término sondagem
    startTime: string;              // Hora início
    endTime: string;                // Hora término
  };
  wellConstruction: {
    startDate: string;              // Data início construção poço
    endDate: string;                // Data término construção poço
    startTime: string;
    endTime: string;
  };

  // Profundidades
  drillingDepth: number;            // Profundidade da sondagem (m)
  wellDepth: number;                // Profundidade do poço (m)

  // Diâmetros
  boreholeDiameter: number;         // Diâmetro da sondagem (polegadas)
  casingDiameter: number;           // Diâmetro do revestimento (polegadas)

  // Método
  drillingMethod: DrillingMethod;

  // Nível d'água
  waterLevel: number;               // Profundidade do NA (m)
  waterLevelDate: string;           // Data da medição
}

export type DrillingMethod =
  | 'hollow_stem_auger'             // Trado Oco
  | 'direct_push'                   // Direct Push
  | 'rotary'                        // Rotativa
  | 'percussion'                    // Percussão
  | 'manual_auger'                  // Trado Manual
  | 'sonic'                         // Sônica
  | 'other';

// ============================================
// PERFIL CONSTRUTIVO
// ============================================

export interface ConstructiveProfile {
  elements: ConstructiveElement[];
}

export interface ConstructiveElement {
  id: string;
  type: ConstructiveElementType;
  topDepth: number;                 // Profundidade topo (m)
  bottomDepth: number;              // Profundidade base (m)
  properties: ElementProperties;
}

export type ConstructiveElementType =
  | 'surface_completion'            // Acabamento superficial (caixa de proteção)
  | 'cement_seal'                   // Selo de cimento
  | 'bentonite_seal'                // Selo de bentonita
  | 'bentonite_pellet'              // Pellet de bentonita
  | 'geomechanical_casing'          // Tubo geomecânico (liso)
  | 'slotted_casing'                // Tubo geomecânico ranhurado (filtro)
  | 'prefilter'                     // Pré-filtro (areia)
  | 'cap'                           // Tampa/Cap
  | 'centralizer'                   // Centralizador
  | 'bottom_cap';                   // Fundo (cap inferior)

export interface ElementProperties {
  // Para tubos
  material?: 'pvc' | 'pead' | 'steel' | 'ptfe';
  diameter?: number;                // polegadas
  slotSize?: number;                // abertura da ranhura (mm)

  // Para pré-filtro
  grainSize?: string;               // granulometria (ex: "1,0 - 2,0 mm")

  // Para selos
  thickness?: number;               // espessura em metros

  // Geral
  notes?: string;
}

// ============================================
// PERFIL LITOLÓGICO
// ============================================

export interface LithologicLayer {
  id: string;
  topDepth: number;                 // Profundidade topo (m)
  bottomDepth: number;              // Profundidade base (m)
  primarySoilType: SoilType;
  secondarySoilType?: SoilType;     // Para solos mistos (ex: argilo-arenoso)
  description: LithologicDescription;
}

export type SoilType =
  | 'asphalt'                       // Asfalto
  | 'concrete'                      // Concreto
  | 'fill'                          // Aterro
  | 'topsoil'                       // Solo orgânico superficial
  | 'clay'                          // Argila
  | 'silt'                          // Silte
  | 'sand'                          // Areia
  | 'gravel'                        // Pedregulho/Cascalho
  | 'sandy_clay'                    // Argila arenosa
  | 'clayey_sand'                   // Areia argilosa
  | 'silty_clay'                    // Argila siltosa
  | 'silty_sand'                    // Areia siltosa
  | 'sandy_silt'                    // Silte arenoso
  | 'clayey_silt'                   // Silte argiloso
  | 'organic_clay'                  // Argila orgânica
  | 'peat'                          // Turfa
  | 'saprolite'                     // Saprólito
  | 'weathered_rock'                // Rocha alterada
  | 'rock'                          // Rocha sã
  | 'other';

export interface LithologicDescription {
  // Granulometria (para solos granulares)
  grainSize?: GrainSize;

  // Cor
  color: string;                    // Ex: "bruno", "cinza escuro", "amarelado"

  // Plasticidade (para solos finos)
  plasticity?: 'low' | 'medium' | 'high';

  // Consistência/Compacidade
  consistency?: Consistency;

  // Umidade
  moisture: MoistureState;

  // Presença de materiais
  inclusions?: string[];            // Ex: ["mica", "quartzo", "raízes"]

  // Observações adicionais
  observations?: string;

  // Odor (importante para áreas contaminadas)
  odor?: 'none' | 'slight' | 'strong';
  odorDescription?: string;

  // Origem
  origin?: 'natural' | 'fill' | 'mixed';
}

export type GrainSize =
  | 'fine'                          // Fina
  | 'medium'                        // Média
  | 'coarse'                        // Grossa
  | 'fine_to_medium'
  | 'medium_to_coarse';

export type Consistency =
  // Para solos coesivos (argilas)
  | 'very_soft'                     // Muito mole
  | 'soft'                          // Mole
  | 'medium'                        // Média
  | 'stiff'                         // Rija
  | 'very_stiff'                    // Muito rija
  | 'hard'                          // Dura
  // Para solos granulares (areias)
  | 'very_loose'                    // Muito fofa
  | 'loose'                         // Fofa
  | 'medium_dense'                  // Medianamente compacta
  | 'dense'                         // Compacta
  | 'very_dense';                   // Muito compacta

export type MoistureState =
  | 'dry'                           // Seco
  | 'slightly_moist'                // Pouco úmido
  | 'moist'                         // Úmido
  | 'very_moist'                    // Muito úmido
  | 'saturated';                    // Saturado

// ============================================
// MEDIÇÕES DE VOC
// ============================================

export interface VOCReading {
  depth: number;                    // Profundidade da leitura (m)
  value: number;                    // Valor em PPM
  timestamp?: string;               // Momento da leitura
}

export interface WaterLevel {
  depth: number;                    // Profundidade (m)
  measurementDate: string;
  measurementTime?: string;
  isArtesian?: boolean;             // Poço surgente?
}

// ============================================
// VALIDATION
// ============================================

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationWarning {
  field: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}
