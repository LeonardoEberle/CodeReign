// cards.js - Sistema de Cartas-Chave e Consequências

// ========================================
// CARTAS-CHAVE POR CAPÍTULO (Obrigatórias)
// ========================================

const CHAPTER_KEY_CARDS = {
    1: [ // CAPÍTULO 1: Fundação do Reino
        {
            id: "coronation",
            character: "👑",
            title: "O Coroamento",
            text: "Acabaste de ser coroado rei! Teu primeiro conselheiro se aproxima com um olhar preocupado. 'Majestade, herdaste um reino em crise. Como desejais começar vosso reinado?'",
            leftChoice: "Ser humilde e cauteloso",
            rightChoice: "Mostrar força e autoridade",
            leftEffect: { people: 15, church: 10, treasury: -5 },
            rightEffect: { army: 15, treasury: 5, people: -10 },
            leftHiddenEffects: { churchSatisfaction: 5, peopleTrust: 10 },
            rightHiddenEffects: { militaryLoyalty: 10, nobleSupport: 5 }
        },
        {
            id: "first_tax_decision", 
            character: "👨‍⚖️",
            title: "A Primeira Tributação",
            text: "Vosso conselheiro real vos informa: 'Majestade, os cofres estão quase vazios, mas o povo já sofre com os impostos. Como procedereis?'",
            leftChoice: "Manter impostos baixos",
            rightChoice: "Aumentar impostos",
            leftEffect: { people: 15, treasury: -10 },
            rightEffect: { people: -20, treasury: 20, army: 5 },
            leftHiddenEffects: { peopleTrust: 10, economicStability: -5 },
            rightHiddenEffects: { peopleTrust: -15, economicStability: 10, nobleSupport: 5 }
        },
        {
            id: "church_position",
            character: "⛪",
            title: "Posição da Igreja",
            text: "O Alto Clérigo vos procura: 'Sire, a igreja sempre apoiou a coroa. Mas o povo questiona nossa fé. Qual será vossa posição?'",
            leftChoice: "Manter neutralidade religiosa",
            rightChoice: "Apoiar fortemente a igreja",
            leftEffect: { church: -10, people: 10, treasury: 5 },
            rightEffect: { church: 25, treasury: -15, people: -5 },
            leftHiddenEffects: { churchSatisfaction: -10, religiousConflict: 5 },
            rightHiddenEffects: { churchSatisfaction: 15, religiousConflict: -5 }
        },
        {
            id: "military_stance",
            character: "⚔️",
            title: "Doutrina Militar", 
            text: "Vosso general questiona: 'Majestade, qual será nossa postura militar? Diplomacia ou preparação para guerra?'",
            leftChoice: "Priorizar diplomacia",
            rightChoice: "Fortalecer o exército",
            leftEffect: { army: -10, people: 10, treasury: 5 },
            rightEffect: { army: 20, treasury: -20, people: -5 },
            leftHiddenEffects: { foreignRelations: 10, militaryLoyalty: -5 },
            rightHiddenEffects: { foreignRelations: -5, militaryLoyalty: 15 }
        },
        {
            id: "economic_policy",
            character: "💰",
            title: "Política Econômica",
            text: "Vosso tesoureiro apresenta planos: 'Majestade, como devemos gerenciar a economia do reino? Investimento ou poupança?'",
            leftChoice: "Guardar recursos",
            rightChoice: "Investir no crescimento",
            leftEffect: { treasury: 15, people: -10 },
            rightEffect: { treasury: -15, people: 15, army: 5 },
            leftHiddenEffects: { economicStability: 10, tradeRelations: -5 },
            rightHiddenEffects: { economicStability: -5, tradeRelations: 10 }
        }
    ],
    
    2: [ // CAPÍTULO 2: Primeiros Desafios
        {
            id: "great_famine",
            character: "🌾",
            title: "A Grande Fome",
            text: "Um camponês desesperado implora: 'Majestade! A colheita falhou! As crianças choram de fome! Como respondereis?'",
            leftChoice: "Reservar recursos",
            rightChoice: "Distribuir tudo disponível",
            leftEffect: { people: -25, treasury: 10 },
            rightEffect: { people: 20, treasury: -20, church: 10 },
            leftHiddenEffects: { peopleTrust: -20, socialUnrest: 15 },
            rightHiddenEffects: { peopleTrust: 15, socialUnrest: -10 }
        },
        {
            id: "bandit_crisis",
            character: "🗡️",
            title: "A Crise dos Bandidos",
            text: "Bandidos tomaram as estradas principais! O comércio parou e o povo vive em terror. Qual será vossa resposta?",
            leftChoice: "Negociar com os bandidos",
            rightChoice: "Exterminá-los com força",
            leftEffect: { people: -10, treasury: -10, army: -5 },
            rightEffect: { people: 15, army: -15, treasury: 5 },
            leftHiddenEffects: { lawAndOrder: -15, corruption: 10 },
            rightHiddenEffects: { lawAndOrder: 15, militaryLoyalty: 5 }
        },
        {
            id: "foreign_threat",
            character: "🏰",
            title: "Ameaça Estrangeira",
            text: "Espiões reportam tropas inimigas na fronteira! A guerra pode estar próxima. Como vos preparareis?",
            leftChoice: "Buscar aliados diplomáticos",
            rightChoice: "Mobilização militar total",
            leftEffect: { army: -5, treasury: -5, church: 5 },
            rightEffect: { army: 25, treasury: -25, people: -10 },
            leftHiddenEffects: { foreignRelations: 15, warPreparation: -5 },
            rightHiddenEffects: { foreignRelations: -10, warPreparation: 20 }
        },
        {
            id: "noble_rebellion",
            character: "👑",
            title: "Rebelião dos Nobres",
            text: "Alguns nobres questionam vossa autoridade! Sussurros de traição ecoam na corte. Como reagireis?",
            leftChoice: "Fazer concessões aos nobres",
            rightChoice: "Punir severamente os traidores",
            leftEffect: { treasury: -15, army: -10, church: 5 },
            rightEffect: { people: -15, army: 10, treasury: 5 },
            leftHiddenEffects: { nobleSupport: 10, royalAuthority: -10 },
            rightHiddenEffects: { nobleSupport: -15, royalAuthority: 15 }
        },
        {
            id: "plague_outbreak",
            character: "💀",
            title: "Surto de Peste",
            text: "Uma doença misteriosa se espalha pelo reino! O povo clama por ação. Como combatereis este mal?",
            leftChoice: "Quarentena rigorosa",
            rightChoice: "Buscar cura através da fé",
            leftEffect: { people: -20, treasury: -10, army: -5 },
            rightEffect: { church: 15, people: -10, treasury: -5 },
            leftHiddenEffects: { diseaseControl: 15, socialUnrest: 10 },
            rightHiddenEffects: { diseaseControl: 5, churchSatisfaction: 10 }
        }
    ],
    
    3: [ // CAPÍTULO 3: Consolidação
        {
            id: "capital_fortification",
            character: "🏗️",
            title: "Fortificação da Capital",
            text: "Com as ameaças crescentes, vossa capital precisa de defesas. Mas o custo será enorme. Vale o investimento?",
            leftChoice: "Construir defesas básicas",
            rightChoice: "Criar fortaleza impenetrável",
            leftEffect: { army: 10, treasury: -15 },
            rightEffect: { army: 25, treasury: -35, people: -10 },
            leftHiddenEffects: { capitalDefense: 10, economicStability: -5 },
            rightHiddenEffects: { capitalDefense: 25, economicStability: -15 }
        },
        {
            id: "education_system",
            character: "📚",
            title: "Sistema de Educação",
            text: "Um erudito propõe: 'Majestade, precisamos educar o povo para prosperar. Uma universidade mudaria tudo!'",
            leftChoice: "Educação básica para todos",
            rightChoice: "Universidade de elite",
            leftEffect: { people: 15, treasury: -10, church: -5 },
            rightEffect: { treasury: -25, army: 5, church: 10 },
            leftHiddenEffects: { education: 15, socialMobility: 10 },
            rightHiddenEffects: { education: 25, socialMobility: -5, nobleSupport: 5 }
        },
        {
            id: "trade_expansion",
            character: "🚢",
            title: "Expansão Comercial",
            text: "Mercadores propõem rotas comerciais arriscadas mas lucrativas. O investimento vale o risco?",
            leftChoice: "Rotas comerciais seguras",
            rightChoice: "Explorar novos mercados",
            leftEffect: { treasury: 10, people: 5 },
            rightEffect: { treasury: 20, people: -5, army: -5 },
            leftHiddenEffects: { tradeRelations: 5, economicStability: 10 },
            rightHiddenEffects: { tradeRelations: 15, economicStability: -5 }
        },
        {
            id: "cultural_development",
            character: "🎭",
            title: "Desenvolvimento Cultural",
            text: "Artistas pedem apoio real para criar obras magníficas. A cultura eleva o reino, mas custa caro.",
            leftChoice: "Apoio modesto às artes",
            rightChoice: "Patronato real grandioso",
            leftEffect: { people: 10, treasury: -5 },
            rightEffect: { people: 20, treasury: -20, church: 5 },
            leftHiddenEffects: { culturalInfluence: 5, royalPrestige: 5 },
            rightHiddenEffects: { culturalInfluence: 15, royalPrestige: 10 }
        },
        {
            id: "succession_planning",
            character: "👶",
            title: "Planejamento Sucessório",
            text: "Conselheiros sussurram sobre sucessão. Como garantireis a continuidade de vossa linhagem?",
            leftChoice: "Buscar casamento político",
            rightChoice: "Fortalecer legitimidade atual",
            leftEffect: { army: 5, treasury: -10, church: 10 },
            rightEffect: { people: 15, treasury: -5, army: -5 },
            leftHiddenEffects: { foreignRelations: 10, dynasticSecurity: 5 },
            rightHiddenEffects: { royalAuthority: 10, dynasticSecurity: 10 }
        }
    ],
    
    4: [ // CAPÍTULO 4: Legado Final
        {
            id: "final_war",
            character: "⚔️",
            title: "A Guerra Final",
            text: "O conflito que se aproximava finalmente chegou! Como liderareis vosso reino nesta hora decisiva?",
            leftChoice: "Estratégia defensiva",
            rightChoice: "Ataque preventivo",
            leftEffect: { army: -10, people: 10, treasury: -5 },
            rightEffect: { army: 15, people: -15, treasury: -15 },
            leftHiddenEffects: { warPreparation: 5, casualties: -10 },
            rightHiddenEffects: { warPreparation: 15, casualties: 5 }
        },
        {
            id: "economic_crisis",
            character: "💸",
            title: "A Grande Crise Econômica",
            text: "Os cofres estão vazios e o povo sofre! Esta é a maior prova de vossa capacidade de liderança.",
            leftChoice: "Medidas de austeridade",
            rightChoice: "Investimento arriscado",
            leftEffect: { people: -20, treasury: 15 },
            rightEffect: { treasury: -20, people: 15, army: 10 },
            leftHiddenEffects: { economicStability: 15, socialUnrest: 10 },
            rightHiddenEffects: { economicStability: -10, socialUnrest: -5 }
        },
        {
            id: "religious_schism",
            character: "⛪",
            title: "O Grande Cisma",
            text: "A igreja se divide! Vossa posição determinará o futuro espiritual do reino para sempre.",
            leftChoice: "Apoiar tradição",
            rightChoice: "Abraçar reformas",
            leftEffect: { church: 20, people: -10, treasury: -5 },
            rightEffect: { church: -15, people: 20, treasury: 5 },
            leftHiddenEffects: { religiousConflict: -10, churchSatisfaction: 15 },
            rightHiddenEffects: { religiousConflict: 15, churchSatisfaction: -20 }
        },
        {
            id: "peoples_uprising",
            character: "🔥",
            title: "O Levante Popular",
            text: "O povo se levanta! Todas as vossas decisões anteriores levaram a este momento crucial.",
            leftChoice: "Negociar com os revoltosos",
            rightChoice: "Suprimir com força",
            leftEffect: { people: 15, army: -20, treasury: -10 },
            rightEffect: { people: -25, army: 10, treasury: 5 },
            leftHiddenEffects: { socialUnrest: -15, royalAuthority: -10 },
            rightHiddenEffects: { socialUnrest: 5, royalAuthority: 15 }
        },
        {
            id: "legacy_decision",
            character: "📜",
            title: "A Decisão do Legado",
            text: "Chegou a hora de definir como sereis lembrado pela história. Qual será vosso último grande ato?",
            leftChoice: "Abdicar em favor da paz",
            rightChoice: "Reinar até o fim",
            leftEffect: { people: 20, church: 15, army: -15 },
            rightEffect: { army: 15, treasury: 10, people: -10 },
            leftHiddenEffects: { royalAuthority: -20, peacefulTransition: 20 },
            rightHiddenEffects: { royalAuthority: 15, peacefulTransition: -10 }
        }
    ]
};

