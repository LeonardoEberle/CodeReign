class ReignsGame {
    constructor() {
        this.stats = {
            church: 50,
            people: 50,
            army: 50,
            treasury: 50
        };
        
        // Status ocultos que influenciam as cartas de consequência
        this.hiddenStatus = { ...INITIAL_HIDDEN_STATUS };
        
        // Sistema de capítulos
        this.currentChapter = 1;
        this.maxChapters = 4;
        this.cardsPlayedInChapter = 0;
        this.keyCardsPlayedInChapter = 0;
        this.requiredKeyCards = 5;
        this.requiredConsequenceCards = 10;
        
        // Controle de cartas
        this.keyCardsQueue = []; // Cartas-chave do capítulo atual
        this.playedKeyCards = new Set(); // Cartas-chave já jogadas no capítulo
        this.availableConsequenceCards = []; // Cartas de consequência disponíveis
        this.playedConsequenceCards = new Set(); // Cartas de consequência já jogadas no capítulo
        
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
        if (!CHAPTER_KEY_CARDS || !CONSEQUENCE_CARDS) {
            console.error('Erro: Cartas não foram carregadas! Verifique se o arquivo cards.js foi incluído.');
            return;
        }
        
        this.setupChapter();
        this.updateDisplay();
        this.loadNextCard();
        this.setupEventListeners();
        this.updatePauseButton();
    }

    setupChapter() {
        console.log(`🏰 Configurando Capítulo ${this.currentChapter}`);
        
        // Reset contadores do capítulo
        this.cardsPlayedInChapter = 0;
        this.keyCardsPlayedInChapter = 0;
        this.playedKeyCards.clear();
        this.playedConsequenceCards.clear();
        
        // Configurar cartas-chave do capítulo atual
        const chapterKeyCards = CHAPTER_KEY_CARDS[this.currentChapter] || [];
        this.keyCardsQueue = [...chapterKeyCards];
        this.shuffleArray(this.keyCardsQueue); // Embaralha ordem das cartas-chave
        
        // Configurar cartas de consequência disponíveis
        this.updateAvailableConsequenceCards();
        
        console.log(`📋 Cartas-chave: ${this.keyCardsQueue.length}, Consequências disponíveis: ${this.availableConsequenceCards.length}`);
    }

    updateAvailableConsequenceCards() {
        // Filtra cartas de consequência baseado nos status ocultos atuais
        this.availableConsequenceCards = CONSEQUENCE_CARDS.filter(card => {
            // Verifica se a carta já foi jogada neste capítulo
            if (this.playedConsequenceCards.has(card.id)) {
                return false;
            }
            
            // Verifica condições de trigger
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
        
        // Ordena por peso (cartas mais importantes aparecem mais)
        this.availableConsequenceCards.sort((a, b) => (b.weight || 1) - (a.weight || 1));
    }

    loadNextCard() {
        // Verifica se o capítulo foi completado
        if (this.isChapterComplete()) {
            this.advanceChapter();
            return;
        }
        
        let cardToLoad = null;
        
        // Prioriza cartas-chave se ainda precisamos delas
        if (this.keyCardsPlayedInChapter < this.requiredKeyCards && this.keyCardsQueue.length > 0) {
            cardToLoad = this.keyCardsQueue.shift();
            cardToLoad.isKeyCard = true;
            console.log(`🔑 Carregando carta-chave: ${cardToLoad.title}`);
        }
        // Caso contrário, carrega carta de consequência
        else if (this.availableConsequenceCards.length > 0) {
            // Seleção ponderada baseada no peso
            cardToLoad = this.selectWeightedConsequenceCard();
            cardToLoad.isKeyCard = false;
            console.log(`⚡ Carregando carta de consequência: ${cardToLoad.title}`);
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

    selectWeightedConsequenceCard() {
        // Seleção ponderada: cartas com maior peso têm mais chance
        const totalWeight = this.availableConsequenceCards.reduce((sum, card) => sum + (card.weight || 1), 0);
        let random = Math.random() * totalWeight;
        
        for (let card of this.availableConsequenceCards) {
            random -= (card.weight || 1);
            if (random <= 0) {
                // Remove a carta selecionada da lista de disponíveis
                const index = this.availableConsequenceCards.indexOf(card);
                this.availableConsequenceCards.splice(index, 1);
                return card;
            }
        }
        
        // Fallback: retorna a primeira carta
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
        
        // Reset da posição da carta
        const cardElement = document.getElementById('currentCard');
        const choices = document.getElementById('choices');
        
        if (cardElement) {
            cardElement.style.transform = 'translateX(0px) rotate(0deg)';
            cardElement.style.opacity = '1';
            
            // Remove classes anteriores
            cardElement.classList.remove('key-card');
            
            // Remove indicador anterior se existir
            const existingIndicator = cardElement.querySelector('.card-type-indicator');
            if (existingIndicator) existingIndicator.remove();
            
            // Adiciona estilo baseado no tipo de carta
            if (card.isKeyCard) {
                cardElement.classList.add('key-card');
                
                // Adiciona indicador visual
                const indicator = document.createElement('div');
                indicator.className = 'card-type-indicator card-type-key';
                indicator.textContent = '🔑 Chave';
                cardElement.appendChild(indicator);
            } else {
                // Adiciona indicador para carta de consequência
                const indicator = document.createElement('div');
                indicator.className = 'card-type-indicator card-type-consequence';
                indicator.textContent = '⚡ Consequência';
                cardElement.appendChild(indicator);
            }
        }
        if (choices) choices.classList.remove('visible');
    }

    isChapterComplete() {
        return (this.keyCardsPlayedInChapter >= this.requiredKeyCards && 
                this.cardsPlayedInChapter >= (this.requiredKeyCards + this.requiredConsequenceCards));
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
        // Cria overlay de transição de capítulo
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        overlay.style.zIndex = '1001';
        
        const content = document.createElement('div');
        content.className = 'overlay-content';
        content.innerHTML = `
            <div class="overlay-title">📜 Capítulo ${this.currentChapter}</div>
            <div class="overlay-text">
                ${this.getChapterDescription(this.currentChapter)}
            </div>
            <button class="overlay-button" onclick="this.parentElement.parentElement.remove(); game.continueToNextChapter()">
                Continuar História
            </button>
        `;
        
        overlay.appendChild(content);
        document.body.appendChild(overlay);
    }

    getChapterDescription(chapter) {
        const descriptions = {
            2: "Os fundamentos de vosso reinado foram estabelecidos. Agora enfrentareis os primeiros grandes desafios que testarão vossa sabedoria e determinação.",
            3: "Vossa liderança foi provada nas adversidades. É hora de consolidar vosso poder e construir o legado que durará séculos.",
            4: "O reino está maduro e vossa experiência, vasta. As decisões finais que tomareis determinarão como a história lembrará de vosso reinado."
        };
        return descriptions[chapter] || "Uma nova fase de vosso reinado começa...";
    }

    continueToNextChapter() {
        this.setupChapter();
        this.loadNextCard();
    }

    makeChoice(direction) {
        if (!this.currentCard) return;
        
        const effect = direction === 'left' ? this.currentCard.leftEffect : this.currentCard.rightEffect;
        const hiddenEffect = direction === 'left' ? this.currentCard.leftHiddenEffects : this.currentCard.rightHiddenEffects;
        const choiceText = direction === 'left' ? this.currentCard.leftChoice : this.currentCard.rightChoice;
        
        // Aplicar efeitos visíveis
        for (let stat in effect) {
            this.stats[stat] = Math.max(0, Math.min(100, this.stats[stat] + effect[stat]));
        }
        
        // Aplicar efeitos ocultos
        if (hiddenEffect) {
            for (let status in hiddenEffect) {
                this.hiddenStatus[status] = (this.hiddenStatus[status] || 0) + hiddenEffect[status];
                // Mantém status ocultos entre -100 e 100
                this.hiddenStatus[status] = Math.max(-100, Math.min(100, this.hiddenStatus[status]));
            }
        }
        
        // Registrar carta jogada
        if (this.currentCard.isKeyCard) {
            this.keyCardsPlayedInChapter++;
            this.playedKeyCards.add(this.currentCard.id);
        } else {
            this.playedConsequenceCards.add(this.currentCard.id);
        }
        
        this.cardsPlayedInChapter++;
        
        // Atualizar cartas de consequência disponíveis após mudanças nos status
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
                }, 2500); // Tempo um pouco maior para ler os efeitos
            }
        }, 300);
    }

    updateDisplay() {
        // Atualizar barras de stats com cores baseadas no valor
        const statBars = {
            church: document.getElementById('churchBar'),
            people: document.getElementById('peopleBar'),
            army: document.getElementById('armyBar'),
            treasury: document.getElementById('treasuryBar')
        };
        
        for (let stat in statBars) {
            if (statBars[stat]) {
                statBars[stat].style.width = this.stats[stat] + '%';
                
                // Cores baseadas no valor e status ocultos
                if (this.stats[stat] <= 20 || this.stats[stat] >= 80) {
                    statBars[stat].style.background = '#f44336'; // Vermelho - perigo
                } else if (this.stats[stat] <= 40 || this.stats[stat] >= 60) {
                    statBars[stat].style.background = '#FF9800'; // Laranja - cuidado
                } else {
                    statBars[stat].style.background = '#4CAF50'; // Verde - seguro
                }
            }
        }
        
        // Atualizar contador de turnos
        const turnElement = document.getElementById('turnCount');
        if (turnElement) turnElement.textContent = this.turn;
    }

    updateChapterProgress() {
        // Atualizar progresso do capítulo
        const progressElement = document.getElementById('storyProgress');
        if (progressElement) {
            const totalRequired = this.requiredKeyCards + this.requiredConsequenceCards;
            const progress = (this.cardsPlayedInChapter / totalRequired) * 100;
            progressElement.style.width = Math.min(100, progress) + '%';
        }
        
        // Atualizar informações do capítulo
        const chapterElement = document.getElementById('chapterCount');
        if (chapterElement) {
            const keyProgress = `${this.keyCardsPlayedInChapter}/${this.requiredKeyCards}`;
            const totalProgress = `${this.cardsPlayedInChapter}/${this.requiredKeyCards + this.requiredConsequenceCards}`;
            chapterElement.textContent = `Cap. ${this.currentChapter}/${this.maxChapters} | Chave: ${keyProgress} | Total: ${totalProgress}`;
        }
        
        // Mostrar status ocultos no console para debug (remover em produção)
        if (this.turn % 3 === 0) { // A cada 3 turnos
            console.log('📊 Status Ocultos:', this.hiddenStatus);
        }
    }

    showEffectCard(choiceText, effects, hiddenEffects = {}) {
        const effectCard = document.getElementById('effectCard');
        const effectTitle = document.getElementById('effectTitle');
        const effectList = document.getElementById('effectList');
        
        if (!effectCard || !effectTitle || !effectList) return;
        
        effectTitle.textContent = `"${choiceText}"`;
        effectList.innerHTML = '';
        
        const statNames = {
            church: { icon: '⛪', name: 'Igreja' },
            people: { icon: '👥', name: 'Povo' },
            army: { icon: '⚔️', name: 'Exército' },
            treasury: { icon: '💰', name: 'Tesouro' }
        };
        
        // Mostrar efeitos visíveis
        for (let stat in effects) {
            const value = effects[stat];
            if (value !== 0) {
                const effectItem = document.createElement('div');
                effectItem.className = 'effect-item';
                
                const statInfo = statNames[stat];
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
        
        // Mostrar alguns efeitos ocultos importantes (opcional)
        const importantHiddenEffects = ['peopleTrust', 'churchSatisfaction', 'militaryLoyalty', 'economicStability'];
        let hasImportantHiddenEffects = false;
        
        for (let status of importantHiddenEffects) {
            if (hiddenEffects[status] && Math.abs(hiddenEffects[status]) >= 10) {
                if (!hasImportantHiddenEffects) {
                    const separator = document.createElement('div');
                    separator.style.cssText = 'border-top: 1px solid #666; margin: 10px 0 5px 0; padding-top: 5px; font-size: 12px; opacity: 0.7;';
                    separator.textContent = 'Efeitos a Longo Prazo:';
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
                    peopleTrust: 'Confiança do Povo',
                    churchSatisfaction: 'Satisfação da Igreja',
                    militaryLoyalty: 'Lealdade Militar',
                    economicStability: 'Estabilidade Econômica'
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

    storyComplete() {
        this.gameCompleted = true;
        
        // Calcular pontuação baseada em múltiplos fatores
        let score = 0;
        let balanceBonus = 0;
        let hiddenBonus = 0;
        
        // Bônus por stats equilibradas
        for (let stat in this.stats) {
            if (this.stats[stat] >= 30 && this.stats[stat] <= 70) {
                balanceBonus += 30;
            } else if (this.stats[stat] >= 20 && this.stats[stat] <= 80) {
                balanceBonus += 15;
            }
        }
        
        // Bônus por status ocultos positivos
        for (let status in this.hiddenStatus) {
            if (this.hiddenStatus[status] > 10) {
                hiddenBonus += 5;
            } else if (this.hiddenStatus[status] < -10) {
                hiddenBonus -= 5;
            }
        }
        
        // Pontuação final
        score = Math.round((this.turn * 8) + balanceBonus + hiddenBonus + 200); // +200 por completar
        
        // Determinar final baseado em stats e status ocultos
        let ending = this.determineEnding();
        
        // Atualizar tela de fim
        const elements = {
            title: document.getElementById('storyEndTitle'),
            text: document.getElementById('storyEndText'),
            score: document.getElementById('finalScore'),
            turns: document.getElementById('finalTurns'),
            church: document.getElementById('finalChurch'),
            people: document.getElementById('finalPeople'),
            army: document.getElementById('finalArmy'),
            treasury: document.getElementById('finalTreasury'),
            overlay: document.getElementById('storyComplete')
        };
        
        if (elements.title) elements.title.textContent = ending.title;
        if (elements.text) elements.text.textContent = ending.text;
        if (elements.score) elements.score.textContent = score;
        if (elements.turns) elements.turns.textContent = this.turn - 1;
        if (elements.church) elements.church.textContent = this.stats.church;
        if (elements.people) elements.people.textContent = this.stats.people;
        if (elements.army) elements.army.textContent = this.stats.army;
        if (elements.treasury) elements.treasury.textContent = this.stats.treasury;
        if (elements.overlay) elements.overlay.style.display = 'flex';
    }

    determineEnding() {
        const stats = this.stats;
        const hidden = this.hiddenStatus;
        
        // Finais baseados em combinação de stats visíveis e ocultas
        
        // Final Supremo - Equilíbrio perfeito + status positivos
        const allBalanced = Object.values(stats).every(stat => stat >= 40 && stat <= 60);
        const mostStatusPositive = Object.values(hidden).filter(status => status > 5).length >= 8;
        
        if (allBalanced && mostStatusPositive) {
            return {
                title: "👑 O Rei Lendário",
                text: "Vosso reinado transcendeu todas as expectativas! Conseguistes o impossível: um reino em perfeito equilíbrio onde todos prosperam. Vossa sabedoria será estudada por milênios e vosso nome ecoará pela eternidade como o maior monarca da história."
            };
        }
        
        // Finais baseados em status ocultos importantes
        if (hidden.peopleTrust > 15 && stats.people >= 60) {
            return {
                title: "💖 O Rei Eternamente Amado",
                text: "O amor do povo por vós é absoluto e inabalável. Mesmo séculos após vossa morte, o povo ainda celebra vosso reinado como a era dourada. Vossa memória vive nos corações de cada súdito."
            };
        }
        
        if (hidden.militaryLoyalty > 15 && stats.army >= 60) {
            return {
                title: "⚔️ O Imperador Conquistador",
                text: "Vosso exército vos segue cegamente, prontos para conquistar o mundo em vosso nome. Outros reinos se curvam diante de vossa força militar incomparável."
            };
        }
        
        if (hidden.churchSatisfaction > 15 && stats.church >= 60) {
            return {
                title: "✨ O Rei Santo",
                text: "A igreja vos venera como um santo em vida. Vossa piedade e devoção transformaram o reino num bastião da fé que ilumina o mundo."
            };
        }
        
        if (hidden.economicStability > 15 && stats.treasury >= 60) {
            return {
                title: "💎 O Rei Dourado",
                text: "Transformastes vosso reino na nação mais próspera conhecida. Ouro flui como água e a riqueza eleva todos os súditos a uma vida de abundância."
            };
        }
        
        // Finais negativos baseados em status ocultos
        if (hidden.socialUnrest > 20) {
            return {
                title: "🔥 O Reino em Chamas",
                text: "Embora tenhais sobrevivido, vosso reino ferve em constante agitação. A paz é uma memória distante e revoltas são uma ameaça constante."
            };
        }
        
        if (hidden.corruption > 20) {
            return {
                title: "🐍 O Reino Corrompido",
                text: "A corrupção se espalhou como praga por vosso reino. Embora mantenhais o poder, a podridão corrói as fundações de tudo que construístes."
            };
        }
        
        // Finais padrão por stats dominantes
        if (stats.people >= 70) {
            return {
                title: "👥 O Rei do Povo",
                text: "O povo vos adora acima de tudo. Vossa dedicação aos súditos criou uma era de felicidade e prosperidade popular."
            };
        }
        
        if (stats.army >= 70) {
            return {
                title: "🛡️ O Rei Guerreiro",
                text: "Vossa força militar é lendária. Nenhum inimigo ousa desafiar vossas fronteiras e vossa reputação militar ecoa por todo o mundo conhecido."
            };
        }
        
        if (stats.church >= 70) {
            return {
                title: "⛪ O Rei Devoto",
                text: "Vossa devoção à fé marcou profundamente vosso reinado. O reino tornou-se um farol de espiritualidade que guia outras nações."
            };
        }
        
        if (stats.treasury >= 70) {
            return {
                title: "💰 O Rei Próspero",
                text: "Vossos cofres transbordam e o comércio floresce. A prosperidade econômica atraiu os melhores artistas e eruditos do mundo."
            };
        }
        
        // Final neutro
        return {
            title: "⚖️ O Rei Equilibrado",
            text: "Vosso reinado foi marcado pela prudência e equilíbrio. Embora não tenha brilhado espetacularmente, mantivestes o reino estável e funcional."
        };
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
        let reason = "Seu reino encontrou seu fim...";
        
        // Razões mais específicas baseadas em status ocultos
        if (this.stats.church <= 0) {
            if (this.hiddenStatus.religiousConflict > 10) {
                reason = "A guerra religiosa devastou o reino! As diferentes facções da fé se destruíram mutuamente!";
            } else {
                reason = "A fé abandonou completamente vosso reino. O clero se rebelou e declarou vossa deposição!";
            }
        } else if (this.stats.church >= 100) {
            reason = "A igreja tomou o poder absoluto! Fostes declarado herege e exilado para sempre!";
        } else if (this.stats.people <= 0) {
            if (this.hiddenStatus.socialUnrest > 15) {
                reason = "A revolução popular explodiu! O povo enfurecido invadiu o palácio gritando por justiça!";
            } else {
                reason = "O desespero do povo atingiu o limite! Uma revolta massiva varreu vosso governo!";
            }
        } else if (this.stats.people >= 100) {
            reason = "O povo tornou-se completamente incontrolável! A anarquia total domina as ruas!";
        } else if (this.stats.army <= 0) {
            if (this.hiddenStatus.foreignRelations < -15) {
                reason = "Sem defesas, os inimigos invadiram em massa! Vosso reino foi conquistado e dividido!";
            } else {
                reason = "Sem exército para vos defender, fostes derrubado por conspiradores internos!";
            }
        } else if (this.stats.army >= 100) {
            reason = "Os militares tomaram o controle total! Um golpe militar derrubou vossa dinastia!";
        } else if (this.stats.treasury <= 0) {
            if (this.hiddenStatus.economicStability < -15) {
                reason = "O colapso econômico total destruiu o reino! Até mesmo a nobreza vos abandonou!";
            } else {
                reason = "A falência completa levou à vossa deposição! Nem mesmo os guardas foram pagos!";
            }
        } else if (this.stats.treasury >= 100) {
            reason = "Tanto ouro atraiu invasores de todos os cantos do mundo! Vosso reino foi saqueado!";
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

    // Métodos de controle (drag, pause, etc.) - mantidos iguais ao anterior
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

    // Utilitário para embaralhar arrays
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}

// Variável global do jogo
let game;

// Funções globais
function startGame() {
    game = new ReignsGame();
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

// Inicialização
window.onload = function() {
    console.log('🎮 Jogo Reigns com Sistema Avançado carregado!');
};