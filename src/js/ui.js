// =============================================
// UI.JS - Navegació entre pantalles i elements DOM
// =============================================

import { gameState } from './state.js';
import { initCategories } from './questions.js';

export let dom = {};

export function initDom() {
    dom.pantallaBenvinguda = document.getElementById('pantallaBenvinguda');
    dom.pantallaCategories = document.getElementById('pantallaCategories');
    dom.pantallaJoc = document.getElementById('pantallaJoc');
    dom.pantallaResultats = document.getElementById('pantallaResultats');
    dom.inputNom = document.getElementById('inputNom');
    dom.botoComençar = document.getElementById('botoComençar');
    dom.errorNom = document.getElementById('errorNom');
    dom.nomJugador = document.getElementById('nomJugador');
    dom.botoCategories = document.querySelectorAll('.boto--categoria');
    dom.jocCategoria = document.getElementById('jocCategoria');
    dom.timerNumero = document.getElementById('timerNumero');
    dom.barraProgresInner = document.getElementById('barraProgresInner');
    dom.progresText = document.getElementById('progresText');
    dom.textPregunta = document.getElementById('textPregunta');
    dom.gridOpcions = document.getElementById('gridOpcions');
    dom.feedback = document.getElementById('feedback');
    dom.feedbackText = document.getElementById('feedbackText');
    dom.botoSeguent = document.getElementById('botoSeguent');
}

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

export function validarNom(nom) {
    const trimmed = nom.trim();
    if (trimmed.length === 0) return { valid: false, msg: '⚠️ Escriu el teu nom' };
    if (trimmed.length < 2) return { valid: false, msg: '⚠️ El nom ha de tenir almenys 2 caràcters' };
    if (trimmed.length > 20) return { valid: false, msg: '⚠️ El nom pot tenir com a màxim 20 caràcters' };
    return { valid: true, msg: '' };
}

export function initBenvinguda() {
    if (dom.inputNom) {
        dom.inputNom.value = '';
        dom.inputNom.focus();
    }
    if (dom.errorNom) dom.errorNom.classList.add('amagat');
}

export function setupEventListeners() {
    console.log('Configurant event listeners...');
    
    if (dom.botoComençar) {
        dom.botoComençar.addEventListener('click', () => {
            console.log('Botó començar clicat');
            const validacio = validarNom(dom.inputNom.value);
            if (!validacio.valid) {
                if (dom.errorNom) {
                    dom.errorNom.textContent = validacio.msg;
                    dom.errorNom.classList.remove('amagat');
                }
                if (dom.inputNom) dom.inputNom.classList.add('error');
                return;
            }
            if (dom.errorNom) dom.errorNom.classList.add('amagat');
            if (dom.inputNom) dom.inputNom.classList.remove('error');
            gameState.player.name = dom.inputNom.value.trim();
            console.log('Nom del jugador:', gameState.player.name);
            mostrarPantalla('Categories');
            initCategories();
        });
    } else {
        console.error('No s\'ha trobat el botó començar!');
    }
    
    if (dom.inputNom) {
        dom.inputNom.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && dom.botoComençar) dom.botoComençar.click();
        });
        
        dom.inputNom.addEventListener('input', () => {
            if (dom.errorNom) dom.errorNom.classList.add('amagat');
            if (dom.inputNom) dom.inputNom.classList.remove('error');
        });
    }
}