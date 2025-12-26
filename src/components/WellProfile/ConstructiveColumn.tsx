import { ConstructiveElement } from '../../types/well.types';

interface ConstructiveColumnProps {
  elements: ConstructiveElement[];
  wellDepth: number;
  casingDiameter: number;
  boreholeDiameter: number;
  waterLevel: number;
  scale: number;
  centerX: number;
}

export function ConstructiveColumn({
  elements,
  wellDepth,
  waterLevel,
  scale,
  centerX,
}: ConstructiveColumnProps) {
  const depthToY = (depth: number): number => depth * scale;

  // Larguras proporcionais
  const boreholeWidth = 60;  // px
  const casingWidth = 30;    // px

  const boreholeX = centerX - boreholeWidth / 2;
  const casingX = centerX - casingWidth / 2;

  // Agrupar elementos por tipo
  const surfaceCompletion = elements.find((e) => e.type === 'surface_completion');
  const bentonite = elements.filter(
    (e) => e.type === 'bentonite_seal' || e.type === 'bentonite_pellet'
  );
  const cement = elements.filter((e) => e.type === 'cement_seal');
  const casing = elements.find((e) => e.type === 'geomechanical_casing');
  const screen = elements.find((e) => e.type === 'slotted_casing');
  const prefilter = elements.find((e) => e.type === 'prefilter');

  return (
    <g className="constructive-column">
      {/* Furo da sondagem (background) */}
      <rect
        x={boreholeX}
        y={0}
        width={boreholeWidth}
        height={depthToY(wellDepth)}
        fill="#f5f5f5"
        stroke="#333"
        strokeWidth={1}
      />

      {/* Acabamento superficial */}
      {surfaceCompletion && (
        <g className="surface-completion">
          <rect
            x={boreholeX - 10}
            y={depthToY(surfaceCompletion.topDepth)}
            width={boreholeWidth + 20}
            height={depthToY(surfaceCompletion.bottomDepth - surfaceCompletion.topDepth)}
            fill="#666"
            stroke="#333"
            strokeWidth={2}
          />
          <text
            x={boreholeX - 15}
            y={depthToY(surfaceCompletion.topDepth) + 10}
            fontSize={8}
            textAnchor="end"
          >
            PB
          </text>
          <text
            x={boreholeX + boreholeWidth + 15}
            y={depthToY(surfaceCompletion.topDepth) + 10}
            fontSize={8}
          >
            ST
          </text>
        </g>
      )}

      {/* Selo de cimento */}
      {cement.map((seal) => (
        <rect
          key={seal.id}
          x={casingX - 5}
          y={depthToY(seal.topDepth)}
          width={casingWidth + 10}
          height={depthToY(seal.bottomDepth - seal.topDepth)}
          fill="url(#pattern-cement)"
          stroke="#333"
          strokeWidth={1}
        />
      ))}

      {/* Selo de bentonita */}
      {bentonite.map((seal) => (
        <rect
          key={seal.id}
          x={casingX - 5}
          y={depthToY(seal.topDepth)}
          width={casingWidth + 10}
          height={depthToY(seal.bottomDepth - seal.topDepth)}
          fill="url(#pattern-bentonite)"
          stroke="#333"
          strokeWidth={1}
        />
      ))}

      {/* Pré-filtro */}
      {prefilter && (
        <g className="prefilter">
          {/* Lado esquerdo */}
          <rect
            x={boreholeX}
            y={depthToY(prefilter.topDepth)}
            width={(boreholeWidth - casingWidth) / 2 - 2}
            height={depthToY(prefilter.bottomDepth - prefilter.topDepth)}
            fill="url(#pattern-prefilter)"
          />
          {/* Lado direito */}
          <rect
            x={casingX + casingWidth + 2}
            y={depthToY(prefilter.topDepth)}
            width={(boreholeWidth - casingWidth) / 2 - 2}
            height={depthToY(prefilter.bottomDepth - prefilter.topDepth)}
            fill="url(#pattern-prefilter)"
          />
        </g>
      )}

      {/* Tubo geomecânico (revestimento liso) */}
      {casing && (
        <rect
          x={casingX}
          y={depthToY(casing.topDepth)}
          width={casingWidth}
          height={depthToY(casing.bottomDepth - casing.topDepth)}
          fill="#fff"
          stroke="#000"
          strokeWidth={2}
        />
      )}

      {/* Seção filtrante (ranhurada) */}
      {screen && (
        <g className="screen-section">
          <rect
            x={casingX}
            y={depthToY(screen.topDepth)}
            width={casingWidth}
            height={depthToY(screen.bottomDepth - screen.topDepth)}
            fill="#fff"
            stroke="#000"
            strokeWidth={2}
          />
          {/* Ranhuras */}
          {Array.from({
            length: Math.floor((screen.bottomDepth - screen.topDepth) * 2),
          }).map((_, i) => (
            <line
              key={i}
              x1={casingX + 3}
              x2={casingX + casingWidth - 3}
              y1={depthToY(screen.topDepth) + i * (scale / 2) + 5}
              y2={depthToY(screen.topDepth) + i * (scale / 2) + 5}
              stroke="#000"
              strokeWidth={1}
            />
          ))}
        </g>
      )}

      {/* Indicador de nível d'água */}
      {waterLevel > 0 && (
        <g className="water-level">
          <line
            x1={boreholeX - 30}
            x2={boreholeX - 5}
            y1={depthToY(waterLevel)}
            y2={depthToY(waterLevel)}
            stroke="#0066cc"
            strokeWidth={2}
          />
          <polygon
            points={`
              ${boreholeX - 5},${depthToY(waterLevel)}
              ${boreholeX - 15},${depthToY(waterLevel) - 5}
              ${boreholeX - 15},${depthToY(waterLevel) + 5}
            `}
            fill="#0066cc"
          />
          <text
            x={boreholeX - 35}
            y={depthToY(waterLevel) + 4}
            fontSize={9}
            textAnchor="end"
            fill="#0066cc"
          >
            N.A.
          </text>
        </g>
      )}

      {/* Labels dos elementos */}
      <g className="element-labels" fontSize={7} textAnchor="start">
        {casing && (
          <text x={centerX + boreholeWidth / 2 + 5} y={depthToY(casing.topDepth + 2)}>
            ← TUBO GEOMECÂNICO
          </text>
        )}
        {screen && (
          <text x={centerX + boreholeWidth / 2 + 5} y={depthToY(screen.topDepth + 2)}>
            ← FILTRO
          </text>
        )}
        {prefilter && (
          <text x={centerX + boreholeWidth / 2 + 5} y={depthToY(prefilter.topDepth + 2)}>
            ← PRÉ-FILTRO
          </text>
        )}
      </g>
    </g>
  );
}
