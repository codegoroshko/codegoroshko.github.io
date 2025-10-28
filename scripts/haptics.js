import { CONFIG } from './config.js';

export const HapticFeedback = {
    light() {
        if (CONFIG.HAPTIC_ENABLED) navigator.vibrate(10);
    },
    medium() {
        if (CONFIG.HAPTIC_ENABLED) navigator.vibrate(20);
    },
    success() {
        if (CONFIG.HAPTIC_ENABLED) navigator.vibrate([30, 50, 30]);
    },
    error() {
        if (CONFIG.HAPTIC_ENABLED) navigator.vibrate([50, 100, 50]);
    }
};
