class ProgrammingGame {
    constructor() {
        // Stats do jogo (mudança: knowledge -> intelligence)
        this.stats = {
            robots: 50,       // Quantidade/qualidade dos robôs
            energy: 50,       // Energia para programar
            intelligence: 50, // Inteligência (antes era knowledge)
            resources: 50     // Recursos computacionais
        };
        
        // Status ocultos que influenciam as cartas de consequência
        this.hiddenStatus = { ...INITIAL_HIDDEN_STATUS };
        
        // Sistema de capítulos
        this.currentChapter = 1;
        this.maxChapters = 6;
        
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
        
        this.init();
    }

    init() {
        // Verifica se as cartas foram carregadas
        if (!CHAPTER_KEY_CARDS || !CONSEQUENCE_CARDS || !INTRO_CARDS) {
            console.error('Erro: Cartas não foram carregadas! Verifique se o arquivo cards.js foi incluído.');
            return;
        }
        
        console.log('🎮 Iniciando O Mundo dos Objetos...');
        this.updateDisplay();
        this.loadNextCard();
        this.setupEventListeners();
        this.updatePauseButton();
    }

    loadNextCard() {
        // Fase de introdução
        if (this.introPhase) {
            if (this.introCardIndex >= this.introCards.length) {
                console.log('📜 Introdução completa, iniciando capítulo...');
                this.introPhase = false;
                this.setupChapter();
                this.loadNextCard();
                return;
            }
            
            const card = this.introCards[this.introCardIndex];
            card.isKeyCard = false;
            card.isIntro = true;
            this.currentCard = card;
            this.displayCard(card);
            this.updateIntroProgress();
            return;
        }
        
        // Verifica se o capítulo foi completado (todas as 5 cartas-chave foram jogadas)
        if (this.isChapterComplete()) {
            this.advanceChapter();
            return;
        }
        
        let cardToLoad = null;
        
        // Sistema de intercalação: Alterna entre cartas-chave e consequência
        if (this.shouldLoadKeyCard()) {
            // Carregar próxima carta-chave da sequência
            if (this.currentKeyCardIndex < this.keyCardsQueue.length) {
                cardToLoad = this.keyCardsQueue[this.currentKeyCardIndex];
                cardToLoad.isKeyCard = true;
                this.currentKeyCardIndex++;
                console.log(`🔑 Carregando carta-chave ${this.currentKeyCardIndex}/${this.keyCardsQueue.length}: ${cardToLoad.title}`);
            }
        } else {
            // Carregar carta de consequência
            if (this.availableConsequenceCards.length > 0) {
                cardToLoad = this.selectWeightedConsequenceCard();
                cardToLoad.isKeyCard = false;
                console.log(`⚡ Carregando carta de consequência: ${cardToLoad.title}`);
            } else {
                // Se não há consequências disponíveis, forçar próxima carta-chave
                if (this.currentKeyCardIndex < this.keyCardsQueue.length) {
                    cardToLoad = this.keyCardsQueue[this.currentKeyCardIndex];
                    cardToLoad.isKeyCard = true;
                    this.currentKeyCardIndex++;
                    console.log(`🔑 Forçando carta-chave: ${cardToLoad.title}`);
                }
            }
        }
        
        if (!cardToLoad) {
            console.log('❌ Nenhuma carta disponível - avançando capítulo');
            this.advanceChapter();
            return;
        }
        
        this.currentCard = cardToLoad;
        this.displayCard(cardToLoad);
        this.updateChapterProgress();
    }

    shouldLoadKeyCard() {
        // Lógica para decidir se deve carregar carta-chave ou consequência
        
        // Se ainda não jogou nenhuma carta-chave, deve começar com uma
        if (this.keyCardsPlayedInChapter === 0) {
            return true;
        }
        
        // Se já jogou todas as cartas-chave, só carrega consequências
        if (this.currentKeyCardIndex >= this.keyCardsQueue.length) {
            return false;
        }
        
        // Padrão de intercalação: 
        // Carta-chave -> 1-2 consequências -> Carta-chave -> 1-2 consequências...
        const totalCardsPlayed = this.cardsPlayedInChapter;
        const keyCardsPlayed = this.keyCardsPlayedInChapter;
        
        // Se a diferença entre total e chaves for >= 2, hora da próxima chave
        if ((totalCardsPlayed - keyCardsPlayed) >= 2) {
            return true;
        }
        
        // Se a diferença for < 2, carrega consequência (com 70% de chance)
        return Math.random() < 0.3; // 30% chance de carta-chave, 70% consequência
    }

