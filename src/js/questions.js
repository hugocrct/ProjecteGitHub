// =============================================
// QUESTIONS.JS - Càrrega i gestió de preguntes
// =============================================

import { gameState, QUESTIONS_PER_GAME } from './state.js';
import { dom, mostrarPantalla } from './ui.js';
import { iniciarJoc } from './game.js';

// Carregar preguntes del fitxer JSON
export async function carregarPreguntes() {
    try {
        const response = await fetch('preguntes/questions.json');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        
        // Afegir icones per defecte si no en tenen
        const icones = { 
            historia: '📜', 
            esport: '⚽', 
            ciencia: '🔬', 
            pelicules_i_series: '🎬' 
        };
        
        Object.entries(data.categories).forEach(([key, cat]) => {
            if (!cat.icon) cat.icon = icones[key] || '❓';
        });
        
        gameState.categories = data.categories;
        return true;
    } catch (err) {
        console.error('Error carregant preguntes:', err);
        return false;
    }
}

// Inicialitzar pantalla de categories
export function initCategories() {
    dom.nomJugador.textContent = gameState.player.name;
    const categoryKeys = Object.keys(gameState.categories);
    
    dom.botoCategories.forEach((boto, i) => {
        const key = categoryKeys[i];
        if (!key) {
            boto.style.display = 'none';
            return;
        }
        
        boto.style.display = 'flex';
        const cat = gameState.categories[key];
        
        const iconElement = boto.querySelector('.categoriaIcon');
        const nomElement = boto.querySelector('.categoriaNom');
        const descElement = boto.querySelector('.categoriaDesc');
        
        if (iconElement) iconElement.textContent = cat.icon || '❓';
        if (nomElement) nomElement.textContent = cat.name;
        
        const total = cat.questions.length;
        if (descElement) descElement.textContent = `${Math.min(QUESTIONS_PER_GAME, total)} preguntes`;
        
        boto.onclick = () => seleccionarCategoria(key);
    });
}

// Seleccionar categoria i preparar el joc
export function seleccionarCategoria(key) {
    const cat = gameState.categories[key];
    if (!cat) return;
    
    gameState.currentCategory = key;
    
    // Barreja les preguntes i limita a QUESTIONS_PER_GAME
    const shuffled = [...cat.questions].sort(() => Math.random() - 0.5);
    gameState.questions = shuffled.slice(0, QUESTIONS_PER_GAME);
    gameState.stats.totalQuestions = gameState.questions.length;
    
    iniciarJoc();
}

// Mostrar la pregunta actual
export function mostrarPregunta() {
    const q = gameState.questions[gameState.currentQuestion];
    if (!q) { 
        acabarJoc(); 
        return; 
    }
    
    gameState.answered = false;
    
    // Amagar feedback
    dom.feedback.classList.add('amagat');
    dom.feedback.classList.remove('feedback--error');
    
    // Actualitzar progrés
    const idx = gameState.currentQuestion;
    const total = gameState.stats.totalQuestions;
    const progres = (idx / total) * 100;
    dom.barraProgresInner.style.width = `${progres}%`;
    dom.progresText.textContent = `Pregunta ${idx + 1} de ${total}`;
    
    // Mostrar pregunta
    dom.textPregunta.textContent = q.pregunta;
    
    // Mostrar opcions
    const botons = dom.gridOpcions.querySelectorAll('.boto--opcio');
    botons.forEach((btn, i) => {
        btn.textContent = q.opcions[i] ?? '';
        btn.className = 'boto boto--opcio';
        btn.disabled = false;
    });
}

// Import dinàmic per evitar dependència circular
async function acabarJoc() {
    const { acabarJoc: finalitzarJoc } = await import('./results.js');
    finalitzarJoc();
}