# 🎮 Joc de Preguntes

## Descripció

Joc de preguntes interactiu amb sistema de puntuació, timer per pregunta i categories seleccionables.
Implementat en HTML5, CSS3 i JavaScript modular (Vanilla JS, sense frameworks).

**Projecte:** CFGS DAM - M010 UF1 Projecte Web & GitHub  
**Data:** Abril 2026  
**Equip:** Anastasia, Hugo C., Paula

---

## 📋 Requisits del Joc

### Features Implementades
- ✅ Pantalla d'inici amb entrada de nom
- ✅ Selecció de categoria (4 categories disponibles)
- ✅ Preguntes amb 4 opcions de resposta
- ✅ Feedback visual (correcta/incorrecta)
- ✅ Sistema de puntuació (10 punts per pregunta correcta)
- ✅ Timer de compte enrere (30 segons per pregunta)
- ✅ Indicador de progrés (X de N preguntes)
- ✅ Pantalla de resultats amb estadístiques
- ✅ Opció de tornar a jugar / canviar categoria
- ✅ Design responsiu (mobile + desktop)
- ✅ Codi JavaScript modular (6 fitxers separats)

### Categories
1. **Pel·lícules i Sèries** 🎬 - Preguntes sobre cinema i televisió (33 preguntes)
2. **Esport** ⚽ - Preguntes sobre esports diversos (33 preguntes)
3. **Història** 📜 - Preguntes sobre història universal i de Catalunya (33 preguntes)
4. **Ciència** 🔬 - Preguntes sobre biologia, química i astronomia (33 preguntes)

---

## 🎯 Flux del Joc

```
Pantalla d'inici
↓
Entrada de nom del jugador
↓
Selecció de categoria (4 opcions)
↓
Joc de preguntes (10 preguntes aleatòries amb timer de 30s)
↓
Pantalla de resultats (puntuació, estadístiques)
↓
Opció de jugar altra categoria o tornar a l'inici
```

---

## 📁 Estructura del Projecte

```
ProjecteGithub/
├── index.html              # HTML semàntic de les 4 pantalles
├── style.css               # CSS responsiu amb variables
├── preguntes/
│   └── questions.json      # Preguntes en format JSON (4 categories)
├── js/
│   ├── main.js             # Punt d'entrada, inicialització
│   ├── state.js            # Estat global i constants
│   ├── ui.js               # Navegació entre pantalles i DOM
│   ├── game.js             # Lògica del joc (timer, respostes)
│   ├── questions.js        # Càrrega i gestió de preguntes
│   └── results.js          # Pantalla de resultats
└── docs/
    ├── README.md           # Aquesta documentació
    ├── .gitattributes      # Atributs en Git
    └── .gitignore          # Fitxers a ignorar en Git

```

---

## 🚀 Com Jugar

1. **Entra el teu nom** a la pantalla inicial
2. **Selecciona una categoria** (Pel·lícules, Esport, Història o Ciència)
3. **Respon cada pregunta** dins del temps límit (30 segons)
4. **Veu el feedback** si encertes o no
5. **Passa a la següent pregunta** amb el botó
6. **Veu els resultats finals** amb la puntuació total i percentatge d'encert

---

## 👥 Distribució de Rols i Responsabilitats

### Paula - UI/Design & HTML/CSS
- Wireframes del projecte ✅
- Estructura HTML semàntica ✅
- CSS responsiu i modern ✅
- Estil visual (colors, tipografia, animacions) ✅
- Testing responsive

### Hugo - Backend & Lògica JavaScript
- Estructura questions.json ✅
- Lògica de categories ✅
- Lògica de puntuació ✅
- Sistema de timer ✅
- Funcions de validació ✅
- Modularització del codi JS ✅

### Anastasia - Frontend & Integració
- Event listeners principals ✅
- Navegació entre pantalles ✅
- Integració HTML + CSS + JS ✅
- Dinàmica d'entrada de nom ✅
- Dinàmica de selecció de categoria ✅

---

## 💻 Com Desenvolupar Localment

### Requisits
- Un navegador web (Chrome, Firefox, Safari, Edge)
- Git instalat
- VSCode o editor de text
- Servidor local (Live Server de VSCode) - Necessari per ES Modules

### Setup

1. Clona el repositori:
   ```bash
   git clone https://github.com/[username]/joc-preguntes.git
   cd joc-preguntes
   ```