    setupChapter() {
        console.log(`🏰 Configurando Capítulo ${this.currentChapter}`);
        
        // Reset contadores do capítulo
        this.cardsPlayedInChapter = 0;
        this.keyCardsPlayedInChapter = 0;
        this.currentKeyCardIndex = 0;
        this.playedConsequenceCards.clear();
        
        // Configurar cartas-chave do capítulo atual em ordem fixa (NÃO embaralhar)
        const chapterKeyCards = CHAPTER_KEY_CARDS[this.currentChapter] || [];
        this.keyCardsQueue = [...chapterKeyCards]; // Manter ordem original
        
        // Configurar cartas de consequência disponíveis
        this.updateAvailableConsequenceCards();
        
        console.log(`📋 Cartas-chave: ${this.keyCardsQueue.length}, Consequências disponíveis: ${this.availableConsequenceCards.length}`);
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

    displayCard(card) {
        const elements = {
            character: document.getElementById('cardCharacter'),
            title: document.getElementById('cardTitle'),
            text: document.getElementById('cardText'),
            leftChoice: document.getElementById('leftChoice'),
            rightChoice: document.getElementById('rightChoice')
        };
        
        if (elements.character) elements.character.textContent = card.character;
        if (elements.title) elements.title.textContent = card.title;
        if (elements.text) elements.text.textContent = card.text;
        if (elements.leftChoice) elements.leftChoice.textContent = card.leftChoice;
        if (elements.rightChoice) elements.rightChoice.textContent = card.rightChoice;
        
        const cardElement = document.getElementById('currentCard');
        const choices = document.getElementById('choices');
        
        if (cardElement) {
            cardElement.style.transform = 'translateX(0px) rotate(0deg)';
            cardElement.style.opacity = '1';
            
            // Remove classes anteriores
            cardElement.classList.remove('key-card', 'intro-card');
            
            // Remove indicador anterior se existir
            const existingIndicator = cardElement.querySelector('.card-type-indicator');
            if (existingIndicator) existingIndicator.remove();
            
            // Adiciona estilo baseado no tipo de carta
            if (card.isIntro) {
                cardElement.classList.add('intro-card');
                const indicator = document.createElement('div');
                indicator.className = 'card-type-indicator card-type-intro';
                indicator.textContent = '📜 História';
                cardElement.appendChild(indicator);
            } else if (card.isKeyCard) {
                cardElement.classList.add('key-card');
                const indicator = document.createElement('div');
                indicator.className = 'card-type-indicator card-type-key';
                indicator.textContent = '🔑 POO';
                cardElement.appendChild(indicator);
            } else {
                const indicator = document.createElement('div');
                indicator.className = 'card-type-indicator card-type-consequence';
                indicator.textContent = '⚡ Evento';
                cardElement.appendChild(indicator);
            }
        }
        if (choices) choices.classList.remove('visible');
    }

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
        
        // Aplicar efeitos visíveis (mudança: knowledge -> intelligence)
        for (let stat in effect) {
            // Converter knowledge para intelligence se necessário
            let statName = stat === 'knowledge' ? 'intelligence' : stat;
            if (this.stats[statName] !== undefined) {
                this.stats[statName] = Math.max(0, Math.min(100, this.stats[statName] + effect[stat]));
            }
        }
        
        // Aplicar efeitos ocultos
        if (hiddenEffect) {
            for (let status in hiddenEffect) {
                this.hiddenStatus[status] = (this.hiddenStatus[status] || 0) + hiddenEffect[status];
                this.hiddenStatus[status] = Math.max(-100, Math.min(100, this.hiddenStatus[status]));
            }
        }
        
        // Registrar carta jogada
        if (this.currentCard.isKeyCard) {
            this.keyCardsPlayedInChapter++;
        } else {
            this.playedConsequenceCards.add(this.currentCard.id);
        }
        
        this.cardsPlayedInChapter++;
        this.updateAvailableConsequenceCards();
        
        // Mostrar carta de efeito
        this.showEffectCard(choiceText, effect, hiddenEffect);
        
        // Animar saída da carta
        const card = document.getElementById('currentCard');
        if (card) {
            const exitX = direction === 'left' ? -400 : 400;
            card.style.transform = `translateX(${exitX}px) rotate(${exitX/10}deg)`;
            card.style.opacity = '0';
        }
        
        setTimeout(() => {
            this.turn++;
            this.updateDisplay();
            
            if (this.checkGameOver()) {
                this.gameOver();
            } else {
                setTimeout(() => {
                    this.hideEffectCard();
                    setTimeout(() => {
                        this.loadNextCard();
                    }, 400);
                }, 2500);
            }
        }, 300);
    }

