class ProgrammingGame {
    constructor() {
        //status/indicadores do jogo (acima da tela)
        this.stats = {
            robots: 50,       // Qualidade dos robôs
            knowledge: 50,    // Conhecimento do jogador
            resources: 50     // Recursos computacionais disponiveis
        };

        // recebe os status ocultos
        this.hiddenStatus = { ...INITIAL_HIDDEN_STATUS };

        // Sistema de capítulos
        this.currentChapter = 1;
        this.maxChapters = 4;

        // Novo sistema de intercalação
        this.keyCardsQueue = [];           // Fila de cartas-chave em ordem
        this.currentKeyCardIndex = 0;      // Índice da próxima carta-chave
        this.cardsPlayedInChapter = 0;     // Total de cartas jogadas
        this.keyCardsPlayedInChapter = 0;  // Cartas-chave jogadas

        // Sistema de introdução
        this.introPhase = true;
        this.introCardIndex = 0;
        this.introCards = INTRO_CARDS || [];

        // Controle de cartas de consequência
        this.availableConsequenceCards = [];
        this.playedConsequenceCards = new Set();

        // Controle do jogo
        this.turn = 1;
        this.currentCard = null;
        this.isDragging = false;
        this.dragStartX = 0;
        this.isPaused = false;
        this.gameCompleted = false;

        // Sistema de menus e UI
        this.menuSystem = null;
        this.uiManager = null;

        this.init();
    }

    init() {
        // Verifica se as cartas foram carregadas
        if (!CHAPTER_KEY_CARDS || !CONSEQUENCE_CARDS || !INTRO_CARDS) {
            return;
        }

        // Inicializar sistemas
        this.menuSystem = initializeMenuSystem(this);
        this.uiManager = new UIManager(this);

        this.updateDisplay();
        this.loadNextCard();
        this.setupDragHandlers();
        this.menuSystem.updatePauseButton();
    }

    // ========================================
    // SISTEMA DE CARTAS
    // ========================================

    loadNextCard() {
        // Fase de introdução
        if (this.introPhase) {
            if (this.introCardIndex >= this.introCards.length) {
                this.introPhase = false;
                this.setupChapter();
                this.loadNextCard();
                return;
            }

            const card = this.introCards[this.introCardIndex];
            card.isKeyCard = false;
            card.isIntro = true;
            this.currentCard = card;
            this.uiManager.displayCard(card);
            this.updateIntroProgress();
            return;
        }

        // Verifica se o capítulo foi completado
        if (this.isChapterComplete()) {
            this.advanceChapter();
            return;
        }

        let cardToLoad = null;

        // Sistema de intercalação
        if (this.shouldLoadKeyCard()) {
            if (this.currentKeyCardIndex < this.keyCardsQueue.length) {
                cardToLoad = this.keyCardsQueue[this.currentKeyCardIndex];
                cardToLoad.isKeyCard = true;
                this.currentKeyCardIndex++;
            }
        } else {
            if (this.availableConsequenceCards.length > 0) {
                cardToLoad = this.selectWeightedConsequenceCard();
                cardToLoad.isKeyCard = false;
            } else {
                // Forçar próxima carta-chave se não há consequências
                if (this.currentKeyCardIndex < this.keyCardsQueue.length) {
                    cardToLoad = this.keyCardsQueue[this.currentKeyCardIndex];
                    cardToLoad.isKeyCard = true;
                    this.currentKeyCardIndex++;
                }
            }
        }

        if (!cardToLoad) {
            this.advanceChapter();
            return;
        }

        this.currentCard = cardToLoad;
        this.uiManager.displayCard(cardToLoad);
        this.updateChapterProgress();
    }

    shouldLoadKeyCard() {
        if (this.keyCardsPlayedInChapter === 0) {
            return true;
        }

        if (this.currentKeyCardIndex >= this.keyCardsQueue.length) {
            return false;
        }

        const totalCardsPlayed = this.cardsPlayedInChapter;
        const keyCardsPlayed = this.keyCardsPlayedInChapter;

        if ((totalCardsPlayed - keyCardsPlayed) >= 2) {
            return true;
        }
        
        // Ajustado para melhor balanceamento
        return Math.random() < 0.3; // 30% chance de carta-chave, 70% consequência
    }

    setupChapter() {
        // Reset do capítulo
        this.cardsPlayedInChapter = 0;
        this.keyCardsPlayedInChapter = 0;
        this.currentKeyCardIndex = 0;
        this.playedConsequenceCards.clear();

        // Configurar cartas do capítulo
        const chapterKeyCards = CHAPTER_KEY_CARDS[this.currentChapter] || [];
        this.keyCardsQueue = [...chapterKeyCards];

        this.updateAvailableConsequenceCards();
    }

