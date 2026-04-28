// =============================================
// GAME.JS - Lògica del joc, timer i respostes
// =============================================

import { gameState, TIMER_SECONDS, POINTS_PER_QUESTION } from './state.js';
import { dom } from './ui.js';
import { mostrarPregunta } from './questions.js';

// Iniciar el joc
export function iniciarJoc() {
    gameState.currentQuestion = 0;
    gameState.player.score = 0;
    gameState.stats.correctAnswers = 0;
    gameState.stats.wrongAnswers = 0;
    gameState.stats.timeouts = 0;
    
    const cat = gameState.categories[gameState.currentCategory];
    if (dom.jocCategoria) dom.jocCategoria.textContent = cat.name;
    
    // Amagar feedback i netejar estils
    if (dom.feedback) dom.feedback.classList.add('amagat');
    
    // Mostrar pantalla de joc
    const pantallaJoc = document.getElementById('pantallaJoc');
    document.querySelectorAll('.pantalla').forEach(p => {
        p.classList.remove('activa');
        p.classList.add('amagada');
    });
    pantallaJoc.classList.remove('amagada');
    pantallaJoc.classList.add('activa');
    
    mostrarPregunta();
    iniciarTimer();
}

// Iniciar el timer
export function iniciarTimer() {
    aturarTimer();
    gameState.timeLeft = TIMER_SECONDS;
    actualitzarTimer();
    
    gameState.timer = setInterval(() => {
        gameState.timeLeft--;
        actualitzarTimer();
        
        if (gameState.timeLeft <= 0) {
            aturarTimer();
            if (!gameState.answered) tempsEsgotat();
        }
    }, 1000);
}

// Aturar el timer
export function aturarTimer() {
    if (gameState.timer) {
        clearInterval(gameState.timer);
        gameState.timer = null;
    }
}

// Actualitzar visual del timer
function actualitzarTimer() {
    if (dom.timerNumero) dom.timerNumero.textContent = gameState.timeLeft;
    const timerEl = dom.timerNumero?.closest('.timer');
    if (timerEl) {
        if (gameState.timeLeft <= 10) {
            timerEl.classList.add('timer--urgent');
        } else {
            timerEl.classList.remove('timer--urgent');
        }
    }
}

// Processar resposta de l'usuari
export function responder(indexResposta) {
    console.log('Resposta rebuda:', indexResposta);
    
    if (gameState.answered) return;
    gameState.answered = true;
    aturarTimer();
    
    const q = gameState.questions[gameState.currentQuestion];
    if (!q) {
        console.error('No hi ha pregunta actual!');
        return;
    }
    
    const correcta = q.correcta;
    const botons = dom.gridOpcions.querySelectorAll('.boto--opcio');
    
    botons.forEach((btn, i) => {
        btn.disabled = true;
        if (i === correcta) btn.classList.add('correcta');
        if (i === indexResposta && i !== correcta) btn.classList.add('incorrecta');
    });
    
    if (indexResposta === correcta) {
        gameState.player.score += POINTS_PER_QUESTION;
        gameState.stats.correctAnswers++;
        mostrarFeedback(true, q.explicacio);
    } else {
        gameState.stats.wrongAnswers++;
        mostrarFeedback(false, q.explicacio);
    }
}

// Gestionar temps esgotat
export function tempsEsgotat() {
    if (gameState.answered) return;
    gameState.answered = true;
    gameState.stats.timeouts++;
    gameState.stats.wrongAnswers++;
    
    const q = gameState.questions[gameState.currentQuestion];
    const botons = dom.gridOpcions.querySelectorAll('.boto--opcio');
    botons.forEach((btn, i) => {
        btn.disabled = true;
        if (i === q.correcta) btn.classList.add('correcta');
    });
    
    mostrarFeedback(false, `⏱️ Temps esgotat! ${q.explicacio}`);
}

// Mostrar feedback al jugador
function mostrarFeedback(correcte, explicacio) {
    dom.feedback.classList.remove('amagat', 'feedback--error');
    if (!correcte) dom.feedback.classList.add('feedback--error');
    
    const prefix = correcte ? '✅ Correcte! ' : '❌ Incorrecte. ';
    dom.feedbackText.textContent = prefix + explicacio;
    
    const isLast = gameState.currentQuestion >= gameState.stats.totalQuestions - 1;
    dom.botoSeguent.textContent = isLast ? 'Veure resultats →' : 'Següent →';
}

// Configurar event listener del botó següent
export function setupGameEvents() {
    if (dom.botoSeguent) {
        dom.botoSeguent.addEventListener('click', async () => {
            gameState.currentQuestion++;
            if (gameState.currentQuestion >= gameState.stats.totalQuestions) {
                const { acabarJoc } = await import('./results.js');
                acabarJoc();
            } else {
                mostrarPregunta();
                iniciarTimer();
            }
        });
    }
}