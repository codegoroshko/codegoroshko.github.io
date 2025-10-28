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
            levelInfo.innerHTML = `
                <div class="font-bold text-base mb-1">${level.name}</div>
                <div class="text-sm mb-2">${level.description}</div>
                ${level.tutorialText ? `<div class="text-xs italic text-indigo-600 mb-2">${level.tutorialText}</div>` : ''}
                ${level.hint && !this.isTutorialMode ? `<div class="text-xs italic mb-2">${level.hint}</div>` : ''}
                <div class="flex flex-wrap gap-2 text-xs">
                    <span class="bg-red-100 text-red-700 px-2 py-1 rounded">💪 Монстр: ${this.monsterStrength}</span>
                    <span class="bg-gray-100 text-gray-700 px-2 py-1 rounded">🛡️ Захист: ${this.monsterDefense}</span>
                    ${level.difficulty ? `<span class="bg-purple-100 text-purple-700 px-2 py-1 rounded">📊 ${level.difficulty}</span>` : ''}
                    ${level.optimalSteps ? `<span class="bg-blue-100 text-blue-700 px-2 py-1 rounded">🎯 Оптимум: ${level.optimalSteps} кроків</span>` : ''}
                </div>
            `;
        }

        if (this.currentLevel > 0.1) {
            DOM.programArea?.classList.remove('tutorial-highlight');
        }

        // const totalLevels = CONFIG.TUTORIAL_PHASES + CONFIG.TOTAL_LEVELS;
        // const currentProgress = this.isTutorialMode
        //     ? (this.currentLevel * 10) / totalLevels * 100
        //     : ((CONFIG.TUTORIAL_PHASES + this.currentLevel) / totalLevels) * 100;
        // const levelProgressBar = document.getElementById('levelProgressBar');
        // if (levelProgressBar) {
        //     levelProgressBar.style.width = `${currentProgress}%`;
        // }

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
