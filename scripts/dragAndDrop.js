import { CONFIG } from './config.js';
import { DOM } from './domElements.js';
import { ProgramDataManager } from './programDataManager.js';
import { DragState } from './dragState.js';
import { HapticFeedback } from './haptics.js';
import { ProgramRenderer } from './programRenderer.js';
import { GameState } from './gameState.js';

export function initDragAndDrop() {
    const programArea = DOM.programArea;
    if (!programArea) return;

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
        const y = e.clientY || e.touches?.[0]?.clientY;
        if (typeof y !== 'number') return children.length;

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

    document.addEventListener('touchmove', (e) => {
        if (!DragState.isDragPending || !e.changedTouches) return;

        const touch = [...e.changedTouches].find(t => t.identifier === DragState.currentTouchId);
        if (!touch) return;

        const dx = Math.abs(touch.clientX - DragState.dragStartPos.x);
        const dy = Math.abs(touch.clientY - DragState.dragStartPos.y);

        if (dx > 5 || dy > 5) {
            e.preventDefault();
            DragState.isDragging = true;
            DragState.isDragPending = false;

            const target = DragState.dragTargetElement;
            if (!target) return;

            HapticFeedback.light();

            const clone = target.cloneNode(true);
            clone.style.position = 'fixed';
            clone.style.zIndex = '1000';
            clone.style.opacity = '0.8';
            clone.style.pointerEvents = 'none';
            clone.style.width = `${target.offsetWidth}px`;
            document.body.appendChild(clone);
            DragState.touchClone = clone;

            if (target.classList.contains('block')) {
                const command = target.dataset.command;
                DragState.draggedItemData = command === 'loop'
                    ? { type: 'loop', count: CONFIG.MIN_LOOP_COUNT, commands: [], isNew: true }
                    : { type: 'command', command, isNew: true };
            } else {
                DragState.draggedItemData = { path: target.dataset.path, isNew: false };
                target.classList.add('dragging');
            }

            DragState.moveTouchClone(touch);
        }
    }, { passive: false });

    document.addEventListener('touchend', (e) => {
        if (!DragState.currentTouchId) return;

        const touch = [...e.changedTouches].find(t => t.identifier === DragState.currentTouchId);
        if (!touch) return;

        if (DragState.isDragPending) {
            const target = DragState.dragTargetElement;
            if (target && target.classList.contains('block') && !GameState.isRunning) {
                const command = target.dataset.command;
                const newItem = command === 'loop'
                    ? { type: 'loop', count: CONFIG.MIN_LOOP_COUNT, commands: [] }
                    : { type: 'command', command };
                GameState.program.push(newItem);
                ProgramRenderer.render();
                HapticFeedback.medium();
            }
        } else if (DragState.isDragging) {
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

        DragState.cleanup();
        DragState.currentTouchId = null;
    });
}
