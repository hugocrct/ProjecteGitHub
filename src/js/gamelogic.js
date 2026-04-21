class Temporitzador {
    constructor(segonsInicials, onUpdate, onFinal) {
        this.segonsInicials = segonsInicials;
        this.segonsActuals = segonsInicials;
        this.interval = null;
        this.onUpdate = onUpdate;
        this.onFinal = onFinal;
    }

    iniciar() {
        this.aturar(); // evita múltiples intervals

        this.interval = setInterval(() => {
            this.segonsActuals--;

            if (this.onUpdate) {
                this.onUpdate(this.segonsActuals);
            }

            if (this.segonsActuals <= 0) {
                this.aturar();
                if (this.onFinal) {
                    this.onFinal();
                }
            }
        }, 1000);
    }

    aturar() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    reiniciar() {
        this.aturar();
        this.segonsActuals = this.segonsInicials;
    }

    obtenirTemps() {
        return this.segonsActuals;
    }
}

/* ===========================
   ÚS DEL TEMPORITZADOR
   =========================== */

// Element on es mostrarà el temps
const tempsElement = document.getElementById("temps");

// Instància amb 30 segons
const timer = new Temporitzador(
    30,
    (temps) => {
        if (tempsElement) {
            tempsElement.textContent = "Temps: " + temps + "s";
        }
    },
    () => {
        console.log("Temps esgotat!");
        // Aquí canvies pregunta o acabes el quiz
    }
);

// Iniciar el temporitzador
function iniciarQuiz() {
    timer.reiniciar();
    timer.iniciar();
}

// Exemple de nova pregunta
function novaPregunta() {
    timer.reiniciar();
    timer.iniciar();
}

// Opcional: exposar funcions al global si no uses modules
window.iniciarQuiz = iniciarQuiz;
window.novaPregunta = novaPregunta;