    handleIntroChoice(direction) {
        const hiddenEffect = direction === 'left' ? this.currentCard.leftHiddenEffects : this.currentCard.rightHiddenEffects;
        
        // Verificar se é game over (carta da missão)
        if (hiddenEffect && hiddenEffect.gameOver) {
            this.showIntroGameOver();
            return;
        }
        
        // Aplicar efeitos ocultos da introdução
        if (hiddenEffect) {
            for (let status in hiddenEffect) {
                this.hiddenStatus[status] = (this.hiddenStatus[status] || 0) + hiddenEffect[status];
            }
        }
        
        // Animar saída da carta
        const card = document.getElementById('currentCard');
        if (card) {
            const exitX = direction === 'left' ? -400 : 400;
            card.style.transform = `translateX(${exitX}px) rotate(${exitX/10}deg)`;
            card.style.opacity = '0';
        }
        
        setTimeout(() => {
            this.introCardIndex++;
            this.loadNextCard();
        }, 300);
    }

    showIntroGameOver() {
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        overlay.style.zIndex = '1001';
        
        const content = document.createElement('div');
        content.className = 'overlay-content';
        content.innerHTML = `
            <div class="overlay-title">😴 Volta ao Sono</div>
            <div class="overlay-text">
                Você recusou a missão e decide que tudo isso é muito estranho. 
                Fechando os olhos, você sente o mundo ao redor desaparecer...
                <br><br>
                Você acorda em seu quarto, na frente do computador. 
                Parece que adormeceu estudando para a prova de POO.
                <br><br>
                <em>"Que sonho mais bizarro..."</em> você pensa.
            </div>
            <button class="overlay-button" onclick="this.parentElement.parentElement.remove(); game.restartIntro()">
                Tentar Novamente
            </button>
            <button class="overlay-button secondary" onclick="exitGame()">
                Voltar ao Mundo Real
            </button>
        `;
        
        overlay.appendChild(content);
        document.body.appendChild(overlay);
    }

    restartIntro() {
        this.introPhase = true;
        this.introCardIndex = 0;
        this.hiddenStatus = { ...INITIAL_HIDDEN_STATUS };
        this.turn = 1;
        this.updateDisplay();
        this.loadNextCard();
    }

