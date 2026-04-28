// =============================================
// MAIN.JS - Punt d'entrada de l'aplicació
// =============================================

import { gameState } from './state.js';
import { carregarPreguntes } from './questions.js';
import { initDom, mostrarPantalla, initBenvinguda, setupEventListeners } from './ui.js';
import { setupGameEvents } from './game.js';

async function init() {
    console.log('Inicialitzant joc...');
    
    initDom();
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
    
    console.log('Joc inicialitzat correctament');
}

document.addEventListener('DOMContentLoaded', init);