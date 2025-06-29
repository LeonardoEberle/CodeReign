// cards.js - O Mundo dos Objetos - Narrativa de Programação

// ========================================
// CARTAS INTRODUTÓRIAS DO CAPÍTULO 1
// ========================================

const INTRO_CARDS = [
    {
        id: "awakening",
        character: "😴",
        title: "O Despertar",
        text: "Você acorda em um lugar estranho que lembra muito a idade média. Suas roupas modernas contrastam com o ambiente ao redor. Onde você está?",
        leftChoice: "Levantar",
        rightChoice: "Olhar em volta",
        leftEffect: {},
        rightEffect: {},
        leftHiddenEffects: { curiosity: 2 },
        rightHiddenEffects: { observation: 3 },
        isIntro: true
    },
    {
        id: "the_call",
        character: "👩‍🦰",
        title: "O Chamado",
        text: "Uma garota o observa atentamente. Ela diz que seu nome é Siren e que você acabou de chegar de outro mundo. Seus olhos brilham com conhecimento antigo.",
        leftChoice: "Se apresentar",
        rightChoice: "Perguntar onde está",
        leftEffect: {},
        rightEffect: {},
        leftHiddenEffects: { politeness: 3, trust: 2 },
        rightHiddenEffects: { curiosity: 3, anxiety: 1 },
        isIntro: true
    },
    {
        id: "the_mission",
        character: "⚔️",
        title: "A Missão",
        text: "Siren lhe informa que você está preso no Mundo dos Objetos e para voltar ao seu mundo você precisa derrotar O Grande Programador, mestre dos Cavaleiros da Orientação a Objetos.",
        leftChoice: "Recusar",
        rightChoice: "Confirmar a missão",
        leftEffect: {},
        rightEffect: {},
        leftHiddenEffects: { gameOver: true },
        rightHiddenEffects: { determination: 5, mission_accepted: 1 },
        isIntro: true
    },
    {
        id: "preparation",
        character: "🤖",
        title: "A Preparação",
        text: "Siren lhe entrega um pequeno boneco que diz ser um robô ancestral programável. 'Este será seu primeiro companheiro', ela diz com um sorriso misterioso.",
        leftChoice: "O que faço com isso?",
        rightChoice: "Entendido",
        leftEffect: {},
        rightEffect: {},
        leftHiddenEffects: { need_explanation: 1 },
        rightHiddenEffects: { quick_learner: 2 },
        isIntro: true
    },
    {
        id: "context",
        character: "📜",
        title: "Contexto",
        text: "Siren explica que neste mundo você pode alterar o código-fonte desses robôs e usá-los para derrotar O Grande Programador que guarda as portas para seu mundo.",
        leftChoice: "Entendido",
        rightChoice: "Entendido",
        leftEffect: {},
        rightEffect: {},
        leftHiddenEffects: { programming_knowledge: 2 },
        rightHiddenEffects: { programming_knowledge: 2 },
        isIntro: true
    }
];

// ========================================
// CARTAS-CHAVE POR CAPÍTULO (Obrigatórias)
// ========================================

const CHAPTER_KEY_CARDS = {
    1: [ // CAPÍTULO 1: Descobrindo o Mundo dos Objetos
        {
            id: "first_robot_programming",
            character: "💻",
            title: "Primeira Programação",
            text: "Você examina o código do robô ancestral. É uma linguagem estranha, mas familiar. Como você quer modificar seus algoritmos de combate?",
            leftChoice: "Focar em defesa",
            rightChoice: "Focar em ataque",
            leftEffect: { robots: 10, energy: -5, knowledge: 5 },
            rightEffect: { robots: 5, energy: -10, knowledge: 10 },
            leftHiddenEffects: { defensive_programming: 8, safety_first: 5 },
            rightHiddenEffects: { aggressive_programming: 8, risk_taking: 5 }
        },
        {
            id: "code_structure_choice",
            character: "🏗️",
            title: "Estrutura do Código",
            text: "Siren observa seu trabalho: 'Vejo que você entende de programação. Que arquitetura usará para seus robôs?'",
            leftChoice: "Programação orientada a objetos",
            rightChoice: "Programação funcional",
            leftEffect: { knowledge: 15, resources: -5 },
            rightEffect: { energy: 10, knowledge: 5, resources: -10 },
            leftHiddenEffects: { oop_mastery: 10, structured_thinking: 8 },
            rightHiddenEffects: { functional_thinking: 8, innovation: 6 }
        },
        {
            id: "first_enemy_encounter",
            character: "⚔️",
            title: "Primeiro Confronto",
            text: "Um Cavaleiro da Orientação a Objetos aparece! 'Método toString() está deprecado!', ele grita. Como você responde?",
            leftChoice: "Usar polimorfismo",
            rightChoice: "Atacar com herança",
            leftEffect: { robots: 5, knowledge: 10, energy: -15 },
            rightEffect: { robots: -5, knowledge: 5, energy: -5 },
            leftHiddenEffects: { combat_strategy: 10, oop_battle_experience: 8 },
            rightHiddenEffects: { aggressive_coding: 6, battle_confidence: 5 }
        },
        {
            id: "debug_crisis",
            character: "🐛",
            title: "Crise de Debug",
            text: "Seus robôs começam a apresentar bugs! Stack overflow everywhere! Como você resolve essa crise?",
            leftChoice: "Debug sistemático",
            rightChoice: "Refatoração completa",
            leftEffect: { robots: 15, energy: -20, knowledge: 10 },
            rightEffect: { robots: -10, energy: -10, knowledge: 20 },
            leftHiddenEffects: { debugging_skills: 12, patience: 8 },
            rightHiddenEffects: { refactoring_skills: 10, bold_decisions: 6 }
        },
        {
            id: "algorithm_optimization",
            character: "⚡",
            title: "Otimização de Algoritmos",
            text: "Siren sugere: 'Seus robôs estão lentos. Que técnica de otimização você aplicará?'",
            leftChoice: "Otimizar complexidade de tempo",
            rightChoice: "Otimizar uso de memória",
            leftEffect: { energy: 15, robots: 10, resources: -15 },
            rightEffect: { resources: 20, robots: 5, energy: -5 },
            leftHiddenEffects: { algorithm_optimization: 10, performance_focus: 8 },
            rightHiddenEffects: { memory_management: 12, resource_efficiency: 6 }
        }
    ]
};

