import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  Well,
  ProjectInfo,
  WellInfo,
  LithologicLayer,
  ConstructiveElement,
  VOCReading,
} from '../types/well.types';

interface WellStore {
  // Estado
  well: Well | null;
  selectedLayerId: string | null;
  selectedElementId: string | null;
  isDirty: boolean;

  // Ações - Well
  createNewWell: (projectInfo?: Partial<ProjectInfo>) => void;
  updateWellInfo: (data: Partial<WellInfo>) => void;
  updateProjectInfo: (data: Partial<ProjectInfo>) => void;

  // Ações - Litologia
  addLithologicLayer: (layer: Omit<LithologicLayer, 'id'>) => void;
  updateLithologicLayer: (id: string, data: Partial<LithologicLayer>) => void;
  deleteLithologicLayer: (id: string) => void;
  reorderLithologicLayers: () => void;

  // Ações - Perfil Construtivo
  addConstructiveElement: (element: Omit<ConstructiveElement, 'id'>) => void;
  updateConstructiveElement: (id: string, data: Partial<ConstructiveElement>) => void;
  deleteConstructiveElement: (id: string) => void;

  // Ações - VOC
  addVOCReading: (reading: VOCReading) => void;
  updateVOCReading: (index: number, reading: VOCReading) => void;
  deleteVOCReading: (index: number) => void;

  // Ações - Nível d'água
  updateWaterLevel: (depth: number, date: string) => void;

  // Ações - UI
  selectLayer: (id: string | null) => void;
  selectElement: (id: string | null) => void;

  // Ações - Persistência
  loadFromJSON: (json: string) => boolean;
  exportToJSON: () => string;
  markClean: () => void;
  reset: () => void;
}

const createDefaultWell = (projectInfo?: Partial<ProjectInfo>): Well => ({
  id: crypto.randomUUID(),
  projectInfo: {
    title: 'Perfil Litológico e Construtivo do Poço',
    wellId: projectInfo?.wellId || 'PM-01',
    client: projectInfo?.client || '',
    projectName: projectInfo?.projectName || '',
    location: projectInfo?.location || '',
    figure: projectInfo?.figure || '',
    date: new Date().toLocaleDateString('pt-BR'),
    responsible: projectInfo?.responsible || '',
    crea: projectInfo?.crea || '',
  },
  wellInfo: {
    drilling: {
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
    },
    wellConstruction: {
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
    },
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
  waterLevel: {
    depth: 0,
    measurementDate: '',
  },
});

export const useWellStore = create<WellStore>()(
  persist(
    (set, get) => ({
      well: null,
      selectedLayerId: null,
      selectedElementId: null,
      isDirty: false,

      createNewWell: (projectInfo) => {
        set({
          well: createDefaultWell(projectInfo),
          isDirty: true,
          selectedLayerId: null,
          selectedElementId: null,
        });
      },

      updateWellInfo: (data) => {
        const { well } = get();
        if (!well) return;

        set({
          well: {
            ...well,
            wellInfo: {
              ...well.wellInfo,
              ...data,
            },
          },
          isDirty: true,
        });
      },

      updateProjectInfo: (data) => {
        const { well } = get();
        if (!well) return;

        set({
          well: {
            ...well,
            projectInfo: {
              ...well.projectInfo,
              ...data,
            },
          },
          isDirty: true,
        });
      },

      addLithologicLayer: (layer) => {
        const { well } = get();
        if (!well) return;

        const newLayer: LithologicLayer = {
          ...layer,
          id: crypto.randomUUID(),
        };

        set({
          well: {
            ...well,
            lithologicProfile: [...well.lithologicProfile, newLayer],
          },
          isDirty: true,
        });
      },

      updateLithologicLayer: (id, data) => {
        const { well } = get();
        if (!well) return;

        set({
          well: {
            ...well,
            lithologicProfile: well.lithologicProfile.map((layer) =>
              layer.id === id ? { ...layer, ...data } : layer
            ),
          },
          isDirty: true,
        });
      },

      deleteLithologicLayer: (id) => {
        const { well } = get();
        if (!well) return;

        set({
          well: {
            ...well,
            lithologicProfile: well.lithologicProfile.filter((layer) => layer.id !== id),
          },
          isDirty: true,
          selectedLayerId: null,
        });
      },

      reorderLithologicLayers: () => {
        const { well } = get();
        if (!well) return;

        set({
          well: {
            ...well,
            lithologicProfile: [...well.lithologicProfile].sort(
              (a, b) => a.topDepth - b.topDepth
            ),
          },
          isDirty: true,
        });
      },

      addConstructiveElement: (element) => {
        const { well } = get();
        if (!well) return;

        const newElement: ConstructiveElement = {
          ...element,
          id: crypto.randomUUID(),
        };

        set({
          well: {
            ...well,
            constructiveProfile: {
              elements: [...well.constructiveProfile.elements, newElement],
            },
          },
          isDirty: true,
        });
      },

      updateConstructiveElement: (id, data) => {
        const { well } = get();
        if (!well) return;

        set({
          well: {
            ...well,
            constructiveProfile: {
              elements: well.constructiveProfile.elements.map((element) =>
                element.id === id ? { ...element, ...data } : element
              ),
            },
          },
          isDirty: true,
        });
      },

      deleteConstructiveElement: (id) => {
        const { well } = get();
        if (!well) return;

        set({
          well: {
            ...well,
            constructiveProfile: {
              elements: well.constructiveProfile.elements.filter(
                (element) => element.id !== id
              ),
            },
          },
          isDirty: true,
          selectedElementId: null,
        });
      },

      addVOCReading: (reading) => {
        const { well } = get();
        if (!well) return;

        set({
          well: {
            ...well,
            vocReadings: [...well.vocReadings, reading].sort((a, b) => a.depth - b.depth),
          },
          isDirty: true,
        });
      },

      updateVOCReading: (index, reading) => {
        const { well } = get();
        if (!well) return;

        const newReadings = [...well.vocReadings];
        newReadings[index] = reading;

        set({
          well: {
            ...well,
            vocReadings: newReadings.sort((a, b) => a.depth - b.depth),
          },
          isDirty: true,
        });
      },

      deleteVOCReading: (index) => {
        const { well } = get();
        if (!well) return;

        set({
          well: {
            ...well,
            vocReadings: well.vocReadings.filter((_, i) => i !== index),
          },
          isDirty: true,
        });
      },

      updateWaterLevel: (depth, date) => {
        const { well } = get();
        if (!well) return;

        set({
          well: {
            ...well,
            waterLevel: {
              ...well.waterLevel,
              depth,
              measurementDate: date,
            },
            wellInfo: {
              ...well.wellInfo,
              waterLevel: depth,
              waterLevelDate: date,
            },
          },
          isDirty: true,
        });
      },

      selectLayer: (id) => {
        set({ selectedLayerId: id });
      },

      selectElement: (id) => {
        set({ selectedElementId: id });
      },

      exportToJSON: () => {
        const { well } = get();
        return JSON.stringify(well, null, 2);
      },

      loadFromJSON: (json) => {
        try {
          const parsed = JSON.parse(json);
          set({ well: parsed, isDirty: false });
          return true;
        } catch {
          return false;
        }
      },

      markClean: () => {
        set({ isDirty: false });
      },

      reset: () => {
        set({
          well: null,
          selectedLayerId: null,
          selectedElementId: null,
          isDirty: false,
        });
      },
    }),
    {
      name: 'well-profile-storage',
    }
  )
);
