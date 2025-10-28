import { CONFIG } from './config.js';
import { GameState } from './gameState.js';
import { GridRenderer } from './gridRenderer.js';

export const ProgramDataManager = {
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
        const count = parseInt(value, 10) || CONFIG.MIN_LOOP_COUNT;
        const item = this.findItemByPath(pathStr);
        if (!item) return;

        item.count = Math.max(CONFIG.MIN_LOOP_COUNT, Math.min(CONFIG.MAX_LOOP_COUNT, count));

        const input = document.querySelector(`[data-path="${pathStr}"] .loop-count`);
        if (input) input.value = item.count;

        GridRenderer.updateStats();
    }
};
