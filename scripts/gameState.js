import { CONFIG } from './config.js';
import { LEVELS } from './levels.js';
import { DOM } from './domElements.js';

const storyShown = typeof localStorage !== 'undefined' && localStorage.getItem('storyShown') === 'true';

export const GameState = {
    currentLevel: 0.1,
    heroPos: { x: 0, y: 0 },
    startPos: { x: 0, y: 0 },
    finishPos: { x: 1, y: 0 },
    items: [],
    obstacles: [],
    collectedItems: new Set(),
    currentStrength: 15,
    currentWeapon: 10,
    monsterStrength: 5,
    monsterDefense: 3,
    program: [],
    isRunning: false,
    executionStepCount: 0,
    completedLevels: new Set(),
    storyShown,
    isTutorialMode: true,

    loadLevel(levelNum) {
        const level = LEVELS[levelNum];
        if (!level) return;

        this.currentLevel = levelNum;
        this.isTutorialMode = levelNum < 1;
        CONFIG.GRID_SIZE = level.gridSize;
        this.startPos = { ...level.startPos };
        this.finishPos = { ...level.finishPos };
        this.items = level.items.map(item => ({ ...item }));
        this.obstacles = level.obstacles ? level.obstacles.map(obs => ({ ...obs })) : [];
        this.currentStrength = level.startingStrength;
        this.currentWeapon = level.startingWeapon;
        this.monsterStrength = level.monsterStrength;
        this.monsterDefense = level.monsterDefense;

        const loopsSection = document.getElementById('loopsSection');
        if (loopsSection) {
            loopsSection.classList.toggle('hidden', !level.allowLoops);
        }

        if (level.forcedCommand) {
            this.applyForcedMode(level.forcedCommand);
        } else {
            this.removeForcedMode();
        }

        if (level.autoHighlight) {
            this.highlightTutorialElements(level.forcedCommand);
        }

        this.updateLevelUI(level);
        this.reset(true);
    },

    applyForcedMode(command) {
        document.querySelectorAll('.block[data-command]').forEach(block => {
            if (block.dataset.command !== command) {
                block.classList.add('tutorial-dimmed');
            } else {
                block.classList.remove('tutorial-dimmed');
            }
        });
    },

    removeForcedMode() {
        document.querySelectorAll('.block[data-command]').forEach(block => {
            block.classList.remove('tutorial-dimmed', 'tutorial-highlight');
        });
    },

    highlightTutorialElements(command) {
        setTimeout(() => {
            document.querySelectorAll('.block[data-command]').forEach(block => {
                if (block.dataset.command === command) {
                    block.classList.add('tutorial-highlight');
                }
            });
            const programArea = document.getElementById('programArea');
            if (programArea) {
                programArea.classList.add('tutorial-highlight');
            }
        }, 500);
    },

    updateLevelUI(level) {
        const levelInfo = document.getElementById('levelInfo');
        if (levelInfo) {
            // ОНОВЛЕНО: Прибрано статистику монстра
            levelInfo.innerHTML = `
                <div class="font-bold text-lg md:text-xl mb-2 leading-snug">${level.name}</div>
                <div class="text-sm md:text-base mb-3 leading-relaxed">${level.description}</div>
                ${level.tutorialText ? `<div class="text-sm md:text-base italic text-indigo-600 mb-3 leading-relaxed">${level.tutorialText}</div>` : ''}
                ${level.hint && !this.isTutorialMode ? `<div class="text-sm md:text-base italic text-blue-800 mb-3 leading-relaxed">${level.hint}</div>` : ''}
                <div class="flex flex-wrap gap-2 text-sm md:text-base">
                    ${level.difficulty ? `<span class="bg-purple-100 text-purple-700 px-3 py-1.5 rounded-lg">📊 ${level.difficulty}</span>` : ''}
                    ${level.optimalSteps ? `<span class="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg">🎯 Оптимум: ${level.optimalSteps} кроків</span>` : ''}
                </div>
            `;
        }

        // ДОДАНО: Оновлюємо нові елементи статистики монстра
        if (DOM.monsterStrengthStat) DOM.monsterStrengthStat.textContent = this.monsterStrength;
        if (DOM.monsterDefenseStat) DOM.monsterDefenseStat.textContent = this.monsterDefense;

        if (DOM.currentLevelSpan) {
            DOM.currentLevelSpan.textContent = this.currentLevel;
        }


        if (this.currentLevel > 0.1) {
            DOM.programArea?.classList.remove('tutorial-highlight');
        }

        // ВИДАЛЕНО: Логіка прогрес-бару
        
        const prevLevelBtn = document.getElementById('prevLevel');
        if (prevLevelBtn) {
            prevLevelBtn.disabled = this.currentLevel === 0.1;
        }

        const maxLevel = Math.max(0, ...[...this.completedLevels].filter(l => l >= 1));
        const nextLevelAvailable = this.completedLevels.has(this.currentLevel)
            || (this.isTutorialMode && this.currentLevel < 0.5)
            || (maxLevel > 0 && this.currentLevel <= maxLevel);

        const nextLevelBtn = document.getElementById('nextLevel');
        if (nextLevelBtn) {
            nextLevelBtn.disabled = this.currentLevel === CONFIG.TOTAL_LEVELS || !nextLevelAvailable;
        }
    },

    reset(resetRunning = true) {
        this.heroPos = { ...this.startPos };
        this.collectedItems.clear();
        const level = LEVELS[this.currentLevel];
        if (level) {
            this.currentStrength = level.startingStrength;
            this.currentWeapon = level.startingWeapon;
        }
        this.executionStepCount = 0;
        if (resetRunning) this.isRunning = false;
    },

    isObstacle(x, y) {
        return this.obstacles.some(obs => obs.x === x && obs.y === y);
    }
};

