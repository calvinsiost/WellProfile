import { jsPDF } from 'jspdf';
import { svg2pdf } from 'svg2pdf.js';
import { Well, SoilType } from '../types/well.types';
import {
  generateLegendSVG,
  generateWellInfoSVG,
  generateSoilDescriptionSVG,
} from './pdfPanels';

interface PDFExportOptions {
  orientation: 'portrait' | 'landscape';
  format: 'a4' | 'a3';
  margins: { top: number; bottom: number; left: number; right: number };
}

export async function exportWellProfileToPDF(
  well: Well,
  profileSvgElement: SVGSVGElement,
  options: PDFExportOptions = {
    orientation: 'landscape',
    format: 'a3',
    margins: { top: 10, bottom: 15, left: 10, right: 10 },
  }
): Promise<void> {
  try {
    // Criar SVG completo com perfil + painéis
    const completeSvg = createCompletePdfSvg(well, profileSvgElement);

    // Converter para elemento SVG
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(completeSvg, 'image/svg+xml');
    const svgElement = svgDoc.documentElement as unknown as SVGSVGElement;

    // Obter dimensões do SVG em pixels
    const svgWidth = parseFloat(svgElement.getAttribute('width') || '800');
    const svgHeight = parseFloat(svgElement.getAttribute('height') || '1000');

    // Converter de pixels para mm (96 DPI: 1px = 25.4/96 mm)
    const PX_TO_MM = 25.4 / 96;
    const svgWidthMM = svgWidth * PX_TO_MM;
    const svgHeightMM = svgHeight * PX_TO_MM;

    // Determinar orientação baseada no aspect ratio do conteúdo
    const isContentTall = svgHeightMM > svgWidthMM;
    const orientation = isContentTall ? 'portrait' : 'landscape';

    // Criar PDF
    const pdf = new jsPDF({
      orientation: orientation,
      unit: 'mm',
      format: options.format,
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Calcular área disponível
    const availableWidth = pageWidth - options.margins.left - options.margins.right;
    const availableHeight = pageHeight - options.margins.top - options.margins.bottom;

    // Calcular escala para ajustar o conteúdo à página mantendo proporções
    const scaleX = availableWidth / svgWidthMM;
    const scaleY = availableHeight / svgHeightMM;
    const scale = Math.min(scaleX, scaleY, 1); // Limitar a no máximo 1 (não aumentar além de 100%)

    // Calcular dimensões finais
    const finalWidth = svgWidthMM * scale;
    const finalHeight = svgHeightMM * scale;

    // Centralizar na página
    const xPos = options.margins.left + (availableWidth - finalWidth) / 2;
    const yPos = options.margins.top + (availableHeight - finalHeight) / 2;

    // Converter SVG para PDF
    await svg2pdf(svgElement, pdf, {
      x: xPos,
      y: yPos,
      width: finalWidth,
      height: finalHeight,
    });

    // Salvar
    const filename = `${well.projectInfo.wellId}_perfil_completo_${Date.now()}.pdf`;
    pdf.save(filename);
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    throw error;
  }
}

/**
 * Cria um SVG completo combinando o perfil litológico com os painéis de informação
 */
function createCompletePdfSvg(well: Well, profileSvgElement: SVGSVGElement): string {
  // Obter tipos de solo usados
  const usedSoilTypes: SoilType[] = Array.from(
    new Set(well.lithologicProfile.map((l) => l.primarySoilType))
  );

  // Gerar painéis em SVG (agora com dimensões)
  const legendPanel = generateLegendSVG(usedSoilTypes);
  const wellInfoPanel = generateWellInfoSVG(well.wellInfo, well.constructiveProfile);
  const soilDescPanel = generateSoilDescriptionSVG(well.lithologicProfile);

  // Obter o SVG do perfil como string (sem a tag svg externa)
  const serializer = new XMLSerializer();
  let profileSvgString = serializer.serializeToString(profileSvgElement);

  // Extrair apenas o conteúdo interno do SVG do perfil
  const profileContent = extractSvgContent(profileSvgString);

  // Dimensões do perfil
  const profileWidth = parseFloat(profileSvgElement.getAttribute('width') || '500');
  const profileHeight = parseFloat(profileSvgElement.getAttribute('height') || '800');

  // Dimensões dos painéis
  const panelsWidth = 300;
  const panelGap = 20;

  // Calcular altura total dos painéis
  const totalPanelsHeight = wellInfoPanel.height + legendPanel.height + soilDescPanel.height + (2 * panelGap);

  // Dimensões totais
  const totalWidth = profileWidth + panelsWidth + 40;
  const totalHeight = Math.max(profileHeight, totalPanelsHeight) + 60; // 60 = margem superior + título

  // Posições
  const profileX = 20;
  const panelsX = profileX + profileWidth + 20;

  // Posições Y dos painéis (distribuídos verticalmente)
  const wellInfoY = 40;
  const legendY = wellInfoY + wellInfoPanel.height + panelGap;
  const soilDescY = legendY + legendPanel.height + panelGap;

  // Montar SVG completo
  const completeSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${totalWidth}" height="${totalHeight}" viewBox="0 0 ${totalWidth} ${totalHeight}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      text { font-family: Arial, sans-serif; }
    </style>
  </defs>

  <!-- Perfil Litológico -->
  <g transform="translate(${profileX}, 0)">
    ${profileContent}
  </g>

  <!-- Painéis laterais -->
  <g transform="translate(${panelsX}, 0)">
    <!-- Informações do Poço -->
    <g transform="translate(0, ${wellInfoY})">
      ${wellInfoPanel.svg}
    </g>

    <!-- Legenda -->
    <g transform="translate(0, ${legendY})">
      ${legendPanel.svg}
    </g>

    <!-- Descrição do Solo -->
    <g transform="translate(0, ${soilDescY})">
      ${soilDescPanel.svg}
    </g>
  </g>
</svg>`;

  return completeSvg;
}

/**
 * Extrai o conteúdo interno de um SVG (sem a tag <svg> externa)
 */
function extractSvgContent(svgString: string): string {
  // Remove a tag <svg ...> de abertura e </svg> de fechamento
  const openTagMatch = svgString.match(/<svg[^>]*>/);
  const closeTagMatch = svgString.match(/<\/svg>/);

  if (openTagMatch && closeTagMatch) {
    const startIndex = openTagMatch.index! + openTagMatch[0].length;
    const endIndex = closeTagMatch.index!;
    return svgString.substring(startIndex, endIndex);
  }

  return svgString;
}
