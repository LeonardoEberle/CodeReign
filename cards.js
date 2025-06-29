// cards.js - História linear do jogo Reigns

const GAME_CARDS = [
    // === CAPÍTULO 1: A ASCENSÃO AO TRONO ===
    {
        character: "👑",
        title: "O Coroamento",
        text: "Acabaste de ser coroado rei! Teu primeiro conselheiro se aproxima com um olhar preocupado. 'Majestade, herdaste um reino em crise. Como desejais começar vosso reinado?'",
        leftChoice: "Ser humilde e cauteloso",
        rightChoice: "Mostrar força e autoridade",
        leftEffect: { people: 15, church: 10, treasury: -5 },
        rightEffect: { army: 15, treasury: 5, people: -10 }
    },
    {
        character: "👨‍⚖️",
        title: "O Primeiro Conselho",
        text: "Vosso conselheiro real vos informa: 'Majestade, os cofres estão quase vazios, mas o povo já sofre com os impostos. O que fareis?'",
        leftChoice: "Manter impostos baixos",
        rightChoice: "Aumentar impostos",
        leftEffect: { people: 15, treasury: -10 },
        rightEffect: { people: -20, treasury: 20, army: 5 }
    },
    {
        character: "⛪",
        title: "A Igreja se Pronuncia",
        text: "O Alto Clérigo vos procura: 'Sire, a igreja sempre apoiou a coroa. Mas o povo questiona nossa fé. Uma nova catedral mostraria vossa devoção.'",
        leftChoice: "Não construir ainda",
        rightChoice: "Construir a catedral",
        leftEffect: { church: -10, treasury: 5, people: 5 },
        rightEffect: { church: 20, treasury: -25, people: -5 }
    },
    
    // === CAPÍTULO 2: PRIMEIROS DESAFIOS ===
    {
        character: "🌾",
        title: "A Grande Fome",
        text: "Um camponês desesperado implora: 'Majestade! A colheita falhou! As crianças choram de fome! Abri os celeiros reais, por favor!'",
        leftChoice: "Guardar os grãos",
        rightChoice: "Distribuir a comida",
        leftEffect: { people: -20, treasury: 10, army: 5 },
        rightEffect: { people: 25, treasury: -15, church: 10 }
    },
    {
        character: "🗡️",
        title: "Bandidos nas Estradas",
        text: "Vosso cavaleiro mais leal reporta: 'Meu rei, bandidos atacam as caravanas! O comércio está parando e o povo tem medo de viajar!'",
        leftChoice: "Ignorar por ora",
        rightChoice: "Caçar os bandidos",
        leftEffect: { people: -15, treasury: -5, army: -5 },
        rightEffect: { people: 15, army: -10, treasury: 5 }
    },
    {
        character: "⚔️",
        title: "Ameaça Externa",
        text: "Vosso general se aproxima alarmado: 'Senhor! Espiões reportam que o reino vizinho está reunindo tropas na fronteira. Precisamos agir!'",
        leftChoice: "Tentar diplomacia",
        rightChoice: "Recrutar mais soldados",
        leftEffect: { army: -5, treasury: 5, church: 5 },
        rightEffect: { army: 20, treasury: -20, people: -10 }
    },
    
    // === CAPÍTULO 3: CONSOLIDAÇÃO DO PODER ===
    {
        character: "🏰",
        title: "Fortalecendo a Capital",
        text: "O arquiteto real vos apresenta planos: 'Majestade, nossa capital precisa de muros mais altos. Os tempos são incertos e a defesa é vital!'",
        leftChoice: "Adiar a construção",
        rightChoice: "Construir os muros",
        leftEffect: { army: -5, treasury: 10, people: 5 },
        rightEffect: { army: 15, treasury: -30, people: -5 }
    },
    {
        character: "📚",
        title: "O Futuro do Reino",
        text: "Um erudito vos aborda: 'Sire, um reino próspero precisa de súditos educados. Uma universidade traria conhecimento e prosperidade!'",
        leftChoice: "Focar em outras prioridades",
        rightChoice: "Fundar a universidade",
        leftEffect: { people: -5, treasury: 5, army: 5 },
        rightEffect: { people: 20, treasury: -20, church: -5 }
    },
    {
        character: "🎭",
        title: "A Moral do Povo",
        text: "Um artista da corte sugere: 'Majestade, o povo está desanimado. Um grande festival real mostraria que vos importais com sua felicidade!'",
        leftChoice: "Economizar recursos",
        rightChoice: "Realizar o festival",
        leftEffect: { people: -10, treasury: 10, church: -5 },
        rightEffect: { people: 25, treasury: -15, church: 5 }
    },
    
    // === CAPÍTULO 4: DECISÕES FINAIS ===
    {
        character: "👨‍⚖️",
        title: "O Legado Real",
        text: "Vosso conselheiro reflete: 'Majestade, vosso reinado está sendo observado pela história. Como quereis ser lembrado pelas futuras gerações?'",
        leftChoice: "Como um rei justo",
        rightChoice: "Como um rei poderoso",
        leftEffect: { people: 20, church: 15, treasury: -10 },
        rightEffect: { army: 20, treasury: 10, people: -15 }
    },
    {
        character: "⚖️",
        title: "A Última Decisão",
        text: "Um momento crucial chegou. Vosso reino enfrenta sua maior prova. Todas as decisões anteriores levaram a este momento. Como reagireis?",
        leftChoice: "Com sabedoria e paciência",
        rightChoice: "Com força e determinação",
        leftEffect: { people: 15, church: 10, army: -5 },
        rightEffect: { army: 15, treasury: 5, people: -10 }
    }
];

// Exporta as cartas para uso em outros arquivos
// Para compatibilidade com diferentes sistemas de módulos
if (typeof module !== 'undefined' && module.exports) {
    // Node.js/CommonJS
    module.exports = GAME_CARDS;
} else if (typeof window !== 'undefined') {
    // Browser/Global
    window.GAME_CARDS = GAME_CARDS;
}