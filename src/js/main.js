// =============================================
// MAIN.JS - Punt d'entrada de l'aplicació
// =============================================

import { gameState } from './state.js';
import { carregarPreguntes } from './questions.js';
import { mostrarPantalla, initBenvinguda, setupEventListeners } from './ui.js';
import { setupGameEvents } from './game.js';

// Inicialitzar l'aplicació
async function init() {
    const ok = await carregarPreguntes();
    if (!ok) {
        document.body.innerHTML = `
            <div style="color:white;text-align:center;padding:40px">
                <h2>⚠️ Error carregant les preguntes</h2>
                <p>Comprova que el fitxer <strong>preguntes/questions.json</strong> existeix.</p>
            </div>
        `;
        return;
    }
    
    mostrarPantalla('Benvinguda');
    initBenvinguda();
    setupEventListeners();
    setupGameEvents();
}

// Iniciar quan el DOM estigui llest
document.addEventListener('DOMContentLoaded', init);