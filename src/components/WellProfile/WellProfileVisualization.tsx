import { Well } from '../../types/well.types';
import { LithologyPatterns } from '../../utils/lithologyPatterns';
import { DepthScale } from './DepthScale';
import { LithologyColumn } from './LithologyColumn';
import { ConstructiveColumn } from './ConstructiveColumn';
import { VOCColumn } from './VOCColumn';

interface WellProfileVisualizationProps {
  well: Well;
  svgRef?: React.RefObject<SVGSVGElement>;
}

export function WellProfileVisualization({ well, svgRef }: WellProfileVisualizationProps) {
  // Dimensões e escalas
  const maxDepth = Math.max(well.wellInfo.drillingDepth, well.wellInfo.wellDepth, 50);
  const scale = 10; // pixels por metro
  const height = maxDepth * scale;

  // Larguras das colunas
  const vocColumnWidth = 80;
  const depthScaleWidth = 40;
  const lithologyColumnWidth = 120;
  const constructiveColumnWidth = 200;

  const totalWidth =
    vocColumnWidth + depthScaleWidth + lithologyColumnWidth + constructiveColumnWidth;

  // Posições X
  let currentX = 20; // margem esquerda
  const vocX = currentX;
  currentX += vocColumnWidth;

  const depthScaleX = currentX + 20;
  currentX += depthScaleWidth;

  const lithologyX = currentX;
  currentX += lithologyColumnWidth;

  const constructiveX = currentX;

  return (
    <svg
      ref={svgRef}
      width={totalWidth + 40}
      height={height + 60}
      viewBox={`0 0 ${totalWidth + 40} ${height + 60}`}
      xmlns="http://www.w3.org/2000/svg"
      className="well-profile-svg"
    >
      {/* Definições de patterns */}
      <LithologyPatterns />

      {/* Grupo principal com margem superior */}
      <g transform="translate(0, 40)">
        {/* Coluna VOC */}
        {well.vocReadings.length > 0 && (
          <g transform={`translate(${vocX}, 0)`}>
            <VOCColumn
              readings={well.vocReadings}
              maxDepth={maxDepth}
              scale={scale}
              width={vocColumnWidth}
            />
          </g>
        )}

        {/* Escala de profundidade */}
        <g transform={`translate(0, 0)`}>
          <DepthScale
            maxDepth={maxDepth}
            scale={scale}
            x={depthScaleX}
            height={height}
          />
        </g>

        {/* Coluna Litológica */}
        <g transform={`translate(${lithologyX}, 0)`}>
          <LithologyColumn
            layers={well.lithologicProfile}
            maxDepth={maxDepth}
            width={lithologyColumnWidth}
            height={height}
            scale={scale}
          />
        </g>

        {/* Coluna Construtiva */}
        <g transform={`translate(${constructiveX}, 0)`}>
          <ConstructiveColumn
            elements={well.constructiveProfile.elements}
            wellDepth={well.wellInfo.wellDepth}
            casingDiameter={well.wellInfo.casingDiameter}
            boreholeDiameter={well.wellInfo.boreholeDiameter}
            waterLevel={well.wellInfo.waterLevel}
            scale={scale}
            centerX={constructiveColumnWidth / 2}
          />
        </g>
      </g>

      {/* Título */}
      <text
        x={(totalWidth + 40) / 2}
        y={20}
        fontSize={14}
        fontWeight="bold"
        textAnchor="middle"
      >
        {well.projectInfo.title}
      </text>
      <text
        x={(totalWidth + 40) / 2}
        y={35}
        fontSize={10}
        textAnchor="middle"
      >
        {well.projectInfo.wellId}
      </text>
    </svg>
  );
}
