import { CONFIG } from 'config.js';
import { LEVELS } from 'levels.js';
       // moved to modules
// moved to modules
// moved to modules
// ====================================
        const MAIN_LEVELS = {
            1: {
                name: "🎯 Випускний рівень",
                description: "Тепер ти сам! Дістанься до монстра",
                gridSize: 6,
                startPos: { x: 0, y: 0 },
                finishPos: { x: 3, y: 0 },
                startingStrength: 15,
                startingWeapon: 8,
                monsterStrength: 10,
                monsterDefense: 5,
                items: [],
                obstacles: [],
                allowLoops: false,
                hint: "💡 Просто йди праворуч 3 рази!",
                difficulty: "Легко",
                optimalSteps: 3
            },
            2: {
                name: "↗️ Діагональ",
                description: "Рухайся по діагоналі",
                gridSize: 6,
                startPos: { x: 0, y: 0 },
                finishPos: { x: 2, y: 2 },
                startingStrength: 15,
                startingWeapon: 5,
                monsterStrength: 10,
                monsterDefense: 4,
                items: [
                    { x: 1, y: 1, type: 'strength', value: 5 }
                ],
                obstacles: [],
                allowLoops: false,
                hint: "💡 Чергуй 'Праворуч' і 'Вниз'",
                difficulty: "Легко",
                optimalSteps: 4
            },
            3: {
                name: "⚡ Збір ресурсів",
                description: "Збери ВСІ бонуси!",
                gridSize: 7,
                startPos: { x: 0, y: 0 },
                finishPos: { x: 4, y: 0 },
                startingStrength: 12,
                startingWeapon: 2,
                monsterStrength: 15,
                monsterDefense: 5,
                items: [
                    { x: 1, y: 0, type: 'strength', value: 8 },
                    { x: 2, y: 0, type: 'weapon', value: 4 },
                    { x: 3, y: 0, type: 'strength', value: 5 }
                ],
                obstacles: [],
                allowLoops: false,
                hint: "💡 Без ресурсів не переможеш!",
                difficulty: "Легко",
                optimalSteps: 4
            },
            4: {
                name: "🗡️ Озброєння",
                description: "Збери достатньо зброї",
                gridSize: 7,
                startPos: { x: 0, y: 0 },
                finishPos: { x: 3, y: 3 },
                startingStrength: 18,
                startingWeapon: 0,
                monsterStrength: 15,
                monsterDefense: 6,
                items: [
                    { x: 1, y: 1, type: 'weapon', value: 3 },
                    { x: 2, y: 2, type: 'weapon', value: 4 }
                ],
                obstacles: [],
                allowLoops: false,
                hint: "💡 Зброя >= Захист монстра!",
                difficulty: "Середньо",
                optimalSteps: 6
            },
            5: {
                name: "🌳 Перешкоди",
                description: "Знайди обхід!",
                gridSize: 7,
                startPos: { x: 0, y: 0 },
                finishPos: { x: 4, y: 0 },
                startingStrength: 20,
                startingWeapon: 5,
                monsterStrength: 12,
                monsterDefense: 4,
                items: [
                    { x: 2, y: 1, type: 'strength', value: 5 }
                ],
                obstacles: [
                    { x: 2, y: 0, type: 'tree' }
                ],
                allowLoops: false,
                hint: "💡 Обійди дерево зверху або знизу",
                difficulty: "Середньо",
                optimalSteps: 6
            },
            6: {
                name: "🪨 Лабіринт",
                description: "Складний шлях!",
                gridSize: 8,
                startPos: { x: 0, y: 0 },
                finishPos: { x: 5, y: 3 },
                startingStrength: 25,
                startingWeapon: 2,
                monsterStrength: 18,
                monsterDefense: 5,
                items: [
                    { x: 1, y: 1, type: 'strength', value: 8 },
                    { x: 3, y: 2, type: 'weapon', value: 4 }
                ],
                obstacles: [
                    { x: 1, y: 0, type: 'rock' },
                    { x: 2, y: 1, type: 'tree' },
                    { x: 3, y: 3, type: 'rock' }
                ],
                allowLoops: false,
                hint: "💡 Шукай найкоротший шлях",
                difficulty: "Середньо",
                optimalSteps: 10
            },
            7: {
                name: "🔄 Цикли розблоковано!",
                description: "Оптимізуй код циклами",
                gridSize: 8,
                startPos: { x: 0, y: 0 },
                finishPos: { x: 5, y: 0 },
                startingStrength: 18,
                startingWeapon: 5,
                monsterStrength: 12,
                monsterDefense: 4,
                items: [
                    { x: 2, y: 0, type: 'strength', value: 5 }
                ],
                obstacles: [],
                allowLoops: true,
                hint: "💡 Використай цикл замість 5 команд!",
                difficulty: "Середньо",
                optimalSteps: 5
            },
            8: {
                name: "🎯 Майстер циклів",
                description: "Комбінуй цикли з командами",
                gridSize: 8,
                startPos: { x: 0, y: 0 },
                finishPos: { x: 4, y: 4 },
                startingStrength: 28,
                startingWeapon: 1,
                monsterStrength: 20,
                monsterDefense: 5,
                items: [
                    { x: 2, y: 2, type: 'strength', value: 8 },
                    { x: 3, y: 3, type: 'weapon', value: 5 }
                ],
                obstacles: [
                    { x: 1, y: 1, type: 'rock' }
                ],
                allowLoops: true,
                hint: "💡 Комбінуй цикли з командами",
                difficulty: "Складно",
                optimalSteps: 8
            },
            9: {
                name: "🏔️ Велике випробування",
                description: "Довгий шлях!",
                gridSize: 8,
                startPos: { x: 0, y: 0 },
                finishPos: { x: 6, y: 6 },
                startingStrength: 35,
                startingWeapon: 0,
                monsterStrength: 25,
                monsterDefense: 7,
                items: [
                    { x: 1, y: 2, type: 'strength', value: 10 },
                    { x: 3, y: 3, type: 'weapon', value: 4 },
                    { x: 5, y: 5, type: 'weapon', value: 4 }
                ],
                obstacles: [
                    { x: 1, y: 1, type: 'rock' },
                    { x: 2, y: 3, type: 'tree' },
                    { x: 4, y: 4, type: 'rock' }
                ],
                allowLoops: true,
                hint: "💡 Збери ВСІ бонуси зброї!",
                difficulty: "Складно",
                optimalSteps: 14
            },
            10: {
                name: "🐉 Фінальна битва",
                description: "Останній виклик!",
                gridSize: 8,
                startPos: { x: 0, y: 0 },
                finishPos: { x: 7, y: 7 },
                startingStrength: 40,
                startingWeapon: 0,
                monsterStrength: 28,
                monsterDefense: 8,
                items: [
                    { x: 1, y: 1, type: 'weapon', value: 3 },
                    { x: 2, y: 3, type: 'strength', value: 12 },
                    { x: 4, y: 2, type: 'weapon', value: 3 },
                    { x: 5, y: 5, type: 'strength', value: 10 },
                    { x: 6, y: 6, type: 'weapon', value: 3 }
                ],
                obstacles: [
                    { x: 1, y: 0, type: 'rock' },
                    { x: 2, y: 2, type: 'tree' },
                    { x: 3, y: 4, type: 'rock' },
                    { x: 6, y: 5, type: 'rock' }
                ],
                allowLoops: true,
                hint: "💡 Це фінал! Використай всі знання!",
                difficulty: "Дуже складно",
                optimalSteps: 16
            }
        };

        // moved to modules


        // ====================================
        // СТАН ГРИ
        // ====================================
        const GameState = {
            currentLevel: 0.1,
            currentPhase: 1, // Для tracking tutorial phases
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
            storyShown: localStorage.getItem('storyShown') === 'true',
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
                
                // Показати/сховати цикли
                document.getElementById('loopsSection').classList.toggle('hidden', !level.allowLoops);
                
                // Forced tutorial mode
                if (level.forcedCommand) {
                    this.applyForcedMode(level.forcedCommand);
                } else {
                    this.removeForcedMode();
                }
                
                // Highlight для tutorial
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
                    // Також підсвічуємо зону програми
                    document.getElementById('programArea').classList.add('tutorial-highlight');
                }, 500);
            },

            updateLevelUI(level) {
                const levelInfo = document.getElementById('levelInfo');
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
                
                // Зняти підсвітку з зони програми, якщо вона була
                if (this.currentLevel > 0.1) {
                    document.getElementById('programArea').classList.remove('tutorial-highlight');
                }

                // Прогрес
                const totalLevels = CONFIG.TUTORIAL_PHASES + CONFIG.TOTAL_LEVELS;
                const currentProgress = this.isTutorialMode ? 
                    (this.currentLevel * 10) / totalLevels * 100 : 
                    ((CONFIG.TUTORIAL_PHASES + this.currentLevel) / totalLevels) * 100;
                document.getElementById('levelProgressBar').style.width = `${currentProgress}%`;
                
                // Кнопки навігації
                document.getElementById('prevLevel').disabled = this.currentLevel === 0.1;
                const maxLevel = Math.max(0, ...[...this.completedLevels].filter(l => l >= 1));
                const canGoNext = this.isTutorialMode ? 
                    (this.currentLevel + 0.1 <= 0.5) : // Завжди можна йти далі в туторіалі
                    this.currentLevel < CONFIG.TOTAL_LEVELS && this.completedLevels.has(this.currentLevel);
                
                // Дозволити перехід на наступний рівень, якщо поточний завершено
                let nextLevelNum = this.isTutorialMode ? 1 : this.currentLevel + 1;
                if (this.isTutorialMode && this.currentLevel === 0.5) nextLevelNum = 1;
                
                const nextLevelAvailable = this.completedLevels.has(this.currentLevel) || 
                                           (this.isTutorialMode && this.currentLevel < 0.5) ||
                                           (maxLevel > 0 && this.currentLevel <= maxLevel); // Дозволити повертатись

                document.getElementById('nextLevel').disabled = this.currentLevel === CONFIG.TOTAL_LEVELS || !nextLevelAvailable;
            },

            reset(resetRunning = true) {
                this.heroPos = { ...this.startPos };
                this.collectedItems.clear();
                const level = LEVELS[this.currentLevel];
                this.currentStrength = level.startingStrength;
                this.currentWeapon = level.startingWeapon;
                this.executionStepCount = 0;
                if (resetRunning) this.isRunning = false;
            },

            isObstacle(x, y) {
                return this.obstacles.some(obs => obs.x === x && obs.y === y);
            }
        };

        // ====================================
        // HAPTIC FEEDBACK
        // ====================================
        const HapticFeedback = {
            light() {
                if (CONFIG.HAPTIC_ENABLED) navigator.vibrate(10);
            },
            medium() {
                if (CONFIG.HAPTIC_ENABLED) navigator.vibrate(20);
            },
            success() {
                if (CONFIG.HAPTIC_ENABLED) navigator.vibrate([30, 50, 30]);
            },
            error() {
                if (CONFIG.HAPTIC_ENABLED) navigator.vibrate([50, 100, 50]);
            }
        };

        // ====================================
        // DND СТАН
        // ====================================
        const DragState = {
            draggedItemData: null,
            dragPlaceholder: null,
            touchClone: null,
            currentTouchId: null,
            isDragging: false,
            // ДОДАНО: Стани для розрізнення click/tap та drag
            dragTargetElement: null,
            dragStartTime: 0,
            dragStartPos: null,
            isDragPending: false,

            init() {
                this.dragPlaceholder = document.createElement('div');
                this.dragPlaceholder.className = 'drag-placeholder';
            },

            moveTouchClone(touch) {
                if (this.touchClone) {
                    this.touchClone.style.left = `${touch.clientX - this.touchClone.offsetWidth / 2}px`;
                    this.touchClone.style.top = `${touch.clientY - this.touchClone.offsetHeight / 2}px`;
                }
            },

            cleanup() {
                if (this.touchClone) {
                    this.touchClone.remove();
                    this.touchClone = null;
                }
                // currentTouchId очищується в touchend
                this.isDragging = false;
                this.draggedItemData = null;
                document.querySelectorAll('.dragging').forEach(el => el.classList.remove('dragging'));
                this.dragPlaceholder?.remove();
                
                // ДОДАНО: Очищення станів tap/drag
                this.isDragPending = false;
                this.dragTargetElement = null;
                this.dragStartPos = null;
            }
        };

        // ====================================
        // DOM
        // ====================================
        const DOM = {
            grid: null,
            programArea: null,
            position: null,
            strength: null,
            weapon: null,
            modal: null,
            modalContent: null,
            modalIcon: null,
            modalTitle: null,
            modalMessage: null,
            modalButtons: null,
            currentLevelSpan: null,
            stepCounter: null,
            stepCount: null,
            programCount: null,

            cache() {
                this.grid = document.querySelector('.grid');
                this.programArea = document.getElementById('programArea');
                this.weapon = document.getElementById('weapon');
                this.position = document.getElementById('position');
                this.strength = document.getElementById('strength');
                this.modal = document.getElementById('modal');
                this.modalContent = document.getElementById('modalContent');
                this.modalIcon = document.getElementById('modalIcon');
                this.modalTitle = document.getElementById('modalTitle');
                this.modalMessage = document.getElementById('modalMessage');
                this.modalButtons = document.getElementById('modalButtons');
                this.currentLevelSpan = document.getElementById('currentLevel');
                this.stepCounter = document.getElementById('stepCounter');
                this.stepCount = document.getElementById('stepCount');
                this.programCount = document.getElementById('programCount');
            }
        };

        // ====================================
        // УТИЛІТИ
        // ====================================
        const Utils = {
            sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            },

            calculateTotalSteps(programArray, maxDepth = 3) {
                const calculate = (items, depth = 0) => {
                    if (depth > maxDepth) return CONFIG.MAX_EXECUTION_STEPS;
                    let total = 0;
                    for (const item of items) {
                        if (item.type === 'loop') {
                            const loopBodyCost = calculate(item.commands, depth + 1);
                            if (loopBodyCost >= CONFIG.MAX_EXECUTION_STEPS) {
                                return CONFIG.MAX_EXECUTION_STEPS;
                            }
                            total += item.count * loopBodyCost;
                        } else {
                            total += 1;
                        }
                        if (total >= CONFIG.MAX_EXECUTION_STEPS) {
                             return CONFIG.MAX_EXECUTION_STEPS;
                        }
                    }
                    return total;
                };
                return calculate(programArray);
            }
        };

        // ====================================
        // РЕНДЕРИНГ СІТКИ
        // ====================================
        const GridRenderer = {
            render() {
                DOM.grid.innerHTML = '';
                const size = CONFIG.GRID_SIZE;
                DOM.grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
                DOM.grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

                for (let y = 0; y < size; y++) {
                    for (let x = 0; x < size; x++) {
                        const cell = this.createCell(x, y);
                        DOM.grid.appendChild(cell);
                    }
                }
                this.updateStats();
            },

            createCell(x, y) {
                const cell = document.createElement('div');
                cell.className = 'cell w-full h-full bg-gray-100 flex items-center justify-center transition-colors';
                cell.dataset.x = x;
                cell.dataset.y = y;

                const itemKey = `${x},${y}`;

                if (x === GameState.heroPos.x && y === GameState.heroPos.y) {
                    cell.classList.add('bg-blue-200');
                    cell.innerHTML = '<i class="fa-solid fa-user-shield text-blue-700"></i>';
                    return cell;
                }

                if (x === GameState.finishPos.x && y === GameState.finishPos.y) {
                    cell.classList.add('bg-red-300');
                    if (GameState.isRunning) cell.classList.add('pulse-hint');
                    cell.innerHTML = '<i class="fa-solid fa-dragon text-red-700"></i>';
                    return cell;
                }

                if (GameState.isObstacle(x, y)) {
                    const obstacle = GameState.obstacles.find(obs => obs.x === x && obs.y === y);
                    if (obstacle.type === 'tree') {
                        cell.classList.add('bg-green-600');
                        cell.innerHTML = '<i class="fa-solid fa-tree text-green-900"></i>';
                    } else if (obstacle.type === 'rock') {
                        cell.classList.add('bg-gray-400');
                        cell.innerHTML = '<i class="fa-solid fa-mountain text-gray-700"></i>';
                    }
                    return cell;
                }

                if (!GameState.collectedItems.has(itemKey)) {
                    const foundItem = GameState.items.find(item => item.x === x && item.y === y);
                    if (foundItem) {
                        if (foundItem.type === 'strength') {
                            cell.classList.add('bg-yellow-200');
                            cell.innerHTML = `<i class="fa-solid fa-bolt text-yellow-600"></i>`;
                        } else if (foundItem.type === 'weapon') {
                            cell.classList.add('bg-gray-300');
                            cell.innerHTML = `<i class="fa-solid fa-gavel text-gray-700"></i>`;
                        }
                    }
                }

                return cell;
            },

            updateStats() {
                DOM.weapon.textContent = GameState.currentWeapon;
                DOM.position.textContent = `(${GameState.heroPos.x},${GameState.heroPos.y})`;
                DOM.strength.textContent = GameState.currentStrength;
                DOM.currentLevelSpan.textContent = GameState.currentLevel;
                
                const totalSteps = Utils.calculateTotalSteps(GameState.program);
                DOM.stepCount.textContent = totalSteps;
                
                if (totalSteps > 0) {
                    DOM.stepCounter.classList.remove('hidden');
                } else {
                    DOM.stepCounter.classList.add('hidden');
                }
            }
        };

        // ====================================
        // ВИКОНАННЯ ПРОГРАМИ
        // ====================================
        const ProgramExecutor = {
            async run() {
                if (GameState.isRunning) return;

                if (GameState.program.length === 0) {
                    ModalManager.show('🤔 Програма порожня', 'Додайте команди!', 'error');
                    HapticFeedback.error();
                    return;
                }

                const estimatedSteps = Utils.calculateTotalSteps(GameState.program);
                if (estimatedSteps >= CONFIG.MAX_EXECUTION_STEPS) {
                    ModalManager.show('⚠️ Занадто довго', `Програма виконається за ${estimatedSteps} кроків.\n\nМаксимум: ${CONFIG.MAX_EXECUTION_STEPS}`, 'error');
                    HapticFeedback.error();
                    return;
                }

                GameState.isRunning = true;
                ModalManager.hide();
                GameState.reset(false);
                GridRenderer.render();
                HapticFeedback.medium();
                
                // ДОДАНО: Авто-скрол до ігрового поля
                const gridContainer = document.querySelector('.grid-container');
                if (gridContainer) {
                    // Використовуємо 'start' або 'nearest' для кращої видимості
                    gridContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }

                try {
                    await this.execute(GameState.program);
                } catch (error) {
                    console.error('Помилка виконання:', error);
                    ModalManager.show('❌ Помилка', 'Виникла помилка виконання', 'error');
                    HapticFeedback.error();
                } finally {
                    const wasRunning = GameState.isRunning;
                    GameState.isRunning = false;
                    this.checkWin(true, wasRunning);
                }
            },

            async execute(commandList) {
                for (const item of commandList) {
                    if (!GameState.isRunning) return;

                    GameState.executionStepCount++;
                    if (GameState.executionStepCount > CONFIG.MAX_EXECUTION_STEPS) {
                        ModalManager.show('⏱️ Тайм-аут', 'Програма виконується занадто довго', 'error');
                        HapticFeedback.error();
                        GameState.isRunning = false;
                        return;
                    }

                    if (item.type === 'loop') {
                        for (let i = 0; i < item.count; i++) {
                            if (!GameState.isRunning) return;
                            await this.execute(item.commands);
                        }
                    } else {
                        if (GameState.currentStrength <= 0) {
                            ModalManager.show('💀 Немає сили', 'Закінчилася сила!\n\nЗбирайте бонуси.', 'error');
                            HapticFeedback.error();
                            GameState.isRunning = false;
                            return;
                        }

                        await Utils.sleep(CONFIG.ANIMATION_DELAY);
                        this.executeCommand(item.command);
                        GridRenderer.render();
                        HapticFeedback.light();
                    }
                    
                    if (this.checkWin()) return;
                }
            },

            executeCommand(command) {
                const newPos = { ...GameState.heroPos };

                switch (command) {
                    case 'up': newPos.y = Math.max(0, GameState.heroPos.y - 1); break;
                    case 'down': newPos.y = Math.min(CONFIG.GRID_SIZE - 1, GameState.heroPos.y + 1); break;
                    case 'left': newPos.x = Math.max(0, GameState.heroPos.x - 1); break;
                    case 'right': newPos.x = Math.min(CONFIG.GRID_SIZE - 1, GameState.heroPos.x + 1); break;
                }

                if (GameState.isObstacle(newPos.x, newPos.y)) return;

                GameState.heroPos = newPos;
                GameState.currentStrength--;

                const itemKey = `${GameState.heroPos.x},${GameState.heroPos.y}`;
                if (!GameState.collectedItems.has(itemKey)) {
                    const foundItem = GameState.items.find(item => 
                        item.x === GameState.heroPos.x && item.y === GameState.heroPos.y
                    );
                    if (foundItem) {
                        if (foundItem.type === 'strength') {
                            GameState.currentStrength += foundItem.value;
                        } else if (foundItem.type === 'weapon') {
                            GameState.currentWeapon += foundItem.value;
                        }
                        GameState.collectedItems.add(itemKey);
                        HapticFeedback.medium();
                    }
                }
            },

            checkWin(isFinalCheck = false, wasRunning = true) {
                if (GameState.heroPos.x === GameState.finishPos.x && 
                    GameState.heroPos.y === GameState.finishPos.y) {
                    
                    const hasEnoughStrength = GameState.currentStrength > GameState.monsterStrength;
                    const hasEnoughWeapon = GameState.currentWeapon >= GameState.monsterDefense;

                    if (hasEnoughStrength && hasEnoughWeapon) {
                        GameState.completedLevels.add(GameState.currentLevel);
                        HapticFeedback.success();
                        
                        const level = LEVELS[GameState.currentLevel];
                        const totalSteps = Utils.calculateTotalSteps(GameState.program);
                        let stars = '⭐';
                        if (level.optimalSteps) {
                            if (totalSteps === level.optimalSteps) stars = '⭐⭐⭐';
                            else if (totalSteps <= level.optimalSteps + 2) stars = '⭐⭐';
                        }
                        
                        GameState.updateLevelUI(level);

                        if (GameState.isTutorialMode) {
                            const nextPhase = GameState.currentLevel + 0.1;
                            if (nextPhase <= 0.5) {
                                ModalManager.show(
                                    `🎉 Чудово! ${stars}`,
                                    `Ви пройшли фазу ${GameState.currentLevel}!\n\nКроків: ${totalSteps}\n\nДо наступної фази!`,
                                    'success',
                                    [
                                        {
                                            // ЗМІНЕНО: Емодзі ▶️ замінено на іконку
                                            text: 'Далі <i class="fa-solid fa-arrow-right ml-2"></i>',
                                            class: 'bg-green-500 hover:bg-green-600',
                                            action: () => {
                                                LevelManager.loadNext();
                                                ModalManager.hide();
                                            }
                                        }
                                    ]
                                );
                            } else {
                                GameState.completedLevels.add(0.5); 
                                GameState.updateLevelUI(level);
                                ModalManager.show(
                                    '🎓 Туторіал пройдено!',
                                    'Вітаємо! Тепер ви готові до справжніх рівнів!\n\nПочинаємо Рівень 1!',
                                    'success',
                                    [
                                        {
                                            // ЗМІНЕНО: Емодзі 🚀 замінено на іконку
                                            text: 'До рівня 1! <i class="fa-solid fa-rocket ml-2"></i>',
                                            class: 'bg-indigo-500 hover:bg-indigo-600',
                                            action: () => {
                                                LevelManager.loadNext(); 
                                                ModalManager.hide();
                                            }
                                        }
                                    ]
                                );
                            }
                        } else {
                            if (GameState.currentLevel < CONFIG.TOTAL_LEVELS) {
                                ModalManager.show(
                                    `🎉 Перемога! ${stars}`,
                                    `Рівень ${GameState.currentLevel} пройдено!\n\nКроків: ${totalSteps}${level.optimalSteps ? `\nОптимум: ${level.optimalSteps}` : ''}`,
                                    'success',
                                    [
                                        {
                                            // ЗМІНЕНО: Емодзі ▶️ замінено на іконку
                                            text: 'Далі <i class="fa-solid fa-arrow-right ml-2"></i>',
                                            class: 'bg-green-500 hover:bg-green-600',
                                            action: () => {
                                                LevelManager.loadNext();
                                                ModalManager.hide();
                                            }
                                        },
                                        {
                                            // ЗМІНЕНО: Емодзі 🔄 замінено на іконку
                                            text: 'Покращити <i class="fa-solid fa-arrows-rotate ml-2"></i>',
                                            class: 'bg-blue-500 hover:bg-blue-600',
                                            action: () => {
                                                GameState.loadLevel(GameState.currentLevel);
                                                GridRenderer.render();
                                                ModalManager.hide();
                                            }
                                        }
                                    ]
                                );
                            } else {
                                ModalManager.show(
                                    '🏆 ВСЕ ПРОЙДЕНО!',
                                    'Вітаємо! Ви пройшли всі рівні!\n\nВи справжній майстер алгоритмів! 🎊',
                                    'success'
                                );
                            }
                        }
                    } else {
                        let errorMsg = '⚔️ Програли бій!\n\n';
                        if (!hasEnoughStrength) {
                            errorMsg += `💔 Сила: ${GameState.currentStrength} (треба > ${GameState.monsterStrength})\n`;
                        }
                        if (!hasEnoughWeapon) {
                            errorMsg += `🗡️ Зброя: ${GameState.currentWeapon} (треба >= ${GameState.monsterDefense})`;
                        }
                        errorMsg += '\n\nЗберіть більше ресурсів!';
                        
                        ModalManager.show('😢 Поразка', errorMsg, 'error');
                        HapticFeedback.error();
                    }
                    GameState.isRunning = false;
                    return true;
                } else if (isFinalCheck && wasRunning) {
                    ModalManager.show('🤔 Хм...', 'Ви не дісталися монстра!\n\nПеревірте алгоритм.', 'error');
                    HapticFeedback.error();
                    return false;
                }
                return false;
            }
        };

        // ====================================
        // МОДАЛЬНЕ ВІКНО
        // ====================================
        const ModalManager = {
            show(title, text, type, buttons = null) {
                if (!DOM.modal.classList.contains('hidden') && !GameState.isRunning) return;

                DOM.modalTitle.textContent = title;
                DOM.modalMessage.textContent = text;

                DOM.modalIcon.innerHTML = '';
                DOM.modalIcon.className = 'w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl';

                if (type === 'success') {
                    DOM.modalIcon.classList.add('bg-green-100', 'text-green-600', 'level-complete');
                    DOM.modalIcon.innerHTML = '<i class="fa-solid fa-check"></i>';
                } else {
                    DOM.modalIcon.classList.add('bg-red-100', 'text-red-600');
                    DOM.modalIcon.innerHTML = '<i class="fa-solid fa-xmark"></i>';
                }

                DOM.modalButtons.innerHTML = '';
                if (buttons && Array.isArray(buttons)) {
                    buttons.forEach(btn => {
                        const button = document.createElement('button');
                        // ЗМІНЕНО: Використовуємо .innerHTML замість .textContent, щоб дозволити іконки
                        button.innerHTML = btn.text; 
                        button.className = `haptic-light py-3 px-6 font-semibold rounded-lg shadow-md transition-all text-white ${btn.class} flex items-center justify-center gap-2`;
                        button.addEventListener('click', () => {
                            HapticFeedback.light();
                            btn.action();
                        });
                        DOM.modalButtons.appendChild(button);
                    });
                } else {
                    const defaultBtn = document.createElement('button');
                    defaultBtn.textContent = 'Зрозуміло';
                    defaultBtn.className = `haptic-light py-3 px-8 font-semibold rounded-lg shadow-md transition-all text-white ${
                        type === 'success' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
                    }`;
                    defaultBtn.addEventListener('click', () => {
                        HapticFeedback.light();
                        ModalManager.hide();
                    });
                    DOM.modalButtons.appendChild(defaultBtn);
                }

                DOM.modal.classList.remove('hidden');

                requestAnimationFrame(() => {
                    DOM.modalContent.classList.remove('scale-95', 'opacity-0');
                    DOM.modalContent.classList.add('scale-100', 'opacity-100');
                });
            },

            hide() {
                DOM.modalContent.classList.add('scale-95', 'opacity-0');
                DOM.modalContent.classList.remove('scale-100', 'opacity-100');

                setTimeout(() => {
                    DOM.modal.classList.add('hidden');
                }, 200);
            }
        };

        // ====================================
        // МЕНЕДЖЕР РІВНІВ
        // ====================================
        const LevelManager = {
            loadNext() {
                let nextLevel;
                if (GameState.isTutorialMode) {
                    nextLevel = Math.round((GameState.currentLevel + 0.1) * 10) / 10;
                    if (nextLevel > 0.5) nextLevel = 1;
                } else {
                    nextLevel = GameState.currentLevel + 1;
                }

                if (nextLevel <= CONFIG.TOTAL_LEVELS || (nextLevel > 0.5 && nextLevel <= 1)) {
                    GameState.program = [];
                    GameState.loadLevel(nextLevel);
                    GridRenderer.render();
                    ProgramRenderer.render();
                    HapticFeedback.medium();
                }
            },

            loadPrev() {
                let prevLevel;
                if (GameState.currentLevel === 1) {
                    prevLevel = 0.5;
                } else if (GameState.isTutorialMode) {
                    prevLevel = Math.round((GameState.currentLevel - 0.1) * 10) / 10;
                    if (prevLevel < 0.1) prevLevel = 0.1;
                } else {
                    prevLevel = GameState.currentLevel - 1;
                }

                if (prevLevel < 0.1) prevLevel = 0.1;

                GameState.program = [];
                GameState.loadLevel(prevLevel);
                GridRenderer.render();
                ProgramRenderer.render();
                HapticFeedback.medium();
            }
        };

        // ====================================
        // РЕНДЕРИНГ ПРОГРАМИ
        // ====================================
        const ProgramRenderer = {
            render() {
                DOM.programArea.innerHTML = '';
                this.renderContainer(DOM.programArea, GameState.program, '');
                
                const blockCount = GameState.program.length;
                DOM.programCount.textContent = `${blockCount} блоків`;
                
                GridRenderer.updateStats();
            },

            renderContainer(container, items, pathPrefix) {
                if (items.length === 0 && container !== DOM.programArea) {
                    container.innerHTML = '<div class="text-center text-xs text-white/70 p-2">Перетягни команди сюди</div>';
                }

                items.forEach((item, index) => {
                    const currentPath = pathPrefix ? `${pathPrefix},${index}` : `${index}`;
                    const blockEl = this.createBlock(item, currentPath);
                    blockEl.classList.add('fade-in');
                    container.appendChild(blockEl);
                });
            },

            createBlock(item, path) {
                const blockEl = document.createElement('div');
                blockEl.dataset.path = path;
                blockEl.setAttribute('draggable', 'true');
                blockEl.className = 'program-block p-2 md:p-3 shadow-md transition-transform duration-150 mb-2 rounded-lg';

                const commandIcons = {
                    'up': 'fa-arrow-up',
                    'down': 'fa-arrow-down',
                    'left': 'fa-arrow-left',
                    'right': 'fa-arrow-right'
                };
                const commandText = {
                    'up': 'Вгору',
                    'down': 'Вниз',
                    'left': 'Ліворуч',
                    'right': 'Праворуч'
                };

                if (item.type === 'loop') {
                    this.setupLoopBlock(blockEl, item, path);
                } else {
                    this.setupCommandBlock(blockEl, item, path, commandIcons, commandText);
                }

                // Обробники D&D для існуючих блоків (переміщення)
                blockEl.addEventListener('dragstart', (e) => {
                    if (GameState.isRunning) {
                        e.preventDefault();
                        return;
                    }
                    e.stopPropagation(); 
                    HapticFeedback.light();
                    
                    DragState.draggedItemData = {
                        path: e.target.dataset.path,
                        isNew: false
                    };
                    
                    setTimeout(() => {
                        e.target.classList.add('dragging');
                    }, 0);
                    DragState.isDragging = true;
                });

                blockEl.addEventListener('dragend', (e) => {
                    e.stopPropagation();
                    e.target.classList.remove('dragging');
                    DragState.cleanup();
                });
                
                // ЗМІНЕНО: Обробник Touch D&D (відрізняє tap/drag)
                blockEl.addEventListener('touchstart', (e) => {
                    // Ігнорувати, якщо клік на кнопці або інпуті
                    if (e.target.closest('button, input')) return;
                    if (GameState.isRunning || DragState.isDragging) return;

                    const touch = e.changedTouches[0];
                    DragState.currentTouchId = touch.identifier;
                    DragState.dragTargetElement = e.target; 
                    DragState.dragStartTime = Date.now();
                    DragState.dragStartPos = { x: touch.clientX, y: touch.clientY };
                    DragState.isDragPending = true; // Чекаємо на 'touchmove'
                }, { passive: true }); // Дозволяємо скрол, поки не почався D&D

                return blockEl;
            },

            setupLoopBlock(blockEl, item, path) {
                blockEl.classList.add('bg-pink-500', 'text-white', 'p-3');
                blockEl.innerHTML = `
                    <div class="flex justify-between items-center mb-2">
                        <span class="font-semibold flex items-center text-xs md:text-sm">
                            <i class="fa-solid fa-repeat mr-2"></i>
                            Повторити 
                            <input type="number" class="loop-count w-12 text-center bg-white text-pink-500 font-bold rounded mx-2 p-1" value="${item.count}" min="${CONFIG.MIN_LOOP_COUNT}" max="${CONFIG.MAX_LOOP_COUNT}">
                            разів
                        </span>
                        <button class="remove-btn haptic-light w-7 h-7 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center">
                            <i class="fa-solid fa-xmark text-white"></i>
                        </button>
                    </div>
                    <div class="loop-body bg-black/10 p-2 rounded-lg min-h-[50px] border-2 border-dashed border-white/30" data-path="${path}"></div>
                `;

                const loopBody = blockEl.querySelector('.loop-body');
                this.renderContainer(loopBody, item.commands, path);

                blockEl.querySelector('.loop-count').addEventListener('change', (e) => {
                    ProgramDataManager.updateLoopCount(path, e.target.value);
                });

                blockEl.querySelector('.remove-btn').addEventListener('click', (e) => {
                    e.stopPropagation(); 
                    ProgramDataManager.removeItemByPath(path);
                    this.render();
                    HapticFeedback.light();
                });
            },

            setupCommandBlock(blockEl, item, path, commandIcons, commandText) {
                blockEl.classList.add('bg-indigo-500', 'text-white', 'flex', 'justify-between', 'items-center', 'cursor-move');
                blockEl.innerHTML = `
                    <span class="font-semibold flex items-center text-xs md:text-sm">
                        <i class="fa-solid ${commandIcons[item.command]} mr-2 w-5"></i>
                        ${commandText[item.command]}
                    </span>
                    <button class="remove-btn haptic-light w-7 h-7 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center">
                        <i class="fa-solid fa-xmark text-white"></i>
                    </button>
                `;

                blockEl.querySelector('.remove-btn').addEventListener('click', (e) => {
                    e.stopPropagation(); 
                    ProgramDataManager.removeItemByPath(path);
                    this.render();
                    HapticFeedback.light();
                });
            }
        };

        // ====================================
        // УПРАВЛІННЯ ДАНИМИ
        // ====================================
        const ProgramDataManager = {
            findDropTarget(pathStr) {
                if (!pathStr) return GameState.program;

                const path = pathStr.split(',').map(Number);
                let target = GameState.program;

                for (const index of path) {
                    if (target[index] && target[index].commands) {
                        target = target[index].commands;
                    } else {
                        return null; 
                    }
                }
                return target;
            },

            findItemByPath(pathStr) {
                const path = pathStr.split(',').map(Number);
                let currentLevel = GameState.program;

                for (let i = 0; i < path.length - 1; i++) {
                    if (!currentLevel[path[i]] || !currentLevel[path[i]].commands) return null;
                    currentLevel = currentLevel[path[i]].commands;
                }
                return currentLevel[path[path.length - 1]];
            },

            removeItemByPath(pathStr) {
                const path = pathStr.split(',').map(Number);
                let parentArray = GameState.program;

                if (path.length > 1) {
                    let parent = GameState.program[path[0]];
                    for (let i = 1; i < path.length - 1; i++) {
                        if (!parent || !parent.commands) return null;
                        parent = parent.commands[path[i]];
                    }
                    if (!parent || !parent.commands) return null;
                    parentArray = parent.commands;
                }

                const indexToRemove = path[path.length - 1];
                if (indexToRemove < 0 || indexToRemove >= parentArray.length) return null;
                
                return parentArray.splice(indexToRemove, 1)[0];
            },

            updateLoopCount(pathStr, value) {
                const count = parseInt(value) || CONFIG.MIN_LOOP_COUNT;
                const item = this.findItemByPath(pathStr);
                if (!item) return;
                
                item.count = Math.max(CONFIG.MIN_LOOP_COUNT, Math.min(CONFIG.MAX_LOOP_COUNT, count));
                
                const input = document.querySelector(`[data-path="${pathStr}"] .loop-count`);
                if (input) input.value = item.count;
                
                GridRenderer.updateStats();
            }
        };

        // ====================================
        // ПАЛІТРА
        // ====================================
        const PaletteManager = {
            setup() {
                document.querySelectorAll('.block[draggable="true"]').forEach(block => {
                    this.applyStyles(block);
                    
                    // ДОДАНО: Обробник 'click' для додавання блоків (desktop і fallback)
                    block.addEventListener('click', (e) => {
                        // Запобігаємо додаванню, якщо це був кінець D&D
                        if (DragState.isDragging || GameState.isRunning) return;

                        const command = block.dataset.command;
                        let newItem;

                        if (command === 'loop') {
                            newItem = { type: 'loop', count: CONFIG.MIN_LOOP_COUNT, commands: [] };
                        } else {
                            newItem = { type: 'command', command: command };
                        }

                        // Додаємо в кінець основного списку
                        GameState.program.push(newItem);
                        ProgramRenderer.render();
                        HapticFeedback.medium();
                    });
                    
                    // Обробники D&D для палітри
                    block.addEventListener('dragstart', (e) => {
                        if (GameState.isRunning) {
                            e.preventDefault();
                            return;
                        }
                        HapticFeedback.light();
                        const command = e.target.dataset.command;
                        let newItemData;
                        if (command === 'loop') {
                            newItemData = { type: 'loop', count: CONFIG.MIN_LOOP_COUNT, commands: [], isNew: true };
                        } else {
                            newItemData = { type: 'command', command: command, isNew: true };
                        }
                        DragState.draggedItemData = newItemData;
                        e.target.classList.add('dragging');
                        DragState.isDragging = true;
                    });

                    block.addEventListener('dragend', (e) => {
                        e.target.classList.remove('dragging');
                        DragState.cleanup();
                    });
                    
                    // ЗМІНЕНО: Обробник Touch D&D (відрізняє tap/drag)
                    block.addEventListener('touchstart', (e) => {
                        if (GameState.isRunning || DragState.isDragging) return;
                        
                        const touch = e.changedTouches[0];
                        DragState.currentTouchId = touch.identifier;
                        DragState.dragTargetElement = e.target; // Зберігаємо ціль
                        DragState.dragStartTime = Date.now();
                        DragState.dragStartPos = { x: touch.clientX, y: touch.clientY };
                        DragState.isDragPending = true; // Чекаємо на 'touchmove'
                    }, { passive: true }); // Дозволяємо скрол, поки не почався D&D
                });
            },

            applyStyles(block) {
                const baseStyles = 'flex items-center justify-center p-2 md:p-3 rounded-lg cursor-grab transition-all font-semibold text-white text-xs md:text-sm shadow-md hover:shadow-lg hover:scale-105 active:scale-95';
                
                if (block.classList.contains('loop')) {
                    block.className += ' ' + baseStyles + ' bg-pink-500 hover:bg-pink-600';
                } else {
                    block.className += ' ' + baseStyles + ' bg-indigo-500 hover:bg-indigo-600';
                }
            }
        };

        // ====================================
        // TUTORIAL MANAGER
        // ====================================
        const TutorialManager = {
            showStory() {
                if (GameState.storyShown) {
                    // Одразу до гри
                    GameState.loadLevel(0.1);
                    GridRenderer.render();
                    ProgramRenderer.render();
                    return;
                }

                // Показати перший екран історії
                document.getElementById('storyScreen1').classList.remove('hidden');
                document.getElementById('storyScreen1').classList.add('flex');
            }
        };

        // ====================================
        // ІНІЦІАЛІЗАЦІЯ D&D
        // ====================================
        function initDragAndDrop() {
            const programArea = DOM.programArea;

            const getDropTarget = (e) => {
                const touch = e.touches ? e.touches[0] : null;
                const clientX = touch ? touch.clientX : e.clientX;
                const clientY = touch ? touch.clientY : e.clientY;

                const targetElement = touch ? document.elementFromPoint(clientX, clientY) : e.target;
                if (!targetElement) return null;

                const el = targetElement.closest('.loop-body, .program-area');
                if (!el) return null;

                const isLoopBody = el.classList.contains('loop-body');
                const targetPath = isLoopBody ? el.dataset.path : '';
                
                return {
                    element: el,
                    path: targetPath,
                    targetArray: ProgramDataManager.findDropTarget(targetPath)
                };
            };

            const getInsertionIndex = (e, container) => {
                const children = [...container.querySelectorAll(':scope > .program-block, :scope > .drag-placeholder')];
                const y = e.clientY || e.touches[0].clientY;
                
                let index = 0;
                for (const child of children) {
                    if (child.classList.contains('dragging')) continue; 

                    const box = child.getBoundingClientRect();
                    if (y < box.top + box.height / 2) {
                        break;
                    }
                    if (!child.classList.contains('drag-placeholder')) {
                        index++;
                    }
                }
                return index;
            };

            const updatePlaceholder = (e) => {
                const dropTarget = getDropTarget(e);
                if (!dropTarget || !dropTarget.targetArray) {
                    DragState.dragPlaceholder?.remove();
                    return;
                }

                const container = dropTarget.element;
                const index = getInsertionIndex(e, container);
                
                const children = [...container.children];
                const targetNode = children[index];

                if (targetNode === DragState.dragPlaceholder) return;
                
                if (targetNode) {
                    container.insertBefore(DragState.dragPlaceholder, targetNode);
                } else {
                    container.appendChild(DragState.dragPlaceholder);
                }
            };

            const handleDrop = (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                if (!DragState.draggedItemData) return;

                const dropTarget = getDropTarget(e);

                if (!dropTarget || !dropTarget.targetArray) {
                    if (!DragState.draggedItemData.isNew) {
                        ProgramDataManager.removeItemByPath(DragState.draggedItemData.path);
                        HapticFeedback.medium();
                    }
                    ProgramRenderer.render(); 
                    return;
                }

                const targetArray = dropTarget.targetArray;
                const index = getInsertionIndex(e, dropTarget.element);

                let itemToInsert;

                if (DragState.draggedItemData.isNew) {
                    itemToInsert = { ...DragState.draggedItemData };
                    delete itemToInsert.isNew;
                } else {
                    const originalPath = DragState.draggedItemData.path;
                    const originalPathParts = originalPath.split(',').map(Number);
                    const originalIndex = originalPathParts[originalPathParts.length - 1];
                    const originalParentPath = originalPathParts.slice(0, -1).join(',');
                    
                    if (dropTarget.path === originalParentPath) {
                        const adjustedIndex = (index > originalIndex) ? index - 1 : index;
                        if (adjustedIndex === originalIndex) {
                            ProgramRenderer.render(); 
                            return; 
                        }
                    }
                    
                    itemToInsert = ProgramDataManager.removeItemByPath(originalPath);
                }

                if (itemToInsert) {
                    targetArray.splice(index, 0, itemToInsert);
                    HapticFeedback.medium();
                }

                ProgramRenderer.render(); 
            };

            // ===== DESKTOP EVENTS =====
            programArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                updatePlaceholder(e);
            });

            programArea.addEventListener('dragleave', (e) => {
                if (!programArea.contains(e.relatedTarget)) {
                    DragState.dragPlaceholder?.remove();
                }
            });

            programArea.addEventListener('drop', handleDrop);
            
            document.body.addEventListener('drop', (e) => {
                if (e.target.closest('.program-area')) return; 
                handleDrop(e);
            });


            // ===== ЗМІНЕНО: MOBILE TOUCH EVENTS (глобальні) =====
            
            // ЗМІНЕНО: 'touchmove' тепер запускає D&D
            document.addEventListener('touchmove', (e) => {
                // Тільки якщо ми чекаємо на D&D (isDragPending)
                if (!DragState.isDragPending || !e.changedTouches) return;
                
                const touch = [...e.changedTouches].find(t => t.identifier === DragState.currentTouchId);
                if (!touch) return;
                
                const dx = Math.abs(touch.clientX - DragState.dragStartPos.x);
                const dy = Math.abs(touch.clientY - DragState.dragStartPos.y);

                // Якщо рух > 5px, *починаємо* D&D
                if (dx > 5 || dy > 5) {
                    e.preventDefault(); // *Тепер* блокуємо скрол
                    DragState.isDragging = true;
                    DragState.isDragPending = false;
                    
                    const target = DragState.dragTargetElement;
                    if (!target) return;
                    
                    HapticFeedback.light();
                    
                    // Створюємо клон
                    const clone = target.cloneNode(true);
                    clone.style.position = 'fixed';
                    clone.style.zIndex = '1000';
                    clone.style.opacity = '0.8';
                    clone.style.pointerEvents = 'none';
                    clone.style.width = `${target.offsetWidth}px`;
                    document.body.appendChild(clone);
                    DragState.touchClone = clone;
                    
                    // Встановлюємо дані, що перетягуються
                    if (target.classList.contains('block')) { // З палітри
                        const command = target.dataset.command;
                        DragState.draggedItemData = (command === 'loop') ?
                            { type: 'loop', count: CONFIG.MIN_LOOP_COUNT, commands: [], isNew: true } :
                            { type: 'command', command: command, isNew: true };
                    } else { // З програми
                        DragState.draggedItemData = { path: target.dataset.path, isNew: false };
                        target.classList.add('dragging'); // "Приховуємо" оригінал
                    }
                    
                    DragState.moveTouchClone(touch);
                }
            }, { passive: false }); // 'passive: false' бо ми *можемо* викликати preventDefault

            // ЗМІНЕНО: 'touchend' тепер обробляє 'tap' АБО 'drop'
            document.addEventListener('touchend', (e) => {
                if (!DragState.currentTouchId) return;
                
                const touch = [...e.changedTouches].find(t => t.identifier === DragState.currentTouchId);
                if (!touch) return;

                if (DragState.isDragPending) {
                    // Руху не було - це 'tap'
                    const target = DragState.dragTargetElement;
                    // Якщо 'tap' був на палітрі, запускаємо "click-to-add"
                    if (target && target.classList.contains('block') && !GameState.isRunning) {
                        const command = target.dataset.command;
                        let newItem;
                        if (command === 'loop') {
                            newItem = { type: 'loop', count: CONFIG.MIN_LOOP_COUNT, commands: [] };
                        } else {
                            newItem = { type: 'command', command: command };
                        }
                        GameState.program.push(newItem);
                        ProgramRenderer.render();
                        HapticFeedback.medium();
                    }
                    // (Якщо 'tap' був на `.program-block`, нічого не робимо)
                
                } else if (DragState.isDragging) {
                    // Був D&D, запускаємо 'handleDrop'
                    const fakeEvent = {
                        target: document.elementFromPoint(touch.clientX, touch.clientY),
                        clientX: touch.clientX,
                        clientY: touch.clientY,
                        touches: [touch],
                        preventDefault: () => {},
                        stopPropagation: () => {}
                    };
                    handleDrop(fakeEvent);
                }
                
                // Загальне очищення
                DragState.cleanup(); 
                DragState.currentTouchId = null; // Очищуємо ID в самому кінці
            });
        }

        // ====================================
        // ІНІЦІАЛІЗАЦІЯ
        // ====================================
        document.addEventListener('DOMContentLoaded', () => {
            DOM.cache();
            DragState.init();
            initDragAndDrop(); // Ініціалізуємо логіку D&D
            
            // Story екрани
            document.getElementById('story1Next').addEventListener('click', () => {
                document.getElementById('storyScreen1').classList.add('hidden');
                document.getElementById('storyScreen2').classList.remove('hidden');
                document.getElementById('storyScreen2').classList.add('flex');
                HapticFeedback.light();
            });

            document.getElementById('story2Next').addEventListener('click', () => {
                document.getElementById('storyScreen2').classList.add('hidden');
                document.getElementById('storyScreen3').classList.remove('hidden');
                document.getElementById('storyScreen3').classList.add('flex');
                HapticFeedback.light();
            });

            document.getElementById('story3Next').addEventListener('click', () => {
                document.getElementById('storyScreen3').classList.add('hidden');
                GameState.storyShown = true;
                localStorage.setItem('storyShown', 'true');
                GameState.loadLevel(0.1);
                GridRenderer.render();
                ProgramRenderer.render();
                HapticFeedback.medium();
            });

            // ДОДАНО: Обробник для пропуску навчання
            document.getElementById('skipTutorial').addEventListener('click', () => {
                // Сховати всі екрани історії
                document.getElementById('storyScreen1').classList.add('hidden');
                document.getElementById('storyScreen2').classList.add('hidden');
                document.getElementById('storyScreen3').classList.add('hidden');
                
                // Встановити, що історія показана
                GameState.storyShown = true;
                localStorage.setItem('storyShown', 'true');
                
                // Завантажити одразу РІВЕНЬ 1
                GameState.loadLevel(1); 
                GridRenderer.render();
                ProgramRenderer.render();
                HapticFeedback.medium();
            });

            // Показати історію або одразу гру
            TutorialManager.showStory();

            PaletteManager.setup(); // Налаштовуємо палітру (тепер з click + D&D)

            // Кнопки
            document.querySelector('.run-btn').addEventListener('click', () => ProgramExecutor.run());
            document.querySelector('.reset-btn').addEventListener('click', () => {
                GameState.reset(true);
                GridRenderer.render();
                ModalManager.hide();
                HapticFeedback.light();
            });
            document.querySelector('.clear-btn').addEventListener('click', () => {
                if (GameState.program.length > 0) {
                    GameState.program = [];
                    ProgramRenderer.render();
                    HapticFeedback.light();
                }
            });

            document.getElementById('prevLevel').addEventListener('click', () => LevelManager.loadPrev());
            document.getElementById('nextLevel').addEventListener('click', () => LevelManager.loadNext());
            document.getElementById('showHint').addEventListener('click', () => {
                const level = LEVELS[GameState.currentLevel];
                const hint = level.hint || level.tutorialText || "Спробуйте різні варіанти!";
                if (GameState.isTutorialMode && level.tutorialText) {
                     ModalManager.show('💡 Підказка', level.tutorialText, 'success');
                } else {
                     ModalManager.show('💡 Підказка', hint, 'success');
                }
                HapticFeedback.light();
            });

            console.log('🎮 Кодегорошко запущено!');
        });

