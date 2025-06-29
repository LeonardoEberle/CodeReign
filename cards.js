// cards.js - O Mundo dos Objetos - Sistema Atualizado

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
        leftHiddenEffects: { player_felicidade: 2 },
        rightHiddenEffects: { player_conhecimento: 3 },
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
        leftHiddenEffects: { npc_felicidade: 3, npc_gratitude: 2 },
        rightHiddenEffects: { player_conhecimento: 3, player_felicidade: -1 },
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
        rightHiddenEffects: { player_felicidade: 5, npc_gratitude: 5 },
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
        leftHiddenEffects: { player_conhecimento: -1, robo_felicidade: -2 },
        rightHiddenEffects: { player_conhecimento: 2, robo_felicidade: 3 },
        isIntro: true
    },
    {
        id: "modifier_intro",
        character: "💻",
        title: "Modificador",
        text: "Siren lhe entrega também um laptop para que você possa acessar e modificar seu robô. 'Com isso você pode alterar o código-fonte dele', ela explica.",
        leftChoice: "Confirmar",
        rightChoice: "Pegar o laptop",
        leftEffect: {},
        rightEffect: {},
        leftHiddenEffects: { player_conhecimento: 2, robo_ataque: 1 },
        rightHiddenEffects: { player_conhecimento: 3, player_felicidade: 2 },
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
        leftHiddenEffects: { player_conhecimento: 2 },
        rightHiddenEffects: { player_conhecimento: 2 },
        isIntro: true
    }
];

// ========================================
// CARTAS-CHAVE POR CAPÍTULO (Sequência Fixa)
// ========================================

const CHAPTER_KEY_CARDS = {
    1: [ // CAPÍTULO 1: Fundamentos de POO - Sequência Fixa
        {
            id: "classe_e_objeto",
            character: "🏗️",
            title: "Classe e Objeto",
            text: "Uma classe nada mais é do que um projeto para criação de um objeto tangível, seu robô tem como classe 'RoboCombatente'.",
            leftChoice: "Não fazer nada",
            rightChoice: "Acessar classe",
            leftEffect: { robots: -10, energy: 10 },
            rightEffect: { robots: 15, energy: -5 },
            leftHiddenEffects: { robo_felicidade: -3, player_conhecimento: 1 },
            rightHiddenEffects: { robo_felicidade: 2, player_conhecimento: 5, robo_ataque: 2 }
        },
        {
            id: "atributos",
            character: "📊",
            title: "Atributos",
            text: "Atributos são aqueles que definem quem é o seu robô. Atribuir ataque e defesa para o robô?",
            leftChoice: "Definir ataque e defesa como string de valor 15",
            rightChoice: "Definir ataque e defesa como valores inteiros de valor 15",
            leftEffect: { robots: -5, knowledge: 5, resources: -10 },
            rightEffect: { robots: 10, knowledge: 15, resources: 5 },
            leftHiddenEffects: { robo_vulnerabilidade: 8, player_conhecimento: 2 },
            rightHiddenEffects: { robo_ataque: 5, robo_defesa: 5, player_conhecimento: 8 }
        },
        {
            id: "metodos",
            character: "⚙️",
            title: "Métodos",
            text: "Métodos definem o comportamento de um objeto. Definir método de ataque?",
            leftChoice: "Sim",
            rightChoice: "Não",
            leftEffect: { robots: 20, energy: -15, knowledge: 10 },
            rightEffect: { robots: -10, energy: 5, knowledge: -5 },
            leftHiddenEffects: { robo_ataque: 10, robo_felicidade: 5, player_conhecimento: 6 },
            rightHiddenEffects: { robo_vulnerabilidade: 5, robo_felicidade: -3, player_conhecimento: -2 }
        },
        {
            id: "encapsulamento",
            character: "🔒",
            title: "Encapsulamento",
            text: "É importante proteger sua classe de acessos externos. Você pode usar 'public' que fica acessível para todos ou 'private' que só pode ser alterado dentro da própria classe.",
            leftChoice: "Private",
            rightChoice: "Public",
            leftEffect: { robots: 5, knowledge: 15, resources: -5 },
            rightEffect: { robots: -5, knowledge: 5, resources: 10 },
            leftHiddenEffects: { robo_defesa: 10, robo_vulnerabilidade: -5, player_conhecimento: 8 },
            rightHiddenEffects: { robo_vulnerabilidade: 8, robo_ataque: 3, player_conhecimento: 3 }
        },
        {
            id: "construtor",
            character: "🏭",
            title: "Construtor",
            text: "O construtor define quais os atributos necessários para instanciar um objeto. Deseja instanciar seu Companheiro?",
            leftChoice: "Não instanciar",
            rightChoice: "Sim",
            leftEffect: { robots: -15, energy: 10, knowledge: -10 },
            rightEffect: { robots: 25, energy: -20, knowledge: 20 },
            leftHiddenEffects: { robo_felicidade: -8, player_conhecimento: -3 },
            rightHiddenEffects: { robo_felicidade: 10, robo_ataque: 5, robo_defesa: 5, player_conhecimento: 10, player_felicidade: 8 }
        }
    ]
};

