import { CONFIG } from './config.js';
import { DOM } from './domElements.js';
import { GameState } from './gameState.js';
import { Utils } from './utils.js';

export const GridRenderer = {
    render() {
        if (!DOM.grid) return;
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
        // ОНОВЛЕНО: Змінено базовий фон на світліший
        cell.className = 'cell w-full h-full bg-gray-50 flex items-center justify-center transition-colors';
        cell.dataset.x = x;
        cell.dataset.y = y;

        const itemKey = `${x},${y}`;

        // ОНОВЛЕНО: Герой (Емодзі)
        if (x === GameState.heroPos.x && y === GameState.heroPos.y) {
            cell.classList.add('bg-blue-100');
            cell.innerHTML = '👱‍♂️'; // 'fa-solid fa-user-shield'
            return cell;
        }

        // ОНОВЛЕНО: Фініш/Монстр (Емодзі)
        if (x === GameState.finishPos.x && y === GameState.finishPos.y) {
            cell.classList.add('bg-red-200');
            if (GameState.isRunning) cell.classList.add('pulse-hint');
            cell.innerHTML = '🐉'; // 'fa-solid fa-dragon'
            return cell;
        }

        if (GameState.isObstacle(x, y)) {
            const obstacle = GameState.obstacles.find(obs => obs.x === x && obs.y === y);
            
            // ОНОВЛЕНО: Дерево (Емодзі)
            if (obstacle?.type === 'tree') {
                cell.classList.add('bg-green-100');
                cell.innerHTML = '🌳'; // 'fa-solid fa-tree'
            
            // ОНОВЛЕНО: Камінь/Гора (Емодзі)
            } else if (obstacle?.type === 'rock') {
                cell.classList.add('bg-gray-300');
                cell.innerHTML = '⛰️'; // 'fa-solid fa-mountain'
            }
            return cell;
        }

        if (!GameState.collectedItems.has(itemKey)) {
            const foundItem = GameState.items.find(item => item.x === x && item.y === y);
            
            // ОНОВЛЕНО: Сила (Емодзі)
            if (foundItem?.type === 'strength') {
                cell.classList.add('bg-yellow-100');
                cell.innerHTML = '⚡'; // 'fa-solid fa-bolt'
            
            // ОНОВЛЕНО: Зброя (Емодзі)
            } else if (foundItem?.type === 'weapon') {
                cell.classList.add('bg-gray-200');
                cell.innerHTML = '🗡️'; // 'fa-solid fa-gavel'
            }
        }

        return cell;
    },

    updateStats() {
        if (DOM.weapon) DOM.weapon.textContent = GameState.currentWeapon;
        if (DOM.position) DOM.position.textContent = `(${GameState.heroPos.x},${GameState.heroPos.y})`;
        if (DOM.strength) DOM.strength.textContent = GameState.currentStrength;
        if (DOM.currentLevelSpan) DOM.currentLevelSpan.textContent = GameState.currentLevel;

        const totalSteps = Utils.calculateTotalSteps(GameState.program);
        if (DOM.stepCount) DOM.stepCount.textContent = totalSteps;

        if (!DOM.stepCounter) return;
        if (totalSteps > 0) {
            DOM.stepCounter.classList.remove('hidden');
        } else {
            DOM.stepCounter.classList.add('hidden');
        }
    }
};
