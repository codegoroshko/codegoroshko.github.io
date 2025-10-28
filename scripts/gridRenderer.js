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
            if (obstacle?.type === 'tree') {
                cell.classList.add('bg-green-600');
                cell.innerHTML = '<i class="fa-solid fa-tree text-green-900"></i>';
            } else if (obstacle?.type === 'rock') {
                cell.classList.add('bg-gray-400');
                cell.innerHTML = '<i class="fa-solid fa-mountain text-gray-700"></i>';
            }
            return cell;
        }

        if (!GameState.collectedItems.has(itemKey)) {
            const foundItem = GameState.items.find(item => item.x === x && item.y === y);
            if (foundItem?.type === 'strength') {
                cell.classList.add('bg-yellow-200');
                cell.innerHTML = '<i class="fa-solid fa-bolt text-yellow-600"></i>';
            } else if (foundItem?.type === 'weapon') {
                cell.classList.add('bg-gray-300');
                cell.innerHTML = '<i class="fa-solid fa-gavel text-gray-700"></i>';
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
