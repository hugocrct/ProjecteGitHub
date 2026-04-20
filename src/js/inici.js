// JOC DE PREGUNTES - FLUX D'INICI DEL JOC

// 1. INICIALITZACIÓ DE L'ESTAT DEL JOC
const gameState = {
    // Informació del jugador
    player: {
        name: '',
        score: 0
    },

    // Estat actual
    currentScreen: 'inicio',
    currentCategory: null,
    currentQuestion: 0,

    // Estadístiques
    stats: {
        totalQuestions: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        timeStarted: null,
        timeEnded: null
    },

    // Dades
    questions: {},
    categories: {}
};


// 2. CACHE
const domElements = {
    // Pantalla d'inici
    screenInicio: document.getElementById('screen-inicio'),
    formNom: document.getElementById('form-nom'),
    inputNom: document.getElementById('input-nom'),

    // Pantalla de categoria
    screenCategoria: document.getElementById('screen-categoria'),
    saludoText: document.getElementById('saludo'),
    btnCategoriaA: document.getElementById('btn-categoria-a'),
    btnCategoriaB: document.getElementById('btn-categoria-b'),

    // Pantalla del joc
    screenJoc: document.getElementById('screen-joc'),

    // Pantalla de resultats
    screenResultats: document.getElementById('screen-resultats')
};


// 3. VALIDACIONS
/**
 * Valida el nom del jugador
 * @param {string} nom - Nom a validar
 * @returns {object} { isValid: boolean, message: string }
 */
function validateNom(nom) {
    // Trim per eliminar espais
    const nomTrimed = nom.trim();

    // Checks
    if (nomTrimed.length === 0) {
        return {
            isValid: false,
            message: 'Si us plau, escriu el teu nom'
        };
    }

    if (nomTrimed.length < 2) {
        return {
            isValid: false,
            message: 'El nom ha de tenir almenys 2 caràcters'
        };
    }

    if (nomTrimed.length > 20) {
        return {
            isValid: false,
            message: 'El nom pot tenir com a màxim 20 caràcters'
        };
    }

    // Check si té caràcters especials
    if (!/^[a-zA-Z0-9\s\-àáäâèéëêìíïîòóöôùúûüñçÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÛÜÑÇ]+$/.test(nomTrimed)) {
        return {
            isValid: false,
            message: 'El nom pot contenir lletres, números i guions'
        };
    }

    return {
        isValid: true,
        message: ''
    };
}

// 4. PANTALLA D'INICI
/**
 * Inicialitza la pantalla d'inici
 * - Configura event listeners
 * - Neteija l'input
 */
function initScreenInicio() {
    console.log('Inicialitzant pantalla d\'inici...');

    // Neteija l'input
    domElements.inputNom.value = '';
    domElements.inputNom.focus();

    // Event listener per al formulari
    domElements.formNom.addEventListener('submit', handleFormSubmit);

    // Event listener per a tecla ENTER
    domElements.inputNom.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleFormSubmit(event);
        }
    });

    // Event listener per a validació en real-time
    domElements.inputNom.addEventListener('input', function () {
        // Limita a 20 caràcters
        if (this.value.length > 20) {
            this.value = this.value.slice(0, 20);
        }
        // Alguns navegadors no respecten maxlength, ho fem manual
    });
}

/**
 * Maneja l'enviament del formulari de nom
 * @param {Event} event - Event del formulari
 */
function handleFormSubmit(event) {
    event.preventDefault();
    console.log('Formulari enviat');

    const nom = domElements.inputNom.value;

    // Validar
    const validation = validateNom(nom);

    if (!validation.isValid) {
        showError(validation.message);
        return;
    }

    // Guardar nom a l'estat
    gameState.player.name = nom.trim();
    console.log(`Nom validat: ${gameState.player.name}`);

    // Anar a la pantalla de categoria
    goToCategory();
}

/**
 * Mostra un missatge d'error
 * @param {string} message - Missatge d'error
 */
function showError(message) {
    // Alert simple (es pot millorar amb modal custom)
    alert(message);
    domElements.inputNom.focus();
}

