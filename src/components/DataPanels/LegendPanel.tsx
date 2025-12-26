import { SoilType } from '../../types/well.types';
import { SOIL_TYPES } from '../../constants/soilTypes';

interface LegendPanelProps {
  usedSoilTypes: SoilType[];
}

export function LegendPanel({ usedSoilTypes }: LegendPanelProps) {
  return (
    <div className="legend-panel border border-black bg-white">
      <h3 className="bg-gray-200 font-bold text-center py-1 border-b border-black text-sm">
        LEGENDA
      </h3>

      <div className="p-2">
        {/* Símbolos fixos */}
        <div className="flex items-center gap-2 mb-2 text-xs">
          <svg width="30" height="15">
            <line x1="0" y1="7.5" x2="20" y2="7.5" stroke="#0066cc" strokeWidth="2" />
            <polygon points="20,7.5 15,5 15,10" fill="#0066cc" />
          </svg>
          <span>Nível D'água</span>
        </div>

        {/* Tipos de solo utilizados */}
        <div className="space-y-1">
          {usedSoilTypes.map((soilType) => {
            const config = SOIL_TYPES[soilType];
            return (
              <div key={soilType} className="flex items-center gap-2 text-xs">
                <svg width="30" height="15">
                  <defs>
                    {/* Mini version of pattern - simplified */}
                    <pattern
                      id={`legend-${config.pattern}`}
                      patternUnits="userSpaceOnUse"
                      width="4"
                      height="4"
                    >
                      <rect width="4" height="4" fill={config.baseColor} />
                    </pattern>
                  </defs>
                  <rect
                    width="30"
                    height="15"
                    fill={config.baseColor}
                    stroke="#333"
                    strokeWidth="1"
                  />
                </svg>
                <span>{config.name}</span>
              </div>
            );
          })}
        </div>

        {/* Elementos construtivos */}
        <div className="mt-3 pt-2 border-t border-gray-300 space-y-1">
          <div className="flex items-center gap-2 text-xs">
            <svg width="30" height="15">
              <rect width="30" height="15" fill="#fff" stroke="#000" strokeWidth="2" />
            </svg>
            <span>Tubo Geomecânico</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <svg width="30" height="15">
              <rect width="30" height="15" fill="#fff" stroke="#000" strokeWidth="2" />
              <line x1="2" y1="5" x2="28" y2="5" stroke="#000" />
              <line x1="2" y1="10" x2="28" y2="10" stroke="#000" />
            </svg>
            <span>Filtro Ranhurado</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <svg width="30" height="15">
              <rect width="30" height="15" fill="#DAA520" stroke="#333" />
            </svg>
            <span>Pré-filtro</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <svg width="30" height="15">
              <rect width="30" height="15" fill="#999" stroke="#333" />
            </svg>
            <span>Bentonita</span>
          </div>
        </div>
      </div>
    </div>
  );
}
