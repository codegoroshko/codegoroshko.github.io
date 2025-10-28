import { DOM } from './domElements.js';
import { HapticFeedback } from './haptics.js';
import { GameState } from './gameState.js';

export const ModalManager = {
    show(title, text, type, buttons = null) {
        if (!DOM.modal || (!DOM.modal.classList.contains('hidden') && !GameState.isRunning)) {
            return;
        }

        if (DOM.modalTitle) DOM.modalTitle.textContent = title;
        if (DOM.modalMessage) DOM.modalMessage.textContent = text;

        if (DOM.modalIcon) {
            DOM.modalIcon.innerHTML = '';
            DOM.modalIcon.className = 'w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl';

            if (type === 'success') {
                DOM.modalIcon.classList.add('bg-green-100', 'text-green-600', 'level-complete');
                DOM.modalIcon.innerHTML = '<i class="fa-solid fa-check"></i>';
            } else {
                DOM.modalIcon.classList.add('bg-red-100', 'text-red-600');
                DOM.modalIcon.innerHTML = '<i class="fa-solid fa-xmark"></i>';
            }
        }

        if (DOM.modalButtons) {
            DOM.modalButtons.innerHTML = '';
            if (buttons && Array.isArray(buttons)) {
                buttons.forEach(btn => {
                    const button = document.createElement('button');
                    button.innerHTML = btn.text;
                    button.className = `haptic-light py-3 px-6 font-semibold rounded-lg shadow-md transition-all text-white ${btn.class} flex items-center justify-center gap-2`;
                    button.addEventListener('click', () => {
                        HapticFeedback.light();
                        btn.action();
                    });
                    DOM.modalButtons.appendChild(button);
                });
            } else {
                const defaultBtn = document.createElement('button');
                defaultBtn.textContent = 'Зрозуміло';
                const defaultClasses = type === 'success'
                    ? 'bg-green-500 hover:bg-green-600'
                    : 'bg-red-500 hover:bg-red-600';
                defaultBtn.className = `haptic-light py-3 px-8 font-semibold rounded-lg shadow-md transition-all text-white ${defaultClasses}`;
                defaultBtn.addEventListener('click', () => {
                    HapticFeedback.light();
                    this.hide();
                });
                DOM.modalButtons.appendChild(defaultBtn);
            }
        }

        if (DOM.modal) {
            DOM.modal.classList.remove('hidden');
        }

        requestAnimationFrame(() => {
            DOM.modalContent?.classList.remove('scale-95', 'opacity-0');
            DOM.modalContent?.classList.add('scale-100', 'opacity-100');
        });
    },

    hide() {
        DOM.modalContent?.classList.add('scale-95', 'opacity-0');
        DOM.modalContent?.classList.remove('scale-100', 'opacity-100');

        setTimeout(() => {
            DOM.modal?.classList.add('hidden');
        }, 200);
    }
};
