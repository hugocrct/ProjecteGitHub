// =============================================
// STATE.JS - Estat global i constants del joc
// =============================================

export const gameState = {
    player: { name: '', score: 0 },
    currentScreen: 'benvinguda',
    currentCategory: null,
    currentQuestion: 0,
    timer: null,
    timeLeft: 30,
    answered: false,
    stats: {
        totalQuestions: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        timeouts: 0
    },
    questions: [],
    categories: {}
};

export const POINTS_PER_QUESTION = 10;
export const TIMER_SECONDS = 30;
export const QUESTIONS_PER_GAME = 10;