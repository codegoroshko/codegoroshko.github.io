export const DragState = {
    draggedItemData: null,
    dragPlaceholder: null,
    touchClone: null,
    currentTouchId: null,
    isDragging: false,
    dragTargetElement: null,
    dragStartPos: null,
    isDragPending: false,

    init() {
        this.dragPlaceholder = document.createElement('div');
        this.dragPlaceholder.className = 'drag-placeholder';
    },

    moveTouchClone(touch) {
        if (this.touchClone) {
            this.touchClone.style.left = `${touch.clientX - this.touchClone.offsetWidth / 2}px`;
            this.touchClone.style.top = `${touch.clientY - this.touchClone.offsetHeight / 2}px`;
        }
    },

    cleanup() {
        if (this.touchClone) {
            this.touchClone.remove();
            this.touchClone = null;
        }
        this.isDragging = false;
        this.draggedItemData = null;
        document.querySelectorAll('.dragging').forEach(el => el.classList.remove('dragging'));
        this.dragPlaceholder?.remove();
        this.isDragPending = false;
        this.dragTargetElement = null;
        this.dragStartPos = null;
    }
};