// ========================================
// CARTAS DE CONSEQUÊNCIA (Baseadas em status ocultos)
// ========================================

const CONSEQUENCE_CARDS = [
    // CONSEQUÊNCIAS DE PROGRAMAÇÃO DEFENSIVA
    {
        id: "over_defensive_code",
        character: "🛡️",
        title: "Código Muito Defensivo",
        text: "Seus robôs estão muito cautelosos! Eles validam tudo três vezes antes de atacar.",
        leftChoice: "Manter segurança",
        rightChoice: "Adicionar agressividade",
        leftEffect: { robots: 5, energy: -10 },
        rightEffect: { robots: 15, energy: 5, knowledge: -5 },
        triggerConditions: { defensive_programming: { min: 15, max: Infinity } },
        weight: 3
    },
    {
        id: "security_vulnerability",
        character: "🔓",
        title: "Vulnerabilidade de Segurança",
        text: "Um hacker ancestral encontrou uma falha em seus robôs! Como você corrige?",
        leftChoice: "Patch rápido",
        rightChoice: "Reescrever módulo",
        leftEffect: { robots: 10, energy: -5 },
        rightEffect: { robots: -10, energy: -15, knowledge: 20 },
        triggerConditions: { safety_first: { min: -Infinity, max: 5 } },
        weight: 2
    },

    // CONSEQUÊNCIAS DE PROGRAMAÇÃO AGRESSIVA
    {
        id: "robots_crashing",
        character: "💥",
        title: "Robôs Travando",
        text: "Seus robôs estão fazendo muitas operações arriscadas! Alguns estão crashando com segmentation fault.",
        leftChoice: "Adicionar try-catch",
        rightChoice: "Aceitar o risco",
        leftEffect: { robots: 10, energy: -10, knowledge: 5 },
        rightEffect: { robots: -15, energy: 10 },
        triggerConditions: { aggressive_programming: { min: 10, max: Infinity } },
        weight: 3
    },
    {
        id: "performance_boost",
        character: "🚀",
        title: "Boost de Performance",
        text: "Seus robôs agressivos descobriram uma otimização! Eles estão executando 300% mais rápido!",
        leftChoice: "Manter otimização",
        rightChoice: "Estudar como funciona",
        leftEffect: { robots: 20, energy: 15 },
        rightEffect: { robots: 10, knowledge: 25 },
        triggerConditions: { risk_taking: { min: 8, max: Infinity } },
        weight: 1
    },

    // CONSEQUÊNCIAS DE CONHECIMENTO BAIXO
    {
        id: "syntax_error_chaos",
        character: "❌",
        title: "Caos de Syntax Error",
        text: "Você cometeu vários erros de sintaxe! Seus robôs não conseguem nem compilar.",
        leftChoice: "Pedir ajuda à Siren",
        rightChoice: "Tentar sozinho",
        leftEffect: { robots: 15, knowledge: 10, energy: -5 },
        rightEffect: { robots: -10, knowledge: 15, energy: -15 },
        triggerConditions: { programming_knowledge: { min: -Infinity, max: 5 } },
        weight: 3
    },
    {
        id: "stackoverflow_consultation",
        character: "🌐",
        title: "Consulta ao StackOverflow Ancestral",
        text: "Você encontra ruínas de um antigo StackOverflow! Há respostas para seus problemas de código.",
        leftChoice: "Copiar solução diretamente",
        rightChoice: "Entender e adaptar",
        leftEffect: { robots: 20, knowledge: -5 },
        rightEffect: { robots: 10, knowledge: 20, energy: -10 },
        triggerConditions: { programming_knowledge: { min: -Infinity, max: 10 } },
        weight: 2
    },

    // CONSEQUÊNCIAS DE RECURSOS BAIXOS
    {
        id: "memory_leak",
        character: "🕳️",
        title: "Memory Leak Crítico",
        text: "Seus robôs estão consumindo toda a memória disponível! O sistema está ficando lento.",
        leftChoice: "Garbage collection manual",
        rightChoice: "Reiniciar sistema",
        leftEffect: { robots: 10, energy: -20, resources: 10 },
        rightEffect: { robots: -15, energy: 5, resources: 15 },
        triggerConditions: { memory_management: { min: -Infinity, max: 5 } },
        weight: 3
    },
    {
        id: "resource_optimization",
        character: "⚙️",
        title: "Otimização de Recursos",
        text: "Você descobriu como reutilizar componentes! Seus robôs estão compartilhando recursos eficientemente.",
        leftChoice: "Implementar factory pattern",
        rightChoice: "Usar singleton pattern",
        leftEffect: { robots: 15, resources: 20, knowledge: 10 },
        rightEffect: { robots: 10, resources: 25, energy: 5 },
        triggerConditions: { resource_efficiency: { min: 8, max: Infinity } },
        weight: 1
    },

    // CONSEQUÊNCIAS NEUTRAS/POSITIVAS
    {
        id: "ancient_library",
        character: "📚",
        title: "Biblioteca Ancestral",
        text: "Você encontra uma biblioteca de códigos antigos! Há algoritmos perdidos aqui.",
        leftChoice: "Estudar algoritmos de ordenação",
        rightChoice: "Estudar estruturas de dados",
        leftEffect: { knowledge: 15, energy: -10 },
        rightEffect: { knowledge: 10, robots: 10, energy: -5 },
        triggerConditions: {},
        weight: 1
    },
    {
        id: "helpful_npc_programmer",
        character: "👨‍💻",
        title: "Programador Amigável",
        text: "Você encontra um programador local! Ele oferece dicas sobre o Mundo dos Objetos.",
        leftChoice: "Pedir dicas de combat",
        rightChoice: "Pedir dicas de otimização",
        leftEffect: { robots: 15, knowledge: 5 },
        rightEffect: { energy: 15, resources: 10 },
        triggerConditions: {},
        weight: 1
    },
    {
        id: "code_review",
        character: "👀",
        title: "Code Review Espontâneo",
        text: "Siren analisa seu código: 'Interessante abordagem... mas posso sugerir melhorias.'",
        leftChoice: "Aceitar sugestões",
        rightChoice: "Defender sua implementação",
        leftEffect: { knowledge: 20, robots: 10, energy: -5 },
        rightEffect: { robots: 5, energy: 10, resources: -5 },
        triggerConditions: {},
        weight: 1
    },
    {
        id: "easter_egg_discovery",
        character: "🥚",
        title: "Easter Egg Descoberto",
        text: "Você encontrou um easter egg no código do mundo! Há um comentário engraçado deixado por um desenvolvedor antigo.",
        leftChoice: "Rir e continuar",
        rightChoice: "Investigar mais profundamente",
        leftEffect: { energy: 10, robots: 5 },
        rightEffect: { knowledge: 15, energy: -5 },
        triggerConditions: {},
        weight: 1
    }
];

