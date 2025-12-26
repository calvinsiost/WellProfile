import { VOCReading } from '../../types/well.types';

interface VOCColumnProps {
  readings: VOCReading[];
  maxDepth: number;
  scale: number;
  width: number;
  maxVOC?: number;  // valor máximo para escala
}

export function VOCColumn({
  readings,
  maxDepth,
  scale,
  width,
  maxVOC = 100,
}: VOCColumnProps) {
  const valueToX = (value: number): number => {
    return (value / maxVOC) * width;
  };

  const depthToY = (depth: number): number => depth * scale;

  // Criar path para a curva de VOC
  const pathData =
    readings.length > 0
      ? readings
          .sort((a, b) => a.depth - b.depth)
          .map((r, i) => {
            const x = valueToX(r.value);
            const y = depthToY(r.depth);
            return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
          })
          .join(' ')
      : '';

  return (
    <g className="voc-column">
      {/* Header */}
      <text x={width / 2} y={-15} fontSize={8} textAnchor="middle" fontWeight="bold">
        VOC
      </text>
      <text x={width / 2} y={-5} fontSize={7} textAnchor="middle">
        (PPM)
      </text>

      {/* Eixo Y (escala VOC) */}
      <line x1={0} y1={0} x2={0} y2={maxDepth * scale} stroke="#ccc" strokeWidth={0.5} />

      {/* Grid horizontal */}
      {[0, 25, 50, 75, 100].map((val) => (
        <g key={val}>
          <line
            x1={valueToX(val)}
            y1={0}
            x2={valueToX(val)}
            y2={maxDepth * scale}
            stroke="#eee"
            strokeWidth={0.5}
            strokeDasharray="2,2"
          />
          {val > 0 && (
            <text
              x={valueToX(val)}
              y={-10}
              fontSize={6}
              textAnchor="middle"
              fill="#666"
            >
              {val}
            </text>
          )}
        </g>
      ))}

      {/* Curva de VOC */}
      {readings.length > 1 && (
        <path d={pathData} fill="none" stroke="#e53935" strokeWidth={1.5} />
      )}

      {/* Pontos de leitura */}
      {readings.map((r, i) => (
        <g key={i}>
          <circle
            cx={valueToX(r.value)}
            cy={depthToY(r.depth)}
            r={3}
            fill="#e53935"
          />
          <text
            x={valueToX(r.value) + 8}
            y={depthToY(r.depth) + 3}
            fontSize={6}
            fill="#e53935"
          >
            {r.value}
          </text>
        </g>
      ))}
    </g>
  );
}