// 5. PANTALLA DE CATEGORIA
/**
 * Va a la pantalla de selecció de categoria
 */
function goToCategory() {
    console.log('Anant a categoria...');

    // Mostrar nom del jugador
    updateSaludoText();

    // Canviar pantalla
    changeScreen('categoria');

    // Inicialitzar botons de categoria
    initCategoryButtons();
}

/**
 * Actualitza el text de salutació
 */
function updateSaludoText() {
    const saludoMessage = `Hola, ${gameState.player.name}!`;
    domElements.saludoText.textContent = saludoMessage;
    console.log(`${saludoMessage}`);
}

/**
 * Inicialitza els botons de categoria
 */
function initCategoryButtons() {
    console.log('Inicialitzant botons de categoria...');

    const categories = gameState.categories;
    const categoryKeys = Object.keys(categories);

    // Configurar botó A (primera categoria)
    if (categoryKeys[0]) {
        const categoryAKey = categoryKeys[0];
        const categoryAData = categories[categoryAKey];

        domElements.btnCategoriaA.querySelector('.name').textContent = categoryAData.name;
        domElements.btnCategoriaA.querySelector('.icon').textContent = categoryAData.icon;

        domElements.btnCategoriaA.onclick = () => {
            selectCategory(categoryAKey);
        };
    }

    // Configurar botó B (segona categoria)
    if (categoryKeys[1]) {
        const categoryBKey = categoryKeys[1];
        const categoryBData = categories[categoryBKey];

        domElements.btnCategoriaB.querySelector('.name').textContent = categoryBData.name;
        domElements.btnCategoriaB.querySelector('.icon').textContent = categoryBData.icon;

        domElements.btnCategoriaB.onclick = () => {
            selectCategory(categoryBKey);
        };
    }
}

/**
 * Selecciona una categoria i comença el joc
 * @param {string} categoryKey - Clau de la categoria
 */
function selectCategory(categoryKey) {
    console.log(`Categoria seleccionada: ${categoryKey}`);

    // Validar que la categoria existeix
    if (!gameState.categories[categoryKey]) {
        console.error(`Categoria no trobada: ${categoryKey}`);
        showError('Error: Categoria no trobada');
        return;
    }

    // Guardar categoria actual
    gameState.currentCategory = categoryKey;

    // Obtenir preguntes de la categoria
    const categoryData = gameState.categories[categoryKey];
    const questions = categoryData.questions;

    // Guardar preguntes i estadístiques
    gameState.questions = questions;
    gameState.stats.totalQuestions = questions.length;
    gameState.stats.timeStarted = new Date();

    console.log(`Joc iniciat amb ${questions.length} preguntes`);

    // Anar a la pantalla del joc
    startGame();
}

// 6. INICI DEL JOC
/**
 * Comença el joc
 * Inicialitza variables i mostra primera pregunta
 */
function startGame() {
    console.log('Joc iniciat!');

    // Reset variables
    gameState.currentQuestion = 0;
    gameState.player.score = 0;
    gameState.stats.correctAnswers = 0;
    gameState.stats.wrongAnswers = 0;

    // Canviar pantalla
    changeScreen('joc');

    // Mostrar primera pregunta
    showQuestion();
}

/**
 * Mostra la pregunta actual
 * (Aquesta funció la farà Hugo amb la lógica del joc)
 */
function showQuestion() {
    console.log(`Mostrant pregunta ${gameState.currentQuestion + 1}/${gameState.stats.totalQuestions}`);

    if (gameState.currentQuestion >= gameState.questions.length) {
        endGame();
        return;
    }

    const question = gameState.questions[gameState.currentQuestion];
    console.log(`Pregunta: ${question.pregunta}`);

    // Emit event per que Hugo gestioni la mostrada
    window.dispatchEvent(new CustomEvent('showQuestion', {
        detail: { question, index: gameState.currentQuestion }
    }));
}

// 7. FI DEL JOC
/**
 * Finalitza el joc i mostra resultats
 */
