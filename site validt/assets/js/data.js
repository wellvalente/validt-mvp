window.VALIDT = {
  brand: "Validt Consultoria e Treinamentos",
  courses: [
    {
      id: "inspecao-visual",
      title: "Inspeção visual de qualidade na linha",
      category: "Qualidade industrial",
      level: "Iniciante",
      hours: 8,
      lessons: 9,
      students: 42,
      price: 89.9,
      oldPrice: 129,
      certificate: true,
      launch: true,
      cover: "#3d5a4c",
      summary: "Critérios de aceite, registros de não conformidade e rotina de inspeção no chão de fábrica.",
      instructor: "Equipe técnica Validt",
      outcomes: [
        "Montar um checklist de inspeção alinhado ao produto.",
        "Registrar evidências fotográficas e medidas.",
        "Classificar defeitos e decidir retrabalho ou refugo.",
        "Emitir um relatório simples de qualidade."
      ],
      modules: [
        { title: "Fundamentos da inspeção", lessons: ["O que é qualidade aplicada", "Tipos de defeito", "Quando inspecionar"] },
        { title: "Na prática", lessons: ["Checklist em campo", "Amostragem básica", "Registro de evidências"] },
        { title: "Encerramento", lessons: ["Relatório de inspeção", "Plano de ação", "Estudo de caso"] }
      ],
      materials: ["Checklist editável", "Modelo de relatório", "Slides das aulas"],
      audience: ["Operadores", "Inspetores", "Supervisores de qualidade"],
      requirements: ["Acesso à internet", "Não exige software específico"]
    },
    {
      id: "manutencao-preventiva",
      title: "Manutenção preventiva para líderes de turno",
      category: "Manutenção",
      level: "Intermediário",
      hours: 12,
      lessons: 11,
      students: 67,
      price: 119.9,
      oldPrice: null,
      certificate: true,
      launch: false,
      cover: "#314155",
      summary: "Planejamento de rotinas, indicadores simples e falhas evitáveis em equipamentos produtivos.",
      instructor: "Equipe técnica Validt",
      outcomes: [
        "Priorizar equipamentos por criticidade.",
        "Montar um calendário de preventiva.",
        "Acompanhar MTBF e MTTR de forma simples.",
        "Registrar ordens de serviço com padrão mínimo."
      ],
      modules: [
        { title: "Estratégias", lessons: ["Corretiva, preventiva e preditiva", "Criticidade", "Peças e estoque"] },
        { title: "Planejamento", lessons: ["Calendário", "Checklist de máquina", "Handover de turno"] },
        { title: "Indicadores", lessons: ["MTBF e MTTR", "Backlog", "Reunião semanal"] }
      ],
      materials: ["Planilha de preventiva", "Modelo de OS"],
      audience: ["Líderes de manutenção", "Técnicos", "Supervisores"],
      requirements: ["Noções básicas de chão de fábrica"]
    },
    {
      id: "seguranca-maquinas",
      title: "Segurança em máquinas e proteções",
      category: "Segurança do trabalho",
      level: "Iniciante",
      hours: 10,
      lessons: 8,
      students: 31,
      price: 99.9,
      oldPrice: 149,
      certificate: true,
      launch: true,
      cover: "#7a3b2e",
      summary: "Identificação de riscos em equipamentos, proteções e bloqueio para intervenção.",
      instructor: "Equipe técnica Validt",
      outcomes: [
        "Reconhecer pontos de risco em máquinas.",
        "Verificar proteções e intertravamentos.",
        "Aplicar bloqueio básico antes da intervenção.",
        "Registrar desvios de segurança."
      ],
      modules: [
        { title: "Riscos", lessons: ["Partes móveis", "Energias perigosas", "Área de circulação"] },
        { title: "Controles", lessons: ["Proteções", "Sinalização", "Bloqueio e etiquetagem"] },
        { title: "Rotina", lessons: ["Checklist diário", "O que fazer em desvio"] }
      ],
      materials: ["Checklist de máquina", "Cartaz de bloqueio"],
      audience: ["Operadores", "Técnicos de segurança", "Manutenção"],
      requirements: ["Nenhum pré-requisito formal"]
    },
    {
      id: "analise-falhas",
      title: "Análise de falhas: do sintoma à causa",
      category: "Confiabilidade",
      level: "Avançado",
      hours: 14,
      lessons: 12,
      students: 18,
      price: 159.9,
      oldPrice: null,
      certificate: true,
      launch: false,
      cover: "#2c3e50",
      summary: "Método para investigar paradas recorrentes e transformar achados em ação.",
      instructor: "Equipe técnica Validt",
      outcomes: [
        "Separar sintoma, mecanismo e causa raiz.",
        "Usar 5 porquês e Ishikawa sem superficialidade.",
        "Documentar evidências da falha.",
        "Propor contenção e ação definitiva."
      ],
      modules: [
        { title: "Método", lessons: ["Sintoma x causa", "Coleta de evidências", "Hipóteses"] },
        { title: "Ferramentas", lessons: ["5 porquês", "Ishikawa", "Árvore de falhas simplificada"] },
        { title: "Fechamento", lessons: ["Relatório", "Plano de ação", "Verificação de eficácia"] }
      ],
      materials: ["Modelo de RCA", "Planilha de evidências"],
      audience: ["Engenharia", "Manutenção", "Qualidade"],
      requirements: ["Experiência em chão de fábrica ajuda, mas não é obrigatória"]
    },
    {
      id: "documentacao-tecnica",
      title: "Documentação técnica objetiva",
      category: "Gestão",
      level: "Iniciante",
      hours: 6,
      lessons: 6,
      students: 24,
      price: 0,
      oldPrice: null,
      certificate: true,
      launch: false,
      cover: "#4a5d4e",
      summary: "Como escrever procedimentos, registros e relatórios que alguém consiga usar no turno seguinte.",
      instructor: "Equipe técnica Validt",
      outcomes: [
        "Estruturar um POP curto.",
        "Evitar texto genérico.",
        "Padronizar registros de campo."
      ],
      modules: [
        { title: "Escrita útil", lessons: ["Quem lê o documento", "Estrutura mínima", "Verbos e evidências"] },
        { title: "Modelos", lessons: ["POP", "Relatório", "Registro de turno"] }
      ],
      materials: ["Modelos em texto"],
      audience: ["Qualquer profissional técnico"],
      requirements: ["Nenhum"]
    },
    {
      id: "gestao-ativos",
      title: "Gestão de ativos na planta",
      category: "Gestão",
      level: "Intermediário",
      hours: 9,
      lessons: 8,
      students: 15,
      price: 109.9,
      oldPrice: 139,
      certificate: true,
      launch: true,
      cover: "#1f4d4a",
      summary: "Inventário, criticidade e ciclo de vida de equipamentos sem jargão desnecessário.",
      instructor: "Equipe técnica Validt",
      outcomes: [
        "Organizar o cadastro de equipamentos.",
        "Classificar criticidade.",
        "Ligar manutenção, inspeção e reposição."
      ],
      modules: [
        { title: "Cadastro", lessons: ["O que precisa estar no ativo", "Hierarquia funcional"] },
        { title: "Decisão", lessons: ["Criticidade", "Substituir ou reparar", "Indicadores úteis"] }
      ],
      materials: ["Planilha de ativos"],
      audience: ["Gestores de manutenção", "Engenharia de planta"],
      requirements: ["Noções de manutenção"]
    }
  ],
  faq: [
    ["Os cursos são online?", "Sim. As aulas ficam na área do aluno após a matrícula, para estudar no seu ritmo."],
    ["Tem certificado?", "Quando o curso prevê certificado, ele é emitido com código de validação pública."],
    ["Técnicos podem participar?", "Sim. O catálogo cobre operadores, técnicos, engenheiros e liderança de planta."],
    ["Como acesso o conteúdo?", "Crie uma conta, conclua a matrícula e entre na área do aluno."],
    ["A mentoria inclui os cursos?", "Não. Mentoria é um acompanhamento separado; cursos são comprados no catálogo."]
  ],
  instructors: [
    {
      name: "Carla Mendes",
      role: "Instrutora de Qualidade Industrial",
      focus: "Inspeção, critérios de aceite e documentação de não conformidade.",
      credentials: "Especialista em qualidade de linha · 12 anos em planta"
    },
    {
      name: "Roberto Almeida",
      role: "Instrutor de Manutenção e Confiabilidade",
      focus: "Preventiva, indicadores e análise de falhas em equipamentos produtivos.",
      credentials: "Engenharia de manutenção · liderança de turno"
    },
    {
      name: "Ana Paula Rocha",
      role: "Instrutora de Segurança em Máquinas",
      focus: "Proteções, bloqueio e rotinas de verificação no chão de fábrica.",
      credentials: "SST aplicada · treinamentos operacionais"
    }
  ],
  consultants: [
    {
      name: "Diego Ferreira",
      role: "Consultor de Processos Industriais",
      focus: "Diagnóstico de fluxo, padronização e plano de ação com evidência.",
      credentials: "Consultoria de operações · melhoria contínua"
    },
    {
      name: "Mariana Costa",
      role: "Consultora de Gestão de Ativos",
      focus: "Criticidade, ciclo de vida e alinhamento manutenção–produção.",
      credentials: "Gestão de ativos · engenharia de planta"
    },
    {
      name: "Lucas Nogueira",
      role: "Consultor de Capacitação Técnica",
      focus: "Trilhas de desenvolvimento, mentoria e validação de competências.",
      credentials: "Desenvolvimento técnico · mentoria industrial"
    }
  ]
};
