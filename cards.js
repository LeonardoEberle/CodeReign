const INTRO_CARDS = [
 {
        id: "awakening",
        character: "😴",
        title: "O Despertar",
        text: "Seus olhos se abrem lentamente... Onde antes havia o teto familiar do seu quarto, agora paira um céu estrelado que parece... pixelado? O ar cheira a código antigo e magia digital. Torres de pedra se erguem ao longe, suas texturas alternando entre o medieval e o computacional, como se a realidade não conseguisse decidir sua resolução.",
        leftChoice: "Levantar e explorar este mundo impossível",
        rightChoice: "Observar cautelosamente os arredores",
        leftEffect: {},
        rightEffect: {},
        leftHiddenEffects: {},
        rightHiddenEffects: {},
        isIntro: true
    },
    {
        id: "the_call",
        character: "👩‍🦰",
        title: "O Chamado",
        text: "\"Fascinante... Outro Viajante dos Mundos!\" Uma voz melodiosa corta o silêncio. Diante de você, uma jovem de cabelos ruivos flamejantes e olhos que brilham com o conhecimento de mil algoritmos. \"Sou Siren, Guardiã do Limiar\", ela sussurra, circundando você com curiosidade quase predatória. \"Você é um programador, não é? O Portal só se abre para mentes obcecadas com código...\"",
        leftChoice: "\"Onde diabos eu estou?!\"",
        rightChoice: "\"Prazer, sou [seu nome]. Portal? Que portal?\"",
        leftEffect: {},
        rightEffect: {},
        leftHiddenEffects: {},
        rightHiddenEffects: {},
        isIntro: true
    },
    {
        id: "the_mission",
        character: "⚔️",
        title: "A Missão",
        text: "O sorriso de Siren se alarga, revelando uma mistura perturbadora de compaixão e expectativa. \"Bem-vindo ao Mundo dos Objetos, onde conceitos ganham vida e bugs podem ser letais! Para retornar ao seu mundo...\" ela pausa dramaticamente, \"você deve derrotar O Grande Programador e seus temíveis Cavaleiros da Orientação a Objetos. Eles corromperam este reino com código espaguete e padrões destrutivos!\" Raios pixelados cortam o céu, como se o próprio mundo reagisse à menção do vilão.",
        leftChoice: "\"Não! Isso é loucura! Me mande de volta agora!\"",
        rightChoice: "\"Se é o único jeito... Aceito o desafio!\"",
        leftEffect: {},
        rightEffect: {},
        leftHiddenEffects: { gameOver: true },
        rightHiddenEffects: {},
        isIntro: true
    },
    {
        id: "preparation",
        character: "🤖",
        title: "A Preparação",
        text: "Siren estende as mãos, revelando o que parece ser uma pequena estátua de argila com runas brilhantes gravadas em sua superfície. \"Não é uma simples estátua\", ela explica enquanto as runas pulsam com vida própria. \"É um Golem Primordial - uma tela em branco esperando seu código. Os antigos os chamavam de 'Objetos Não Instanciados'. Este será seu primeiro companheiro, sua primeira... criação.\" O golem emite um zumbido suave, como um computador inicializando.",
        leftChoice: "\"Err... o que exatamente eu faço com isso?\"",
        rightChoice: "\"Fascinante! Um objeto esperando ser instanciado!\"",
        leftEffect: {},
        rightEffect: {},
        leftHiddenEffects: {},
        rightHiddenEffects: {},
        isIntro: true
    },
    {
        id: "modifier_intro",
        character: "💻",
        title: "Modificador",
        text: "\"Ah, mas um programador sem suas ferramentas é como um mago sem varinha!\" Siren gira dramaticamente, materializando das sombras um artefato peculiar: um livro antigo que brilha com luz de LED, suas páginas alternando entre pergaminho medieval e tela de código. \"O Grimório Digital - metade magia ancestral, metade IDE moderna. Com ele, você poderá reescrever a essência dos golems, debugar maldições e compilar feitiços!\" O livro vibra em suas mãos, ansioso por ser usado.",
        leftChoice: "\"Ok, acho que entendi...\" *folhear nervosamente*",
        rightChoice: "\"Incrível! É como um laptop místico!\" *abraçar o grimório*",
        leftEffect: {},
        rightEffect: {},
        leftHiddenEffects: {},
        rightHiddenEffects: {},
        isIntro: true
    },
    {
        id: "context",
        character: "📜",
        title: "Contexto",
        text: "O vento digital sopra. Siren fecha os olhos, como se ouvisse algo além. \"Os Cavaleiros da Orientação a Objetos se aproximam... Você ainda não está pronto.\" Ela aponta para uma torre impossível que desafia a física, construída de blocos que parecem flutuar. \"O Compilador na Torre de Babel++. Esse excêntrico mago ancião conhece os segredos da criação de golems desde a Era do Assembly. Mas cuidado... ele tem o péssimo hábito de transformar em bugs aqueles que desperdiçam seu tempo.\"",
        leftChoice: "\"Torre de Babel++? Compilador? Entendi...\" *engolir em seco*",
        rightChoice: "\"Mal posso esperar para aprender! Vamos lá!\"",
        leftEffect: {},
        rightEffect: {},
        leftHiddenEffects: {},
        rightHiddenEffects: {},
        isIntro: true
    }
];