function endGame() {
    console.log('Joc finalitzat!');

    gameState.stats.timeEnded = new Date();

    // Mostrar pantalla de resultats
    changeScreen('resultats');

    // Emit event perquè la pantalla de resultats es carregui
    window.dispatchEvent(new CustomEvent('gameEnded', {
        detail: gameState
    }));
}

// 8. NAVEGACIÓ DE PANTALLES
// ============================================

/**
 * Canvia a una pantalla específica
 * @param {string} screenName - Nom de la pantalla
 */
function changeScreen(screenName) {
    console.log(`Canviant a pantalla: ${screenName}`);

    // Validar pantalla
    const validScreens = ['inicio', 'categoria', 'joc', 'resultats'];
    if (!validScreens.includes(screenName)) {
        console.error(`Pantalla no vàlida: ${screenName}`);
        return;
    }

    // Ocultar totes les pantalles
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    // Mostrar la pantalla seleccionada
    const screenElement = document.getElementById(`screen-${screenName}`);
    if (screenElement) {
        screenElement.classList.add('active');
        gameState.currentScreen = screenName;
        console.log(`Pantalla mostrada: ${screenName}`);
    } else {
        console.error(`Element de pantalla no trobat: screen-${screenName}`);
    }
}

/**
 * Torna a la pantalla inicial (reset total)
 */
function resetGame() {
    console.log('Reset del joc...');

    // Reset l'estat
    gameState.player.name = '';
    gameState.player.score = 0;
    gameState.currentQuestion = 0;
    gameState.stats = {
        totalQuestions: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        timeStarted: null,
        timeEnded: null
    };

    // Neteija input
    domElements.inputNom.value = '';

    // Torna a inici
    changeScreen('inicio');
    initScreenInicio();
}

// 9. CARREGADA DE PREGUNTES
/**
 * Carrega les preguntes des de data/questions.json
 */
async function loadQuestions() {
    try {
        console.log('Carregant preguntes...');

        const response = await fetch('data/questions.json');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        gameState.categories = data.categories;

        console.log(`Preguntes carregades: ${Object.keys(data.categories).length} categories`);

        return true;
    } catch (error) {
        console.error('Error carregant preguntes:', error);
        showError('Error al caregar les preguntes. Comprova la connexió.');
        return false;
    }
}

// 10. INICIALITZACIÓ PRINCIPAL
/**
 * Inicialitza l'aplicació quan es carrega el DOM
 */
async function initApp() {
    console.log('Inicialitzant aplicació...');
    console.log('='.repeat(50));

    // 1. Carregar preguntes
    const questionsLoaded = await loadQuestions();

    if (!questionsLoaded) {
        console.error('No es van poder carregar les preguntes');
        return;
    }

    // 2. Inicialitzar pantalla d'inici
    initScreenInicio();

    // 3. Setup event listeners globals
    setupGlobalEventListeners();

    console.log('Aplicació inicialitzada correctament');
    console.log('='.repeat(50));
}

/**
 * Setup dels event listeners globals
 */
function setupGlobalEventListeners() {
    console.log('🔗 Configurant event listeners globals...');

    // Botó "Tornar a jugar" (de resultats)
    const btnTornar = document.getElementById('btn-tornar');
    if (btnTornar) {
        btnTornar.addEventListener('click', () => {
            console.log('Tornant a categoria...');
            goToCategory();
        });
    }

    // Botó "Sortir" (de resultats)
    const btnSortir = document.getElementById('btn-sortir');
    if (btnSortir) {
        btnSortir.addEventListener('click', () => {
            console.log('Sortint del joc...');
            resetGame();
        });
    }
}

// 11. INICIAR QUAN EL DOM ESTÁ LLEST
// Esperar que el DOM estigui carregat
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    // El DOM ja està carregat
    initApp();
}

// 12. EXPORTS (per a altres fitxers)
// Fer públiques les funcions principals
window.gameState = gameState;
window.changeScreen = changeScreen;
window.selectCategory = selectCategory;
window.resetGame = resetGame;
window.startGame = startGame;
window.showQuestion = showQuestion;
window.endGame = endGame;

// FI DEL FLUX D'INICI
console.log('game-init.js carregat correctament');
