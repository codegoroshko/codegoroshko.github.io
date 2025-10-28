import { CONFIG } from './config.js';
import { DOM } from './domElements.js';
import { GameState } from './gameState.js';
import { HapticFeedback } from './haptics.js';
import { DragState } from './dragState.js';
import { GridRenderer } from './gridRenderer.js';
import { ProgramDataManager } from './programDataManager.js';

const COMMAND_ICONS = {
    up: 'fa-arrow-up',
    down: 'fa-arrow-down',
    left: 'fa-arrow-left',
    right: 'fa-arrow-right'
};

const COMMAND_TEXT = {
    up: 'Вгору',
    down: 'Вниз',
    left: 'Ліворуч',
    right: 'Праворуч'
};

export const ProgramRenderer = {
    render() {
        if (!DOM.programArea) return;
        DOM.programArea.innerHTML = '';
        this.renderContainer(DOM.programArea, GameState.program, '');

        const blockCount = GameState.program.length;
        if (DOM.programCount) DOM.programCount.textContent = `${blockCount} блоків`;

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

        if (item.type === 'loop') {
            this.setupLoopBlock(blockEl, item, path);
        } else {
            this.setupCommandBlock(blockEl, item, path);
        }

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

        blockEl.addEventListener('touchstart', (e) => {
            if (e.target.closest('button, input')) return;
            if (GameState.isRunning || DragState.isDragging) return;

            const touch = e.changedTouches[0];
            DragState.currentTouchId = touch.identifier;
            DragState.dragTargetElement = e.target;
            DragState.dragStartPos = { x: touch.clientX, y: touch.clientY };
            DragState.isDragPending = true;
        }, { passive: true });

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
        if (loopBody) {
            this.renderContainer(loopBody, item.commands, path);
        }

        blockEl.querySelector('.loop-count')?.addEventListener('change', (e) => {
            ProgramDataManager.updateLoopCount(path, e.target.value);
        });

        blockEl.querySelector('.remove-btn')?.addEventListener('click', (e) => {
            e.stopPropagation();
            ProgramDataManager.removeItemByPath(path);
            this.render();
            HapticFeedback.light();
        });
    },

    setupCommandBlock(blockEl, item, path) {
        blockEl.classList.add('bg-indigo-500', 'text-white', 'flex', 'justify-between', 'items-center', 'cursor-move');
        blockEl.innerHTML = `
            <span class="font-semibold flex items-center text-xs md:text-sm">
                <i class="fa-solid ${COMMAND_ICONS[item.command]} mr-2 w-5"></i>
                ${COMMAND_TEXT[item.command]}
            </span>
            <button class="remove-btn haptic-light w-7 h-7 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center">
                <i class="fa-solid fa-xmark text-white"></i>
            </button>
        `;

        blockEl.querySelector('.remove-btn')?.addEventListener('click', (e) => {
            e.stopPropagation();
            ProgramDataManager.removeItemByPath(path);
            this.render();
            HapticFeedback.light();
        });
    }
};
