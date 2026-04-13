// ============================================
// JOC DE PREGUNTES - FLUX D'INICI DEL JOC
// ============================================

// ============================================
// 1. INICIALITZACIÓ DE L'ESTAT DEL JOC
// ============================================

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