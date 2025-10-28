import { CONFIG } from './config.js';
import { GameState } from './gameState.js';
import { GridRenderer } from './gridRenderer.js';
import { ProgramRenderer } from './programRenderer.js';
import { HapticFeedback } from './haptics.js';

export const LevelManager = {
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
