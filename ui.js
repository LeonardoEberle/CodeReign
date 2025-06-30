class UIManager {
    constructor(game) {
        this.game = game;
        this.elements = this.cacheElements();
    }

    cacheElements() {
        return {
            stats: {
                golens: document.getElementById('golensBar'),
                knowledge: document.getElementById('intelligenceBar'), // Mantém o ID antigo por compatibilidade
                resources: document.getElementById('resourcesBar')
            },
            card: {
                element: document.getElementById('currentCard'),
                image: document.getElementById('cardImage'),
                title: document.getElementById('cardTitle'),
                text: document.getElementById('cardText'),
                leftChoice: document.getElementById('leftChoice'),
                rightChoice: document.getElementById('rightChoice'),
                choices: document.getElementById('choices')
            },
            effect: {
                card: document.getElementById('effectCard'),
                title: document.getElementById('effectTitle'),
                list: document.getElementById('effectList')
            },
            progress: {
                chapter: document.getElementById('chapterCount'),
                bar: document.getElementById('storyProgress'),
                turn: document.getElementById('turnCount')
            }
        };
    }

    updateStats(stats) {
        const statBars = this.elements.stats;
        for (let statName in statBars) {
            if (statBars[statName] && stats[statName] !== undefined) {
                statBars[statName].style.width = stats[statName] + '%';
                if (stats[statName] <= 20 || stats[statName] >= 80) {
                    statBars[statName].style.background = '#f44336';
                } else if (stats[statName] <= 40 || stats[statName] >= 60) {
                    statBars[statName].style.background = '#FF9800';
                } else {
                    statBars[statName].style.background = '#4CAF50';
                }
            }
        }
    }

    updateTurnCounter(turn) {
        if (this.elements.progress.turn) {
            this.elements.progress.turn.textContent = turn;
        }
    }

    displayCard(card) {
        const elements = this.elements.card;

        if (elements.image) elements.image.src = card.image || ''; 
        if (elements.title) elements.title.textContent = card.title;
        if (elements.text) elements.text.textContent = card.text;
        if (elements.leftChoice) elements.leftChoice.textContent = card.leftChoice;
        if (elements.rightChoice) elements.rightChoice.textContent = card.rightChoice;

        if (elements.element) {
            elements.element.style.transform = 'translateX(0px) rotate(0deg)';
            elements.element.style.opacity = '1';
            elements.element.classList.remove('key-card', 'intro-card');
            const existingIndicator = elements.element.querySelector('.card-type-indicator');
            if (existingIndicator) existingIndicator.remove();
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

    showEffectCard(choiceText, effects, hiddenEffects = {}) {
        const { card, title, list } = this.elements.effect;
        if (!card || !title || !list) return;
        title.textContent = `"${choiceText}"`;
        list.innerHTML = '';
        this.addVisibleEffects(list, effects);
        this.addHiddenEffects(list, hiddenEffects);
        card.style.display = 'block';
        setTimeout(() => {
            card.classList.add('show');
        }, 50);
    }

    addVisibleEffects(list, effects) {
        const statNames = {
            golens: { icon: '🤖', name: 'Gólens' },
            knowledge: { icon: '🧠', name: 'Conhecimento' },
            intelligence: { icon: '🧠', name: 'Conhecimento' }, // Fallback
            resources: { icon: '💾', name: 'Recursos' }
        };
        
        for (let stat in effects) {
            // Ignorar efeitos de energia
            if (stat === 'energy') continue;
            
            const value = effects[stat];
            if (value !== 0) {
                // Converter nomes inconsistentes
                let displayStat = stat;
                if (stat === 'intelligence') displayStat = 'knowledge';
                
                const statInfo = statNames[displayStat] || statNames[stat];
                const effectItem = this.createEffectItem(statInfo.icon, statInfo.name, value);
                list.appendChild(effectItem);
            }
        }
    }

    addHiddenEffects(list, hiddenEffects) {
        const importantHiddenEffects = ['player_conhecimento', 'golem_ataque', 'golem_defesa', 'player_felicidade'];
        const statusNames = {
            player_conhecimento: 'Conhecimento do Player',
            player_felicidade: 'Felicidade do Player',
            golem_ataque: 'Ataque do Gólem',
            golem_defesa: 'Defesa do Gólem',
            golem_felicidade: 'Felicidade do Gólem',
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
                const effectItem = this.createEffectItem('🔮', statusNames[status], hiddenEffects[status], true);
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
            this.elements.progress.chapter.textContent = `Cap. ${chapter}/${maxChapters} | POO: ${keyProgress} | Total: ${totalCardsPlayed}`;
        }
    }

    setupDragListeners(handlers) {
        const card = this.elements.card.element;
        if (!card) return;
        card.addEventListener('mousedown', (e) => handlers.onDragStart(e.clientX));
        document.addEventListener('mousemove', (e) => handlers.onDragMove(e.clientX));
        document.addEventListener('mouseup', () => handlers.onDragEnd());
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

if (typeof module !== 'undefined' && module.exports) {
    module.exports = UIManager;
} else if (typeof window !== 'undefined') {
    window.UIManager = UIManager;
}