    updateDisplay() {
        // Atualizar barras de stats (mudança: knowledge -> intelligence)
        const statBars = {
            robots: document.getElementById('robotsBar'),
            energy: document.getElementById('energyBar'),
            intelligence: document.getElementById('intelligenceBar'),
            resources: document.getElementById('resourcesBar')
        };
        
        // Fallback para nomes antigos se não encontrar os novos
        if (!statBars.robots) {
            statBars.robots = document.getElementById('churchBar');
        }
        if (!statBars.energy) {
            statBars.energy = document.getElementById('peopleBar');
        }
        if (!statBars.intelligence) {
            statBars.intelligence = document.getElementById('armyBar') || document.getElementById('knowledgeBar');
        }
        if (!statBars.resources) {
            statBars.resources = document.getElementById('treasuryBar');
        }
        
        const statMapping = {
            robots: 'robots',
            energy: 'energy', 
            intelligence: 'intelligence',
            resources: 'resources'
        };
        
        for (let barName in statBars) {
            const statName = statMapping[barName];
            if (statBars[barName] && this.stats[statName] !== undefined) {
                statBars[barName].style.width = this.stats[statName] + '%';
                
                // Cores baseadas no valor
                if (this.stats[statName] <= 20 || this.stats[statName] >= 80) {
                    statBars[barName].style.background = '#f44336'; // Vermelho - perigo
                } else if (this.stats[statName] <= 40 || this.stats[statName] >= 60) {
                    statBars[barName].style.background = '#FF9800'; // Laranja - cuidado
                } else {
                    statBars[barName].style.background = '#4CAF50'; // Verde - seguro
                }
            }
        }
        
        // Atualizar contador de turnos
        const turnElement = document.getElementById('turnCount');
        if (turnElement) turnElement.textContent = this.turn;
    }

    updateIntroProgress() {
        const chapterElement = document.getElementById('chapterCount');
        if (chapterElement) {
            chapterElement.textContent = `Introdução: ${this.introCardIndex + 1}/${this.introCards.length}`;
        }
        
        const progressElement = document.getElementById('storyProgress');
        if (progressElement) {
            const progress = ((this.introCardIndex + 1) / this.introCards.length) * 100;
            progressElement.style.width = progress + '%';
        }
    }

    updateChapterProgress() {
        const progressElement = document.getElementById('storyProgress');
        if (progressElement) {
            // Base o progresso nas cartas-chave jogadas (5 total)
            const progress = (this.keyCardsPlayedInChapter / 5) * 100;
            progressElement.style.width = Math.min(100, progress) + '%';
        }
        
        const chapterElement = document.getElementById('chapterCount');
        if (chapterElement) {
            const keyProgress = `${this.keyCardsPlayedInChapter}/5`;
            const totalProgress = `${this.cardsPlayedInChapter}`;
            chapterElement.textContent = `Cap. ${this.currentChapter}/${this.maxChapters} | POO: ${keyProgress} | Total: ${totalProgress}`;
        }
        
        // Debug de status ocultos
        if (this.turn % 3 === 0) {
            console.log('💻 Status Ocultos:', this.hiddenStatus);
        }
    }

    isChapterComplete() {
        // Capítulo completa quando todas as 5 cartas-chave foram jogadas
        return this.keyCardsPlayedInChapter >= 5;
    }

    advanceChapter() {
        if (this.currentChapter >= this.maxChapters) {
            this.storyComplete();
            return;
        }
        
        console.log(`✅ Capítulo ${this.currentChapter} completado!`);
        this.currentChapter++;
        
        if (this.currentChapter <= this.maxChapters) {
            this.showChapterTransition();
        }
    }

    showChapterTransition() {
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        overlay.style.zIndex = '1001';
        
        const content = document.createElement('div');
        content.className = 'overlay-content';
        content.innerHTML = `
            <div class="overlay-title">💻 Capítulo ${this.currentChapter}</div>
            <div class="overlay-text">
                ${this.getChapterDescription(this.currentChapter)}
            </div>
            <button class="overlay-button" onclick="this.parentElement.parentElement.remove(); game.continueToNextChapter()">
                Continuar Programando
            </button>
        `;
        
        overlay.appendChild(content);
        document.body.appendChild(overlay);
    }

    getChapterDescription(chapter) {
        const descriptions = {
            2: "Você dominou os conceitos básicos de POO! Agora é hora de aprender sobre herança, polimorfismo e outros conceitos avançados.",
            3: "Seus robôs estão evoluindo! Padrões de design e arquiteturas complexas aguardam sua implementação.",
            4: "O Grande Programador está próximo! Você deve reunir todo seu conhecimento para os desafios finais.",
            5: "A batalha final se aproxima! Suas habilidades de programação serão testadas ao limite.",
            6: "O confronto definitivo chegou! Tudo que você aprendeu sobre POO será crucial nesta última fase."
        };
        return descriptions[chapter] || "Uma nova fase de sua jornada de programação começa...";
    }

