import type { Well, ValidationResult, ValidationError, ValidationWarning } from '../types/well.types';

export function validateWellProfile(well: Well): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];

  // 1. Profundidade do poço não pode exceder profundidade da sondagem
  if (well.wellInfo.wellDepth > well.wellInfo.drillingDepth) {
    errors.push({
      field: 'wellDepth',
      message: 'Profundidade do poço não pode ser maior que a profundidade da sondagem',
    });
  }

  // 2. Nível d'água deve estar dentro da profundidade do poço
  if (well.waterLevel.depth > well.wellInfo.wellDepth) {
    warnings.push({
      field: 'waterLevel',
      message: "Nível d'água está abaixo da profundidade do poço",
    });
  }

  // 3. Camadas litológicas devem cobrir toda a profundidade da sondagem
  const sortedLayers = [...well.lithologicProfile].sort((a, b) => a.topDepth - b.topDepth);

  if (sortedLayers.length > 0) {
    // Verificar gaps
    for (let i = 1; i < sortedLayers.length; i++) {
      const prevBottom = sortedLayers[i - 1].bottomDepth;
      const currTop = sortedLayers[i].topDepth;

      if (Math.abs(currTop - prevBottom) > 0.01) {
        warnings.push({
          field: 'lithologicProfile',
          message: `Gap entre camadas: ${prevBottom.toFixed(2)}m - ${currTop.toFixed(2)}m`,
        });
      }
    }

    // Verificar cobertura total
    const lastLayer = sortedLayers[sortedLayers.length - 1];
    if (lastLayer.bottomDepth < well.wellInfo.drillingDepth) {
      warnings.push({
        field: 'lithologicProfile',
        message: `Descrição litológica incompleta. Termina em ${lastLayer.bottomDepth}m, sondagem até ${well.wellInfo.drillingDepth}m`,
      });
    }
  }

  // 4. Seção filtrante deve estar no intervalo de interesse
  const screen = well.constructiveProfile.elements.find((e) => e.type === 'slotted_casing');
  if (screen && screen.bottomDepth > well.wellInfo.wellDepth) {
    errors.push({
      field: 'constructiveProfile',
      message: 'Seção filtrante excede profundidade do poço',
    });
  }

  // 5. Pré-filtro deve envolver a seção filtrante
  const prefilter = well.constructiveProfile.elements.find((e) => e.type === 'prefilter');
  if (screen && prefilter) {
    if (prefilter.topDepth > screen.topDepth || prefilter.bottomDepth < screen.bottomDepth) {
      warnings.push({
        field: 'constructiveProfile',
        message: 'Pré-filtro deveria envolver toda a seção filtrante',
      });
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}
