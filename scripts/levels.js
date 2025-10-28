export const TUTORIAL_LEVELS = {
    0.1: {
        name: "🌟 Перший крок",
        description: "Клікни або перетягни 'Праворуч' у 'Програму'",
        gridSize: 3,
        startPos: { x: 0, y: 0 },
        finishPos: { x: 1, y: 0 },
        startingStrength: 15,
        startingWeapon: 10,
        monsterStrength: 5,
        monsterDefense: 3,
        items: [],
        obstacles: [],
        allowLoops: false,
        forcedCommand: 'right',
        autoHighlight: true,
        tutorialText: "Клікни або перетягни 'Праворуч' сюди →",
        optimalSteps: 1
    },
    0.2: {
        name: "↗️ Два кроки",
        description: "Додай команду 'Праворуч' два рази",
        gridSize: 4,
        startPos: { x: 0, y: 0 },
        finishPos: { x: 2, y: 0 },
        startingStrength: 15,
        startingWeapon: 10,
        monsterStrength: 8,
        monsterDefense: 4,
        items: [],
        obstacles: [],
        allowLoops: false,
        forcedCommand: 'right',
        tutorialText: "Додай команду ще раз! Кожен крок = -1 Сила ⚡",
        optimalSteps: 2
    },
    0.3: {
        name: "💪 Лічильник сили",
        description: "Спостерігайте за тим, як змінюється сила під час руху",
        gridSize: 5,
        startPos: { x: 0, y: 0 },
        finishPos: { x: 3, y: 0 },
        startingStrength: 15,
        startingWeapon: 10,
        monsterStrength: 10,
        monsterDefense: 5,
        items: [],
        obstacles: [],
        allowLoops: false,
        tutorialText: "Додай 3 команди 'Праворуч'. Слідкуй за силою!",
        optimalSteps: 3
    },
    0.4: {
        name: "🌳 Перша перешкода",
        description: "Обійди дерево! Використовуй різні команди",
        gridSize: 4,
        startPos: { x: 0, y: 0 },
        finishPos: { x: 2, y: 2 },
        startingStrength: 20,
        startingWeapon: 8,
        monsterStrength: 10,
        monsterDefense: 4,
        items: [],
        obstacles: [
            { x: 1, y: 0, type: 'tree' }
        ],
        allowLoops: false,
        tutorialText: "Дерево блокує прямий шлях. Обійди його!",
        optimalSteps: 4
    },
    0.5: {
        name: "⚡ Збір бонусів",
        description: "Збери силу, щоб перемогти!",
        gridSize: 5,
        startPos: { x: 0, y: 0 },
        finishPos: { x: 3, y: 0 },
        startingStrength: 10,
        startingWeapon: 8,
        monsterStrength: 12,
        monsterDefense: 5,
        items: [
            { x: 1, y: 0, type: 'strength', value: 8 }
        ],
        obstacles: [],
        allowLoops: false,
        tutorialText: "⚠️ Мало сили! Збери ⚡ по дорозі до монстра",
        optimalSteps: 3
    }
};