    continueToNextChapter() {
        this.setupChapter();
        this.loadNextCard();
    }

    showEffectCard(choiceText, effects, hiddenEffects = {}) {
        const effectCard = document.getElementById('effectCard');
        const effectTitle = document.getElementById('effectTitle');
        const effectList = document.getElementById('effectList');
        
        if (!effectCard || !effectTitle || !effectList) return;
        
        effectTitle.textContent = `"${choiceText}"`;
        effectList.innerHTML = '';
        
        const statNames = {
            robots: { icon: '🤖', name: 'Robôs' },
            energy: { icon: '⚡', name: 'Energia' },
            intelligence: { icon: '🧠', name: 'Inteligência' },
            knowledge: { icon: '🧠', name: 'Inteligência' }, // Fallback
            resources: { icon: '💾', name: 'Recursos' }
        };
        
        // Mostrar efeitos visíveis
        for (let stat in effects) {
            const value = effects[stat];
            if (value !== 0) {
                const effectItem = document.createElement('div');
                effectItem.className = 'effect-item';
                
                // Converter knowledge para intelligence se necessário
                const displayStat = stat === 'knowledge' ? 'intelligence' : stat;
                const statInfo = statNames[displayStat] || statNames[stat];
                const sign = value > 0 ? '+' : '';
                const valueClass = value > 0 ? 'positive' : 'negative';
                
                effectItem.innerHTML = `
                    <div class="effect-stat">
                        <span>${statInfo.icon}</span>
                        <span>${statInfo.name}</span>
                    </div>
                    <span class="effect-value ${valueClass}">${sign}${value}</span>
                `;
                
                effectList.appendChild(effectItem);
            }
        }
        
        // Mostrar alguns efeitos ocultos importantes
        const importantHiddenEffects = ['player_conhecimento', 'robo_ataque', 'robo_defesa', 'player_felicidade'];
        let hasImportantHiddenEffects = false;
        
        for (let status of importantHiddenEffects) {
            if (hiddenEffects[status] && Math.abs(hiddenEffects[status]) >= 3) {
                if (!hasImportantHiddenEffects) {
                    const separator = document.createElement('div');
                    separator.style.cssText = 'border-top: 1px solid #666; margin: 10px 0 5px 0; padding-top: 5px; font-size: 12px; opacity: 0.7;';
                    separator.textContent = 'Efeitos Ocultos:';
                    effectList.appendChild(separator);
                    hasImportantHiddenEffects = true;
                }
                
                const effectItem = document.createElement('div');
                effectItem.className = 'effect-item';
                effectItem.style.opacity = '0.8';
                effectItem.style.fontSize = '12px';
                
                const value = hiddenEffects[status];
                const sign = value > 0 ? '+' : '';
                const valueClass = value > 0 ? 'positive' : 'negative';
                
                const statusNames = {
                    player_conhecimento: 'Conhecimento do Player',
                    player_felicidade: 'Felicidade do Player',
                    robo_ataque: 'Ataque do Robô',
                    robo_defesa: 'Defesa do Robô',
                    robo_felicidade: 'Felicidade do Robô',
                    npc_gratitude: 'Gratidão dos NPCs'
                };
                
                effectItem.innerHTML = `
                    <div class="effect-stat">
                        <span>🔮</span>
                        <span>${statusNames[status]}</span>
                    </div>
                    <span class="effect-value ${valueClass}">${sign}${value}</span>
                `;
                
                effectList.appendChild(effectItem);
            }
        }
        
        effectCard.style.display = 'block';
        setTimeout(() => {
            effectCard.classList.add('show');
        }, 50);
    }

    hideEffectCard() {
        const effectCard = document.getElementById('effectCard');
        if (effectCard) {
            effectCard.classList.remove('show');
            setTimeout(() => {
                effectCard.style.display = 'none';
            }, 400);
        }
    }

    checkGameOver() {
        for (let stat in this.stats) {
            if (this.stats[stat] <= 0 || this.stats[stat] >= 100) {
                return true;
            }
        }
        return false;
    }

