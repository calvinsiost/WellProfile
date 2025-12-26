/**
 * SVG Patterns for Lithology Visualization
 * Based on ABGE geological standards
 */

export function LithologyPatterns() {
  return (
    <defs>
      {/* Argila: linhas horizontais */}
      <pattern id="pattern-clay" patternUnits="userSpaceOnUse" width="10" height="4">
        <line x1="0" y1="2" x2="10" y2="2" stroke="#8B4513" strokeWidth="1"/>
      </pattern>

      {/* Areia: pontos */}
      <pattern id="pattern-sand" patternUnits="userSpaceOnUse" width="6" height="6">
        <circle cx="2" cy="2" r="1" fill="#8B7355"/>
        <circle cx="5" cy="5" r="1" fill="#8B7355"/>
      </pattern>

      {/* Argila arenosa: linhas + pontos */}
      <pattern id="pattern-sandy_clay" patternUnits="userSpaceOnUse" width="10" height="8">
        <line x1="0" y1="2" x2="10" y2="2" stroke="#8B4513" strokeWidth="1"/>
        <line x1="0" y1="6" x2="10" y2="6" stroke="#8B4513" strokeWidth="1"/>
        <circle cx="3" cy="4" r="1" fill="#8B7355"/>
        <circle cx="7" cy="4" r="1" fill="#8B7355"/>
      </pattern>

      {/* Areia argilosa: pontos + linhas espaçadas */}
      <pattern id="pattern-clayey_sand" patternUnits="userSpaceOnUse" width="8" height="8">
        <circle cx="2" cy="2" r="1" fill="#8B7355"/>
        <circle cx="6" cy="6" r="1" fill="#8B7355"/>
        <line x1="0" y1="4" x2="8" y2="4" stroke="#8B4513" strokeWidth="0.5"/>
      </pattern>

      {/* Silte: linhas tracejadas */}
      <pattern id="pattern-silt" patternUnits="userSpaceOnUse" width="12" height="4">
        <line x1="0" y1="2" x2="4" y2="2" stroke="#A0522D" strokeWidth="1"/>
        <line x1="6" y1="2" x2="10" y2="2" stroke="#A0522D" strokeWidth="1"/>
      </pattern>

      {/* Silte arenoso */}
      <pattern id="pattern-sandy_silt" patternUnits="userSpaceOnUse" width="10" height="6">
        <line x1="0" y1="2" x2="4" y2="2" stroke="#A0522D" strokeWidth="0.5"/>
        <line x1="6" y1="2" x2="10" y2="2" stroke="#A0522D" strokeWidth="0.5"/>
        <circle cx="3" cy="4" r="0.8" fill="#8B7355"/>
        <circle cx="7" cy="4" r="0.8" fill="#8B7355"/>
      </pattern>

      {/* Argila siltosa */}
      <pattern id="pattern-silty_clay" patternUnits="userSpaceOnUse" width="12" height="6">
        <line x1="0" y1="2" x2="12" y2="2" stroke="#8B4513" strokeWidth="1"/>
        <line x1="0" y1="3" x2="4" y2="3" stroke="#A0522D" strokeWidth="0.5"/>
        <line x1="6" y1="3" x2="10" y2="3" stroke="#A0522D" strokeWidth="0.5"/>
      </pattern>

      {/* Silte argiloso */}
      <pattern id="pattern-clayey_silt" patternUnits="userSpaceOnUse" width="12" height="6">
        <line x1="0" y1="2" x2="4" y2="2" stroke="#A0522D" strokeWidth="1"/>
        <line x1="6" y1="2" x2="10" y2="2" stroke="#A0522D" strokeWidth="1"/>
        <line x1="0" y1="4" x2="12" y2="4" stroke="#8B4513" strokeWidth="0.5"/>
      </pattern>

      {/* Areia siltosa */}
      <pattern id="pattern-silty_sand" patternUnits="userSpaceOnUse" width="8" height="8">
        <circle cx="2" cy="2" r="1" fill="#8B7355"/>
        <circle cx="6" cy="6" r="1" fill="#8B7355"/>
        <line x1="0" y1="4" x2="3" y2="4" stroke="#A0522D" strokeWidth="0.5"/>
        <line x1="5" y1="4" x2="8" y2="4" stroke="#A0522D" strokeWidth="0.5"/>
      </pattern>

      {/* Argila orgânica: linhas + traços orgânicos */}
      <pattern id="pattern-organic_clay" patternUnits="userSpaceOnUse" width="12" height="8">
        <line x1="0" y1="2" x2="12" y2="2" stroke="#2F4F4F" strokeWidth="1"/>
        <line x1="0" y1="6" x2="12" y2="6" stroke="#2F4F4F" strokeWidth="1"/>
        <path d="M2,4 Q4,3 6,4 Q8,5 10,4" stroke="#1a3a3a" fill="none" strokeWidth="0.5"/>
      </pattern>

      {/* Pedregulho: círculos maiores */}
      <pattern id="pattern-gravel" patternUnits="userSpaceOnUse" width="12" height="12">
        <circle cx="4" cy="4" r="3" fill="none" stroke="#666" strokeWidth="1"/>
        <circle cx="10" cy="10" r="2" fill="none" stroke="#666" strokeWidth="1"/>
      </pattern>

      {/* Rocha alterada: cruzes/Vs */}
      <pattern id="pattern-weathered_rock" patternUnits="userSpaceOnUse" width="10" height="10">
        <path d="M2,2 L5,8 L8,2" stroke="#555" fill="none" strokeWidth="1"/>
      </pattern>

      {/* Rocha: hachura densa */}
      <pattern id="pattern-rock" patternUnits="userSpaceOnUse" width="6" height="6">
        <line x1="0" y1="0" x2="6" y2="6" stroke="#333" strokeWidth="1"/>
        <line x1="0" y1="6" x2="6" y2="0" stroke="#333" strokeWidth="1"/>
      </pattern>

      {/* Aterro: hachura irregular */}
      <pattern id="pattern-fill" patternUnits="userSpaceOnUse" width="10" height="10">
        <line x1="0" y1="0" x2="10" y2="10" stroke="#8B4513" strokeWidth="1"/>
        <circle cx="7" cy="3" r="1.5" fill="none" stroke="#8B4513"/>
      </pattern>

      {/* Asfalto: sólido escuro */}
      <pattern id="pattern-asphalt" patternUnits="userSpaceOnUse" width="4" height="4">
        <rect width="4" height="4" fill="#333"/>
      </pattern>

      {/* Concreto: reticulado */}
      <pattern id="pattern-concrete" patternUnits="userSpaceOnUse" width="8" height="8">
        <line x1="0" y1="4" x2="8" y2="4" stroke="#666" strokeWidth="0.5"/>
        <line x1="4" y1="0" x2="4" y2="8" stroke="#666" strokeWidth="0.5"/>
        <circle cx="2" cy="2" r="0.5" fill="#999"/>
        <circle cx="6" cy="6" r="0.5" fill="#999"/>
      </pattern>

      {/* Solo Orgânico */}
      <pattern id="pattern-topsoil" patternUnits="userSpaceOnUse" width="10" height="8">
        <path d="M0,4 Q2,2 4,4 Q6,6 8,4 Q9,3 10,4" stroke="#654321" fill="none" strokeWidth="1"/>
        <circle cx="3" cy="2" r="0.8" fill="#654321"/>
        <circle cx="7" cy="6" r="0.8" fill="#654321"/>
      </pattern>

      {/* Turfa */}
      <pattern id="pattern-peat" patternUnits="userSpaceOnUse" width="12" height="10">
        <path d="M0,5 Q3,3 6,5 Q9,7 12,5" stroke="#3E2723" fill="none" strokeWidth="1.5"/>
        <path d="M0,2 Q3,1 6,2" stroke="#3E2723" fill="none" strokeWidth="0.8"/>
        <path d="M6,8 Q9,7 12,8" stroke="#3E2723" fill="none" strokeWidth="0.8"/>
      </pattern>

      {/* Saprólito */}
      <pattern id="pattern-saprolite" patternUnits="userSpaceOnUse" width="10" height="10">
        <line x1="0" y1="3" x2="10" y2="3" stroke="#D2691E" strokeWidth="0.5"/>
        <line x1="0" y1="7" x2="10" y2="7" stroke="#D2691E" strokeWidth="0.5"/>
        <path d="M2,5 L4,1 L6,5" stroke="#D2691E" fill="none" strokeWidth="0.8"/>
        <path d="M7,5 L9,1" stroke="#D2691E" fill="none" strokeWidth="0.8"/>
      </pattern>

      {/* Outro */}
      <pattern id="pattern-other" patternUnits="userSpaceOnUse" width="8" height="8">
        <rect width="8" height="8" fill="#EEEEEE"/>
        <line x1="0" y1="0" x2="8" y2="8" stroke="#999" strokeWidth="0.5" strokeDasharray="1,1"/>
      </pattern>

      {/* Patterns para elementos construtivos */}

      {/* Pré-filtro (areia grossa): pontos grandes */}
      <pattern id="pattern-prefilter" patternUnits="userSpaceOnUse" width="6" height="6">
        <circle cx="3" cy="3" r="2" fill="#DAA520"/>
      </pattern>

      {/* Bentonita: diagonal */}
      <pattern id="pattern-bentonite" patternUnits="userSpaceOnUse" width="8" height="8">
        <line x1="0" y1="8" x2="8" y2="0" stroke="#808080" strokeWidth="2"/>
      </pattern>

      {/* Cimento: cruzado */}
      <pattern id="pattern-cement" patternUnits="userSpaceOnUse" width="8" height="8">
        <line x1="0" y1="4" x2="8" y2="4" stroke="#999" strokeWidth="1"/>
        <line x1="4" y1="0" x2="4" y2="8" stroke="#999" strokeWidth="1"/>
      </pattern>
    </defs>
  );
}
