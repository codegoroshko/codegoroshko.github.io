export const DOM = {
    grid: null,
    programArea: null,
    position: null,
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

    cache() {
        this.grid = document.querySelector('.grid');
        this.programArea = document.getElementById('programArea');
        this.weapon = document.getElementById('weapon');
        this.position = document.getElementById('position');
        this.strength = document.getElementById('strength');
        this.modal = document.getElementById('modal');
        this.modalContent = document.getElementById('modalContent');
        this.modalIcon = document.getElementById('modalIcon');
        this.modalTitle = document.getElementById('modalTitle');
        this.modalMessage = document.getElementById('modalMessage');
        this.modalButtons = document.getElementById('modalButtons');
        this.currentLevelSpan = document.getElementById('currentLevel');
        this.stepCounter = document.getElementById('stepCounter');
        this.stepCount = document.getElementById('stepCount');
        this.programCount = document.getElementById('programCount');
    }
};
