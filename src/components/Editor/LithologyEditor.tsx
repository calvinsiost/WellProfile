import { useState } from 'react';
import { useWellStore } from '../../stores/wellStore';
import { SOIL_TYPES, GRAIN_SIZE_LABELS, MOISTURE_LABELS, CONSISTENCY_LABELS } from '../../constants/soilTypes';
import type { SoilType, LithologicLayer, GrainSize, MoistureState, Consistency } from '../../types/well.types';

export function LithologyEditor() {
  const { well, addLithologicLayer, deleteLithologicLayer } = useWellStore();
  const [isAdding, setIsAdding] = useState(false);
  const [newLayer, setNewLayer] = useState<Partial<LithologicLayer>>({
    topDepth: 0,
    bottomDepth: 0,
    primarySoilType: 'sand',
    description: {
      color: '',
      moisture: 'moist',
    },
  });

  if (!well) return null;

  const handleAdd = () => {
    if (newLayer.topDepth !== undefined && newLayer.bottomDepth !== undefined) {
      addLithologicLayer(newLayer as Omit<LithologicLayer, 'id'>);
      setIsAdding(false);
      setNewLayer({
        topDepth: newLayer.bottomDepth,
        bottomDepth: newLayer.bottomDepth,
        primarySoilType: 'sand',
        description: {
          color: '',
          moisture: 'moist',
        },
      });
    }
  };

  return (
    <div className="border border-gray-300 rounded p-3">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-sm">PERFIL LITOLÓGICO</h3>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600"
        >
          {isAdding ? 'Cancelar' : '+ Adicionar Camada'}
        </button>
      </div>

      {/* Formulário de adição */}
      {isAdding && (
        <div className="mb-4 p-3 bg-gray-50 border rounded">
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div>
              <label className="block text-xs font-medium mb-1">Prof. Topo (m)</label>
              <input
                type="number"
                step="0.01"
                value={newLayer.topDepth}
                onChange={(e) => setNewLayer({ ...newLayer, topDepth: parseFloat(e.target.value) })}
                className="w-full border rounded px-2 py-1 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Prof. Base (m)</label>
              <input
                type="number"
                step="0.01"
                value={newLayer.bottomDepth}
                onChange={(e) => setNewLayer({ ...newLayer, bottomDepth: parseFloat(e.target.value) })}
                className="w-full border rounded px-2 py-1 text-sm"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-medium mb-1">Tipo de Solo</label>
              <select
                value={newLayer.primarySoilType}
                onChange={(e) => setNewLayer({ ...newLayer, primarySoilType: e.target.value as SoilType })}
                className="w-full border rounded px-2 py-1 text-sm"
              >
                {Object.entries(SOIL_TYPES).map(([key, config]) => (
                  <option key={key} value={key}>
                    {config.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Cor</label>
              <input
                type="text"
                value={newLayer.description?.color || ''}
                onChange={(e) =>
                  setNewLayer({
                    ...newLayer,
                    description: { ...newLayer.description!, color: e.target.value },
                  })
                }
                className="w-full border rounded px-2 py-1 text-sm"
                placeholder="ex: bruno, cinza"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Umidade</label>
              <select
                value={newLayer.description?.moisture}
                onChange={(e) =>
                  setNewLayer({
                    ...newLayer,
                    description: { ...newLayer.description!, moisture: e.target.value as MoistureState },
                  })
                }
                className="w-full border rounded px-2 py-1 text-sm"
              >
                {Object.entries(MOISTURE_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Granulometria (opcional)</label>
              <select
                value={newLayer.description?.grainSize || ''}
                onChange={(e) =>
                  setNewLayer({
                    ...newLayer,
                    description: { ...newLayer.description!, grainSize: e.target.value as GrainSize },
                  })
                }
                className="w-full border rounded px-2 py-1 text-sm"
              >
                <option value="">-</option>
                {Object.entries(GRAIN_SIZE_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Consistência (opcional)</label>
              <select
                value={newLayer.description?.consistency || ''}
                onChange={(e) =>
                  setNewLayer({
                    ...newLayer,
                    description: { ...newLayer.description!, consistency: e.target.value as Consistency },
                  })
                }
                className="w-full border rounded px-2 py-1 text-sm"
              >
                <option value="">-</option>
                {Object.entries(CONSISTENCY_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            onClick={handleAdd}
            className="bg-green-500 text-white px-4 py-1 rounded text-xs hover:bg-green-600"
          >
            Adicionar
          </button>
        </div>
      )}

      {/* Lista de camadas */}
      <div className="space-y-2">
        {well.lithologicProfile.length === 0 ? (
          <p className="text-gray-500 text-sm italic">Nenhuma camada adicionada</p>
        ) : (
          well.lithologicProfile
            .sort((a, b) => a.topDepth - b.topDepth)
            .map((layer) => (
              <div
                key={layer.id}
                className="flex items-center justify-between p-2 bg-white border rounded hover:bg-gray-50"
              >
                <div className="flex-1 text-xs">
                  <span className="font-medium">
                    {layer.topDepth.toFixed(2)} - {layer.bottomDepth.toFixed(2)}m
                  </span>
                  {' | '}
                  <span>{SOIL_TYPES[layer.primarySoilType].name}</span>
                  {' | '}
                  <span>{layer.description.color}</span>
                  {' | '}
                  <span>{MOISTURE_LABELS[layer.description.moisture]}</span>
                </div>
                <button
                  onClick={() => deleteLithologicLayer(layer.id)}
                  className="text-red-500 hover:text-red-700 text-sm px-2"
                >
                  🗑
                </button>
              </div>
            ))
        )}
      </div>
    </div>
  );
}
