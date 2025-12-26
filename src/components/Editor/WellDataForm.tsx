import { useWellStore } from '../../stores/wellStore';
import { DRILLING_METHODS } from '../../constants/soilTypes';
import type { DrillingMethod } from '../../types/well.types';

export function WellDataForm() {
  const { well, updateWellInfo, updateProjectInfo } = useWellStore();

  if (!well) return null;

  return (
    <div className="space-y-4">
      {/* Dados do Projeto */}
      <div className="border border-gray-300 rounded p-3">
        <h3 className="font-bold mb-2 text-sm">DADOS DO PROJETO</h3>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-medium mb-1">ID do Poço</label>
            <input
              type="text"
              value={well.projectInfo.wellId}
              onChange={(e) => updateProjectInfo({ wellId: e.target.value })}
              className="w-full border rounded px-2 py-1 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Cliente</label>
            <input
              type="text"
              value={well.projectInfo.client}
              onChange={(e) => updateProjectInfo({ client: e.target.value })}
              className="w-full border rounded px-2 py-1 text-sm"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-xs font-medium mb-1">Projeto</label>
            <input
              type="text"
              value={well.projectInfo.projectName}
              onChange={(e) => updateProjectInfo({ projectName: e.target.value })}
              className="w-full border rounded px-2 py-1 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Figura</label>
            <input
              type="text"
              value={well.projectInfo.figure}
              onChange={(e) => updateProjectInfo({ figure: e.target.value })}
              className="w-full border rounded px-2 py-1 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Data</label>
            <input
              type="text"
              value={well.projectInfo.date}
              onChange={(e) => updateProjectInfo({ date: e.target.value })}
              className="w-full border rounded px-2 py-1 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Dados do Poço */}
      <div className="border border-gray-300 rounded p-3">
        <h3 className="font-bold mb-2 text-sm">DADOS DO POÇO</h3>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-medium mb-1">Prof. Sondagem (m)</label>
            <input
              type="number"
              step="0.1"
              value={well.wellInfo.drillingDepth}
              onChange={(e) =>
                updateWellInfo({ drillingDepth: parseFloat(e.target.value) || 0 })
              }
              className="w-full border rounded px-2 py-1 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Prof. Poço (m)</label>
            <input
              type="number"
              step="0.1"
              value={well.wellInfo.wellDepth}
              onChange={(e) =>
                updateWellInfo({ wellDepth: parseFloat(e.target.value) || 0 })
              }
              className="w-full border rounded px-2 py-1 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Ø Sondagem (")</label>
            <input
              type="number"
              step="0.5"
              value={well.wellInfo.boreholeDiameter}
              onChange={(e) =>
                updateWellInfo({ boreholeDiameter: parseFloat(e.target.value) || 0 })
              }
              className="w-full border rounded px-2 py-1 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Ø Poço (")</label>
            <input
              type="number"
              step="0.5"
              value={well.wellInfo.casingDiameter}
              onChange={(e) =>
                updateWellInfo({ casingDiameter: parseFloat(e.target.value) || 0 })
              }
              className="w-full border rounded px-2 py-1 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Nível D'água (m)</label>
            <input
              type="number"
              step="0.01"
              value={well.wellInfo.waterLevel}
              onChange={(e) =>
                updateWellInfo({ waterLevel: parseFloat(e.target.value) || 0 })
              }
              className="w-full border rounded px-2 py-1 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Método Perfuração</label>
            <select
              value={well.wellInfo.drillingMethod}
              onChange={(e) =>
                updateWellInfo({ drillingMethod: e.target.value as DrillingMethod })
              }
              className="w-full border rounded px-2 py-1 text-sm"
            >
              {Object.entries(DRILLING_METHODS).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Datas Sondagem */}
        <div className="mt-3 pt-3 border-t">
          <h4 className="text-xs font-bold mb-2">Sondagem</h4>
          <div className="grid grid-cols-4 gap-2">
            <div>
              <label className="block text-xs mb-1">Data Início</label>
              <input
                type="date"
                value={well.wellInfo.drilling.startDate}
                onChange={(e) =>
                  updateWellInfo({
                    drilling: { ...well.wellInfo.drilling, startDate: e.target.value },
                  })
                }
                className="w-full border rounded px-1 py-1 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs mb-1">Hora Início</label>
              <input
                type="time"
                value={well.wellInfo.drilling.startTime}
                onChange={(e) =>
                  updateWellInfo({
                    drilling: { ...well.wellInfo.drilling, startTime: e.target.value },
                  })
                }
                className="w-full border rounded px-1 py-1 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs mb-1">Data Término</label>
              <input
                type="date"
                value={well.wellInfo.drilling.endDate}
                onChange={(e) =>
                  updateWellInfo({
                    drilling: { ...well.wellInfo.drilling, endDate: e.target.value },
                  })
                }
                className="w-full border rounded px-1 py-1 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs mb-1">Hora Término</label>
              <input
                type="time"
                value={well.wellInfo.drilling.endTime}
                onChange={(e) =>
                  updateWellInfo({
                    drilling: { ...well.wellInfo.drilling, endTime: e.target.value },
                  })
                }
                className="w-full border rounded px-1 py-1 text-xs"
              />
            </div>
          </div>
        </div>

        {/* Datas Construção Poço */}
        <div className="mt-3 pt-3 border-t">
          <h4 className="text-xs font-bold mb-2">Construção do Poço</h4>
          <div className="grid grid-cols-4 gap-2">
            <div>
              <label className="block text-xs mb-1">Data Início</label>
              <input
                type="date"
                value={well.wellInfo.wellConstruction.startDate}
                onChange={(e) =>
                  updateWellInfo({
                    wellConstruction: {
                      ...well.wellInfo.wellConstruction,
                      startDate: e.target.value,
                    },
                  })
                }
                className="w-full border rounded px-1 py-1 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs mb-1">Hora Início</label>
              <input
                type="time"
                value={well.wellInfo.wellConstruction.startTime}
                onChange={(e) =>
                  updateWellInfo({
                    wellConstruction: {
                      ...well.wellInfo.wellConstruction,
                      startTime: e.target.value,
                    },
                  })
                }
                className="w-full border rounded px-1 py-1 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs mb-1">Data Término</label>
              <input
                type="date"
                value={well.wellInfo.wellConstruction.endDate}
                onChange={(e) =>
                  updateWellInfo({
                    wellConstruction: {
                      ...well.wellInfo.wellConstruction,
                      endDate: e.target.value,
                    },
                  })
                }
                className="w-full border rounded px-1 py-1 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs mb-1">Hora Término</label>
              <input
                type="time"
                value={well.wellInfo.wellConstruction.endTime}
                onChange={(e) =>
                  updateWellInfo({
                    wellConstruction: {
                      ...well.wellInfo.wellConstruction,
                      endTime: e.target.value,
                    },
                  })
                }
                className="w-full border rounded px-1 py-1 text-xs"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
