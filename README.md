# 🎮 Joc de Preguntes

## Descripció

Joc de preguntes interactive amb sistema de puntuació, timer per pregunta i categories seleccionables.
Implementat en HTML5, CSS3 i JavaScript vanilla (sense frameworks).

**Projecte:** CFGS DAM - M010 UF1 Projecte Web & GitHub  
**Data:** Abril 2026  
**Equip:** Anastasia, Hugo C., Paula

---

## 📋 Requisits del Joc

### Features
- ✅ Pantalla d'inici amb entrada de nom
- ✅ Selecció de categoria (Historia / Esport)
- ✅ Preguntes amb 4 opcions de resposta
- ✅ Feedback visual (correcta/incorrecta)
- ✅ Sistema de puntuació (10 punts per pregunta correcta)
- ✅ Timer de compte enrere (30 segons per pregunta)
- ✅ Indicador de progrés (X de N preguntes)
- ✅ Pantalla de resultats amb estadístiques
- ✅ Opció de tornar a jugar
- ✅ Design responsiu (mobile + desktop)

### Categories
1. **Historia** 📜 - Preguntes sobre historia universal i de Catalunya
2. **Esport** ⚽ - Preguntes sobre esports diversos

---

## 🎯 Flux del Joc

```
1. Pantalla d'inici
   ↓
2. Entrada de nom del jugador
   ↓
3. Selecció de categoria
   ↓
4. Joc de preguntes (amb timer)
   ↓
5. Pantalla de resultats
   ↓
6. Opció de tornar a jugar o sortir
```

---

## 📁 Estructura del Projecte

```
joc-preguntes/
├── index.html           # HTML semàntic de les 3 pantalles
├── style.css            # CSS responsiu amb variables
├── script.js            # JavaScript amb lógica del joc
├── data/
│   └── questions.json   # Preguntes en format JSON
├── img/                 # (futur) imatges i icones
├── docs/
│   ├── mockup.html      # Mockup visual interactiu
│   └── wireframes/      # (futur) wireframes del projecte
├── README.md            # Aquesta documentació
├── .gitignore           # Fitxers a ignorar en Git
└── .git/                # Repositori Git
```

---

## 🚀 Com Jugar

1. **Entra el teu nom** a la pantalla inicial
2. **Selecciona una categoria** (Historia o Esport)
3. **Respon cada pregunta** dins del temps límit (30 segons)
4. **Veu el feedback** si encertes o no
5. **Passa a la següent pregunta** amb el botó
6. **Veu els resultats finals** amb la puntuació total

---

## 👥 Distribució de Rols i Responsabilitats

### Paula - UI/Design & HTML/CSS
- Wireframes del projecte ✅
- Estructura HTML semàntica ✅
- CSS responsiu i modern ✅
- Estil visual (colors, tipografia, animacions)
- Testing responsive

### Hugo - Backend & Lógica JavaScript
- Estructura questions.json ✅
- Lógica de categories
- Lógica de puntuació
- Sistema de timer
- Funcions de validació

### Anastasia - Frontend & Integració
- Event listeners principals ✅
- Navegació entre pantalles
- Integració HTML + CSS + JS
- Dinàmica de entrada de nom
- Dinàmica de selecció de categoria

---

## 💻 Com Desenvolupar Localment

### Requisits
- Un navegador web (Chrome, Firefox, Safari, Edge)
- Git instalat
- VSCode o editor de text

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

3. Obre `index.html` en el navegador:
   - Opció 1: Doble clic al fitxer `index.html`
   - Opció 2: Usa Live Server extension (clic dret > Open with Live Server)

### Git Workflow
```bash
# Crea la teva branca de feature
git checkout -b feature/nom-funcionalitat

# Fes els canvis i comprova-los localment

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

### Tipos de Commits
```
[FEATURE] - Nova funcionalitat
[BUGFIX]  - Correcció de bugs
[REFACTOR] - Millora de codi existente
[DOCS]    - Documentació
[STYLE]   - Canvis d'estil CSS
```

### Exemplo
```
[FEATURE] Afegir timer de pregunta
[BUGFIX] Corregir validació de nom
[STYLE] Ajustar padding de botones
```

---

## 📊 Deadlines del Projecte

| Data | Entrega | Estat |
|------|---------|-------|
| 13 abr | 1ª Entrega | ✅ Base estructura |
| 20 abr | 2ª Entrega | 🔄 Funcionalitat completa |
| 27 abr | 3ª Entrega | ⏳ Poliment |
| 30 abr | Final | ⏳ Entrega definitiva |

---

## 📝 Notes d'Implementació

### HTML
- Estructura semàntica amb `<section>` per cada pantalla
- IDs úniques per a cada element funcional
- Classes per estil reutilitzable
- Accessible (labels, alt text, etc.)

### CSS
- Variables CSS per colors i espaçament
- Mobile-first responsive design
- Transicions suaus (0.3s ease)
- Gradient de colors (6366f1 a 764ba2)

### JavaScript
- OOP amb objecte `estadoJuego` per estat
- Funcions modulars (una per responsabilitat)
- Comments explicatius
- Console.log per debugging

### questions.json
- Estructura clara amb categories
- Cada pregunta té id, pregunta, opcions, correcta, explicacio
- Fàcil d'expandir amb més preguntes

---

## 🎨 Paleta de Colors

- **Primary:** `#6366f1` (Indigo modern)
- **Secondary:** `#ec4899` (Pink accent)
- **Success:** `#10b981` (Green)
- **Danger:** `#ef4444` (Red)
- **Dark:** `#1f2937` (Dark gray)
- **Light:** `#f9fafb` (Light gray)

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
- [CSS-Tricks](https://css-tricks.com/)
- [GitHub Guides](https://guides.github.com/)

---

## 📞 Contacte

- **Anastasia:** Frontend & Integració
- **Hugo:** Backend & Lógica
- **Paula:** UI/Design & HTML/CSS

---

**Última actualització:** 13 d'abril de 2026  
**Status:** 🟡 En desenvolupament (Primera entrega)