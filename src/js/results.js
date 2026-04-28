// =============================================
// RESULTS.JS - Pantalla de resultats
// =============================================

import { gameState } from './state.js';
import { dom, mostrarPantalla, initBenvinguda } from './ui.js';
import { initCategories } from './questions.js';
import { aturarTimer } from './game.js';

// Acabar el joc i mostrar resultats
export function acabarJoc() {
    aturarTimer();
    mostrarPantalla('Resultats');
    renderResultats();
}

// Renderitzar la pantalla de resultats
export function renderResultats() {
    const { player, stats } = gameState;
    const percentatge = Math.round((stats.correctAnswers / stats.totalQuestions) * 100);
    
    let emoji, missatge;
    if (percentatge === 100)     { emoji = '🏆'; missatge = 'Perfecte! Increïble!'; }
    else if (percentatge >= 80)  { emoji = '🌟'; missatge = 'Excel·lent!'; }
    else if (percentatge >= 60)  { emoji = '👍'; missatge = 'Bon resultat!'; }
    else if (percentatge >= 40)  { emoji = '📚'; missatge = 'Pots millorar!'; }
    else                         { emoji = '💪'; missatge = 'Segueix practicant!'; }
    
    const pantallaResultats = dom.pantallaResultats;
    pantallaResultats.innerHTML = `
        <div class="targeta targeta--resultats">
            <span class="icon">${emoji}</span>
            <h2>${missatge}</h2>
            <p class="subTitol">Bona feina, <strong>${escapeHtml(player.name)}</strong>!</p>
            
            <div class="resultats-puntuacio">
                <span class="puntuacio-num">${player.score}</span>
                <span class="puntuacio-label">punts</span>
            </div>
            
            <div class="resultats-stats">
                <div class="stat-item stat--correct">
                    <span class="stat-num">${stats.correctAnswers}</span>
                    <span class="stat-label">Correctes</span>
                </div>
                <div class="stat-item stat--wrong">
                    <span class="stat-num">${stats.wrongAnswers}</span>
                    <span class="stat-label">Incorrectes</span>
                </div>
                <div class="stat-item">
                    <span class="stat-num">${percentatge}%</span>
                    <span class="stat-label">Encert</span>
                </div>
            </div>
            
            <div class="resultats-botons">
                <button class="boto boto--primari" id="btn-tornar-categoria">
                    🔄 Canviar categoria
                </button>
                <button class="boto boto--secundari" id="btn-reset">
                    🏠 Tornar a l'inici
                </button>
            </div>
        </div>
    `;
    
    document.getElementById('btn-tornar-categoria').onclick = () => {
        mostrarPantalla('Categories');
        initCategories();
    };
    
    document.getElementById('btn-reset').onclick = () => {
        mostrarPantalla('Benvinguda');
        initBenvinguda();
    };
}

// Funció de seguretat per evitar XSS
function escapeHtml(str) {
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}