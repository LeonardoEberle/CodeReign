const INTRO_CARDS = [
    {
        id: "awakening",
        image: "images/awakening.png",
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
        image: "images/the_call.png",
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
        image: "images/the_mission.png",
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
        image: "images/preparation.png",
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
        image: "images/modifier_intro.png",
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
        image: "images/context.png",
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

const CHAPTER_KEY_CARDS = {
    1: [ 
        {
            id: "primeira_visao",
            image: "images/primeira_visao.png",
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
            image: "images/codigo_encantado.png",
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
            image: "images/atributos_vitais.png",
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
            image: "images/comportamento_magico.png",
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
            image: "images/Construa.png",
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

    2: [
        {
            id: "portao_codigo",
            image: "images/portao_codigo.png",
            title: "O Portão do Código",
            text: "O Compilador da uma risada e então bate seu cajado no chao. À sua frente, um portão colossal feito de código cintilante aparece. Um ser espectral, o Guardião, se ergue, seus olhos de cristal fixos em você. Uma inscrição queima no ar: 'new Gólem();'. A voz do Guardião ecoa em sua mente: 'Decifre o encantamento.'",
            leftChoice: "\"É um construtor! O ritual para criar um novo Gólem!\"",
            rightChoice: "\"É uma função para invocar um Gólem já existente.\"",
            leftEffect: {},
            rightEffect: {},
            leftHiddenEffects: {},
            rightHiddenEffects: {}
        },
        {
            id: "personalizacao_inicial",
            image: "images/personalizacao_inicial.png",
            title: "A Forja Primordial",
            text: "O Guardião gesticula. Duas projeções de gólens aparecem: um simples e outro crepitando com poder. 'Um nasce como uma tela em branco. O outro, forjado com energia primordial desde o início. Como você imbui essa força no momento da criação?'",
            leftChoice: "\"Definindo um construtor com parâmetros. new Gólem(int energia);\"",
            rightChoice: "\"Dando energia a ele depois de instanciado.\"",
            leftEffect: {},
            rightEffect: {},
            leftHiddenEffects: {},
            rightHiddenEffects: {}
        },
        {
            id: "novo_nivel_controle",
            image: "images/novo_nivel_controle.png",
            title: "Arsenal de Criação",
            text: "Siren aparece, um brilho de urgência em seus olhos. 'Ameaças diferentes exigem gólens diferentes: tanques, batedores, suportes. Uma única forma de criação é ineficiente. Como você pode criar múltiplos 'diagramas' de construção para forjar gólens especializados?'",
            leftChoice: "\"Criando múltiplos construtores com diferentes parâmetros!\"",
            rightChoice: "\"Usando um único construtor com diversas condicionais para definir seu tipo.\"",
            leftEffect: {},
            rightEffect: {},
            leftHiddenEffects: {},
            rightHiddenEffects: {}
        },
        {
            id: "visao_privada",
            image: "images/visao_privada.png",
            title: "Invasão Espectral",
            text: "Espectros sombrios, feitos de código corrompido, atravessam seus gólens, tentando alterar seus atributos vitais diretamente! 'Eles estão atacando a essência dos seus gólens!' grita Siren. 'Você precisa de um escudo interno! Como protegê-los?'",
            leftChoice: "\"Tornando os atributos 'private'! Criar uma barreira interna!\"",
            rightChoice: "\"Aumentando o poder dos atributos de defesa!\"",
            leftEffect: {},
            rightEffect: {},
            leftHiddenEffects: {},
            rightHiddenEffects: {}
        },
        {
            id: "metodo_secreto",
            image: "images/metodo_secreto.png",
            title: "A Janela da Alma",
            text: "O Guardião aprova sua defesa. 'O núcleo está seguro, mas agora é uma caixa-preta. Seus outros objetos estão cegos para o estado do seu gólem. Como você permite que eles VEJAM a energia, sem lhes dar a chave para ALTERÁ-LA?'",
            leftChoice: "\"Criando um método de acesso público: um 'getter'!\"",
            rightChoice: "\"Não tem jeito. Vou ter que remover a proteção 'private'.\"",
            leftEffect: {},
            rightEffect: {},
            leftHiddenEffects: {},
            rightHiddenEffects: {}
        }
    ],

    3: [ 
        {
            id: "dois_mundos_encontram",
            image: "images/dois_mundos_encontram.png",
            title: "A Mente e o Músculo",
            text: "Siren projeta um orbe de pura lógica. 'Isto é um 'Comando', a estratégia. Aquilo,' ela aponta para seu Gólem, 'é a força. A mente precisa guiar o músculo, mas eles nem se conhecem. Como você os apresenta?'",
            leftChoice: "\"Passando o Gólem como um argumento para o 'Comando'.\"",
            rightChoice: "\"Fazendo o 'Comando' procurar pelo Gólem diretamente.\"",
            leftEffect: {},
            rightEffect: {},
            leftHiddenEffects: {},
            rightHiddenEffects: {}
        },
        {
            id: "ligacao_mistica",
            image: "images/ligacao_mistica.png",
            title: "A Voz do General",
            text: "Uma projeção de um inimigo colossal surge. Um único gólem não será suficiente. 'Seu 'Comando' deve se tornar um general,' diz Siren, 'e dar ordens a uma legião inteira de uma só vez. Como ele fará sua voz ser ouvida por todos?'",
            leftChoice: "\"Passando uma lista de gólens para o método do comando.\"",
            rightChoice: "\"Criando um método de comando para cada gólem.\"",
            leftEffect: {},
            rightEffect: {},
            leftHiddenEffects: {},
            rightHiddenEffects: {}
        },
        {
            id: "mensagem_objetos",
            image: "images/mensagem_objetos.png",
            title: "Conversa Elegante",
            text: "'Observe a beleza disto,' sussurra Siren. 'O 'Comando' não precisa saber OS DETALHES do ataque, apenas ORDENÁ-LO. Ele envia uma mensagem, e o gólem a executa. Qual o nome dessa conversa elegante entre objetos?'",
            leftChoice: "\"É uma 'chamada de método'. gólem.atacar().\"",
            rightChoice: "\"É 'cópia de código'. colar o método do golém para o comando.\"",
            leftEffect: {},
            rightEffect: {},
            leftHiddenEffects: {},
            rightHiddenEffects: {}
        },
        {
            id: "retorno_heroi",
            image: "images/retorno_heroi.png",
            title: "A Forja de Heróis",
            text: "O Mago Compilador aparece, satisfeito. 'Você não precisa mais forjar cada gólem manualmente. Crie uma 'Forja Mestra' — um método que, ao ser chamado, produz e entrega um Gólem de Elite, pronto para a batalha. Mostre-me este feitiço!'",
            leftChoice: "\"public Gólem criarElite() { return new Gólem(...); }\"",
            rightChoice: "\"Um método que retorna 'true' se o gólem foi criado.\"",
            leftEffect: {},
            rightEffect: {},
            leftHiddenEffects: {},
            rightHiddenEffects: {}
        },
        {
            id: "alianca_final",
            image: "images/alianca_final.png",
            title: "A Horda Sincronizada",
            text: "Uma horda de 'Lacaios do Código Espaguete' avança! 'São muitos!' grita Siren. 'Comandá-los um a um será a nossa ruína! Você precisa percorrer suas legiões e ordenar um ataque em uníssono, numa onda de lógica implacável!'",
            leftChoice: "\"Usar um loop 'for' para percorrer a lista e atacar!\"",
            rightChoice: "\"Chamar 'atacar()' para gólem1, gólem2, gólem3...\"",
            leftEffect: {},
            rightEffect: {},
            leftHiddenEffects: {},
            rightHiddenEffects: {}
        }
    ],

    4: [
        {
            id: "chegada_polimorfo",
            image: "images/chegada_polimorfo.png",
            title: "O Lorde Metamorfo",
            text: "Uma entidade fluida surge, mudando de um gólem-tanque pesado para um drone ágil. 'Minha forma é irrelevante,' sua voz ecoa. 'Meu propósito, lutar, é absoluto. Defina este 'contrato' de combate, esta 'Interface', e qualquer um que a honre pode se juntar a mim.'",
            leftChoice: "\"Criar uma 'interface Combatente' com o método 'atacar()'\"",
            rightChoice: "\"Verificar o tipo de cada um com 'instanceof' e agir.\"",
            leftEffect: {},
            rightEffect: {},
            leftHiddenEffects: {},
            rightHiddenEffects: {}
        },
        {
            id: "mapa_estrategico",
            image: "images/mapa_estrategico.png",
            title: "O Arsenal Indexado",
            text: "Siren exibe armas lendárias: 'Canhão de Singularidade', 'Lâminas Quânticas'. 'Apenas gólens específicos podem usá-las. Em batalha, você precisa do gólem certo instantaneamente pelo nome da arma. Uma lista seria lenta. Qual estrutura de dados oferece essa chave-valor?'",
            leftChoice: "\"Um 'Map'! Para mapear a arma ao gólem.\"",
            rightChoice: "\"Uma 'List' e um loop para buscar o gólem certo.\"",
            leftEffect: {},
            rightEffect: {},
            leftHiddenEffects: {},
            rightHiddenEffects: {}
        },
        {
            id: "exercito_unico",
            image: "images/exercito_unico.png",
            title: "A Praga dos Clones",
            text: "'Uma armadilha!' brada o Compilador. 'O inimigo injetou instâncias de Gólens duplicadas em seu exército para semear o caos! Você precisa de uma coleção que, por sua própria natureza mágica, rejeita duplicatas. Qual 'Conjunto' sagrado irá purificar suas fileiras?'",
            leftChoice: "\"Um 'HashSet'! Ele garantirá gólens únicos.\"",
            rightChoice: "\"Um 'ArrayList', e eu verifico as duplicatas manualmente.\"",
            leftEffect: {},

            rightEffect: {},
            leftHiddenEffects: {},
            rightHiddenEffects: {}
        },
        {
            id: "formacao_batalha",
            image: "images/formacao_batalha.png",
            title: "A Sequência da Vitória",
            text: "'O próximo campeão inimigo tem uma fraqueza sequencial,' diz Siren. 'Primeiro, o 'Quebra-Escudo'. Depois, o 'Perfurador'. A ordem é crucial e não pode ser alterada. Qual coleção manterá sua linha de batalha na formação exata que você ditar?'",
            leftChoice: "\"Um 'ArrayList', que preserva a ordem de inserção.\"",
            rightChoice: "\"Um 'HashSet', pois a ordem não deve importar tanto.\"",
            leftEffect: {},
            rightEffect: {},
            leftHiddenEffects: {},
            rightHiddenEffects: {}
        },
        {
            id: "transformacao_final",
            image: "images/transformacao_final.png",
            title: "A Dança da Adaptação",
            text: "O campeão do Grande Programador muda de tática a cada segundo. 'Sua lógica estática é inútil!' ele zomba. 'Você precisa de gólens que possam mudar sua estratégia em tempo real, sem 'if's ou 'switch'es. Abrace o poder do polimorfismo!'",
            leftChoice: "\"Usar a interface 'Combatente' e trocar as implementações!\"",
            rightChoice: "\"Prever todos os comportamentos com um switch.\"",
            leftEffect: {},
            rightEffect: {},
            leftHiddenEffects: {},
            rightHiddenEffects: {}
        }
    ]
};

const CONSEQUENCE_CARDS = [
    {
        id: "Epifania",
        image: "images/player_epifania.png",
        title: "Epifania",
        text: "Você está se sentindo confiante! Seu conhecimento esta atingindo novos niveis.",
        leftChoice: "Focar nos estudos",
        rightChoice: "Relaxar um pouco",
        leftEffect: { knowledge: 15},
        rightEffect: { Golens: 5 },
        triggerConditions: { player_conhecimento: { min: 8, max: Infinity } },
        weight: 2
    }
];

const INITIAL_HIDDEN_STATUS = {
    player_felicidade: 0,
    player_conhecimento: 0,
    Golem_felicidade: 0,
    Golem_ataque: 0,
    Golem_vulnerabilidade: 0,
    Golem_defesa: 0,
    npc_felicidade: 0,
    npc_gratitude: 0
};

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