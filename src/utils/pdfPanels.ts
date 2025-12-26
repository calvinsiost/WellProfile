import {
  LithologicLayer,
  SoilType,
  WellInfo,
  ConstructiveProfile,
} from '../types/well.types';
import {
  SOIL_TYPES,
  GRAIN_SIZE_LABELS,
  MOISTURE_LABELS,
  CONSISTENCY_LABELS,
  DRILLING_METHODS,
} from '../constants/soilTypes';

/**
 * Gera o painel de legenda em SVG
 */
export function generateLegendSVG(usedSoilTypes: SoilType[]): string {
  const width = 280;
  const itemHeight = 20;
  const headerHeight = 25;

  // Símbolos fixos (1) + tipos de solo + elementos construtivos (4)
  const totalItems = 1 + usedSoilTypes.length + 4;
  const height = headerHeight + (totalItems * itemHeight) + 20;

  let svgContent = `
    <g class="legend-panel">
      <!-- Header -->
      <rect x="0" y="0" width="${width}" height="${headerHeight}" fill="#e5e7eb" stroke="#000" stroke-width="1"/>
      <text x="${width / 2}" y="16" font-size="12" font-weight="bold" text-anchor="middle">LEGENDA</text>
  `;

  let currentY = headerHeight + 15;

  // Nível d'água
  svgContent += `
    <line x1="10" y1="${currentY}" x2="40" y2="${currentY}" stroke="#0066cc" stroke-width="2"/>
    <polygon points="40,${currentY} 35,${currentY - 3} 35,${currentY + 3}" fill="#0066cc"/>
    <text x="50" y="${currentY + 4}" font-size="10">Nível D'água</text>
  `;
  currentY += itemHeight;

  // Tipos de solo
  usedSoilTypes.forEach((soilType) => {
    const config = SOIL_TYPES[soilType];
    svgContent += `
      <rect x="10" y="${currentY - 10}" width="30" height="15" fill="${config.baseColor}" stroke="#333" stroke-width="1"/>
      <text x="50" y="${currentY + 4}" font-size="10">${config.name}</text>
    `;
    currentY += itemHeight;
  });

  // Elementos construtivos
  const constructiveElements = [
    { name: 'Tubo Geomecânico', fill: '#fff', hasLines: false },
    { name: 'Filtro Ranhurado', fill: '#fff', hasLines: true },
    { name: 'Pré-filtro', fill: '#DAA520', hasLines: false },
    { name: 'Bentonita', fill: '#999', hasLines: false },
  ];

  constructiveElements.forEach((element) => {
    svgContent += `
      <rect x="10" y="${currentY - 10}" width="30" height="15" fill="${element.fill}" stroke="#000" stroke-width="2"/>
    `;
    if (element.hasLines) {
      svgContent += `
        <line x1="12" y1="${currentY - 5}" x2="38" y2="${currentY - 5}" stroke="#000"/>
        <line x1="12" y1="${currentY + 5}" x2="38" y2="${currentY + 5}" stroke="#000"/>
      `;
    }
    svgContent += `
      <text x="50" y="${currentY + 4}" font-size="10">${element.name}</text>
    `;
    currentY += itemHeight;
  });

  svgContent += `
      <!-- Border -->
      <rect x="0" y="0" width="${width}" height="${height}" fill="none" stroke="#000" stroke-width="1"/>
    </g>
  `;

  return svgContent;
}

/**
 * Gera o painel de informações do poço em SVG
 */