export const MAIN_LEVELS = {
    1: {
        name: "🎯 Перший виклик",
        description: "Обійди перешкоду та дістанься монстра",
        gridSize: 6,
        startPos: { x: 0, y: 0 },
        finishPos: { x: 4, y: 1 },
        startingStrength: 18,
        startingWeapon: 8,
        monsterStrength: 12,
        monsterDefense: 5,
        items: [
            { x: 2, y: 1, type: 'strength', value: 3 }
        ],
        obstacles: [
            { x: 2, y: 0, type: 'tree' }
        ],
        allowLoops: false,
        hint: "💡 Обійди дерево і збери бонус сили",
        difficulty: "Легко",
        optimalSteps: 5
    },
    2: {
        name: "↗️ Діагональний маршрут",
        description: "Оптимальний шлях по діагоналі",
        gridSize: 6,
        startPos: { x: 0, y: 0 },
        finishPos: { x: 3, y: 3 },
        startingStrength: 20,
        startingWeapon: 4,
        monsterStrength: 14,
        monsterDefense: 5,
        items: [
            { x: 1, y: 1, type: 'weapon', value: 2 },
            { x: 2, y: 2, type: 'strength', value: 4 }
        ],
        obstacles: [],
        allowLoops: false,
        hint: "💡 Чергуй 'Праворуч' і 'Вниз', збирай бонуси",
        difficulty: "Легко",
        optimalSteps: 6
    },
    3: {
        name: "⚡ Збір ресурсів",
        description: "Збери ВСІ бонуси для перемоги",
        gridSize: 7,
        startPos: { x: 0, y: 0 },
        finishPos: { x: 4, y: 0 },
        startingStrength: 14,
        startingWeapon: 2,
        monsterStrength: 18,
        monsterDefense: 6,
        items: [
            { x: 1, y: 0, type: 'strength', value: 10 },
            { x: 2, y: 0, type: 'weapon', value: 3 },
            { x: 3, y: 0, type: 'weapon', value: 2 }
        ],
        obstacles: [],
        allowLoops: false,
        hint: "💡 Без усіх ресурсів не переможеш!",
        difficulty: "Легко",
        optimalSteps: 4
    },
    4: {
        name: "🗡️ Озброєння",
        description: "Збери зброю, обійди перешкоди",
        gridSize: 7,
        startPos: { x: 0, y: 0 },
        finishPos: { x: 3, y: 3 },
        startingStrength: 25,
        startingWeapon: 0,
        monsterStrength: 15,
        monsterDefense: 6,
        items: [
            { x: 1, y: 1, type: 'weapon', value: 3 },
            { x: 2, y: 2, type: 'weapon', value: 4 },
            { x: 3, y: 2, type: 'strength', value: 5 }
        ],
        obstacles: [
            { x: 1, y: 0, type: 'rock' }
        ],
        allowLoops: false,
        hint: "💡 Зброя >= Захист монстра! Обійди камінь",
        difficulty: "Середньо",
        optimalSteps: 6
    },
    5: {
        name: "🌳 Перешкоди",
        description: "Знайди обхід!",
        gridSize: 7,
        startPos: { x: 0, y: 0 },
        finishPos: { x: 4, y: 0 },
        startingStrength: 20,
        startingWeapon: 5,
        monsterStrength: 12,
        monsterDefense: 4,
        items: [
            { x: 2, y: 1, type: 'strength', value: 5 }
        ],
        obstacles: [
            { x: 2, y: 0, type: 'tree' }
        ],
        allowLoops: false,
        hint: "💡 Обійди дерево зверху або знизу",
        difficulty: "Середньо",
        optimalSteps: 6
    },
    6: {
        name: "🪨 Лабіринт",
        description: "Складний шлях!",
        gridSize: 8,
        startPos: { x: 0, y: 0 },
        finishPos: { x: 5, y: 3 },
        startingStrength: 25,
        startingWeapon: 2,
        monsterStrength: 18,
        monsterDefense: 5,
        items: [
            { x: 1, y: 1, type: 'strength', value: 8 },
            { x: 3, y: 2, type: 'weapon', value: 4 }
        ],
        obstacles: [
            { x: 1, y: 0, type: 'rock' },
            { x: 2, y: 1, type: 'tree' },
            { x: 3, y: 3, type: 'rock' }
        ],
        allowLoops: false,
        hint: "💡 Шукай найкоротший шлях",
        difficulty: "Середньо",
        optimalSteps: 10
    },
    7: {
        name: "🔄 Цикли розблоковано!",
        description: "Оптимізуй код циклами",
        gridSize: 8,
        startPos: { x: 0, y: 0 },
        finishPos: { x: 5, y: 0 },
        startingStrength: 18,
        startingWeapon: 5,
        monsterStrength: 12,
        monsterDefense: 4,
        items: [
            { x: 2, y: 0, type: 'strength', value: 5 }
        ],
        obstacles: [],
        allowLoops: true,
        hint: "💡 Використай цикл замість 5 команд!",
        difficulty: "Середньо",
        optimalSteps: 5
    },
    8: {
        name: "🎯 Майстер циклів",
        description: "Комбінуй цикли з командами",
        gridSize: 8,
        startPos: { x: 0, y: 0 },
        finishPos: { x: 4, y: 4 },
        startingStrength: 28,
        startingWeapon: 1,
        monsterStrength: 20,
        monsterDefense: 5,
        items: [
            { x: 2, y: 2, type: 'strength', value: 8 },
            { x: 3, y: 3, type: 'weapon', value: 5 }
        ],
        obstacles: [
            { x: 1, y: 1, type: 'rock' }
        ],
        allowLoops: true,
        hint: "💡 Комбінуй цикли з командами",
        difficulty: "Складно",
        optimalSteps: 8
    },
    9: {
        name: "🏔️ Велике випробування",
        description: "Довгий шлях!",
        gridSize: 8,
        startPos: { x: 0, y: 0 },
        finishPos: { x: 6, y: 6 },
        startingStrength: 35,
        startingWeapon: 0,
        monsterStrength: 25,
        monsterDefense: 7,
        items: [
            { x: 1, y: 2, type: 'strength', value: 10 },
            { x: 3, y: 3, type: 'weapon', value: 4 },
            { x: 5, y: 5, type: 'weapon', value: 4 }
        ],
        obstacles: [
            { x: 1, y: 1, type: 'rock' },
            { x: 2, y: 3, type: 'tree' },
            { x: 4, y: 4, type: 'rock' }
        ],
        allowLoops: true,
        hint: "💡 Збери ВСІ бонуси зброї!",
        difficulty: "Складно",
        optimalSteps: 14
    },
    10: {
        name: "🐉 Фінальна битва",
        description: "Останній виклик!",
        gridSize: 8,
        startPos: { x: 0, y: 0 },
        finishPos: { x: 7, y: 7 },
        startingStrength: 40,
        startingWeapon: 0,
        monsterStrength: 28,
        monsterDefense: 8,
        items: [
            { x: 1, y: 1, type: 'weapon', value: 3 },
            { x: 2, y: 3, type: 'strength', value: 12 },
            { x: 4, y: 2, type: 'weapon', value: 3 },
            { x: 5, y: 5, type: 'strength', value: 10 },
            { x: 6, y: 6, type: 'weapon', value: 3 }
        ],
        obstacles: [
            { x: 1, y: 0, type: 'rock' },
            { x: 2, y: 2, type: 'tree' },
            { x: 3, y: 4, type: 'rock' },
            { x: 6, y: 5, type: 'rock' }
        ],
        allowLoops: true,
        hint: "💡 Це фінал! Використай всі знання!",
        difficulty: "Дуже складно",
        optimalSteps: 16
    }
};

export const LEVELS = { ...TUTORIAL_LEVELS, ...MAIN_LEVELS };
