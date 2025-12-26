import { LithologicLayer } from '../../types/well.types';
import {
  SOIL_TYPES,
  GRAIN_SIZE_LABELS,
  MOISTURE_LABELS,
  CONSISTENCY_LABELS,
} from '../../constants/soilTypes';

interface SoilDescriptionPanelProps {
  layers: LithologicLayer[];
}

export function SoilDescriptionPanel({ layers }: SoilDescriptionPanelProps) {
  const formatDescription = (layer: LithologicLayer): string => {
    const parts: string[] = [];

    // Tipo de solo
    parts.push(SOIL_TYPES[layer.primarySoilType].name);

    // Granulometria
    if (layer.description.grainSize) {
      parts.push(`grãos ${GRAIN_SIZE_LABELS[layer.description.grainSize]}`);
    }

    // Consistência/Compacidade
    if (layer.description.consistency) {
      parts.push(CONSISTENCY_LABELS[layer.description.consistency]);
    }

    // Cor
    parts.push(layer.description.color);

    // Inclusões
    if (layer.description.inclusions?.length) {
      parts.push(`com presença de ${layer.description.inclusions.join(', ')}`);
    }

    // Umidade
    parts.push(MOISTURE_LABELS[layer.description.moisture]);

    // Odor
    if (layer.description.odor && layer.description.odor !== 'none') {
      const odorText =
        layer.description.odor === 'slight' ? 'odor leve' : 'odor forte';
      if (layer.description.odorDescription) {
        parts.push(`${odorText} (${layer.description.odorDescription})`);
      } else {
        parts.push(odorText);
      }
    }

    // Observações
    if (layer.description.observations) {
      parts.push(layer.description.observations);
    }

    return parts.join(', ') + '.';
  };

  return (
    <div className="soil-description-panel border border-black bg-white">
      <h3 className="bg-gray-200 font-bold text-center py-1 border-b border-black text-sm">
        DESCRIÇÃO DO SOLO
      </h3>

      <div className="p-2 text-xs space-y-2 max-h-96 overflow-y-auto">
        {layers.length === 0 ? (
          <p className="text-gray-500 italic">Nenhuma camada adicionada</p>
        ) : (
          layers
            .sort((a, b) => a.topDepth - b.topDepth)
            .map((layer) => (
              <p key={layer.id}>
                <strong>
                  {layer.topDepth.toFixed(2)} - {layer.bottomDepth.toFixed(2)}m:
                </strong>{' '}
                {formatDescription(layer)}
              </p>
            ))
        )}
      </div>
    </div>
  );
}
