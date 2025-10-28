import { CONFIG } from './config.js';

export const Utils = {
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    calculateTotalSteps(programArray, maxDepth = 3) {
        const calculate = (items, depth = 0) => {
            if (depth > maxDepth) return CONFIG.MAX_EXECUTION_STEPS;
            let total = 0;
            for (const item of items) {
                if (item.type === 'loop') {
                    const loopBodyCost = calculate(item.commands, depth + 1);
                    if (loopBodyCost >= CONFIG.MAX_EXECUTION_STEPS) {
                        return CONFIG.MAX_EXECUTION_STEPS;
                    }
                    total += item.count * loopBodyCost;
                } else {
                    total += 1;
                }
                if (total >= CONFIG.MAX_EXECUTION_STEPS) {
                    return CONFIG.MAX_EXECUTION_STEPS;
                }
            }
            return total;
        };
        return calculate(programArray);
    }
};
