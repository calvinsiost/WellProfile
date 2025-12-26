interface DepthScaleProps {
  maxDepth: number;
  scale: number;
  majorInterval?: number;  // intervalo principal (ex: 10m)
  minorInterval?: number;  // intervalo secundário (ex: 5m)
  x: number;
  height: number;
}

export function DepthScale({
  maxDepth,
  scale,
  majorInterval = 10,
  minorInterval = 5,
  x,
  height,
}: DepthScaleProps) {
  const majorTicks: number[] = [];
  const minorTicks: number[] = [];

  for (let d = 0; d <= maxDepth; d += minorInterval) {
    if (d % majorInterval === 0) {
      majorTicks.push(d);
    } else {
      minorTicks.push(d);
    }
  }

  return (
    <g className="depth-scale">
      {/* Linha principal */}
      <line
        x1={x}
        y1={0}
        x2={x}
        y2={maxDepth * scale}
        stroke="#000"
        strokeWidth={1}
      />

      {/* Ticks maiores */}
      {majorTicks.map((depth) => (
        <g key={`major-${depth}`}>
          <line
            x1={x - 8}
            y1={depth * scale}
            x2={x}
            y2={depth * scale}
            stroke="#000"
            strokeWidth={1}
          />
          <text
            x={x - 10}
            y={depth * scale + 3}
            fontSize={8}
            textAnchor="end"
          >
            {depth.toFixed(0)}
          </text>
        </g>
      ))}

      {/* Ticks menores */}
      {minorTicks.map((depth) => (
        <line
          key={`minor-${depth}`}
          x1={x - 4}
          y1={depth * scale}
          x2={x}
          y2={depth * scale}
          stroke="#000"
          strokeWidth={0.5}
        />
      ))}

      {/* Label do eixo */}
      <text
        x={x - 25}
        y={height / 2}
        fontSize={9}
        textAnchor="middle"
        transform={`rotate(-90, ${x - 25}, ${height / 2})`}
      >
        Profundidade (m)
      </text>
    </g>
  );
}