export function generateWellInfoSVG(
  wellInfo: WellInfo,
  constructiveProfile: ConstructiveProfile
): string {
  const width = 280;
  const rowHeight = 18;
  const headerHeight = 25;

  // Extrair dados construtivos
  const acabamento = constructiveProfile.elements.find((e) => e.type === 'surface_completion');
  const bentonita = constructiveProfile.elements.find((e) => e.type === 'bentonite_seal');
  const pellet = constructiveProfile.elements.find((e) => e.type === 'bentonite_pellet');
  const prefiltro = constructiveProfile.elements.find((e) => e.type === 'prefilter');
  const filtro = constructiveProfile.elements.find((e) => e.type === 'slotted_casing');

  const formatDepthRange = (el: { topDepth: number; bottomDepth: number } | undefined): string => {
    if (!el) return '-';
    return `${el.topDepth.toFixed(2)} - ${el.bottomDepth.toFixed(2)}m`;
  };

  const rows = [
    {
      label: 'Data (Sondagem):',
      value: `Início: ${wellInfo.drilling.startDate} Término: ${wellInfo.drilling.endDate}`,
    },
    {
      label: 'Hora (Sondagem):',
      value: `Início: ${wellInfo.drilling.startTime} Término: ${wellInfo.drilling.endTime}`,
    },
    {
      label: 'Data (Poço):',
      value: `Início: ${wellInfo.wellConstruction.startDate} Término: ${wellInfo.wellConstruction.endDate}`,
    },
    {
      label: 'Hora (Poço):',
      value: `Início: ${wellInfo.wellConstruction.startTime} Término: ${wellInfo.wellConstruction.endTime}`,
    },
    { label: 'Acabamento:', value: formatDepthRange(acabamento) },
    { label: 'Bentonita:', value: formatDepthRange(bentonita) },
    { label: 'Pellet:', value: formatDepthRange(pellet) },
    { label: 'Pré-filtro:', value: formatDepthRange(prefiltro) },
    { label: 'Granulometria:', value: prefiltro?.properties.grainSize || '-' },
    { label: 'Filtro:', value: formatDepthRange(filtro) },
    {
      label: 'Ranhura Filtro:',
      value: filtro?.properties.slotSize ? `${filtro.properties.slotSize}mm` : '-',
    },
    { label: 'Nível D\'água:', value: `${wellInfo.waterLevel.toFixed(2)}m` },
    { label: 'Prof. Sondagem:', value: `${wellInfo.drillingDepth}m` },
    { label: 'Prof. Poço:', value: `${wellInfo.wellDepth}m` },
    { label: 'Diâm. Sondagem:', value: `${wellInfo.boreholeDiameter}"` },
    { label: 'Diâm. Poço:', value: `${wellInfo.casingDiameter}"` },
    { label: 'Método Perfuração:', value: DRILLING_METHODS[wellInfo.drillingMethod] },
  ];

  const height = headerHeight + rows.length * rowHeight + 10;

  let svgContent = `
    <g class="well-info-panel">
      <!-- Header -->
      <rect x="0" y="0" width="${width}" height="${headerHeight}" fill="#e5e7eb" stroke="#000" stroke-width="1"/>
      <text x="${width / 2}" y="16" font-size="12" font-weight="bold" text-anchor="middle">INFORMAÇÕES DO POÇO</text>

      <!-- Background -->
      <rect x="0" y="${headerHeight}" width="${width}" height="${height - headerHeight}" fill="#fff" stroke="#000" stroke-width="1"/>
  `;

  let currentY = headerHeight;

  rows.forEach((row, index) => {
    const y = currentY + (index + 1) * rowHeight;

    // Linha divisória
    if (index > 0) {
      svgContent += `<line x1="0" y1="${currentY + index * rowHeight}" x2="${width}" y2="${currentY + index * rowHeight}" stroke="#d1d5db" stroke-width="0.5"/>`;
    }

    // Label (negrito)
    svgContent += `<text x="5" y="${y - 4}" font-size="9" font-weight="600">${escapeXml(row.label)}</text>`;

    // Value (wrap text if needed)
    const valueLines = wrapText(row.value, 35);
    valueLines.forEach((line, lineIndex) => {
      svgContent += `<text x="140" y="${y - 4 + lineIndex * 10}" font-size="9">${escapeXml(line)}</text>`;
    });
  });

  svgContent += `
      <!-- Border -->
      <rect x="0" y="0" width="${width}" height="${height}" fill="none" stroke="#000" stroke-width="1"/>
    </g>
  `;

  return svgContent;
}

/**
 * Gera o painel de descrição do solo em SVG
 */