// ========================================
// CARTAS DE CONSEQUÊNCIA (Aleatórias baseadas em status ocultos)
// ========================================

const CONSEQUENCE_CARDS = [
    // CONSEQUÊNCIAS DE BAIXA SATISFAÇÃO DA IGREJA
    {
        id: "church_revolt_1",
        character: "⛪",
        title: "Revolta do Clero",
        text: "Sacerdotes se recusam a realizar cerimônias! 'O rei perdeu a benção divina', dizem.",
        leftChoice: "Tentar reconciliação",
        rightChoice: "Impor autoridade real",
        leftEffect: { church: 15, treasury: -10 },
        rightEffect: { church: -10, army: 5, people: -5 },
        triggerConditions: { churchSatisfaction: { min: -Infinity, max: -10 } },
        weight: 3
    },
    {
        id: "heresy_accusations",
        character: "🔥",
        title: "Acusações de Heresia",
        text: "Rumores se espalham de que sois um herege! A fé do povo vacila.",
        leftChoice: "Demonstrar piedade pública",
        rightChoice: "Ignorar as acusações",
        leftEffect: { church: 20, treasury: -15, people: 5 },
        rightEffect: { church: -15, people: -10 },
        triggerConditions: { churchSatisfaction: { min: -Infinity, max: -15 } },
        weight: 2
    },

    // CONSEQUÊNCIAS DE BAIXA CONFIANÇA DO POVO
    {
        id: "tax_revolt",
        character: "💸",
        title: "Revolta dos Impostos",
        text: "O povo se recusa a pagar mais tributos! 'Morte aos tiranos!' gritam nas ruas.",
        leftChoice: "Reduzir impostos temporariamente",
        rightChoice: "Usar força para coletar",
        leftEffect: { people: 15, treasury: -20 },
        rightEffect: { people: -20, army: -5, treasury: 10 },
        triggerConditions: { peopleTrust: { min: -Infinity, max: -15 } },
        weight: 3
    },
    {
        id: "bread_riots",
        character: "🍞",
        title: "Motins do Pão",
        text: "Multidões famintas atacam padarias! O desespero se espalha como fogo.",
        leftChoice: "Distribuir comida dos celeiros",
        rightChoice: "Enviar guardas para manter ordem",
        leftEffect: { people: 20, treasury: -15 },
        rightEffect: { people: -15, army: -10 },
        triggerConditions: { peopleTrust: { min: -Infinity, max: -10 } },
        weight: 2
    },

    // CONSEQUÊNCIAS DE BAIXA LEALDADE MILITAR
    {
        id: "desertion_crisis",
        character: "🏃",
        title: "Crise de Deserção",
        text: "Soldados abandonam seus postos! 'Não morreremos por um rei covarde!'",
        leftChoice: "Melhorar condições militares",
        rightChoice: "Punir desertores severamente",
        leftEffect: { army: 15, treasury: -20 },
        rightEffect: { army: -15, people: -10 },
        triggerConditions: { militaryLoyalty: { min: -Infinity, max: -10 } },
        weight: 3
    },
    {
        id: "officer_conspiracy",
        character: "🗡️",
        title: "Conspiração de Oficiais",
        text: "Oficiais sussurram sobre substituir vossa liderança militar.",
        leftChoice: "Confrontar os conspiradores",
        rightChoice: "Fingir ignorância e investigar",
        leftEffect: { army: -10, people: 5 },
        rightEffect: { army: 10, treasury: -5 },
        triggerConditions: { militaryLoyalty: { min: -Infinity, max: -15 } },
        weight: 2
    },

    // CONSEQUÊNCIAS DE INSTABILIDADE ECONÔMICA
    {
        id: "merchant_boycott",
        character: "🏪",
        title: "Boicote dos Mercadores",
        text: "Comerciantes se recusam a negociar! O comércio para e os preços sobem.",
        leftChoice: "Oferecer incentivos comerciais",
        rightChoice: "Forçar comércio por decreto",
        leftEffect: { treasury: -15, people: 10 },
        rightEffect: { treasury: 5, people: -15 },
        triggerConditions: { economicStability: { min: -Infinity, max: -10 } },
        weight: 2
    },
    {
        id: "currency_crisis",
        character: "💰",
        title: "Crise Monetária",
        text: "As moedas do reino perdem valor! Ninguém confia no tesouro real.",
        leftChoice: "Reformar sistema monetário",
        rightChoice: "Voltar ao escambo",
        leftEffect: { treasury: -20, people: -5 },
        rightEffect: { treasury: 5, people: -10, army: -5 },
        triggerConditions: { economicStability: { min: -Infinity, max: -15 } },
        weight: 3
    },

    // CONSEQUÊNCIAS NEUTRAS/POSITIVAS
    {
        id: "foreign_diplomat",
        character: "🎩",
        title: "Diplomata Estrangeiro",
        text: "Um embaixador oferece uma aliança vantajosa, mas há condições.",
        leftChoice: "Aceitar a aliança",
        rightChoice: "Manter independência",
        leftEffect: { army: 10, treasury: 10, people: -5 },
        rightEffect: { people: 10, army: -5 },
        triggerConditions: {},
        weight: 1
    },
    {
        id: "travelling_merchant",
        character: "🎒",
        title: "Mercador Viajante",
        text: "Um comerciante oferece mercadorias exóticas por um preço especial.",
        leftChoice: "Comprar para a corte",
        rightChoice: "Comprar para o povo",
        leftEffect: { church: 5, treasury: -10 },
        rightEffect: { people: 15, treasury: -15 },
        triggerConditions: {},
        weight: 1
    },
    {
        id: "harvest_festival",
        character: "🌽",
        title: "Festival da Colheita",
        text: "É época de celebrar a colheita! Como participareis das festividades?",
        leftChoice: "Festival simples e econômico",
        rightChoice: "Grande celebração real",
        leftEffect: { people: 10, treasury: -5 },
        rightEffect: { people: 20, treasury: -15, church: 5 },
        triggerConditions: {},
        weight: 1
    }
];

// Status ocultos iniciais
const INITIAL_HIDDEN_STATUS = {
    churchSatisfaction: 0,
    peopleTrust: 0,
    militaryLoyalty: 0,
    nobleSupport: 0,
    economicStability: 0,
    foreignRelations: 0,
    lawAndOrder: 0,
    corruption: 0,
    religiousConflict: 0,
    socialUnrest: 0,
    warPreparation: 0,
    tradeRelations: 0,
    education: 0,
    culturalInfluence: 0,
    royalAuthority: 0,
    royalPrestige: 0,
    dynasticSecurity: 0,
    diseaseControl: 0,
    socialMobility: 0,
    capitalDefense: 0,
    casualties: 0,
    peacefulTransition: 0
};

// Exportar para compatibilidade
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CHAPTER_KEY_CARDS,
        CONSEQUENCE_CARDS,
        INITIAL_HIDDEN_STATUS
    };
} else if (typeof window !== 'undefined') {
    window.CHAPTER_KEY_CARDS = CHAPTER_KEY_CARDS;
    window.CONSEQUENCE_CARDS = CONSEQUENCE_CARDS;
    window.INITIAL_HIDDEN_STATUS = INITIAL_HIDDEN_STATUS;
}