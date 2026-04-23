// =============================================
// JOC DE PREGUNTES - Lògica completa del joc
// =============================================

// --- ESTAT GLOBAL ---
const gameState = {
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

const POINTS_PER_QUESTION = 10;
const TIMER_SECONDS = 30;
const QUESTIONS_PER_GAME = 10;

// --- ELEMENTS DOM ---
const dom = {
    // Pantalles
    pantallaBenvinguda: document.getElementById('pantallaBenvinguda'),
    pantallaCategories: document.getElementById('pantallaCategories'),
    pantallaJoc:        document.getElementById('pantallaJoc'),
    pantallaResultats:  document.getElementById('pantallaResultats'),

    // Benvinguda
    inputNom:           document.getElementById('inputNom'),
    botoComençar:       document.getElementById('botoComençar'),
    errorNom:           document.getElementById('errorNom'),

    // Categories
    nomJugador:         document.getElementById('nomJugador'),
    botoCategories:     document.querySelectorAll('.boto--categoria'),

    // Joc
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

// --- NAVEGACIÓ ---
function mostrarPantalla(nomPantalla) {
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

// --- VALIDACIÓ NOM ---
function validarNom(nom) {
    const trimmed = nom.trim();
    if (trimmed.length === 0) return { valid: false, msg: '⚠️ Escriu el teu nom' };
    if (trimmed.length < 2)   return { valid: false, msg: '⚠️ El nom ha de tenir almenys 2 caràcters' };
    if (trimmed.length > 20)  return { valid: false, msg: '⚠️ El nom pot tenir com a màxim 20 caràcters' };
    if (!/^[a-zA-Z0-9\s\-àáäâèéëêìíïîòóöôùúûüñçÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÛÜÑÇ]+$/.test(trimmed)) {
        return { valid: false, msg: '⚠️ Només lletres, números i guions' };
    }
    return { valid: true, msg: '' };
}

// --- PANTALLA BENVINGUDA ---
function initBenvinguda() {
    dom.inputNom.value = '';
    dom.errorNom.classList.add('amagat');
    dom.inputNom.focus();
}

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

dom.inputNom.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') dom.botoComençar.click();
});

dom.inputNom.addEventListener('input', () => {
    dom.errorNom.classList.add('amagat');
    dom.inputNom.classList.remove('error');
});

// --- PANTALLA CATEGORIES ---
function initCategories() {
    dom.nomJugador.textContent = gameState.player.name;

    const categoryKeys = Object.keys(gameState.categories);

    dom.botoCategories.forEach((boto, i) => {
        const key = categoryKeys[i];
        if (!key) return;
        const cat = gameState.categories[key];

        boto.querySelector('.categoriaIcon').textContent = cat.icon || '❓';
        boto.querySelector('.categoriaNom').textContent  = cat.name;

        const total = cat.questions.length;
        boto.querySelector('.categoriaDesc').textContent = `${Math.min(QUESTIONS_PER_GAME, total)} preguntes`;

        boto.onclick = () => seleccionarCategoria(key);
    });
}

function seleccionarCategoria(key) {
    const cat = gameState.categories[key];
    if (!cat) return;

    gameState.currentCategory = key;

    // Barreja i limita les preguntes
    const shuffled = [...cat.questions].sort(() => Math.random() - 0.5);
    gameState.questions = shuffled.slice(0, QUESTIONS_PER_GAME);
    gameState.stats.totalQuestions = gameState.questions.length;

    iniciarJoc();
}

// --- JOC ---
function iniciarJoc() {
    gameState.currentQuestion = 0;
    gameState.player.score = 0;
    gameState.stats.correctAnswers = 0;
    gameState.stats.wrongAnswers = 0;
    gameState.stats.timeouts = 0;

    const cat = gameState.categories[gameState.currentCategory];
    dom.jocCategoria.textContent = cat.name;

    mostrarPantalla('Joc');
    mostrarPregunta();
}

function mostrarPregunta() {
    const q = gameState.questions[gameState.currentQuestion];
    if (!q) { acabarJoc(); return; }

    gameState.answered = false;

    // Feedback amagat
    dom.feedback.classList.add('amagat');
    dom.feedback.classList.remove('feedback--error');

    // Progrés
    const idx    = gameState.currentQuestion;
    const total  = gameState.stats.totalQuestions;
    const progres = ((idx) / total) * 100;
    dom.barraProgresInner.style.width = `${progres}%`;
    dom.progresText.textContent = `Pregunta ${idx + 1} de ${total}`;

    // Pregunta
    dom.textPregunta.textContent = q.pregunta;

    // Opcions
    const botons = dom.gridOpcions.querySelectorAll('.boto--opcio');
    botons.forEach((btn, i) => {
        btn.textContent = q.opcions[i] ?? '';
        btn.className = 'boto boto--opcio';
        btn.disabled = false;
        btn.onclick = () => responder(i);
    });

    // Timer
    iniciarTimer();
}

function iniciarTimer() {
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

function actualitzarTimer() {
    dom.timerNumero.textContent = gameState.timeLeft;
    const timerEl = dom.timerNumero.closest('.timer');
    if (gameState.timeLeft <= 10) {
        timerEl.classList.add('timer--urgent');
    } else {
        timerEl.classList.remove('timer--urgent');
    }
}

function aturarTimer() {
    if (gameState.timer) {
        clearInterval(gameState.timer);
        gameState.timer = null;
    }
}

function responder(indexResposta) {
    if (gameState.answered) return;
    gameState.answered = true;
    aturarTimer();

    const q = gameState.questions[gameState.currentQuestion];
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

function tempsEsgotat() {
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

function mostrarFeedback(correcte, explicacio) {
    dom.feedback.classList.remove('amagat', 'feedback--error');
    if (!correcte) dom.feedback.classList.add('feedback--error');

    const prefix = correcte ? '✅ Correcte! ' : '❌ Incorrecte. ';
    dom.feedbackText.textContent = prefix + explicacio;

    const isLast = gameState.currentQuestion >= gameState.stats.totalQuestions - 1;
    dom.botoSeguent.textContent = isLast ? 'Veure resultats →' : 'Següent →';
}

dom.botoSeguent.addEventListener('click', () => {
    gameState.currentQuestion++;
    if (gameState.currentQuestion >= gameState.stats.totalQuestions) {
        acabarJoc();
    } else {
        mostrarPregunta();
    }
});

// --- RESULTATS ---
function acabarJoc() {
    aturarTimer();
    mostrarPantalla('Resultats');
    renderResultats();
}

function renderResultats() {
    const { player, stats } = gameState;
    const percentatge = Math.round((stats.correctAnswers / stats.totalQuestions) * 100);

    let emoji, missatge;
    if (percentatge === 100)     { emoji = '🏆'; missatge = 'Perfect! Increïble!'; }
    else if (percentatge >= 80)  { emoji = '🌟'; missatge = 'Excel·lent!'; }
    else if (percentatge >= 60)  { emoji = '👍'; missatge = 'Bon resultat!'; }
    else if (percentatge >= 40)  { emoji = '📚'; missatge = 'Pots millorar!'; }
    else                         { emoji = '💪'; missatge = 'Segueix practicant!'; }

    const pantallaResultats = dom.pantallaResultats;
    pantallaResultats.innerHTML = `
        <div class="targeta targeta--resultats">
            <span class="icon">${emoji}</span>
            <h2>${missatge}</h2>
            <p class="subTitol">Bona feina, <strong>${player.name}</strong>!</p>

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

// --- CÀRREGA PREGUNTES ---
async function carregarPreguntes() {
    try {
        const response = await fetch('../preguntes/questions.json');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();

        // Afegir icones si no en té
        const icones = { pelicules_i_series: '🎬', esport: '⚽', historia: '📜' };
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

// --- INIT ---
async function init() {
    const ok = await carregarPreguntes();
    if (!ok) {
        document.body.innerHTML = '<div style="color:white;text-align:center;padding:40px"><h2>⚠️ Error carregant les preguntes</h2><p>Comprova que el fitxer data/questions.json existeix.</p></div>';
        return;
    }
    mostrarPantalla('Benvinguda');
    initBenvinguda();
}

document.addEventListener('DOMContentLoaded', init);