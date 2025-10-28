import { CONFIG } from './config.js';
import { GameState } from './gameState.js';
import { ProgramRenderer } from './programRenderer.js';
import { HapticFeedback } from './haptics.js';
import { DragState } from './dragState.js';

const BASE_STYLES = 'flex items-center justify-center p-2 md:p-3 rounded-lg cursor-grab transition-all font-semibold text-white text-xs md:text-sm shadow-md hover:shadow-lg hover:scale-105 active:scale-95';

export const PaletteManager = {
    setup() {
        document.querySelectorAll('.block[draggable="true"]').forEach(block => {
            this.applyStyles(block);

            block.addEventListener('click', (e) => {
                if (DragState.isDragging || GameState.isRunning) return;

                const command = block.dataset.command;
                const newItem = command === 'loop'
                    ? { type: 'loop', count: CONFIG.MIN_LOOP_COUNT, commands: [] }
                    : { type: 'command', command };

                GameState.program.push(newItem);
                ProgramRenderer.render();
                HapticFeedback.medium();
            });

            block.addEventListener('dragstart', (e) => {
                if (GameState.isRunning) {
                    e.preventDefault();
                    return;
                }
                HapticFeedback.light();
                const command = e.target.dataset.command;
                DragState.draggedItemData = command === 'loop'
                    ? { type: 'loop', count: CONFIG.MIN_LOOP_COUNT, commands: [], isNew: true }
                    : { type: 'command', command, isNew: true };
                e.target.classList.add('dragging');
                DragState.isDragging = true;
            });

            block.addEventListener('dragend', (e) => {
                e.target.classList.remove('dragging');
                DragState.cleanup();
            });

            block.addEventListener('touchstart', (e) => {
                if (GameState.isRunning || DragState.isDragging) return;

                const touch = e.changedTouches[0];
                DragState.currentTouchId = touch.identifier;
                DragState.dragTargetElement = e.target;
                DragState.dragStartPos = { x: touch.clientX, y: touch.clientY };
                DragState.isDragPending = true;
            }, { passive: true });
        });
    },

    applyStyles(block) {
        if (block.classList.contains('loop')) {
            block.className += ` ${BASE_STYLES} bg-pink-500 hover:bg-pink-600`;
        } else {
            block.className += ` ${BASE_STYLES} bg-indigo-500 hover:bg-indigo-600`;
        }
    }
};
