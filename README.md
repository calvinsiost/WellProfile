# Perfil Litológico e Construtivo de Poços de Monitoramento

Sistema web para criação de **Perfis Litológicos e Construtivos de Poços de Monitoramento Ambiental**, desenvolvido para geólogos e técnicos ambientais gerarem documentos técnicos padronizados com visualização esquemática do poço, descrição litológica do solo e informações construtivas, exportáveis em PDF para relatórios e laudos técnicos.

## Características

- ✅ Interface intuitiva para criação de perfis de poços
- ✅ Visualização SVG em tempo real com padrões geológicos (ABGE)
- ✅ Exportação para PDF de alta qualidade
- ✅ Templates pré-definidos para diferentes tipos de poços
- ✅ Validação automática de dados
- ✅ Persistência local dos dados
- ✅ Import/Export em JSON
- ✅ Suporte a VOC (Compostos Orgânicos Voláteis)
- ✅ Conformidade com NBR 15495-1/2 e padrões ABGE/ABAS

## Stack Tecnológico

- **Frontend**: React 18 + TypeScript
- **State Management**: Zustand
- **Visualização**: SVG nativo
- **Estilização**: Tailwind CSS
- **Exportação PDF**: jsPDF + svg2pdf.js
- **Build**: Vite

## Instalação

```bash
# Clonar o repositório
git clone https://github.com/calvinsiost/WellProfile.git
cd WellProfile

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

## Build para Produção

```bash
# Gerar build otimizado
npm run build

# Preview do build
npm run preview
```

## Estrutura do Projeto

```
src/
├── components/
│   ├── WellProfile/           # Visualização SVG do poço
│   │   ├── LithologyColumn.tsx
│   │   ├── ConstructiveColumn.tsx
│   │   ├── VOCColumn.tsx
│   │   ├── DepthScale.tsx
│   │   └── WellProfileVisualization.tsx
│   ├── DataPanels/            # Painéis de informação
│   │   ├── WellInfoPanel.tsx
│   │   ├── LegendPanel.tsx
│   │   └── SoilDescriptionPanel.tsx
│   └── Editor/                # Formulários de edição
│       ├── WellDataForm.tsx
│       ├── LithologyEditor.tsx
│       └── ConstructiveEditor.tsx
├── stores/
│   └── wellStore.ts           # Estado global (Zustand)
├── types/
│   └── well.types.ts          # Definições TypeScript
├── utils/
│   ├── lithologyPatterns.tsx  # Padrões SVG para solos
│   ├── validation.ts          # Validação de dados
│   └── pdfGenerator.ts        # Exportação PDF
└── constants/
    ├── soilTypes.ts           # Tipos de solo e constantes
    └── templates.ts           # Templates pré-definidos
```

## Uso

### 1. Criar Novo Poço

Ao abrir a aplicação, selecione um dos templates disponíveis:
- **Poço de Monitoramento Padrão**: Template completo para poço típico (45-50m)
- **Poço Raso**: Template para poços rasos (< 15m)
- **Poço Vazio**: Começar do zero

### 2. Preencher Dados do Projeto e Poço

No painel esquerdo, preencha:
- **Dados do Projeto**: ID do poço, cliente, projeto, figura, data
- **Dados do Poço**: Profundidades, diâmetros, método de perfuração, nível d'água
- **Datas e Horários**: Sondagem e construção do poço

### 3. Adicionar Perfil Construtivo

Clique em "+ Adicionar Elemento" e adicione os elementos na ordem:
1. Acabamento superficial (0,00 - 0,50m)
2. Selo de bentonita (0,50 - 3,00m)
3. Tubo geomecânico (0,00 - 45,00m)
4. Pré-filtro (43,00 - 50,00m)
5. Filtro ranhurado (45,00 - 50,00m)

### 4. Adicionar Perfil Litológico

Clique em "+ Adicionar Camada" e descreva cada camada de solo:
- Profundidade topo e base
- Tipo de solo (argila, areia, silte, etc.)
- Cor
- Granulometria (se aplicável)
- Consistência/Compacidade
- Umidade

### 5. Visualizar e Exportar

O preview é atualizado em tempo real no painel direito. Quando finalizado:
- **Exportar PDF**: Gera documento técnico em PDF
- **Salvar JSON**: Salva dados para edição posterior
- **Carregar JSON**: Importa dados salvos

## Tipos de Solo Disponíveis

A aplicação suporta os seguintes tipos de solo com padrões de hachura conforme ABGE:

- Asfalto
- Concreto
- Aterro
- Solo Orgânico
- Argila
- Argila arenosa
- Argila siltosa
- Argila orgânica
- Silte
- Silte arenoso
- Silte argiloso
- Areia
- Areia argilosa
- Areia siltosa
- Pedregulho
- Turfa
- Saprólito
- Rocha alterada
- Rocha sã

## Elementos Construtivos

- Acabamento superficial (caixa de proteção)
- Selo de cimento
- Selo de bentonita
- Pellet de bentonita
- Tubo geomecânico (liso)
- Filtro ranhurado
- Pré-filtro (areia)
- Tampa/Cap
- Centralizador
- Fundo (cap inferior)

## Validação

A aplicação valida automaticamente:
- ✓ Profundidade do poço ≤ profundidade da sondagem
- ✓ Nível d'água dentro da profundidade do poço
- ✓ Ausência de gaps entre camadas litológicas
- ✓ Cobertura total da profundidade perfurada
- ✓ Seção filtrante dentro da profundidade do poço
- ✓ Pré-filtro envolvendo completamente o filtro

## Referências Normativas

- **NBR 15495-1:2007** - Poços de monitoramento de águas subterrâneas em aquíferos granulares
- **NBR 15495-2:2008** - Poços de monitoramento - Desenvolvimento
- **CETESB 6410** - Amostragem e monitoramento das águas subterrâneas
- **Manual de Sondagens - ABGE** - Boletins de sondagem e perfis descritivos

## Persistência de Dados

Os dados são automaticamente salvos no localStorage do navegador. Para backup:
1. Use "Salvar JSON" para exportar
2. Guarde o arquivo em local seguro
3. Use "Carregar JSON" para restaurar

## Suporte e Contribuições

Para reportar bugs ou sugerir melhorias, abra uma issue no GitHub.

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para detalhes.

## Autor

Desenvolvido para profissionais de geologia e meio ambiente.

---

**Nota**: Este sistema foi desenvolvido seguindo as melhores práticas de documentação técnica geológica e padrões brasileiros (ABGE/ABAS/NBR).
