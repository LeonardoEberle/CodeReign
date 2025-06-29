class ReignsGame {
    constructor() {
        this.stats = {
            church: 50,
            people: 50,
            army: 50,
            treasury: 50
        };
        this.turn = 1;
        this.currentCardIndex = 0; // Agora representa a posição na história linear
        this.isDragging = false;
        this.dragStartX = 0;
        this.cardStartX = 0;
        this.isPaused = false;
        this.gameCompleted = false; // Nova flag para controlar fim da história
        
        // Cartas agora são carregadas do arquivo cards.js
        this.cards = GAME_CARDS || [];
        
        this.init();
    }

    init() {
        // Verifica se as cartas foram carregadas corretamente
        if (this.cards.length === 0) {
            console.error('Erro: Cartas não foram carregadas! Verifique se o arquivo cards.js foi incluído.');
            return;
        }
        
        this.updateDisplay();
        this.loadNextCard();
        this.setupEventListeners();
        this.updatePauseButton(); // Inicializa o botão
    }

    setupEventListeners() {
        const card = document.getElementById('currentCard');
        
        // Mouse events
        card.addEventListener('mousedown', (e) => this.startDrag(e.clientX));
        document.addEventListener('mousemove', (e) => this.handleDrag(e.clientX));
        document.addEventListener('mouseup', () => this.endDrag());
        
        // Touch events
        card.addEventListener('touchstart', (e) => this.startDrag(e.touches[0].clientX));
        document.addEventListener('touchmove', (e) => this.handleDrag(e.touches[0].clientX));
        document.addEventListener('touchend', () => this.endDrag());
    }

    startDrag(x) {
        if (this.isPaused) return;
        this.isDragging = true;
        this.dragStartX = x;
        this.cardStartX = 0;
        document.getElementById('currentCard').classList.add('dragging');
        document.getElementById('choices').classList.add('visible');
    }

    handleDrag(x) {
        if (!this.isDragging || this.isPaused) return;
        
        const deltaX = x - this.dragStartX;
        const card = document.getElementById('currentCard');
        const rotation = deltaX * 0.1;
        
        card.style.transform = `translateX(${deltaX}px) rotate(${rotation}deg)`;
        
        // Visual feedback
        if (Math.abs(deltaX) > 50) {
            card.style.opacity = Math.max(0.5, 1 - Math.abs(deltaX) / 200);
        }
    }

    endDrag() {
        if (!this.isDragging || this.isPaused) return;
        
        const card = document.getElementById('currentCard');
        const currentTransform = card.style.transform;
        const translateX = currentTransform.match(/translateX\(([^)]+)\)/);
        const deltaX = translateX ? parseFloat(translateX[1]) : 0;
        
        if (Math.abs(deltaX) > 100) {
            // Make choice
            this.makeChoice(deltaX > 0 ? 'right' : 'left');
        } else {
            // Return to center
            card.style.transform = 'translateX(0px) rotate(0deg)';
            card.style.opacity = '1';
            document.getElementById('choices').classList.remove('visible');
        }
        
        this.isDragging = false;
        card.classList.remove('dragging');
    }

    makeChoice(direction) {
        const currentCard = this.cards[this.currentCardIndex];
        const effect = direction === 'left' ? currentCard.leftEffect : currentCard.rightEffect;
        const choiceText = direction === 'left' ? currentCard.leftChoice : currentCard.rightChoice;
        
        // Apply effects
        for (let stat in effect) {
            this.stats[stat] = Math.max(0, Math.min(100, this.stats[stat] + effect[stat]));
        }
        
        // Show effect card
        this.showEffectCard(choiceText, effect);
        
        // Animate card exit
        const card = document.getElementById('currentCard');
        const exitX = direction === 'left' ? -400 : 400;
        card.style.transform = `translateX(${exitX}px) rotate(${exitX/10}deg)`;
        card.style.opacity = '0';
        
        setTimeout(() => {
            this.turn++;
            this.updateDisplay();
            
            if (this.checkGameOver()) {
                this.gameOver();
            } else if (this.checkStoryComplete()) {
                this.storyComplete();
            } else {
                // Hide effect card and load next card after a delay
                setTimeout(() => {
                    this.hideEffectCard();
                    setTimeout(() => {
                        this.loadNextCard();
                    }, 400);
                }, 2000);
            }
        }, 300);
    }

    loadNextCard() {
        if (this.cards.length === 0) {
            console.error('Erro: Nenhuma carta disponível!');
            return;
        }
        
        // Verifica se ainda há cartas na história
        if (this.currentCardIndex >= this.cards.length) {
            this.storyComplete();
            return;
        }
        
        // Carrega a próxima carta da sequência linear
        const card = this.cards[this.currentCardIndex];
        
        document.getElementById('cardCharacter').textContent = card.character;
        document.getElementById('cardTitle').textContent = card.title;
        document.getElementById('cardText').textContent = card.text;
        document.getElementById('leftChoice').textContent = card.leftChoice;
        document.getElementById('rightChoice').textContent = card.rightChoice;
        
        // Atualiza o progresso da história
        this.updateStoryProgress();
        
        // Reset card position
        const cardElement = document.getElementById('currentCard');
        cardElement.style.transform = 'translateX(0px) rotate(0deg)';
        cardElement.style.opacity = '1';
        document.getElementById('choices').classList.remove('visible');
        
        // Avança para a próxima carta na sequência
        this.currentCardIndex++;
    }

    updateDisplay() {
        // Update stat bars
        document.getElementById('churchBar').style.width = this.stats.church + '%';
        document.getElementById('peopleBar').style.width = this.stats.people + '%';
        document.getElementById('armyBar').style.width = this.stats.army + '%';
        document.getElementById('treasuryBar').style.width = this.stats.treasury + '%';
        
        // Update turn counter
        document.getElementById('turnCount').textContent = this.turn;
    }

    updateStoryProgress() {
        // Adiciona indicador de progresso da história
        const progressElement = document.getElementById('storyProgress');
        if (progressElement) {
            const progress = ((this.currentCardIndex) / this.cards.length) * 100;
            progressElement.style.width = progress + '%';
        }
        
        // Atualiza contador de capítulos se existir
        const chapterElement = document.getElementById('chapterCount');
        if (chapterElement) {
            const currentChapter = Math.floor(this.currentCardIndex / 3) + 1; // 3 cartas por capítulo
            const totalChapters = Math.ceil(this.cards.length / 3);
            chapterElement.textContent = `Capítulo ${currentChapter}/${totalChapters}`;
        }
    }

    checkStoryComplete() {
        return this.currentCardIndex >= this.cards.length;
    }

    storyComplete() {
        this.gameCompleted = true;
        
        // Calcula a pontuação final baseada no equilíbrio
        let score = 0;
        let balanceBonus = 0;
        
        // Pontos por manter stats equilibradas (entre 30-70)
        for (let stat in this.stats) {
            if (this.stats[stat] >= 30 && this.stats[stat] <= 70) {
                balanceBonus += 25;
            } else if (this.stats[stat] >= 20 && this.stats[stat] <= 80) {
                balanceBonus += 10;
            }
        }
        
        score = Math.round((this.turn * 10) + balanceBonus);
        
        // Determina o final baseado nas stats finais
        let ending = this.determineEnding();
        
        // Atualiza a tela de fim da história
        document.getElementById('storyEndTitle').textContent = ending.title;
        document.getElementById('storyEndText').textContent = ending.text;
        document.getElementById('finalScore').textContent = score;
        document.getElementById('finalTurns').textContent = this.turn - 1;
        
        // Mostra as stats finais
        document.getElementById('finalChurch').textContent = this.stats.church;
        document.getElementById('finalPeople').textContent = this.stats.people;
        document.getElementById('finalArmy').textContent = this.stats.army;
        document.getElementById('finalTreasury').textContent = this.stats.treasury;
        
        document.getElementById('storyComplete').style.display = 'flex';
    }

    determineEnding() {
        const stats = this.stats;
        
        // Finais baseados no equilíbrio das stats
        if (stats.people >= 70 && stats.church >= 60) {
            return {
                title: "O Rei Amado",
                text: "Vosso reinado será lembrado como uma era dourada. O povo vos ama e a igreja vos abençoa. Vossa sabedoria trouxe prosperidade e paz ao reino."
            };
        } else if (stats.army >= 70 && stats.treasury >= 60) {
            return {
                title: "O Conquistador",
                text: "Vos tornastes um rei poderoso e temido. Vosso exército é invencível e vossos cofres transbordam. Outros reinos tremem ao ouvir vosso nome."
            };
        } else if (stats.church >= 70) {
            return {
                title: "O Rei Devoto",
                text: "Vossa devoção à fé marcou vosso reinado. O reino tornou-se um bastião da religião, e vossa piedade será exemplo para gerações futuras."
            };
        } else if (stats.people >= 70) {
            return {
                title: "O Rei do Povo",
                text: "Vos tornastes o rei mais amado da história. O povo canta vossas virtudes e vosso reino prospera pela felicidade de seus súditos."
            };
        } else {
            return {
                title: "O Rei Equilibrado",
                text: "Vosso reinado foi marcado pelo equilíbrio e prudência. Embora não tenha brilhado em nenhum aspecto específico, mantivestes o reino estável."
            };
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
        let reason = "Seu reino encontrou seu fim...";
        
        if (this.stats.church <= 0) reason = "A fé abandonou seu reino. O clero se rebelou!";
        else if (this.stats.church >= 100) reason = "A igreja tomou o poder. Você foi exilado!";
        else if (this.stats.people <= 0) reason = "O povo se revoltou. Viva a revolução!";
        else if (this.stats.people >= 100) reason = "O povo tornou-se incontrolável. Anarquia total!";
        else if (this.stats.army <= 0) reason = "Sem exército, você foi conquistado!";
        else if (this.stats.army >= 100) reason = "Os militares deram um golpe!";
        else if (this.stats.treasury <= 0) reason = "O reino faliu. Você foi deposto!";
        else if (this.stats.treasury >= 100) reason = "Tanto ouro atraiu invasores gananciosos!";
        
        document.getElementById('deathReason').textContent = reason;
        document.getElementById('finalTurns').textContent = this.turn - 1;
        document.getElementById('gameOver').style.display = 'flex';
    }

    // Método único para alternar entre pause e resume
    togglePause() {
        if (this.isPaused) {
            this.resume();
        } else {
            this.pause();
        }
    }

    pause() {
        this.isPaused = true;
        document.getElementById('pauseOverlay').style.display = 'flex';
        this.updatePauseButton();
    }

    resume() {
        this.isPaused = false;
        document.getElementById('pauseOverlay').style.display = 'none';
        this.updatePauseButton();
    }

    // Atualiza o texto e ícone do botão baseado no estado atual
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

    showEffectCard(choiceText, effects) {
        const effectCard = document.getElementById('effectCard');
        const effectTitle = document.getElementById('effectTitle');
        const effectList = document.getElementById('effectList');
        
        effectTitle.textContent = `"${choiceText}"`;
        effectList.innerHTML = '';
        
        const statNames = {
            church: { icon: '⛪', name: 'Igreja' },
            people: { icon: '👥', name: 'Povo' },
            army: { icon: '⚔️', name: 'Exército' },
            treasury: { icon: '💰', name: 'Tesouro' }
        };
        
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
        
        effectCard.classList.add('show');
    }

    hideEffectCard() {
        const effectCard = document.getElementById('effectCard');
        effectCard.classList.remove('show');
        setTimeout(() => {
            effectCard.style.display = 'none';
        }, 400);
    }
}

let game;

function startGame() {
    game = new ReignsGame();
}

function startGameFromIntro() {
    document.getElementById('introOverlay').style.display = 'none';
    startGame();
}

function restartGame() {
    document.getElementById('gameOver').style.display = 'none';
    document.getElementById('pauseOverlay').style.display = 'none';
    document.getElementById('storyComplete').style.display = 'none'; // Nova tela de fim
    startGame();
}

// Função unificada para toggle pause/resume
function togglePauseGame() {
    if (game) {
        game.togglePause();
    }
}

function exitGame() {
    if (confirm('Tem certeza que deseja sair do jogo?')) {
        // Em um ambiente real, isso fecharia o jogo
        // Por enquanto, apenas reinicia
        window.location.reload();
    }
}

// Start the game when page loads - but show intro first
window.onload = function() {
    // Game will start when user clicks the intro button
};