# Breakout

A small **Breakout** built with JavaScript and HTML5 Canvas, for the Videogames module of the TC2006B course.

The base of the project is Pong game we built in class, extended with levels, blocks, lives, and an extra twist: **Evil Ball**

---

## Objective

Destroy **all the blocks** on the screen using the ball  
Each time you clear a level, a new one starts with **extra row** of blocks and a **faster ball**. Clear all 3 levels to with the game

Remember don't toch the **Evil Ball**

---

## Controls

| Action        | Keys                                      |
| ------------- | ----------------------------------------- |
| Move paddle ← | `A` or `←` (Arrow Left)                   |
| Move paddle → | `D` or `→` (Arrow Right)                  |
| Start round   | Any movement key                          |
| Restart game  | Any movement key (on Game Over / Victory) |

---

## Rules

- You start with **3 lives**
- If the ball **falls below the bottom**, you **lose a life**
- If you touch the **evil ball**, you lose a life
- **Hit all the blocks** to past the next level
- **Game Over** when lives reach 0
- **Victory** when level 3 is cleared

### Extra mechanic - The Evil Ball

A few seconds after the round starts, a **red ball** spawns in th middle of the screen.

The Evil Ball makes you watch two balls at the same time, so positioning the paddle becomes a real decision istead of the just chasing the white ball

---

## How to Run

This project uses **ES Modules** (`<script type="module">`), so you can't open
`Index.html` directly with a double-click on most browsers. You need a local
static server.

### Option A — VS Code + Live Server (recommended)

1. Open the `Breakout/` folder in **Visual Studio Code**
2. Install the extension **Live Server**
3. Right-click on `index.html` → **Open with Live Server**
4. The game opens in your default browser

### Option B — Any static server

From inside the `Breakout/` folder:

```bash
# Python 3
python -m http.server 5500

# Node.js
npx serve .
```

Then open `http://localhost:5500/index.html` in your browser.