    updateAvailableConsequenceCards() {
        this.availableConsequenceCards = CONSEQUENCE_CARDS.filter(card => {
            if (this.playedConsequenceCards.has(card.id)) {
                return false;
            }

            if (card.triggerConditions) {
                for (let status in card.triggerConditions) {
                    const condition = card.triggerConditions[status];
                    const currentValue = this.hiddenStatus[status] || 0;

                    if (condition.min !== undefined && currentValue < condition.min) {
                        return false;
                    }
                    if (condition.max !== undefined && currentValue > condition.max) {
                        return false;
                    }
                }
            }

            return true;
        });

        this.availableConsequenceCards.sort((a, b) => (b.weight || 1) - (a.weight || 1));
    }

    selectWeightedConsequenceCard() {
        const totalWeight = this.availableConsequenceCards.reduce((sum, card) => sum + (card.weight || 1), 0);
        let random = Math.random() * totalWeight;

        for (let card of this.availableConsequenceCards) {
            random -= (card.weight || 1);
            if (random <= 0) {
                const index = this.availableConsequenceCards.indexOf(card);
                this.availableConsequenceCards.splice(index, 1);
                return card;
            }
        }

        return this.availableConsequenceCards.shift();
    }

    // ========================================
    // SISTEMA DE ESCOLHAS
    // ========================================

    makeChoice(direction) {
        if (!this.currentCard) return;

        // Tratamento especial para cartas de introdução
        if (this.currentCard.isIntro) {
            this.handleIntroChoice(direction);
            return;
        }

        const effect = direction === 'left' ? this.currentCard.leftEffect : this.currentCard.rightEffect;
        const hiddenEffect = direction === 'left' ? this.currentCard.leftHiddenEffects : this.currentCard.rightHiddenEffects;
        const choiceText = direction === 'left' ? this.currentCard.leftChoice : this.currentCard.rightChoice;

        // Aplicar efeitos
        this.applyEffects(effect, hiddenEffect);

        // Registrar carta jogada
        if (this.currentCard.isKeyCard) {
            this.keyCardsPlayedInChapter++;
        } else {
            this.playedConsequenceCards.add(this.currentCard.id);
        }

        this.cardsPlayedInChapter++;
        this.updateAvailableConsequenceCards();

        // Mostrar efeitos e animar saída
        this.uiManager.showEffectCard(choiceText, effect, hiddenEffect);
        this.uiManager.animateCardExit(direction);

        // Processar próxima carta
        setTimeout(() => {
            this.turn++;
            this.updateDisplay();

            if (this.checkGameOver()) {
                this.gameOver();
            } else {
                setTimeout(() => {
                    this.uiManager.hideEffectCard();
                    setTimeout(() => {
                        this.loadNextCard();
                    }, 400);
                }, 2500);
            }
        }, 300);
    }

    handleIntroChoice(direction) {
        const hiddenEffect = direction === 'left' ? this.currentCard.leftHiddenEffects : this.currentCard.rightHiddenEffects;

        // Verificar game over especial da introdução
        if (hiddenEffect && hiddenEffect.gameOver) {
            this.menuSystem.showIntroGameOver();
            return;
        }

        // Aplicar efeitos ocultos
        if (hiddenEffect) {
            for (let status in hiddenEffect) {
                this.hiddenStatus[status] = (this.hiddenStatus[status] || 0) + hiddenEffect[status];
            }
        }

        // Animar saída
        this.uiManager.animateCardExit(direction);

        setTimeout(() => {
            this.introCardIndex++;
            this.loadNextCard();
        }, 300);
    }

    applyEffects(visibleEffects, hiddenEffects) {
        // Aplicar efeitos visíveis (removendo referências a energy)
        for (let stat in visibleEffects) {
            // Ignorar efeitos de energia
            if (stat === 'energy') continue;
            
            // Converter intelligence para knowledge se necessário
            let statName = stat === 'intelligence' ? 'knowledge' : stat;
            
            // Converter robots/Golemts para robots
            if (stat === 'Golemts') statName = 'robots';
            
            if (this.stats[statName] !== undefined) {
                this.stats[statName] = Math.max(0, Math.min(100, this.stats[statName] + visibleEffects[stat]));
            }
        }

        // Aplicar efeitos ocultos
        if (hiddenEffects) {
            for (let status in hiddenEffects) {
                this.hiddenStatus[status] = (this.hiddenStatus[status] || 0) + hiddenEffects[status];
                this.hiddenStatus[status] = Math.max(-100, Math.min(100, this.hiddenStatus[status]));
            }
        }
    }

    // ========================================
    // SISTEMA DE PROGRESSO
    // ========================================

    updateDisplay() {
        this.uiManager.updateStats(this.stats);
        this.uiManager.updateTurnCounter(this.turn);
    }

    updateIntroProgress() {
        this.uiManager.updateIntroProgress(this.introCardIndex, this.introCards.length);
    }

    updateChapterProgress() {
        this.uiManager.updateChapterProgress(
            this.currentChapter,
            this.maxChapters,
            this.keyCardsPlayedInChapter,
            this.cardsPlayedInChapter
        );
    }

    isChapterComplete() {
        return this.keyCardsPlayedInChapter >= 5;
    }

    advanceChapter() {
        if (this.currentChapter >= this.maxChapters) {
            this.storyComplete();
            return;
        }

        this.currentChapter++;

        if (this.currentChapter <= this.maxChapters) {
            this.showChapterTransition();
        }
    }

