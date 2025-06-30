// menu.js - Sistema de Menus e Overlays

class MenuSystem {
    constructor(game) {
        this.game = game;
        this.overlays = {
            intro: 'introOverlay',
            pause: 'pauseOverlay',
            gameOver: 'gameOver',
            storyComplete: 'storyComplete'
        };
    }

    // ========================================
    // MENU INICIAL E INTRODUÇÃO
    // ========================================

    showIntroOverlay() {
        const overlay = document.getElementById(this.overlays.intro);
        if (overlay) overlay.style.display = 'flex';
    }

    hideIntroOverlay() {
        const overlay = document.getElementById(this.overlays.intro);
        if (overlay) overlay.style.display = 'none';
    }

    startGameFromIntro() {
        this.hideIntroOverlay();
        if (window.startGame) window.startGame();
    }

    // ========================================
    // MENU DE PAUSA
    // ========================================

    togglePause() {
        if (this.game.isPaused) {
            this.resume();
        } else {
            this.pause();
        }
    }

    pause() {
        this.game.isPaused = true;
        const overlay = document.getElementById(this.overlays.pause);
        if (overlay) overlay.style.display = 'flex';
        this.updatePauseButton();
    }

    resume() {
        this.game.isPaused = false;
        const overlay = document.getElementById(this.overlays.pause);
        if (overlay) overlay.style.display = 'none';
        this.updatePauseButton();
    }

    updatePauseButton() {
        const pauseButton = document.getElementById('pauseButton');
        if (pauseButton) {
            if (this.game.isPaused) {
                pauseButton.innerHTML = '<span>▶️</span><span>Retomar</span>';
                pauseButton.className = 'menu-button success';
            } else {
                pauseButton.innerHTML = '<span>⏸️</span><span>Pausar</span>';
                pauseButton.className = 'menu-button warning';
            }
        }
    }

    // ========================================
    // GAME OVER
    // ========================================

    showGameOver(reason) {
        const elements = {
            reason: document.getElementById('deathReason'),
            turns: document.getElementById('finalTurns'),
            overlay: document.getElementById(this.overlays.gameOver)
        };

        if (elements.reason) elements.reason.textContent = reason;
        if (elements.turns) elements.turns.textContent = this.game.turn - 1;
        if (elements.overlay) elements.overlay.style.display = 'flex';
    }

    getGameOverReason() {
        const stats = this.game.stats;

        if (stats.robots <= 0) {
            return "Todos os seus robôs foram destruídos! Sem eles, você não pode continuar sua missão.";
        } else if (stats.robots >= 100) {
            return "Seus robôs evoluíram além do controle! Eles se tornaram independentes e te abandonaram.";
        } else if (stats.energy <= 0) {
            return "Você está exausto demais para continuar programando. Seus olhos se fecham...";
        } else if (stats.energy >= 100) {
            return "Você está com tanta energia que não consegue se concentrar! Sua mente está muito agitada.";
        } else if (stats.intelligence <= 0) {
            return "Você esqueceu tudo sobre programação! Não consegue mais escrever uma linha de código.";
        } else if (stats.intelligence >= 100) {
            return "Sua inteligência transcendeu este mundo! Você se torna parte da matrix e desaparece.";
        } else if (stats.resources <= 0) {
            return "Sem recursos computacionais, seus programas não podem mais rodar. Tudo trava.";
        } else if (stats.resources >= 100) {
            return "Tanto poder computacional atraiu a atenção do Grande Programador! Ele te encontrou!";
        }

        return "Sua jornada no Mundo dos Objetos chegou ao fim...";
    }

    // ========================================
    // HISTÓRIA COMPLETA
    // ========================================

