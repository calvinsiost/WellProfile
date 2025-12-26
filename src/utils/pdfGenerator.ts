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
  const pdf = new jsPDF({
    orientation: options.orientation,
    unit: 'mm',
    format: options.format,
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  try {
    // Criar SVG completo com perfil + painéis
    const completeSvg = createCompletePdfSvg(well, profileSvgElement);

    // Converter para elemento SVG
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(completeSvg, 'image/svg+xml');
    const svgElement = svgDoc.documentElement as unknown as SVGSVGElement;

    // Converter SVG para PDF
    await svg2pdf(svgElement, pdf, {
      x: options.margins.left,
      y: options.margins.top,
      width: pageWidth - options.margins.left - options.margins.right,
      height: pageHeight - options.margins.top - options.margins.bottom,
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

  // Gerar painéis em SVG
  const legendSvg = generateLegendSVG(usedSoilTypes);
  const wellInfoSvg = generateWellInfoSVG(well.wellInfo, well.constructiveProfile);
  const soilDescSvg = generateSoilDescriptionSVG(well.lithologicProfile);

  // Obter o SVG do perfil como string (sem a tag svg externa)
  const serializer = new XMLSerializer();
  let profileSvgString = serializer.serializeToString(profileSvgElement);

  // Extrair apenas o conteúdo interno do SVG do perfil
  const profileContent = extractSvgContent(profileSvgString);

  // Dimensões
  const profileWidth = parseFloat(profileSvgElement.getAttribute('width') || '500');
  const profileHeight = parseFloat(profileSvgElement.getAttribute('height') || '800');
  const panelsWidth = 300;

  const totalWidth = profileWidth + panelsWidth + 40;
  const totalHeight = Math.max(profileHeight, 1000);

  // Posições
  const profileX = 20;
  const panelsX = profileX + profileWidth + 20;

  // Montar SVG completo
  const completeSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${totalWidth}" height="${totalHeight}" xmlns="http://www.w3.org/2000/svg">
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
  <g transform="translate(${panelsX}, 40)">
    <!-- Informações do Poço -->
    <g transform="translate(0, 0)">
      ${wellInfoSvg}
    </g>

    <!-- Legenda -->
    <g transform="translate(0, 350)">
      ${legendSvg}
    </g>

    <!-- Descrição do Solo -->
    <g transform="translate(0, 650)">
      ${soilDescSvg}
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