2. Obri el projecte en VSCode:
   ```bash
   code .
   ```

3. Obre `index.html` amb Live Server:
   - Clic dret a `index.html` > "Open with Live Server"
   - O alternativament: Instala l'extensió "Live Server" i fes clic a "Go Live"

### Git Workflow

```bash
# Crea la teva branca de feature
git checkout -b feature/nom-funcionalitat

# Fes els canvis i comprova'ls localment

# Fes commit dels canvis
git add .
git commit -m "[FEATURE] descripció clara en 50 caràcters"

# Puja la branca
git push -u origin feature/nom-funcionalitat

# Crea un Pull Request a GitHub
# Espera la revisió i merge a develop
```

---

## 🔄 Convencions de Git

### Tipus de Commits

```
[FEATURE] - Nova funcionalitat
[BUGFIX]  - Correcció de bugs
[REFACTOR] - Millora de codi existent
[DOCS]    - Documentació
[STYLE]   - Canvis d'estil CSS
```

### Exemple

```
[FEATURE] Afegir timer de pregunta
[BUGFIX] Corregir validació de nom
[STYLE] Ajustar padding de botons
```

---

## 📊 Deadlines del Projecte

| Data   | Entrega          | Estat                         |
|--------|------------------|-------------------------------|
| 13 abr | 1ª Entrega       | ✅ Base estructura             |
| 20 abr | 2ª Entrega       | ✅ Funcionalitat completa      |
| 27 abr | 3ª Entrega       | 🔄 Modularització i poliment  |
| 30 abr | Final            | ⏳ Entrega definitiva          |

---

## 📝 Notes d'Implementació

### HTML
- Estructura semàntica amb `<section>` per cada pantalla
- IDs úniques per a cada element funcional
- Classes per estil reutilitzable
- Accessible (labels, alt text, etc.)

### CSS
- Variables CSS per colors i espaiament
- Mobile-first responsive design
- Transicions suaus (0.3s ease)
- Gradient de colors (`6366f1` a `764ba2`)

### JavaScript (Modular)
6 fitxers separats per responsabilitat:

| Fitxer | Funció | Exporta |
|--------|--------|---------|
| `state.js` | Estat global i constants | `gameState`, `constants` |
| `ui.js` | DOM, navegació, validació | `dom`, `mostrarPantalla`, `validarNom`, `initBenvinguda`, `setupEventListeners` |
| `questions.js` | Carregar preguntes, selecció categoria | `carregarPreguntes`, `initCategories`, `mostrarPregunta` |
| `game.js` | Timer, respostes, feedback | `iniciarJoc`, `responder`, `tempsEsgotat`, `aturarTimer`, `setupGameEvents` |
| `results.js` | Resultats finals | `acabarJoc`, `renderResultats` |
| `main.js` | Inicialització | - |

- Import/Export amb ES Modules
- Funcions modulars (una per responsabilitat)

### questions.json
4 categories completes:
- Pel·lícules i Sèries: 33 preguntes
- Esport: 33 preguntes
- Història: 12 preguntes
- Ciència: 8 preguntes

Cada pregunta té: `id`, `pregunta`, `opcions`, `correcta`, `explicacio`

Fàcil d'expandir amb més preguntes.

---

## 🎨 Paleta de Colors

| Nom | Hex | Ús |
|-----|-----|----|
| Primary | `#6366f1` | Indigo modern |
| Secondary | `#ec4899` | Pink accent |
| Success | `#10b981` | Green |
| Danger | `#ef4444` | Red |
| Dark | `#1f2937` | Dark gray |
| Light | `#f9fafb` | Light gray |

---

## 🌐 Navegadors Suportats

- ✅ Chrome/Chromium (v90+)
- ✅ Firefox (v88+)
- ✅ Safari (v14+)
- ✅ Edge (v90+)

---

## 🔗 Links Útils

- [Documentació de Git](https://git-scm.com/doc)
- [MDN JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [CSS-Tricks](https://css-tricks.com)
- [GitHub Guides](https://guides.github.com)

---

## 📞 Contacte

- **Anastasia** - Frontend & Integració
- **Hugo** - Backend & Lògica
- **Paula** - UI/Design & HTML/CSS

---

*Última actualització: 23 d'abril de 2026*  
*Status: 🟢 En desenvolupament (Modularització completada)*