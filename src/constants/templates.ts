import type { Well } from '../types/well.types';

export interface WellTemplate {
  name: string;
  description: string;
  data: Partial<Well>;
}

export const WELL_TEMPLATES: WellTemplate[] = [
  {
    name: 'Poço de Monitoramento Padrão',
    description: 'Template para poço de monitoramento típico (45-50m)',
    data: {
      wellInfo: {
        drilling: { startDate: '', endDate: '', startTime: '', endTime: '' },
        wellConstruction: { startDate: '', endDate: '', startTime: '', endTime: '' },
        drillingDepth: 50,
        wellDepth: 50,
        boreholeDiameter: 10,
        casingDiameter: 4,
        drillingMethod: 'hollow_stem_auger',
        waterLevel: 5,
        waterLevelDate: '',
      },
      constructiveProfile: {
        elements: [
          {
            id: crypto.randomUUID(),
            type: 'surface_completion',
            topDepth: 0,
            bottomDepth: 0.5,
            properties: {},
          },
          {
            id: crypto.randomUUID(),
            type: 'bentonite_seal',
            topDepth: 0.5,
            bottomDepth: 3.0,
            properties: {},
          },
          {
            id: crypto.randomUUID(),
            type: 'geomechanical_casing',
            topDepth: 0,
            bottomDepth: 45,
            properties: { material: 'pvc', diameter: 4 },
          },
          {
            id: crypto.randomUUID(),
            type: 'prefilter',
            topDepth: 43,
            bottomDepth: 50,
            properties: { grainSize: '1,0 - 2,0 mm' },
          },
          {
            id: crypto.randomUUID(),
            type: 'slotted_casing',
            topDepth: 45,
            bottomDepth: 50,
            properties: { material: 'pvc', diameter: 4, slotSize: 0.5 },
          },
        ],
      },
      lithologicProfile: [],
      vocReadings: [],
    },
  },
  {
    name: 'Poço Raso',
    description: 'Template para poço raso (< 15m)',
    data: {
      wellInfo: {
        drilling: { startDate: '', endDate: '', startTime: '', endTime: '' },
        wellConstruction: { startDate: '', endDate: '', startTime: '', endTime: '' },
        drillingDepth: 15,
        wellDepth: 15,
        boreholeDiameter: 8,
        casingDiameter: 2,
        drillingMethod: 'manual_auger',
        waterLevel: 3,
        waterLevelDate: '',
      },
      constructiveProfile: {
        elements: [
          {
            id: crypto.randomUUID(),
            type: 'surface_completion',
            topDepth: 0,
            bottomDepth: 0.3,
            properties: {},
          },
          {
            id: crypto.randomUUID(),
            type: 'bentonite_seal',
            topDepth: 0.3,
            bottomDepth: 1.5,
            properties: {},
          },
          {
            id: crypto.randomUUID(),
            type: 'geomechanical_casing',
            topDepth: 0,
            bottomDepth: 12,
            properties: { material: 'pvc', diameter: 2 },
          },
          {
            id: crypto.randomUUID(),
            type: 'prefilter',
            topDepth: 10,
            bottomDepth: 15,
            properties: { grainSize: '1,0 - 2,0 mm' },
          },
          {
            id: crypto.randomUUID(),
            type: 'slotted_casing',
            topDepth: 12,
            bottomDepth: 15,
            properties: { material: 'pvc', diameter: 2, slotSize: 0.5 },
          },
        ],
      },
      lithologicProfile: [],
      vocReadings: [],
    },
  },
  {
    name: 'Poço Vazio',
    description: 'Começar do zero',
    data: {
      wellInfo: {
        drilling: { startDate: '', endDate: '', startTime: '', endTime: '' },
        wellConstruction: { startDate: '', endDate: '', startTime: '', endTime: '' },
        drillingDepth: 0,
        wellDepth: 0,
        boreholeDiameter: 10,
        casingDiameter: 4,
        drillingMethod: 'hollow_stem_auger',
        waterLevel: 0,
        waterLevelDate: '',
      },
      constructiveProfile: {
        elements: [],
      },
      lithologicProfile: [],
      vocReadings: [],
    },
  },
];