    gameOver() {
        let reason = "Sua jornada no Mundo dos Objetos chegou ao fim...";
        
        if (this.stats.robots <= 0) {
            reason = "Todos os seus robôs foram destruídos! Sem eles, você não pode continuar sua missão.";
        } else if (this.stats.robots >= 100) {
            reason = "Seus robôs evoluíram além do controle! Eles se tornaram independentes e te abandonaram.";
        } else if (this.stats.energy <= 0) {
            reason = "Você está exausto demais para continuar programando. Seus olhos se fecham...";
        } else if (this.stats.energy >= 100) {
            reason = "Você está com tanta energia que não consegue se concentrar! Sua mente está muito agitada.";
        } else if (this.stats.intelligence <= 0) {
            reason = "Você esqueceu tudo sobre programação! Não consegue mais escrever uma linha de código.";
        } else if (this.stats.intelligence >= 100) {
            reason = "Sua inteligência transcendeu este mundo! Você se torna parte da matrix e desaparece.";
        } else if (this.stats.resources <= 0) {
            reason = "Sem recursos computacionais, seus programas não podem mais rodar. Tudo trava.";
        } else if (this.stats.resources >= 100) {
            reason = "Tanto poder computacional atraiu a atenção do Grande Programador! Ele te encontrou!";
        }
        
        const elements = {
            reason: document.getElementById('deathReason'),
            turns: document.getElementById('finalTurns'),
            overlay: document.getElementById('gameOver')
        };
        
        if (elements.reason) elements.reason.textContent = reason;
        if (elements.turns) elements.turns.textContent = this.turn - 1;
        if (elements.overlay) elements.overlay.style.display = 'flex';
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
        const importantSkills = ['player_conhecimento', 'robo_ataque', 'robo_defesa', 'player_felicidade'];
        for (let skill of importantSkills) {
            if (this.hiddenStatus[skill] > 10) {
                skillBonus += 25;
            } else if (this.hiddenStatus[skill] > 5) {
                skillBonus += 10;
            }
        }
        
        score = Math.round((this.turn * 8) + balanceBonus + skillBonus + 300);
        
        // Final da história
        const ending = {
            title: "🎓 O Despertar Final",
            text: "Você derrotou o Grande Programador e dominou completamente a Orientação a Objetos! Uma luz brilhante te envolve... Você acorda em seu quarto, na frente do computador. Seu livro de POO está aberto na mesa. 'Que sonho incrível!' você pensa, percebendo que agora entende perfeitamente todos os conceitos. A prova será moleza!"
        };
        
        // Atualizar tela de fim usando os elementos existentes
        const elements = {
            title: document.getElementById('storyEndTitle'),
            text: document.getElementById('storyEndText'),
            score: document.getElementById('finalScore'),
            turns: document.getElementById('finalTurns'),
            robots: document.getElementById('finalChurch'),     // Reutilizando elementos
            energy: document.getElementById('finalPeople'),
            intelligence: document.getElementById('finalArmy'),
            resources: document.getElementById('finalTreasury'),
            overlay: document.getElementById('storyComplete')
        };
        
        if (elements.title) elements.title.textContent = ending.title;
        if (elements.text) elements.text.textContent = ending.text;
        if (elements.score) elements.score.textContent = score;
        if (elements.turns) elements.turns.textContent = this.turn - 1;
        if (elements.robots) elements.robots.textContent = this.stats.robots;
        if (elements.energy) elements.energy.textContent = this.stats.energy;
        if (elements.intelligence) elements.intelligence.textContent = this.stats.intelligence;
        if (elements.resources) elements.resources.textContent = this.stats.resources;
        if (elements.overlay) elements.overlay.style.display = 'flex';
    }