// ========================================
// CARTAS DE CONSEQUÊNCIA (Baseadas em status ocultos)
// ========================================

const CONSEQUENCE_CARDS = [
    // CONSEQUÊNCIAS DE FELICIDADE DO PLAYER
    {
        id: "player_motivado",
        character: "😊",
        title: "Motivação em Alta",
        text: "Você está se sentindo confiante! Sua motivação está impulsionando seu aprendizado de programação.",
        leftChoice: "Focar nos estudos",
        rightChoice: "Relaxar um pouco",
        leftEffect: { knowledge: 15, energy: -10 },
        rightEffect: { energy: 10, robots: 5 },
        triggerConditions: { player_felicidade: { min: 8, max: Infinity } },
        weight: 2
    },
    {
        id: "player_desanimado",
        character: "😞",
        title: "Desânimo Crescente",
        text: "Você está se sentindo desmotivado... Talvez seja hora de encontrar inspiração.",
        leftChoice: "Conversar com Siren",
        rightChoice: "Tentar sozinho",
        leftEffect: { knowledge: 10, energy: 5, robots: -5 },
        rightEffect: { knowledge: -5, energy: -10, robots: -10 },
        triggerConditions: { player_felicidade: { min: -Infinity, max: -5 } },
        weight: 3
    },

    // CONSEQUÊNCIAS DE CONHECIMENTO DO PLAYER
    {
        id: "insight_programming",
        character: "💡",
        title: "Insight de Programação",
        text: "Você teve uma epifania! Conceitos de POO estão fazendo sentido agora.",
        leftChoice: "Aplicar nos robôs",
        rightChoice: "Estudar mais teoria",
        leftEffect: { robots: 20, knowledge: 10, energy: -5 },
        rightEffect: { knowledge: 25, energy: -10 },
        triggerConditions: { player_conhecimento: { min: 12, max: Infinity } },
        weight: 2
    },
    {
        id: "confusion_concepts",
        character: "❓",
        title: "Confusão Conceitual",
        text: "Você está confuso com tantos conceitos novos... Classes, objetos, métodos...",
        leftChoice: "Revisar fundamentos",
        rightChoice: "Pedir ajuda à Siren",
        leftEffect: { knowledge: 10, energy: -15, robots: -5 },
        rightEffect: { knowledge: 15, energy: -5, robots: 5 },
        triggerConditions: { player_conhecimento: { min: -Infinity, max: 3 } },
        weight: 3
    },

    // CONSEQUÊNCIAS DE FELICIDADE DO ROBÔ
    {
        id: "robo_loyal",
        character: "🤖💙",
        title: "Robô Leal",
        text: "Seu robô demonstra lealdade! Ele está executando comandos com mais eficiência.",
        leftChoice: "Elogiar o robô",
        rightChoice: "Dar upgrade",
        leftEffect: { robots: 15, energy: 5 },
        rightEffect: { robots: 20, energy: -10, resources: -5 },
        triggerConditions: { robo_felicidade: { min: 8, max: Infinity } },
        weight: 2
    },
    {
        id: "robo_rebellion",
        character: "🤖😠",
        title: "Rebelião do Robô",
        text: "Seu robô está resistindo aos comandos! Parece que ele não está feliz com suas modificações.",
        leftChoice: "Forçar obediência",
        rightChoice: "Tentar entender o problema",
        leftEffect: { robots: -10, energy: -5, resources: 5 },
        rightEffect: { robots: 5, energy: -10, knowledge: 10 },
        triggerConditions: { robo_felicidade: { min: -Infinity, max: -5 } },
        weight: 3
    },

    // CONSEQUÊNCIAS DE ATAQUE DO ROBÔ
    {
        id: "robo_powerful",
        character: "🤖⚔️",
        title: "Robô Poderoso",
        text: "Seu robô desenvolveu capacidades de combate impressionantes! Outros robôs o respeitam.",
        leftChoice: "Treinar mais",
        rightChoice: "Ensinar outros robôs",
        leftEffect: { robots: 25, energy: -15 },
        rightEffect: { robots: 15, knowledge: 10, energy: -10 },
        triggerConditions: { robo_ataque: { min: 12, max: Infinity } },
        weight: 2
    },
    {
        id: "robo_weak_attack",
        character: "🤖💤",
        title: "Ataque Fraco",
        text: "Seu robô está com dificuldades em combate. Talvez precise de melhorias em seus algoritmos de ataque.",
        leftChoice: "Otimizar algoritmos",
        rightChoice: "Treinar fundamentos",
        leftEffect: { robots: 10, knowledge: 15, energy: -20 },
        rightEffect: { robots: 5, knowledge: 10, energy: -10 },
        triggerConditions: { robo_ataque: { min: -Infinity, max: 3 } },
        weight: 3
    },

    // CONSEQUÊNCIAS DE VULNERABILIDADE DO ROBÔ
    {
        id: "security_breach",
        character: "🔓",
        title: "Brecha de Segurança",
        text: "Inimigos descobriram vulnerabilidades em seu robô! Urgente: corrigir falhas de segurança.",
        leftChoice: "Patch de emergência",
        rightChoice: "Reescrever código de segurança",
        leftEffect: { robots: 10, energy: -10, resources: -5 },
        rightEffect: { robots: -5, knowledge: 20, energy: -25 },
        triggerConditions: { robo_vulnerabilidade: { min: 10, max: Infinity } },
        weight: 4
    },

    // CONSEQUÊNCIAS DE DEFESA DO ROBÔ
    {
        id: "fortress_mode",
        character: "🛡️",
        title: "Modo Fortaleza",
        text: "Seu robô ativou protocolos de defesa avançados! Ele está quase impenetrável.",
        leftChoice: "Manter defesa alta",
        rightChoice: "Balancear com ataque",
        leftEffect: { robots: 20, energy: -5 },
        rightEffect: { robots: 15, energy: -10, knowledge: 5 },
        triggerConditions: { robo_defesa: { min: 12, max: Infinity } },
        weight: 2
    },

    // CONSEQUÊNCIAS DE GRATIDÃO DOS NPCs
    {
        id: "siren_gift",
        character: "👩‍🦰🎁",
        title: "Presente da Siren",
        text: "Siren fica impressionada com seu progresso! Ela oferece recursos extras para ajudar.",
        leftChoice: "Aceitar recursos",
        rightChoice: "Pedir conhecimento",
        leftEffect: { resources: 20, energy: 10 },
        rightEffect: { knowledge: 20, robots: 10 },
        triggerConditions: { npc_gratitude: { min: 8, max: Infinity } },
        weight: 1
    },
    {
        id: "npc_concerns",
        character: "👥😟",
        title: "Preocupações dos NPCs",
        text: "Os habitantes locais estão preocupados com seus métodos. Talvez você devesse ser mais cuidadoso.",
        leftChoice: "Ignorar preocupações",
        rightChoice: "Ouvir conselhos",
        leftEffect: { robots: 10, energy: -5, knowledge: -5 },
        rightEffect: { robots: 5, knowledge: 15, energy: -10 },
        triggerConditions: { npc_felicidade: { min: -Infinity, max: -3 } },
        weight: 2
    },

    // CONSEQUÊNCIAS NEUTRAS/POSITIVAS
    {
        id: "ancient_code_library",
        character: "📚",
        title: "Biblioteca de Códigos Antigos",
        text: "Você encontra uma biblioteca com algoritmos perdidos! Há padrões de design aqui.",
        leftChoice: "Estudar padrões de design",
        rightChoice: "Focar em algoritmos",
        leftEffect: { knowledge: 15, energy: -10 },
        rightEffect: { robots: 15, energy: -5 },
        triggerConditions: {},
        weight: 1
    },
    {
        id: "fellow_programmer",
        character: "👨‍💻",
        title: "Programador Companheiro",
        text: "Você encontra outro programador perdido! Ele oferece trocar conhecimentos.",
        leftChoice: "Trocar dicas de POO",
        rightChoice: "Trocar recursos",
        leftEffect: { knowledge: 20, robots: 5 },
        rightEffect: { resources: 15, energy: 10 },
        triggerConditions: {},
        weight: 1
    },
    {
        id: "debug_session",
        character: "🐛",
        title: "Sessão de Debug",
        text: "Hora de debug! Você encontra alguns bugs interessantes no código do mundo.",
        leftChoice: "Corrigir bugs",
        rightChoice: "Explorar bugs",
        leftEffect: { knowledge: 15, robots: 10, energy: -15 },
        rightEffect: { knowledge: 5, robots: -5, energy: 5 },
        triggerConditions: {},
        weight: 1
    }
];

// Status ocultos iniciais (atualizados)
const INITIAL_HIDDEN_STATUS = {
    // Player
    player_felicidade: 0,
    player_conhecimento: 0,
    
    // Robô
    robo_felicidade: 0,
    robo_ataque: 0,
    robo_vulnerabilidade: 0,
    robo_defesa: 0,
    
    // NPCs
    npc_felicidade: 0,
    npc_gratitude: 0
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