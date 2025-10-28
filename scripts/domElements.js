export const DOM = {
    grid: null,
    programArea: null,
    // position: null, // ВИДАЛЕНО
    strength: null,
    weapon: null,
    modal: null,
    modalContent: null,
    modalIcon: null,
    modalTitle: null,
    modalMessage: null,
    modalButtons: null,
    currentLevelSpan: null,
    stepCounter: null,
    stepCount: null,
    programCount: null,
    monsterStrengthStat: null, // ДОДАНО
    monsterDefenseStat: null, // ДОДАНО

    cache() {
        this.grid = document.querySelector('.grid-container .grid');
        this.programArea = document.getElementById('programArea');
        this.weapon = document.getElementById('weapon');
        // this.position = document.getElementById('position'); // ВИДАЛЕНО
        this.strength = document.getElementById('strength');
        this.modal = document.getElementById('modal');
        this.modalContent = document.getElementById('modalContent');
// ... existing code ...
        this.stepCounter = document.getElementById('stepCounter');
        this.stepCount = document.getElementById('stepCount');
        this.programCount = document.getElementById('programCount');
        this.monsterStrengthStat = document.getElementById('monsterStrengthStat'); // ДОДАНО
        this.monsterDefenseStat = document.getElementById('monsterDefenseStat'); // ДОДАНО
    }
};
