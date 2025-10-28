import { LEVELS } from './levels.js';
import { DOM } from './domElements.js';
import { GameState } from './gameState.js';
import { DragState } from './dragState.js';
import { GridRenderer } from './gridRenderer.js';
import { ProgramRenderer } from './programRenderer.js';
import { ProgramExecutor } from './programExecutor.js';
import { ModalManager } from './modalManager.js';
import { LevelManager } from './levelManager.js';
import { PaletteManager } from './paletteManager.js';
import { TutorialManager } from './tutorialManager.js';
import { initDragAndDrop } from './dragAndDrop.js';
import { HapticFeedback } from './haptics.js';

function setupStoryScreens() {
    document.getElementById('story1Next')?.addEventListener('click', () => {
        document.getElementById('storyScreen1')?.classList.add('hidden');
        const screen2 = document.getElementById('storyScreen2');
        screen2?.classList.remove('hidden');
        screen2?.classList.add('flex');
        HapticFeedback.light();
    });

    document.getElementById('story2Next')?.addEventListener('click', () => {
        document.getElementById('storyScreen2')?.classList.add('hidden');
        const screen3 = document.getElementById('storyScreen3');
        screen3?.classList.remove('hidden');
        screen3?.classList.add('flex');
        HapticFeedback.light();
    });

    document.getElementById('story3Next')?.addEventListener('click', () => {
        document.getElementById('storyScreen3')?.classList.add('hidden');
        GameState.storyShown = true;
        localStorage.setItem('storyShown', 'true');
        GameState.loadLevel(0.1);
        GridRenderer.render();
        ProgramRenderer.render();
        HapticFeedback.medium();
    });

    document.getElementById('skipTutorial')?.addEventListener('click', () => {
        document.getElementById('storyScreen1')?.classList.add('hidden');
        document.getElementById('storyScreen2')?.classList.add('hidden');
        document.getElementById('storyScreen3')?.classList.add('hidden');

        GameState.storyShown = true;
        localStorage.setItem('storyShown', 'true');

        GameState.loadLevel(1);
        GridRenderer.render();
        ProgramRenderer.render();
        HapticFeedback.medium();
    });
}

function setupControls() {
    document.querySelector('.run-btn')?.addEventListener('click', () => ProgramExecutor.run());
    document.querySelector('.reset-btn')?.addEventListener('click', () => {
        GameState.reset(true);
        GridRenderer.render();
        ModalManager.hide();
        HapticFeedback.light();
    });
    document.querySelector('.clear-btn')?.addEventListener('click', () => {
        if (GameState.program.length > 0) {
            GameState.program = [];
            ProgramRenderer.render();
            HapticFeedback.light();
        }
    });

    document.getElementById('prevLevel')?.addEventListener('click', () => LevelManager.loadPrev());
    document.getElementById('nextLevel')?.addEventListener('click', () => LevelManager.loadNext());
    document.getElementById('showHint')?.addEventListener('click', () => {
        const level = LEVELS[GameState.currentLevel];
        const hint = level?.hint || level?.tutorialText || 'Спробуйте різні варіанти!';
        if (GameState.isTutorialMode && level?.tutorialText) {
            ModalManager.show('💡 Підказка', level.tutorialText, 'success');
        } else {
            ModalManager.show('💡 Підказка', hint, 'success');
        }
        HapticFeedback.light();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    DOM.cache();
    DragState.init();
    initDragAndDrop();

    setupStoryScreens();
    setupControls();
    TutorialManager.showStory();
    PaletteManager.setup();

    console.log('🎮 Кодегорошко запущено!');
});
