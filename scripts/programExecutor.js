import { CONFIG } from './config.js';
import { GameState } from './gameState.js';
import { GridRenderer } from './gridRenderer.js';
import { ModalManager } from './modalManager.js';
import { HapticFeedback } from './haptics.js';
import { Utils } from './utils.js';
import { LEVELS } from './levels.js';
import { LevelManager } from './levelManager.js';

export const ProgramExecutor = {
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

        // ОНОВЛЕНО: Виконуємо авто-скрол тільки на мобільних (lg: < 1024px)
        if (window.innerWidth < 1024) {
            const gridContainer = document.querySelector('.grid-container');
            gridContainer?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        // ВИПРАВЛЕНО: Залишено один правильний блок try...catch...finally
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
            default: break;
        }

        if (GameState.isObstacle(newPos.x, newPos.y)) return;

        GameState.heroPos = newPos;
        GameState.currentStrength--;

        const itemKey = `${GameState.heroPos.x},${GameState.heroPos.y}`;
        if (!GameState.collectedItems.has(itemKey)) {
            const foundItem = GameState.items.find(item => item.x === GameState.heroPos.x && item.y === GameState.heroPos.y);
            if (foundItem?.type === 'strength') {
                GameState.currentStrength += foundItem.value;
            } else if (foundItem?.type === 'weapon') {
                GameState.currentWeapon += foundItem.value;
            } else {
                return;
            }

            GameState.collectedItems.add(itemKey);
            HapticFeedback.medium();
        }
    },

    checkWin(isFinalCheck = false, wasRunning = true) {
        if (GameState.heroPos.x === GameState.finishPos.x && GameState.heroPos.y === GameState.finishPos.y) {
            const hasEnoughStrength = GameState.currentStrength > GameState.monsterStrength;
            const hasEnoughWeapon = GameState.currentWeapon >= GameState.monsterDefense;

            if (hasEnoughStrength && hasEnoughWeapon) {
                GameState.completedLevels.add(GameState.currentLevel);
                HapticFeedback.success();

                const level = LEVELS[GameState.currentLevel];
                const totalSteps = Utils.calculateTotalSteps(GameState.program);
                let stars = '⭐';
                if (level?.optimalSteps) {
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
                } else if (GameState.currentLevel < CONFIG.TOTAL_LEVELS) {
                    ModalManager.show(
                        `🎉 Перемога! ${stars}`,
                        `Рівень ${GameState.currentLevel} пройдено!\n\nКроків: ${totalSteps}${level?.optimalSteps ? `\nОптимум: ${level.optimalSteps}` : ''}`,
                        'success',
                        [
                            {
                                text: 'Далі <i class="fa-solid fa-arrow-right ml-2"></i>',
                                class: 'bg-green-500 hover:bg-green-600',
                                action: () => {
                                    LevelManager.loadNext();
                                    ModalManager.hide();
                                }
                            },
                            {
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
        }

        if (isFinalCheck && wasRunning) {
            ModalManager.show('🤔 Хм...', 'Ви не дісталися монстра!\n\nПеревірте алгоритм.', 'error');
            HapticFeedback.error();
            return false;
        }
        return false;
    }
};