// ===== Module bootstrap =====
export function init() {
    if (typeof DOM !== 'undefined' && DOM.cache) {
        DOM.cache();
    }
    if (typeof GameState !== 'undefined' && GameState.loadLevel) {
        GameState.loadLevel(0.1);
    }
    if (typeof GridRenderer !== 'undefined' && GridRenderer.render) {
        GridRenderer.render();
    }
    if (typeof ProgramRenderer !== 'undefined' && ProgramRenderer.render) {
        ProgramRenderer.render();
    }
    // Wire UI buttons if present
    try {
        const runBtn = document.querySelector('.run-btn');
        const resetBtn = document.querySelector('.reset-btn');
        const clearBtn = document.querySelector('.clear-btn');
        const prevLevel = document.getElementById('prevLevel');
        const nextLevel = document.getElementById('nextLevel');
        const showHint = document.getElementById('showHint');
        if (runBtn) runBtn.addEventListener('click', () => ProgramExecutor.run());
        if (resetBtn) resetBtn.addEventListener('click', () => { GameState.reset(true); GridRenderer.render(); });
        if (clearBtn) clearBtn.addEventListener('click', () => { GameState.program = []; if (ProgramRenderer.render) ProgramRenderer.render(); });
        if (prevLevel) prevLevel.addEventListener('click', () => LevelManager.loadPrev());
        if (nextLevel) nextLevel.addEventListener('click', () => LevelManager.loadNext());
        if (showHint) showHint.addEventListener('click', () => {
            const level = LEVELS[GameState.currentLevel];
            if (level && level.hint) {
                ModalManager.show('Підказка', level.hint, 'success');
            } else {
                ModalManager.show('Підказка', 'Спробуй розкласти задачу на кроки 😉', 'success');
            }
        });
    } catch (e) {
        console.warn('UI wiring warning:', e);
    }
}
