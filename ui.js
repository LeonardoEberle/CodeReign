// ui.js - Sistema de Gerenciamento de UI

class UIManager {
    constructor(game) {
        this.game = game;
        this.elements = this.cacheElements();
    }

    // ========================================
    // CACHE DE ELEMENTOS DOM
    // ========================================

    cacheElements() {
        return {
            // Barras de stats
            stats: {
                robots: document.getElementById('robotsBar'),
                energy: document.getElementById('energyBar'),
                intelligence: document.getElementById('intelligenceBar'),
                resources: document.getElementById('resourcesBar')
            },

            // Elementos da carta
            card: {
                element: document.getElementById('currentCard'),
                character: document.getElementById('cardCharacter'),
                title: document.getElementById('cardTitle'),
                text: document.getElementById('cardText'),
                leftChoice: document.getElementById('leftChoice'),
                rightChoice: document.getElementById('rightChoice'),
                choices: document.getElementById('choices')
            },

            // Carta de efeito
            effect: {
                card: document.getElementById('effectCard'),
                title: document.getElementById('effectTitle'),
                list: document.getElementById('effectList')
            },

            // Progresso
            progress: {
                chapter: document.getElementById('chapterCount'),
                bar: document.getElementById('storyProgress'),
                turn: document.getElementById('turnCount')
            }
        };
    }

    // ========================================
    // ATUALIZAÇÃO DE STATS
    // ========================================

    updateStats(stats) {
        const statBars = this.elements.stats;

        for (let statName in statBars) {
            if (statBars[statName] && stats[statName] !== undefined) {
                statBars[statName].style.width = stats[statName] + '%';

                // Cores baseadas no valor
                if (stats[statName] <= 20 || stats[statName] >= 80) {
                    statBars[statName].style.background = '#f44336'; // Vermelho - perigo
                } else if (stats[statName] <= 40 || stats[statName] >= 60) {
                    statBars[statName].style.background = '#FF9800'; // Laranja - cuidado
                } else {
                    statBars[statName].style.background = '#4CAF50'; // Verde - seguro
                }
            }
        }
    }

    updateTurnCounter(turn) {
        if (this.elements.progress.turn) {
            this.elements.progress.turn.textContent = turn;
        }
    }

    // ========================================
    // EXIBIÇÃO DE CARTAS
    // ========================================

    displayCard(card) {
        const elements = this.elements.card;

        if (elements.character) elements.character.textContent = card.character;
        if (elements.title) elements.title.textContent = card.title;
        if (elements.text) elements.text.textContent = card.text;
        if (elements.leftChoice) elements.leftChoice.textContent = card.leftChoice;
        if (elements.rightChoice) elements.rightChoice.textContent = card.rightChoice;

        if (elements.element) {
            // Reset posição e opacidade
            elements.element.style.transform = 'translateX(0px) rotate(0deg)';
            elements.element.style.opacity = '1';

            // Remove classes anteriores
            elements.element.classList.remove('key-card', 'intro-card');

            // Remove indicador anterior se existir
            const existingIndicator = elements.element.querySelector('.card-type-indicator');
            if (existingIndicator) existingIndicator.remove();

            // Adiciona estilo e indicador baseado no tipo de carta
            this.applyCardStyle(elements.element, card);
        }

        if (elements.choices) elements.choices.classList.remove('visible');
    }

    applyCardStyle(cardElement, card) {
        let indicatorText = '';
        let indicatorClass = '';

        if (card.isIntro) {
            cardElement.classList.add('intro-card');
            indicatorClass = 'card-type-intro';
            indicatorText = '📜 Introdução';
        } else if (card.isKeyCard) {
            cardElement.classList.add('key-card');
            indicatorClass = 'card-type-key';
            indicatorText = '🔑 História';
        } else {
            indicatorClass = 'card-type-consequence';
            indicatorText = '⚡ Evento';
        }

        const indicator = document.createElement('div');
        indicator.className = `card-type-indicator ${indicatorClass}`;
        indicator.textContent = indicatorText;
        cardElement.appendChild(indicator);
    }

    // ========================================
    // ANIMAÇÕES DE CARTA
    // ========================================

    animateCardExit(direction) {
        const card = this.elements.card.element;
        if (card) {
            const exitX = direction === 'left' ? -400 : 400;
            card.style.transform = `translateX(${exitX}px) rotate(${exitX / 10}deg)`;
            card.style.opacity = '0';
        }
    }

    showChoices() {
        if (this.elements.card.choices) {
            this.elements.card.choices.classList.add('visible');
        }
    }

    hideChoices() {
        if (this.elements.card.choices) {
            this.elements.card.choices.classList.remove('visible');
        }
    }

    // ========================================
    // CARTA DE EFEITO
    // ========================================

    showEffectCard(choiceText, effects, hiddenEffects = {}) {
        const { card, title, list } = this.elements.effect;

        if (!card || !title || !list) return;

        title.textContent = `"${choiceText}"`;
        list.innerHTML = '';

        // Adicionar efeitos visíveis
        this.addVisibleEffects(list, effects);

        // Adicionar efeitos ocultos importantes
        this.addHiddenEffects(list, hiddenEffects);

        card.style.display = 'block';
        setTimeout(() => {
            card.classList.add('show');
        }, 50);
    }

    addVisibleEffects(list, effects) {
        const statNames = {
            robots: { icon: '🤖', name: 'Gólem' },
            energy: { icon: '⚡', name: 'Energia' },
            intelligence: { icon: '🧠', name: 'Inteligência' },
            knowledge: { icon: '🧠', name: 'Inteligência' }, // Fallback
            resources: { icon: '💾', name: 'Recursos' }
        };

        for (let stat in effects) {
            const value = effects[stat];
            if (value !== 0) {
                const displayStat = stat === 'knowledge' ? 'intelligence' : stat;
                const statInfo = statNames[displayStat] || statNames[stat];

                const effectItem = this.createEffectItem(
                    statInfo.icon,
                    statInfo.name,
                    value
                );

                list.appendChild(effectItem);
            }
        }
    }