    showStoryComplete(score, ending) {
        const elements = {
            title: document.getElementById('storyEndTitle'),
            text: document.getElementById('storyEndText'),
            score: document.getElementById('finalScore'),
            turns: document.getElementById('finalTurns'),
            robots: document.getElementById('finalChurch'),
            energy: document.getElementById('finalPeople'),
            intelligence: document.getElementById('finalArmy'),
            resources: document.getElementById('finalTreasury'),
            overlay: document.getElementById(this.overlays.storyComplete)
        };

        if (elements.title) elements.title.textContent = ending.title;
        if (elements.text) elements.text.textContent = ending.text;
        if (elements.score) elements.score.textContent = score;
        if (elements.turns) elements.turns.textContent = this.game.turn - 1;
        if (elements.robots) elements.robots.textContent = this.game.stats.robots;
        if (elements.energy) elements.energy.textContent = this.game.stats.energy;
        if (elements.intelligence) elements.intelligence.textContent = this.game.stats.intelligence;
        if (elements.resources) elements.resources.textContent = this.game.stats.resources;
        if (elements.overlay) elements.overlay.style.display = 'flex';
    }

    // ========================================
    // TRANSIÇÕES DE CAPÍTULO
    // ========================================

    showChapterTransition(chapter, description) {
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        overlay.style.zIndex = '1001';

        const content = document.createElement('div');
        content.className = 'overlay-content';
        content.innerHTML = `
            <div class="overlay-title">💻 Capítulo ${chapter}</div>
            <div class="overlay-text">${description}</div>
            <button class="overlay-button" onclick="menuSystem.closeChapterTransition(this)">
                Continuar Programando
            </button>
        `;

        overlay.appendChild(content);
        document.body.appendChild(overlay);
    }

    closeChapterTransition(button) {
        const overlay = button.closest('.overlay');
        if (overlay) overlay.remove();
        if (this.game) this.game.continueToNextChapter();
    }

    // ========================================
    // GAME OVER NA INTRODUÇÃO
    // ========================================

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
            <button class="overlay-button" onclick="menuSystem.closeIntroGameOver(this)">
                Tentar Novamente
            </button>
            <button class="overlay-button secondary" onclick="exitGame()">
                Voltar ao Mundo Real
            </button>
        `;

        overlay.appendChild(content);
        document.body.appendChild(overlay);
    }

    closeIntroGameOver(button) {
        const overlay = button.closest('.overlay');
        if (overlay) overlay.remove();
        if (this.game) this.game.restartIntro();
    }

    // ========================================
    // UTILITÁRIOS
    // ========================================

    hideAllOverlays() {
        Object.values(this.overlays).forEach(id => {
            const element = document.getElementById(id);
            if (element) element.style.display = 'none';
        });

        // Remove overlays de transição de capítulo
        const transitionOverlays = document.querySelectorAll('.overlay[style*="z-index: 1001"]');
        transitionOverlays.forEach(overlay => overlay.remove());
    }

    restartGame() {
        this.hideAllOverlays();
        if (window.restartGame) window.restartGame();
    }

    exitGame() {
        if (confirm('Tem certeza que deseja sair do jogo?')) {
            window.location.reload();
        }
    }
}

// ========================================
// FUNÇÕES GLOBAIS PARA COMPATIBILIDADE
// ========================================

let menuSystem = null;

function initializeMenuSystem(game) {
    menuSystem = new MenuSystem(game);
    return menuSystem;
}

function startGameFromIntro() {
    if (menuSystem) {
        menuSystem.startGameFromIntro();
    } else {
        const intro = document.getElementById('introOverlay');
        if (intro) intro.style.display = 'none';
        startGame();
    }
}

function togglePauseGame() {
    if (menuSystem) {
        menuSystem.togglePause();
    } else if (game) {
        game.togglePause();
    }
}

function restartGame() {
    if (menuSystem) {
        menuSystem.restartGame();
    } else {
        const overlays = ['gameOver', 'pauseOverlay', 'storyComplete'];
        overlays.forEach(id => {
            const element = document.getElementById(id);
            if (element) element.style.display = 'none';
        });

        const transitionOverlays = document.querySelectorAll('.overlay[style*="z-index: 1001"]');
        transitionOverlays.forEach(overlay => overlay.remove());

        startGame();
    }
}

function exitGame() {
    if (menuSystem) {
        menuSystem.exitGame();
    } else {
        if (confirm('Tem certeza que deseja sair do jogo?')) {
            window.location.reload();
        }
    }
}

// Exportar para compatibilidade
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        MenuSystem,
        initializeMenuSystem
    };
} else if (typeof window !== 'undefined') {
    window.MenuSystem = MenuSystem;
    window.initializeMenuSystem = initializeMenuSystem;
    window.menuSystem = menuSystem;
}