export function generateSoilDescriptionSVG(layers: LithologicLayer[]): string {
  const width = 280;
  const headerHeight = 25;
  const lineHeight = 12;
  const padding = 10;

  const formatDescription = (layer: LithologicLayer): string => {
    const parts: string[] = [];

    parts.push(SOIL_TYPES[layer.primarySoilType].name);

    if (layer.description.grainSize) {
      parts.push(`grãos ${GRAIN_SIZE_LABELS[layer.description.grainSize]}`);
    }

    if (layer.description.consistency) {
      parts.push(CONSISTENCY_LABELS[layer.description.consistency]);
    }

    parts.push(layer.description.color);

    if (layer.description.inclusions?.length) {
      parts.push(`com presença de ${layer.description.inclusions.join(', ')}`);
    }

    parts.push(MOISTURE_LABELS[layer.description.moisture]);

    if (layer.description.odor && layer.description.odor !== 'none') {
      const odorText = layer.description.odor === 'slight' ? 'odor leve' : 'odor forte';
      if (layer.description.odorDescription) {
        parts.push(`${odorText} (${layer.description.odorDescription})`);
      } else {
        parts.push(odorText);
      }
    }

    if (layer.description.observations) {
      parts.push(layer.description.observations);
    }

    return parts.join(', ') + '.';
  };

  // Calcular altura necessária
  let totalLines = 0;
  const sortedLayers = [...layers].sort((a, b) => a.topDepth - b.topDepth);

  const layerDescriptions = sortedLayers.map((layer) => {
    const header = `${layer.topDepth.toFixed(2)} - ${layer.bottomDepth.toFixed(2)}m: `;
    const description = formatDescription(layer);
    const text = header + description;
    const lines = wrapText(text, 50);
    totalLines += lines.length + 0.5; // espaço entre camadas
    return { header, description, lines };
  });

  const contentHeight = Math.max(totalLines * lineHeight + padding * 2, 100);
  const height = headerHeight + contentHeight;

  let svgContent = `
    <g class="soil-description-panel">
      <!-- Header -->
      <rect x="0" y="0" width="${width}" height="${headerHeight}" fill="#e5e7eb" stroke="#000" stroke-width="1"/>
      <text x="${width / 2}" y="16" font-size="12" font-weight="bold" text-anchor="middle">DESCRIÇÃO DO SOLO</text>

      <!-- Background -->
      <rect x="0" y="${headerHeight}" width="${width}" height="${contentHeight}" fill="#fff" stroke="#000" stroke-width="1"/>
  `;

  if (layers.length === 0) {
    svgContent += `
      <text x="${width / 2}" y="${headerHeight + 30}" font-size="10" font-style="italic" fill="#999" text-anchor="middle">Nenhuma camada adicionada</text>
    `;
  } else {
    let currentY = headerHeight + padding + lineHeight;

    layerDescriptions.forEach(({ lines }) => {
      lines.forEach((line, lineIndex) => {
        const isBold = lineIndex === 0;
        svgContent += `
          <text x="5" y="${currentY}" font-size="9" ${isBold ? 'font-weight="600"' : ''}>${escapeXml(line)}</text>
        `;
        currentY += lineHeight;
      });
      currentY += lineHeight * 0.5; // espaço entre camadas
    });
  }

  svgContent += `
      <!-- Border -->
      <rect x="0" y="0" width="${width}" height="${height}" fill="none" stroke="#000" stroke-width="1"/>
    </g>
  `;

  return svgContent;
}

/**
 * Função auxiliar para escapar caracteres especiais em XML
 */
function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Função auxiliar para quebrar texto em linhas
 */
function wrapText(text: string, maxChars: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  words.forEach((word) => {
    if ((currentLine + word).length > maxChars && currentLine.length > 0) {
      lines.push(currentLine.trim());
      currentLine = word + ' ';
    } else {
      currentLine += word + ' ';
    }
  });

  if (currentLine.trim().length > 0) {
    lines.push(currentLine.trim());
  }

  return lines;
}