    showChapterTransition() {
        const description = this.getChapterDescription(this.currentChapter);
        this.menuSystem.showChapterTransition(this.currentChapter, description);
    }

    getChapterDescription(chapter) {
        const descriptions = {
            2: "Você deu vida à sua primeira classe. Agora, no Capítulo 2, você dominará os rituais de criação com os Construtores e protegerá a essência dos seus gólens com os segredos do Encapsulamento.",
            3: "Seus gólens são fortes, mas lutam sozinhos. No Capítulo 3, você forjará Alianças de Código, aprendendo a fazer seus objetos colaborarem para executar estratégias complexas e lutar como um exército unificado.",
            4: "A força bruta não é mais suficiente. No Capítulo 4, você mergulhará em táticas avançadas, dominando o Polimorfismo para criar unidades adaptáveis e usando o poder das Coleções para gerenciar seu exército com precisão letal.",
        };
        return descriptions[chapter] || "Uma nova fase de sua jornada de programação começa...";
    }

    continueToNextChapter() {
        this.setupChapter();
        this.loadNextCard();
    }

    // ========================================
    // SISTEMA DE GAME OVER E VITÓRIA
    // ========================================

    checkGameOver() {
        // Gólens e Conhecimento podem chegar a 100 sem game over
        if (this.stats.robots <= 0) return true;
        if (this.stats.knowledge <= 0) return true;
        
        // Apenas recursos tem limite superior
        if (this.stats.resources <= 0 || this.stats.resources >= 100) {
            return true;
        }
        
        return false;
    }

    gameOver() {
        const reason = this.menuSystem.getGameOverReason();
        this.menuSystem.showGameOver(reason);
    }

    storyComplete() {
        this.gameCompleted = true;

        // Calcular pontuação
        let score = 0;
        let balanceBonus = 0;
        let skillBonus = 0;

        // Bônus por stats equilibradas
        for (let stat in this.stats) {
            if (this.stats[stat] >= 30 && this.stats[stat] <= 70) {
                balanceBonus += 30;
            } else if (this.stats[stat] >= 20 && this.stats[stat] <= 80) {
                balanceBonus += 15;
            }
        }

        // Bônus por habilidades desenvolvidas
        const importantSkills = ['player_conhecimento', 'golem_ataque', 'golem_defesa', 'player_felicidade'];
        for (let skill of importantSkills) {
            if (this.hiddenStatus[skill] > 10) {
                skillBonus += 25;
            } else if (this.hiddenStatus[skill] > 5) {
                skillBonus += 10;
            }
        }

        score = Math.round((this.turn * 8) + balanceBonus + skillBonus + 300);

        const ending = {
            title: "🎓 O Despertar Final",
            text: "Você derrotou o Grande Programador e dominou completamente a Orientação a Objetos! Uma luz brilhante te envolve... Você acorda em seu quarto, na frente do computador. Seu livro de POO está aberto na mesa. 'Que sonho incrível!' você pensa, percebendo que agora entende perfeitamente todos os conceitos. A prova será moleza!"
        };

        this.menuSystem.showStoryComplete(score, ending);
    }

    restartIntro() {
        this.introPhase = true;
        this.introCardIndex = 0;
        this.hiddenStatus = { ...INITIAL_HIDDEN_STATUS };
        this.turn = 1;
        this.updateDisplay();
        this.loadNextCard();
    }

    // ========================================
    // SISTEMA DE DRAG AND DROP
    // ========================================

    setupDragHandlers() {
        const handlers = {
            onDragStart: (x) => this.startDrag(x),
            onDragMove: (x) => this.handleDrag(x),
            onDragEnd: () => this.endDrag(),
            isDragging: () => this.isDragging
        };

        this.uiManager.setupDragListeners(handlers);
    }

    startDrag(x) {
        if (this.isPaused || this.gameCompleted) return;

        this.isDragging = true;
        this.dragStartX = x;

        this.uiManager.setCardDragging(true);
        this.uiManager.showChoices();
    }

    handleDrag(x) {
        if (!this.isDragging || this.isPaused || this.gameCompleted) return;

        const deltaX = x - this.dragStartX;
        this.uiManager.updateCardPosition(deltaX);
    }

    endDrag() {
        if (!this.isDragging || this.isPaused || this.gameCompleted) return;

        const deltaX = this.uiManager.getCardDeltaX();

        if (Math.abs(deltaX) > 100) {
            this.makeChoice(deltaX > 0 ? 'right' : 'left');
        } else {
            this.uiManager.resetCardPosition();
            this.uiManager.hideChoices();
        }

        this.isDragging = false;
        this.uiManager.setCardDragging(false);
    }

    // ========================================
    // MÉTODOS DE CONTROLE
    // ========================================

    togglePause() {
        this.menuSystem.togglePause();
    }

    pause() {
        this.menuSystem.pause();
    }

    resume() {
        this.menuSystem.resume();
    }
}

// ========================================
// INICIALIZAÇÃO GLOBAL
// ========================================

let game;

function startGame() {
    game = new ProgrammingGame();
}