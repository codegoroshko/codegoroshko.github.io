import { GameState } from './gameState.js';
import { GridRenderer } from './gridRenderer.js';
import { ProgramRenderer } from './programRenderer.js';

export const TutorialManager = {
    showStory() {
        if (GameState.storyShown) {
            GameState.loadLevel(0.1);
            GridRenderer.render();
            ProgramRenderer.render();
            return;
        }

        const screen = document.getElementById('storyScreen1');
        if (screen) {
            screen.classList.remove('hidden');
            screen.classList.add('flex');
        }
    }
};