    // Métodos de controle de interface
    setupEventListeners() {
        const card = document.getElementById('currentCard');
        if (!card) return;
        
        card.addEventListener('mousedown', (e) => this.startDrag(e.clientX));
        document.addEventListener('mousemove', (e) => this.handleDrag(e.clientX));
        document.addEventListener('mouseup', () => this.endDrag());
        
        card.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.startDrag(e.touches[0].clientX);
        });
        document.addEventListener('touchmove', (e) => {
            if (this.isDragging) e.preventDefault();
            this.handleDrag(e.touches[0].clientX);
        });
        document.addEventListener('touchend', () => this.endDrag());
    }

    startDrag(x) {
        if (this.isPaused || this.gameCompleted) return;
        
        this.isDragging = true;
        this.dragStartX = x;
        
        const card = document.getElementById('currentCard');
        const choices = document.getElementById('choices');
        
        if (card) card.classList.add('dragging');
        if (choices) choices.classList.add('visible');
    }

    handleDrag(x) {
        if (!this.isDragging || this.isPaused || this.gameCompleted) return;
        
        const deltaX = x - this.dragStartX;
        const card = document.getElementById('currentCard');
        if (!card) return;
        
        const rotation = deltaX * 0.1;
        card.style.transform = `translateX(${deltaX}px) rotate(${rotation}deg)`;
        
        if (Math.abs(deltaX) > 50) {
            card.style.opacity = Math.max(0.5, 1 - Math.abs(deltaX) / 200);
        } else {
            card.style.opacity = '1';
        }
    }

    endDrag() {
        if (!this.isDragging || this.isPaused || this.gameCompleted) return;
        
        const card = document.getElementById('currentCard');
        const choices = document.getElementById('choices');
        
        if (!card) return;
        
        const currentTransform = card.style.transform;
        const translateX = currentTransform.match(/translateX\(([^)]+)\)/);
        const deltaX = translateX ? parseFloat(translateX[1]) : 0;
        
        if (Math.abs(deltaX) > 100) {
            this.makeChoice(deltaX > 0 ? 'right' : 'left');
        } else {
            card.style.transform = 'translateX(0px) rotate(0deg)';
            card.style.opacity = '1';
            if (choices) choices.classList.remove('visible');
        }
        
        this.isDragging = false;
        if (card) card.classList.remove('dragging');
    }

    togglePause() {
        if (this.isPaused) {
            this.resume();
        } else {
            this.pause();
        }
    }

    pause() {
        this.isPaused = true;
        const overlay = document.getElementById('pauseOverlay');
        if (overlay) overlay.style.display = 'flex';
        this.updatePauseButton();
    }

    resume() {
        this.isPaused = false;
        const overlay = document.getElementById('pauseOverlay');
        if (overlay) overlay.style.display = 'none';
        this.updatePauseButton();
    }

    updatePauseButton() {
        const pauseButton = document.getElementById('pauseButton');
        if (pauseButton) {
            if (this.isPaused) {
                pauseButton.innerHTML = '<span>▶️</span><span>Retomar</span>';
                pauseButton.className = 'menu-button success';
            } else {
                pauseButton.innerHTML = '<span>⏸️</span><span>Pausar</span>';
                pauseButton.className = 'menu-button warning';
            }
        }
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}

// Variável global do jogo
let game;

// Funções globais de controle
function startGame() {
    game = new ProgrammingGame();
}

function startGameFromIntro() {
    const intro = document.getElementById('introOverlay');
    if (intro) intro.style.display = 'none';
    startGame();
}

function restartGame() {
    const overlays = ['gameOver', 'pauseOverlay', 'storyComplete'];
    overlays.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.style.display = 'none';
    });
    
    // Remove overlays de transição de capítulo se existirem
    const transitionOverlays = document.querySelectorAll('.overlay[style*="z-index: 1001"]');
    transitionOverlays.forEach(overlay => overlay.remove());
    
    startGame();
}

function togglePauseGame() {
    if (game) {
        game.togglePause();
    }
}

function exitGame() {
    if (confirm('Tem certeza que deseja sair do jogo?')) {
        window.location.reload();
    }
}

// Inicialização do jogo
window.onload = function() {
    console.log('🎮 O Mundo dos Objetos - Versão Completa carregada!');
    console.log('📝 Sistema de intercalação ativo');
    console.log('🔮 Status ocultos implementados');
    console.log('🧠 Knowledge → Intelligence atualizado');
    console.log('📜 6 cartas de introdução prontas');
    console.log('🔑 5 cartas-chave de POO sequenciais');
    console.log('⚡ Sistema dinâmico de eventos');
};