// ========================================
// CARTAS-CHAVE POR CAPÍTULO (Sequência Fixa)
// ========================================

const CHAPTER_KEY_CARDS = {
        1: [ // CAPÍTULO 1: O Chamado do Código Perdido
        {
            id: "primeira_visao",
            character: "🏰",
            title: "Primeira Visão",
            text: "A Torre de Babel++ se ergue diante de você como um monumento. Cavaleiros com armaduras gravadas em pseudocódigo patrulham a entrada. Ao adentrar, você testemunha um espetáculo hipnotizante: um velho mago faz dançar no ar símbolos que você reconhece - variáveis flutuam como vaga-lumes, operadores matemáticos giram em órbitas, e fragmentos de código se entrelaçam formando constelações de lógica pura. O ar vibra com o zumbido.",
            leftChoice: "\"Por todos os bugs... Onde estou? O que são esses símbolos?\"",
            rightChoice: "\"Você deve ser o lendário Mago Compilador!\"",
            leftEffect: {},
            rightEffect: {},
            leftHiddenEffects: {},
            rightHiddenEffects: {}
        },
        {
            id: "codigo_encantado",
            character: "📖",
            title: "Código Encantado",
            text: "O Compilador se aproxima com passos que ecoam como teclas sendo pressionadas. Seus olhos - verde fosforescente - escaneiam você de cima a baixo, processando sua essência. \"Hmm... Latência aceitável, memória adequada, potencial de processamento... promissor\", ele murmura. Então, com voz estridente, ordena: \"INICIANTE! Se quer dar vida aos golems, comece pelo princípio de tudo - a CLASSE! Escreva em seu grimório: class Golem { }. Este é o molde primordial\"",
            leftChoice: "\"class Golem { }\" *escrever com mãos trêmulas no grimório*",
            rightChoice: "\"Err... parece complicado. Posso tentar depois?\"",
            leftEffect: {},
            rightEffect: {},
            leftHiddenEffects: {},
            rightHiddenEffects: {}
        },
        {
            id: "atributos_vitais",
            character: "💎",
            title: "Atributos Vitais",
            text: "\"EXCELENTE!\" troveja o Compilador, e as paredes tremem com seu entusiasmo. \"Mas uma classe vazia é como um corpo sem alma! Observe...\" Ele gesticula e cristais de dados materializam no ar - rubis representando força, safiras pulsando com energia. \"Todo golem precisa de ATRIBUTOS... Mas CUIDADO!\" seus olhos flamejam, \"escolha os TIPOS corretos, ou seu golem será tão útil quanto um bardo pianista\"",
            leftChoice: "\"int energia; int força;\" *números fazem sentido para valores*",
            rightChoice: "\"String energia;\" *texto deve ser mais flexível, certo?*",
            leftEffect: {},
            rightEffect: {},
            leftHiddenEffects: {},
            rightHiddenEffects: {}
        },
        {
            id: "comportamento_magico",
            character: "🎭",
            title: "Comportamento Mágico",
            text: "Uma brisa sopra pela torre, trazendo o perfume digital de Siren. Ela materializa ao seu lado como um processo em segundo plano. \"Impressionante progresso ... Mas escute... atributos dizem o que seu golem É - um inventário de características. Porém...\" ela toca seu grimório e as páginas brilham, \"MÉTODOS dizem o que ele FAZ! Sem ações, seu golem será apenas uma estátua bonita de dados. Dê-lhe o poder de atacar() - transforme potencial em realidade!\"",
            leftChoice: "\"void atacar() { ... }\" *sim! ações, comportamentos!*",
            rightChoice: "\"Acho que só atributos já bastam por ora...\"",
            leftEffect: {},
            rightEffect: {},
            leftHiddenEffects: {},
            rightHiddenEffects: {}
        },
        {
            id: "Construa",
            character: "✨",
            title: "O Nascimento",
            text: "O ar se eletrifica. Raios de código puro dançam entre os dedos do Compilador enquanto Siren observa com expectativa. \"Chegou o momento crucial\", ela proclama, e sua voz ecoa. \"Você criou o molde, definiu características, programou comportamentos... Mas como dar o sopro de vida? Como transformar essa CLASSE em um OBJETO vivo?\" O Compilador se inclina, seus olhos brilhando intensamente: \"Você precisa do CONSTRUTOR - o ritual de nascimento!\"",
            leftChoice: "\"Construtor? Como... como funciona essa magia?\"",
            rightChoice: "\"Espera, a classe sozinha não cria o golem?\"",
            leftEffect: {},
            rightEffect: {},
            leftHiddenEffects: {},
            rightHiddenEffects: {}
        },
    ],

    2: [ // CAPÍTULO 2: O Guardião dos Construtores
        {
            id: "portao_codigo",
            character: "🚪",
            title: "O Portão do Código",
            text: "Diante de uma porta mágica, surge a inscrição luminosa: 'Robo();'. O Guardião dos Construtores aguarda sua resposta.",
            leftChoice: "É um construtor! Cria novos robôs!",
            rightChoice: "Função mágica de invocação?",
            leftEffect: {},
            rightEffect: {},
            leftHiddenEffects: {},
            rightHiddenEffects: {}
        },
        {
            id: "personalizacao_inicial",
            character: "⚡",
            title: "Personalização Inicial",
            text: "O Guardião pergunta: 'Deseja criar um construtor que receba energia inicial para seus robôs?'",
            leftChoice: "Robo(int energia) - Construtor parametrizado",
            rightChoice: "Um construtor padrão já tá bom",
            leftEffect: {},
            rightEffect: {},
            leftHiddenEffects: {},
            rightHiddenEffects: {}
        },
        {
            id: "novo_nivel_controle",
            character: "🔧",
            title: "Novo Nível de Controle",
            text: "Você precisa criar vários tipos de robôs: guerreiros, exploradores, construtores. Como proceder?",
            leftChoice: "Múltiplos construtores com diferentes parâmetros",
            rightChoice: "Um construtor genérico para todos",
            leftEffect: {},
            rightEffect: {},
            leftHiddenEffects: {},
            rightHiddenEffects: {}
        },
        {
            id: "visao_privada",
            character: "🔒",
            title: "Visão Privada",
            text: "Hackers do Reino Sombrio tentam modificar a energia dos seus robôs! Como proteger os atributos?",
            leftChoice: "private int energia; - Ocultar atributos",
            rightChoice: "Deixar público, confio na segurança",
            leftEffect: {},
            rightEffect: {},
            leftHiddenEffects: {},
            rightHiddenEffects: {}
        },
        {
            id: "metodo_secreto",
            character: "🗝️",
            title: "Método Secreto",
            text: "Com atributos privados, como outros objetos poderão ler a energia do robô? O Guardião aguarda sua solução.",
            leftChoice: "getEnergia() - Criar método de acesso",
            rightChoice: "Ler direto o atributo público",
            leftEffect: {},
            rightEffect: {},
            leftHiddenEffects: {},
            rightHiddenEffects: {}
        }
    ],

    3: [ // CAPÍTULO 3: As Alianças de Código
        {
            id: "dois_mundos_encontram",
            character: "🤝",
            title: "Dois Mundos se Encontram",
            text: "Seu Robo precisa trabalhar com a classe Comando para executar estratégias complexas. Como conectá-los?",
            leftChoice: "comando.executar(robo) - Passar como parâmetro",
            rightChoice: "Tentar acessar atributos diretamente",
            leftEffect: {},
            rightEffect: {},
            leftHiddenEffects: {},
            rightHiddenEffects: {}
        },
        {
            id: "ligacao_mistica",
            character: "🔗",
            title: "Ligação Mística",
            text: "Você cria a classe Comando que precisa controlar múltiplos robôs. Qual abordagem usar?",
            leftChoice: "comando.atacarEmGrupo(listaRobos)",
            rightChoice: "Cada robô se vira sozinho",
            leftEffect: {},
            rightEffect: {},
            leftHiddenEffects: {},
            rightHiddenEffects: {}
        },
        {
            id: "mensagem_objetos",
            character: "📨",
            title: "A Mensagem Entre Objetos",
            text: "Como fazer um robô executar ações comandadas por outra classe? Siren observa atentamente.",
            leftChoice: "robo.executarAcao() dentro de Comando",
            rightChoice: "Copiar o código do método",
            leftEffect: {},
            rightEffect: {},
            leftHiddenEffects: {},
            rightHiddenEffects: {}
        },
        {
            id: "retorno_heroi",
            character: "🎁",
            title: "O Retorno do Herói",
            text: "Você precisa de um método que crie e retorne um novo robô configurado. Como implementar?",
            leftChoice: "public Robo criarRoboElite() { return new Robo(100); }",
            rightChoice: "Retornar apenas valores int",
            leftEffect: {},
            rightEffect: {},
            leftHiddenEffects: {},
            rightHiddenEffects: {}
        },
        {
            id: "alianca_final",
            character: "⚔️",
            title: "A Aliança Final",
            text: "Para derrotar os lacaios do Grande Programador, seus robôs devem atacar em perfeita sincronia!",
            leftChoice: "for(Robo r : robos) { r.atacar(); }",
            rightChoice: "robo1.atacar(); robo2.atacar(); ...",
            leftEffect: {},
            rightEffect: {},
            leftHiddenEffects: {},
            rightHiddenEffects: {}
        }
    ],

    4: [ // CAPÍTULO 4: O Polimorfo das Coleções
        {
            id: "chegada_polimorfo",
            character: "🎭",
            title: "A Chegada do Polimorfo",
            text: "Um ser que muda de forma surge! 'Eu posso ser qualquer coisa que implemente Combatente', ele proclama.",
            leftChoice: "interface Combatente { void atacar(); }",
            rightChoice: "Verificar tipo com instanceof sempre",
            leftEffect: {},
            rightEffect: {},
            leftHiddenEffects: {},
            rightHiddenEffects: {}
        },
        {
            id: "mapa_estrategico",
            character: "🗺️",
            title: "Mapa Estratégico",
            text: "Você precisa mapear cada tipo de arma para robôs específicos. Qual estrutura usar?",
            leftChoice: "Map<String, Robo> arsenalRobos",
            rightChoice: "Lista simples e buscar manualmente",
            leftEffect: {},
            rightEffect: {},
            leftHiddenEffects: {},
            rightHiddenEffects: {}
        },
        {
            id: "exercito_unico",
            character: "🛡️",
            title: "Exército Sem Duplicatas",
            text: "O Grande Programador enviou clones! Como garantir que seu exército tenha apenas robôs únicos?",
            leftChoice: "HashSet<Robo> exercitoUnico",
            rightChoice: "ArrayList<Robo> e verificar manualmente",
            leftEffect: {},
            rightEffect: {},
            leftHiddenEffects: {},
            rightHiddenEffects: {}
        },
        {
            id: "formacao_batalha",
            character: "📋",
            title: "Formação de Batalha",
            text: "A ordem de ataque é crucial! Qual estrutura preserva a sequência dos robôs?",
            leftChoice: "ArrayList<Robo> formacaoBatalha",
            rightChoice: "HashSet<Robo> conjunto",
            leftEffect: {},
            rightEffect: {},
            leftHiddenEffects: {},
            rightHiddenEffects: {}
        },
        {
            id: "transformacao_final",
            character: "🌟",
            title: "A Transformação Final",
            text: "Para vencer o Grande Programador, seus robôs devem adaptar comportamento em tempo real!",
            leftChoice: "Usar polimorfismo e interfaces",
            rightChoice: "Gigantesco switch-case",
            leftEffect: {},
            rightEffect: {},
            leftHiddenEffects: {},
            rightHiddenEffects: {}
        }
    ]
};


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