    addHiddenEffects(list, hiddenEffects) {
        const importantHiddenEffects = ['player_conhecimento', 'robo_ataque', 'robo_defesa', 'player_felicidade'];
        const statusNames = {
            player_conhecimento: 'Conhecimento do Player',
            player_felicidade: 'Felicidade do Player',
            robo_ataque: 'Ataque do Robô',
            robo_defesa: 'Defesa do Robô',
            robo_felicidade: 'Felicidade do Robô',
            npc_gratitude: 'Gratidão dos NPCs'
        };

        let hasImportantHiddenEffects = false;

        for (let status of importantHiddenEffects) {
            if (hiddenEffects[status] && Math.abs(hiddenEffects[status]) >= 3) {
                if (!hasImportantHiddenEffects) {
                    const separator = document.createElement('div');
                    separator.style.cssText = 'border-top: 1px solid #666; margin: 10px 0 5px 0; padding-top: 5px; font-size: 12px; opacity: 0.7;';
                    separator.textContent = 'Efeitos Ocultos:';
                    list.appendChild(separator);
                    hasImportantHiddenEffects = true;
                }

                const effectItem = this.createEffectItem(
                    '🔮',
                    statusNames[status],
                    hiddenEffects[status],
                    true
                );

                list.appendChild(effectItem);
            }
        }
    }

    createEffectItem(icon, name, value, isHidden = false) {
        const effectItem = document.createElement('div');
        effectItem.className = 'effect-item';

        if (isHidden) {
            effectItem.style.opacity = '0.8';
            effectItem.style.fontSize = '12px';
        }

        const sign = value > 0 ? '+' : '';
        const valueClass = value > 0 ? 'positive' : 'negative';

        effectItem.innerHTML = `
            <div class="effect-stat">
                <span>${icon}</span>
                <span>${name}</span>
            </div>
            <span class="effect-value ${valueClass}">${sign}${value}</span>
        `;

        return effectItem;
    }

    hideEffectCard() {
        const card = this.elements.effect.card;
        if (card) {
            card.classList.remove('show');
            setTimeout(() => {
                card.style.display = 'none';
            }, 400);
        }
    }

    // ========================================
    // PROGRESSO
    // ========================================

    updateIntroProgress(currentIndex, totalCards) {
        if (this.elements.progress.chapter) {
            this.elements.progress.chapter.textContent = `Introdução: ${currentIndex + 1}/${totalCards}`;
        }

        if (this.elements.progress.bar) {
            const progress = ((currentIndex + 1) / totalCards) * 100;
            this.elements.progress.bar.style.width = progress + '%';
        }
    }

    updateChapterProgress(chapter, maxChapters, keyCardsPlayed, totalCardsPlayed) {
        if (this.elements.progress.bar) {
            const progress = (keyCardsPlayed / 5) * 100;
            this.elements.progress.bar.style.width = Math.min(100, progress) + '%';
        }

        if (this.elements.progress.chapter) {
            const keyProgress = `${keyCardsPlayed}/5`;
            this.elements.progress.chapter.textContent =
                `Cap. ${chapter}/${maxChapters} | POO: ${keyProgress} | Total: ${totalCardsPlayed}`;
        }
    }

    // ========================================
    // DRAG AND DROP
    // ========================================

    setupDragListeners(handlers) {
        const card = this.elements.card.element;
        if (!card) return;

        // Mouse events
        card.addEventListener('mousedown', (e) => handlers.onDragStart(e.clientX));
        document.addEventListener('mousemove', (e) => handlers.onDragMove(e.clientX));
        document.addEventListener('mouseup', () => handlers.onDragEnd());

        // Touch events
        card.addEventListener('touchstart', (e) => {
            e.preventDefault();
            handlers.onDragStart(e.touches[0].clientX);
        });
        document.addEventListener('touchmove', (e) => {
            if (handlers.isDragging()) e.preventDefault();
            handlers.onDragMove(e.touches[0].clientX);
        });
        document.addEventListener('touchend', () => handlers.onDragEnd());
    }

    setCardDragging(isDragging) {
        const card = this.elements.card.element;
        if (card) {
            if (isDragging) {
                card.classList.add('dragging');
            } else {
                card.classList.remove('dragging');
            }
        }
    }

    updateCardPosition(deltaX) {
        const card = this.elements.card.element;
        if (!card) return;

        const rotation = deltaX * 0.1;
        card.style.transform = `translateX(${deltaX}px) rotate(${rotation}deg)`;

        if (Math.abs(deltaX) > 50) {
            card.style.opacity = Math.max(0.5, 1 - Math.abs(deltaX) / 200);
        } else {
            card.style.opacity = '1';
        }
    }

    resetCardPosition() {
        const card = this.elements.card.element;
        if (card) {
            card.style.transform = 'translateX(0px) rotate(0deg)';
            card.style.opacity = '1';
        }
    }

    getCardDeltaX() {
        const card = this.elements.card.element;
        if (!card) return 0;

        const currentTransform = card.style.transform;
        const translateX = currentTransform.match(/translateX\(([^)]+)\)/);
        return translateX ? parseFloat(translateX[1]) : 0;
    }
}

// Exportar para compatibilidade
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UIManager;
} else if (typeof window !== 'undefined') {
    window.UIManager = UIManager;
}