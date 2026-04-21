// ============================================
// JOC DE PREGUNTES - FLUX D'INICI
// Responsable: ANASTASIA (Frontend)
// ============================================

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
    questions: [],
    categories: {}
};

// 2. DOM ELEMENTS (CACHE) - ADAPTAT AL TEU HTML

const domElements = {
    // Pantalla d'inici
    screenInicio: document.getElementById('screen-inicio'),
    inputNom: document.getElementById('inputNom'),
    botoComençar: document.getElementById('botoComençar'),
    errorNom: document.getElementById('errorNom'),
    
    // Pantalla de categoria
    screenCategoria: document.getElementById('screen-categoria'),
    nomJugadorText: document.getElementById('nomJugador'),
    botoCategorias: document.querySelectorAll('[data-categoria]'),
    
    // Pantalla del joc
    pantallaJoc: document.getElementById('pantallaJoc'),
    textPregunta: document.getElementById('textPregunta'),
    gridOpcions: document.getElementById('gridOpcions'),
    botonsOpcio: document.querySelectorAll('.boto--opcio'),
    jocCategoria: document.getElementById('jocCategoria'),
    timerNumero: document.getElementById('timerNumero'),
    timer: document.getElementById('timer'),
    feedback: document.getElementById('feedback'),
    feedbackText: document.getElementById('feedbackText'),
    botoSeguent: document.getElementById('botoSeguent'),
    progresText: document.getElementById('progresText'),
    barraProgresInner: document.getElementById('barraProgresInner'),
    
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
 */
function initScreenInicio() {
    console.log('Inicialitzant pantalla d\'inici...');
    
    // Focus a l'input
    domElements.inputNom.focus();
    
    // Event listener per al botó
    domElements.botoComençar.addEventListener('click', handleBotoComençar);
    
    // Event listener per a tecla ENTER
    domElements.inputNom.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleBotoComençar();
        }
    });
    
    // Event listener per a validació en real-time
    domElements.inputNom.addEventListener('input', function() {
        // Limita a 20 caràcters
        if (this.value.length > 20) {
            this.value = this.value.slice(0, 20);
        }
        // Ocultar error si l'usuari escriu
        if (this.value.length > 0) {
            domElements.errorNom.classList.add('amagat');
        }
    });
}

/**
 * Maneja el click del botó "Començar"
 */
function handleBotoComençar() {
    console.log('Botó "Començar" premut');
    
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
    domElements.errorNom.textContent = message;
    domElements.errorNom.classList.remove('amagat');
    domElements.inputNom.focus();
}

// 5. PANTALLA DE CATEGORIA

/**
 * Va a la pantalla de selecció de categoria
 */
function goToCategory() {
    console.log('Anant a categoria...');
    
    // Mostrar nom del jugador
    updateNomJugadorText();
    
    // Canviar pantalla
    changeScreen('categoria');
    
    // Inicialitzar botons de categoria
    initCategoryButtons();
}

/**
 * Actualitza el text amb el nom del jugador
 */
function updateNomJugadorText() {
    domElements.nomJugadorText.textContent = gameState.player.name;
    console.log(`Nom mostrat: ${gameState.player.name}`);
}

/**
 * Inicialitza els botons de categoria
 */
function initCategoryButtons() {
    console.log('Inicialitzant botons de categoria...');
    
    domElements.botoCategorias.forEach(btn => {
        btn.addEventListener('click', () => {
            const categoria = btn.getAttribute('data-categoria');
            selectCategory(categoria);
        });
    });
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
 */
function startGame() {
    console.log('Joc iniciat!');
    
    // Reset variables
    gameState.currentQuestion = 0;
    gameState.player.score = 0;
    gameState.stats.correctAnswers = 0;
    gameState.stats.wrongAnswers = 0;
    
    // Actualitzar categoria a la pantalla
    const categoryName = gameState.categories[gameState.currentCategory].name;
    domElements.jocCategoria.textContent = categoryName;
    
    // Canviar pantalla
    changeScreen('joc');
    
    // Emit event perquè Hugo mostri la pregunta
    window.dispatchEvent(new CustomEvent('showQuestion'));
}

// 7. FIN DEL JOC

/**
 * Finalitza el joc i mostra resultats
 */
function endGame() {
    console.log('🏁 Joc finalitzat!');
    
    gameState.stats.timeEnded = new Date();
    
    // Mostrar pantalla de resultats
    changeScreen('resultats');
    
    // Emit event perquè Hugo mostri els resultats
    window.dispatchEvent(new CustomEvent('gameEnded', { 
        detail: gameState 
    }));
}

// 8. NAVEGACIÓ DE PANTALLES

/**
 * Canvia a una pantalla específica
 * @param {string} screenName - Nom de la pantalla
 */
function changeScreen(screenName) {
    console.log(`📄 Canviant a pantalla: ${screenName}`);
    
    // Ocultar totes les pantalles
    document.querySelectorAll('.pantalla').forEach(pantalla => {
        pantalla.classList.add('amagada');
        pantalla.classList.remove('activa');
    });
    
    // Mostrar la pantalla seleccionada
    let screenElement;
    
    switch(screenName) {
        case 'inicio':
            screenElement = domElements.screenInicio;
            break;
        case 'categoria':
            screenElement = domElements.screenCategoria;
            break;
        case 'joc':
            screenElement = domElements.pantallaJoc;
            break;
        case 'resultats':
            screenElement = domElements.screenResultats;
            break;
    }
    
    if (screenElement) {
        screenElement.classList.remove('amagada');
        screenElement.classList.add('activa');
        gameState.currentScreen = screenName;
        console.log(`Pantalla mostrada: ${screenName}`);
    } else {
        console.error(`Pantalla no trobada: ${screenName}`);
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
    domElements.errorNom.classList.add('amagat');
    
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
        alert('Error al caregar les preguntes. Comprova la connexió.');
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
    console.log('Configurant event listeners globals...');
    
    // Estos listeners s'afegiran quan el HTML tingui els botons de resultats
    // Per ara, deixem preparat el codi
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

// Fer públiques les funcions
window.gameState = gameState;
window.changeScreen = changeScreen;
window.selectCategory = selectCategory;
window.resetGame = resetGame;
window.startGame = startGame;
window.endGame = endGame;

// FI DEL FLUX D'INICI

console.log('game-init.js carregat correctament');