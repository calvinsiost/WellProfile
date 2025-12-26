import { WellInfo, ConstructiveProfile } from '../../types/well.types';
import { DRILLING_METHODS } from '../../constants/soilTypes';

interface WellInfoPanelProps {
  wellInfo: WellInfo;
  constructiveProfile: ConstructiveProfile;
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <tr className="border-b border-gray-300">
      <td className="py-0.5 px-2 font-medium text-xs">{label}</td>
      <td className="py-0.5 px-2 text-xs">{value}</td>
    </tr>
  );
}

export function WellInfoPanel({ wellInfo, constructiveProfile }: WellInfoPanelProps) {
  // Extrair dados construtivos para exibição
  const acabamento = constructiveProfile.elements.find(
    (e) => e.type === 'surface_completion'
  );
  const bentonita = constructiveProfile.elements.find((e) => e.type === 'bentonite_seal');
  const pellet = constructiveProfile.elements.find((e) => e.type === 'bentonite_pellet');
  const prefiltro = constructiveProfile.elements.find((e) => e.type === 'prefilter');
  const filtro = constructiveProfile.elements.find((e) => e.type === 'slotted_casing');

  const formatDepthRange = (
    el: { topDepth: number; bottomDepth: number } | undefined
  ): string => {
    if (!el) return '-';
    return `${el.topDepth.toFixed(2)} - ${el.bottomDepth.toFixed(2)}m`;
  };

  return (
    <div className="well-info-panel border border-black bg-white">
      <h3 className="bg-gray-200 font-bold text-center py-1 border-b border-black text-sm">
        INFORMAÇÕES DO POÇO
      </h3>

      <table className="w-full">
        <tbody>
          {/* Datas e horários */}
          <InfoRow
            label="Data (Sondagem):"
            value={`Início: ${wellInfo.drilling.startDate} Término: ${wellInfo.drilling.endDate}`}
          />
          <InfoRow
            label="Hora (Sondagem):"
            value={`Início: ${wellInfo.drilling.startTime} Término: ${wellInfo.drilling.endTime}`}
          />
          <InfoRow
            label="Data (Poço):"
            value={`Início: ${wellInfo.wellConstruction.startDate} Término: ${wellInfo.wellConstruction.endDate}`}
          />
          <InfoRow
            label="Hora (Poço):"
            value={`Início: ${wellInfo.wellConstruction.startTime} Término: ${wellInfo.wellConstruction.endTime}`}
          />

          {/* Dados construtivos */}
          <InfoRow label="Acabamento:" value={formatDepthRange(acabamento)} />
          <InfoRow label="Bentonita:" value={formatDepthRange(bentonita)} />
          <InfoRow label="Pellet:" value={formatDepthRange(pellet)} />
          <InfoRow label="Pré-filtro:" value={formatDepthRange(prefiltro)} />
          <InfoRow
            label="Granulometria do Pré-filtro:"
            value={prefiltro?.properties.grainSize || '-'}
          />
          <InfoRow label="Filtro:" value={formatDepthRange(filtro)} />
          <InfoRow
            label="Ranhura do Filtro:"
            value={filtro?.properties.slotSize ? `${filtro.properties.slotSize}mm` : '-'}
          />

          {/* Dados gerais */}
          <InfoRow label="Nível D'água:" value={`${wellInfo.waterLevel.toFixed(2)}m`} />
          <InfoRow label="Profundidade Sondagem:" value={`${wellInfo.drillingDepth}m`} />
          <InfoRow label="Profundidade Poço:" value={`${wellInfo.wellDepth}m`} />
          <InfoRow label="Diâmetro da Sondagem:" value={`${wellInfo.boreholeDiameter}"`} />
          <InfoRow label="Diâmetro do Poço:" value={`${wellInfo.casingDiameter}"`} />
          <InfoRow
            label="Método de Perfuração:"
            value={DRILLING_METHODS[wellInfo.drillingMethod]}
          />
        </tbody>
      </table>
    </div>
  );
}
