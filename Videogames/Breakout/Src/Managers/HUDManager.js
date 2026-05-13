export default class HUDManager {
    constructor(levelManager, lifeManager, stateManager, scoreManager, displayConfig, gameWidth, gameHeight) {
        this.levelManager = levelManager;
        this.lifeManager = lifeManager;
        this.stateManager = stateManager;
        this.scoreManager = scoreManager;
        this.displayConfig = displayConfig;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
    }

    draw(renderer) {
        const state = this.stateManager.getGameState();

        this.#drawHUD(renderer);

        if (state === "gameOver") this.#drawGameOver(renderer);
        if (state === "gameWon") this.#drawVictory(renderer);
    }

    #drawHUD(renderer) {
        const { HUD_Y, FONT_MAIN, COLOR_PRIMARY } = this.displayConfig;
        const w = this.gameWidth;

        renderer.drawText(w / 2, HUD_Y, `Blocks: ${this.scoreManager.getTotal()}`, { font: FONT_MAIN, color: COLOR_PRIMARY, align: "center" });
        renderer.drawText(w / 12, HUD_Y, `Level: ${this.levelManager.getCurrentLevel()}`, { font: FONT_MAIN, color: COLOR_PRIMARY, align: "left" });
        renderer.drawText(w * (9 / 12), HUD_Y, `Lives: ${this.lifeManager.getCurrentLives()}`, { font: FONT_MAIN, color: COLOR_PRIMARY, align: "left" });
    }

    #drawGameOver(renderer) {
        const { FONT_TITLE, FONT_SUBTITLE, FONT_SMALL, COLOR_GAMEOVER, COLOR_PRIMARY, COLOR_SECONDARY } = this.displayConfig;
        const cx = this.gameWidth / 2;
        const cy = this.gameHeight / 2;

        renderer.drawText(cx, cy, "GAME OVER", { font: FONT_TITLE, color: COLOR_GAMEOVER, align: "center" });
        renderer.drawText(cx, cy + 130, "Move to try again", { font: FONT_SUBTITLE, color: COLOR_PRIMARY, align: "center" });
        renderer.drawText(cx, cy + 220, `Blocks Destroyed: ${this.scoreManager.getTotal()}`, { font: FONT_SMALL, color: COLOR_SECONDARY, align: "center" });
    }

    #drawVictory(renderer) {
        const { FONT_TITLE, FONT_SUBTITLE, FONT_SMALL, COLOR_VICTORY, COLOR_PRIMARY, COLOR_SECONDARY } = this.displayConfig;
        const cx = this.gameWidth / 2;
        const cy = this.gameHeight / 2;

        renderer.drawText(cx, cy, "VICTORY", { font: FONT_TITLE, color: COLOR_VICTORY, align: "center" });
        renderer.drawText(cx, cy + 130, "Move to try again", { font: FONT_SUBTITLE, color: COLOR_PRIMARY, align: "center" });
        renderer.drawText(cx, cy + 220, `Blocks Destroyed: ${this.scoreManager.getTotal()}`, { font: FONT_SMALL, color: COLOR_SECONDARY, align: "center" });
    }
}