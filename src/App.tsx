import { useRef, useState, useEffect } from 'react';
import { useWellStore } from './stores/wellStore';
import { WellProfileVisualization } from './components/WellProfile/WellProfileVisualization';
import { WellInfoPanel } from './components/DataPanels/WellInfoPanel';
import { LegendPanel } from './components/DataPanels/LegendPanel';
import { SoilDescriptionPanel } from './components/DataPanels/SoilDescriptionPanel';
import { WellDataForm } from './components/Editor/WellDataForm';
import { LithologyEditor } from './components/Editor/LithologyEditor';
import { ConstructiveEditor } from './components/Editor/ConstructiveEditor';
import { exportWellProfileToPDF } from './utils/pdfGenerator';
import { validateWellProfile } from './utils/validation';
import { WELL_TEMPLATES } from './constants/templates';
import type { SoilType } from './types/well.types';

function App() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [showValidation, setShowValidation] = useState(false);
  const { well, createNewWell, exportToJSON, loadFromJSON, reset } = useWellStore();

  // Inicializar com poço vazio na primeira carga
  useEffect(() => {
    if (!well) {
      const emptyTemplate = WELL_TEMPLATES[2]; // Poço Vazio
      createNewWell(emptyTemplate.data.projectInfo || { wellId: 'PM-01' });
      if (emptyTemplate.data.wellInfo) {
        useWellStore.getState().updateWellInfo(emptyTemplate.data.wellInfo);
      }
    }
  }, []);

  const handleExportPDF = async () => {
    if (well && svgRef.current) {
      try {
        await exportWellProfileToPDF(well.projectInfo.wellId, svgRef.current);
      } catch (error) {
        alert('Erro ao gerar PDF. Verifique o console para mais detalhes.');
      }
    }
  };

  const handleExportJSON = () => {
    if (well) {
      const json = exportToJSON();
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${well.projectInfo.wellId}_data.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleImportJSON = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const json = event.target?.result as string;
          const success = loadFromJSON(json);
          if (!success) {
            alert('Erro ao importar arquivo. Verifique o formato.');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleLoadHypotheticalData = () => {
    if (confirm('Carregar dados hipotéticos? Isso substituirá os dados atuais.')) {
      reset();
      const template = WELL_TEMPLATES[0]; // Poço de Monitoramento Padrão
      createNewWell(template.data.projectInfo || { wellId: 'PM-01' });
      if (template.data.wellInfo) {
        useWellStore.getState().updateWellInfo(template.data.wellInfo);
      }
      if (template.data.constructiveProfile) {
        template.data.constructiveProfile.elements.forEach((el) => {
          useWellStore.getState().addConstructiveElement(el);
        });
      }
    }
  };

  const validation = well ? validateWellProfile(well) : null;

  // Obter tipos de solo usados para legenda
  const usedSoilTypes: SoilType[] = well
    ? Array.from(new Set(well.lithologicProfile.map((l) => l.primarySoilType)))
    : [];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-900 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Perfil Litológico e Construtivo</h1>
            <p className="text-sm text-blue-200">Sistema de Documentação de Poços de Monitoramento</p>
          </div>
          <div className="flex gap-2">
            {well && (
              <>
                <button
                  onClick={handleExportPDF}
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-sm font-medium"
                >
                  Exportar PDF
                </button>
                <button
                  onClick={handleExportJSON}
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm font-medium"
                >
                  Salvar JSON
                </button>
              </>
            )}
            <button
              onClick={handleLoadHypotheticalData}
              className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-sm font-medium"
            >
              Popular Dados Hipotéticos
            </button>
            <button
              onClick={handleImportJSON}
              className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded text-sm font-medium"
            >
              Carregar JSON
            </button>
            <button
              onClick={() => {
                if (confirm('Resetar todos os dados?')) {
                  reset();
                }
              }}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm font-medium"
            >
              Novo
            </button>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <div className="container mx-auto p-4">
        {well && (
          /* Editor e Visualização */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Coluna Esquerda - Editor */}
            <div className="space-y-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 150px)' }}>
              <WellDataForm />
              <ConstructiveEditor />
              <LithologyEditor />

              {/* Validação */}
              {validation && (
                <div className="border border-gray-300 rounded p-3">
                  <button
                    onClick={() => setShowValidation(!showValidation)}
                    className="w-full flex justify-between items-center font-bold text-sm"
                  >
                    <span>VALIDAÇÃO</span>
                    <span>{showValidation ? '▼' : '▶'}</span>
                  </button>
                  {showValidation && (
                    <div className="mt-2 space-y-2">
                      {validation.errors.length === 0 && validation.warnings.length === 0 && (
                        <p className="text-green-600 text-sm">✓ Nenhum problema encontrado</p>
                      )}
                      {validation.errors.map((error, i) => (
                        <div key={i} className="text-red-600 text-sm">
                          <strong>Erro:</strong> {error.message}
                        </div>
                      ))}
                      {validation.warnings.map((warning, i) => (
                        <div key={i} className="text-yellow-600 text-sm">
                          <strong>Aviso:</strong> {warning.message}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Coluna Direita - Visualização */}
            <div className="space-y-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 150px)' }}>
              {/* Preview do Perfil */}
              <div className="bg-white rounded-lg shadow-lg p-4">
                <h3 className="font-bold mb-3 text-center">PREVIEW</h3>
                <div className="overflow-auto">
                  <WellProfileVisualization well={well} svgRef={svgRef} />
                </div>
              </div>

              {/* Painéis de Informação */}
              <div className="grid grid-cols-1 gap-4">
                <WellInfoPanel
                  wellInfo={well.wellInfo}
                  constructiveProfile={well.constructiveProfile}
                />
                <LegendPanel usedSoilTypes={usedSoilTypes} />
                <SoilDescriptionPanel layers={well.lithologicProfile} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