// Status ocultos iniciais (adaptados para programação)
const INITIAL_HIDDEN_STATUS = {
    // Estilos de programação
    defensive_programming: 0,
    aggressive_programming: 0,
    oop_mastery: 0,
    functional_thinking: 0,
    
    // Habilidades técnicas
    debugging_skills: 0,
    algorithm_optimization: 0,
    memory_management: 0,
    refactoring_skills: 0,
    performance_focus: 0,
    resource_efficiency: 0,
    
    // Características pessoais
    programming_knowledge: 0,
    curiosity: 0,
    determination: 0,
    patience: 0,
    innovation: 0,
    risk_taking: 0,
    safety_first: 0,
    
    // Status de combate/mundo
    combat_strategy: 0,
    oop_battle_experience: 0,
    battle_confidence: 0,
    structured_thinking: 0,
    
    // Status especiais
    mission_accepted: 0,
    quick_learner: 0,
    politeness: 0,
    trust: 0,
    anxiety: 0,
    observation: 0,
    need_explanation: 0,
    bold_decisions: 0,
    aggressive_coding: 0
};

// Exportar para compatibilidade
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        INTRO_CARDS,
        CHAPTER_KEY_CARDS,
        CONSEQUENCE_CARDS,
        INITIAL_HIDDEN_STATUS
    };
} else if (typeof window !== 'undefined') {
    window.INTRO_CARDS = INTRO_CARDS;
    window.CHAPTER_KEY_CARDS = CHAPTER_KEY_CARDS;
    window.CONSEQUENCE_CARDS = CONSEQUENCE_CARDS;
    window.INITIAL_HIDDEN_STATUS = INITIAL_HIDDEN_STATUS;
}