// =============================================
// UI.JS - Navegació entre pantalles i elements DOM
// =============================================

import { gameState } from './state.js';
import { initCategories } from './questions.js';

// Elements DOM
export const dom = {
    pantallaBenvinguda: document.getElementById('pantallaBenvinguda'),
    pantallaCategories: document.getElementById('pantallaCategories'),
    pantallaJoc:        document.getElementById('pantallaJoc'),
    pantallaResultats:  document.getElementById('pantallaResultats'),

    inputNom:           document.getElementById('inputNom'),
    botoComençar:       document.getElementById('botoComençar'),
    errorNom:           document.getElementById('errorNom'),

    nomJugador:         document.getElementById('nomJugador'),
    botoCategories:     document.querySelectorAll('.boto--categoria'),

    jocCategoria:       document.getElementById('jocCategoria'),
    timerNumero:        document.getElementById('timerNumero'),
    barraProgresInner:  document.getElementById('barraProgresInner'),
    progresText:        document.getElementById('progresText'),
    textPregunta:       document.getElementById('textPregunta'),
    gridOpcions:        document.getElementById('gridOpcions'),
    feedback:           document.getElementById('feedback'),
    feedbackText:       document.getElementById('feedbackText'),
    botoSeguent:        document.getElementById('botoSeguent'),
};

// Navegació entre pantalles
export function mostrarPantalla(nomPantalla) {
    document.querySelectorAll('.pantalla').forEach(p => {
        p.classList.remove('activa');
        p.classList.add('amagada');
    });
    
    const pantalla = document.getElementById(`pantalla${nomPantalla}`);
    if (pantalla) {
        pantalla.classList.remove('amagada');
        pantalla.classList.add('activa');
        gameState.currentScreen = nomPantalla;
    }
}

// Validació del nom
export function validarNom(nom) {
    const trimmed = nom.trim();
    if (trimmed.length === 0) return { valid: false, msg: '⚠️ Escriu el teu nom' };
    if (trimmed.length < 2)   return { valid: false, msg: '⚠️ El nom ha de tenir almenys 2 caràcters' };
    if (trimmed.length > 20)  return { valid: false, msg: '⚠️ El nom pot tenir com a màxim 20 caràcters' };
    if (!/^[a-zA-Z0-9\s\-àáäâèéëêìíïîòóöôùúûüñçÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÛÜÑÇ]+$/.test(trimmed)) {
        return { valid: false, msg: '⚠️ Només lletres, números i guions' };
    }
    return { valid: true, msg: '' };
}

// Inicialitzar pantalla de benvinguda
export function initBenvinguda() {
    dom.inputNom.value = '';
    dom.errorNom.classList.add('amagat');
    dom.inputNom.focus();
}

// Configurar event listeners de la UI
export function setupEventListeners() {
    // Botó començar
    dom.botoComençar.addEventListener('click', () => {
        const validacio = validarNom(dom.inputNom.value);
        if (!validacio.valid) {
            dom.errorNom.textContent = validacio.msg;
            dom.errorNom.classList.remove('amagat');
            dom.inputNom.classList.add('error');
            return;
        }
        dom.errorNom.classList.add('amagat');
        dom.inputNom.classList.remove('error');
        gameState.player.name = dom.inputNom.value.trim();
        mostrarPantalla('Categories');
        initCategories();
    });

    // Enter a l'input
    dom.inputNom.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') dom.botoComençar.click();
    });

    // Netejar error en escriure
    dom.inputNom.addEventListener('input', () => {
        dom.errorNom.classList.add('amagat');
        dom.inputNom.classList.remove('error');
    });
}