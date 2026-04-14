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

