import { useState } from 'react';
import { useWellStore } from '../../stores/wellStore';
import { CONSTRUCTIVE_ELEMENT_NAMES } from '../../constants/soilTypes';
import type { ConstructiveElement, ConstructiveElementType } from '../../types/well.types';

export function ConstructiveEditor() {
  const { well, addConstructiveElement, deleteConstructiveElement } = useWellStore();
  const [isAdding, setIsAdding] = useState(false);
  const [newElement, setNewElement] = useState<Partial<ConstructiveElement>>({
    type: 'geomechanical_casing',
    topDepth: 0,
    bottomDepth: 0,
    properties: {},
  });

  if (!well) return null;

  const handleAdd = () => {
    if (newElement.type && newElement.topDepth !== undefined && newElement.bottomDepth !== undefined) {
      addConstructiveElement(newElement as Omit<ConstructiveElement, 'id'>);
      setIsAdding(false);
      setNewElement({
        type: 'geomechanical_casing',
        topDepth: 0,
        bottomDepth: 0,
        properties: {},
      });
    }
  };

  return (
    <div className="border border-gray-300 rounded p-3">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-sm">PERFIL CONSTRUTIVO</h3>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600"
        >
          {isAdding ? 'Cancelar' : '+ Adicionar Elemento'}
        </button>
      </div>

      {/* Formulário de adição */}
      {isAdding && (
        <div className="mb-4 p-3 bg-gray-50 border rounded">
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div className="col-span-2">
              <label className="block text-xs font-medium mb-1">Tipo de Elemento</label>
              <select
                value={newElement.type}
                onChange={(e) => setNewElement({ ...newElement, type: e.target.value as ConstructiveElementType })}
                className="w-full border rounded px-2 py-1 text-sm"
              >
                {Object.entries(CONSTRUCTIVE_ELEMENT_NAMES).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Prof. Topo (m)</label>
              <input
                type="number"
                step="0.01"
                value={newElement.topDepth}
                onChange={(e) => setNewElement({ ...newElement, topDepth: parseFloat(e.target.value) })}
                className="w-full border rounded px-2 py-1 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Prof. Base (m)</label>
              <input
                type="number"
                step="0.01"
                value={newElement.bottomDepth}
                onChange={(e) => setNewElement({ ...newElement, bottomDepth: parseFloat(e.target.value) })}
                className="w-full border rounded px-2 py-1 text-sm"
              />
            </div>

            {/* Campos específicos para filtro */}
            {newElement.type === 'slotted_casing' && (
              <div>
                <label className="block text-xs font-medium mb-1">Ranhura (mm)</label>
                <input
                  type="number"
                  step="0.1"
                  value={newElement.properties?.slotSize || ''}
                  onChange={(e) =>
                    setNewElement({
                      ...newElement,
                      properties: { ...newElement.properties, slotSize: parseFloat(e.target.value) },
                    })
                  }
                  className="w-full border rounded px-2 py-1 text-sm"
                  placeholder="0.5"
                />
              </div>
            )}

            {/* Campos específicos para pré-filtro */}
            {newElement.type === 'prefilter' && (
              <div>
                <label className="block text-xs font-medium mb-1">Granulometria</label>
                <input
                  type="text"
                  value={newElement.properties?.grainSize || ''}
                  onChange={(e) =>
                    setNewElement({
                      ...newElement,
                      properties: { ...newElement.properties, grainSize: e.target.value },
                    })
                  }
                  className="w-full border rounded px-2 py-1 text-sm"
                  placeholder="1,0 - 2,0 mm"
                />
              </div>
            )}

            <div className="col-span-2">
              <label className="block text-xs font-medium mb-1">Notas (opcional)</label>
              <input
                type="text"
                value={newElement.properties?.notes || ''}
                onChange={(e) =>
                  setNewElement({
                    ...newElement,
                    properties: { ...newElement.properties, notes: e.target.value },
                  })
                }
                className="w-full border rounded px-2 py-1 text-sm"
                placeholder="Observações"
              />
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

      {/* Lista de elementos */}
      <div className="space-y-2">
        {well.constructiveProfile.elements.length === 0 ? (
          <p className="text-gray-500 text-sm italic">Nenhum elemento adicionado</p>
        ) : (
          well.constructiveProfile.elements
            .sort((a, b) => a.topDepth - b.topDepth)
            .map((element) => (
              <div
                key={element.id}
                className="flex items-center justify-between p-2 bg-white border rounded hover:bg-gray-50"
              >
                <div className="flex-1 text-xs">
                  <span className="font-medium">
                    {element.topDepth.toFixed(2)} - {element.bottomDepth.toFixed(2)}m
                  </span>
                  {' | '}
                  <span>{CONSTRUCTIVE_ELEMENT_NAMES[element.type]}</span>
                  {element.properties.grainSize && ` | ${element.properties.grainSize}`}
                  {element.properties.slotSize && ` | ${element.properties.slotSize}mm`}
                </div>
                <button
                  onClick={() => deleteConstructiveElement(element.id)}
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
