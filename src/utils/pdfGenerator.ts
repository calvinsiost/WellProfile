import { jsPDF } from 'jspdf';
import { svg2pdf } from 'svg2pdf.js';

interface PDFExportOptions {
  orientation: 'portrait' | 'landscape';
  format: 'a4' | 'a3';
  margins: { top: number; bottom: number; left: number; right: number };
}

export async function exportWellProfileToPDF(
  wellId: string,
  svgElement: SVGSVGElement,
  options: PDFExportOptions = {
    orientation: 'landscape',
    format: 'a4',
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

  // Área útil
  const contentWidth = pageWidth - options.margins.left - options.margins.right;
  const contentHeight = pageHeight - options.margins.top - options.margins.bottom;

  try {
    // Converter SVG para PDF
    await svg2pdf(svgElement, pdf, {
      x: options.margins.left,
      y: options.margins.top,
      width: contentWidth,
      height: contentHeight - 15, // Reservar espaço para rodapé
    });

    // Salvar
    const filename = `${wellId}_perfil_litologico_${Date.now()}.pdf`;
    pdf.save(filename);
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    throw error;
  }
}
