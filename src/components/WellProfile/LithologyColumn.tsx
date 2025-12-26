import { LithologicLayer } from '../../types/well.types';

interface LithologyColumnProps {
  layers: LithologicLayer[];
  maxDepth: number;
  width: number;
  height: number;
  scale: number;  // pixels por metro
}

export function LithologyColumn({
  layers,
  maxDepth,
  width,
  scale,
}: LithologyColumnProps) {
  const getPatternId = (soilType: string): string => {
    return `pattern-${soilType}`;
  };

  const depthToY = (depth: number): number => {
    return depth * scale;
  };

  return (
    <g className="lithology-column">
      {/* Background branco para toda a coluna */}
      <rect
        x={0}
        y={0}
        width={width}
        height={maxDepth * scale}
        fill="#fff"
        stroke="#000"
        strokeWidth={0.5}
      />

      {layers.map((layer) => {
        const y = depthToY(layer.topDepth);
        const layerHeight = (layer.bottomDepth - layer.topDepth) * scale;

        return (
          <g key={layer.id}>
            {/* Retângulo com pattern */}
            <rect
              x={0}
              y={y}
              width={width}
              height={layerHeight}
              fill={`url(#${getPatternId(layer.primarySoilType)})`}
              stroke="none"
            />

            {/* Linha de separação entre camadas */}
            <line
              x1={0}
              y1={y}
              x2={width}
              y2={y}
              stroke="#000"
              strokeWidth={1}
            />
          </g>
        );
      })}

      {/* Borda externa da coluna */}
      <rect
        x={0}
        y={0}
        width={width}
        height={maxDepth * scale}
        fill="none"
        stroke="#000"
        strokeWidth={2}
      />
    </g>
  );
}
