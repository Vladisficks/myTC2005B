import { GAME_HEIGHT, GAME_WIDTH } from "../Utils/Constants.js";

export default class HUDManager {
    constructor(levelManager, lifeManager, gameStateManager) {
        this.levelManager = levelManager;
        this.lifeManager = lifeManager;
        this.gameStateManager = gameStateManager;
        this.blocksDestroyed = 0;
    }

    incrementBlocksDestroyed() {
        this.blocksDestroyed++;
    }

    draw(renderer) {
        const gameState = this.gameStateManager.getGameState();

        if (gameState === "playing" || gameState === "waiting") {
            this.drawGameHUD(renderer);
        } else if (gameState === "gameOver") {
            this.drawGameOver(renderer);
        } else if (gameState === "gameWon") {
            this.drawVictory(renderer);
        }
    }

    drawGameHUD(renderer) {
        renderer.drawText(
            GAME_WIDTH / 2, 100, `Blocks: ${this.blocksDestroyed}`
        );

        renderer.drawText(
            GAME_WIDTH / 12, 100, `Level: ${this.levelManager.getCurrentLevel()}`, { align: "left" }
        );

        renderer.drawText(
            GAME_WIDTH * 9 / 12, 100, `Lifes: ${this.lifeManager.getCurrentLives()}`, { align: "left" }
        );
    }

    drawVictory(renderer) {
        console.log("Victoria")
        this.drawGameHUD(renderer);

        renderer.drawText(
            GAME_WIDTH / 2, GAME_HEIGHT / 2, "`VICTORY`", { font: "120px Arial", color: "#fffb03" }
        );

        renderer.drawText(
            GAME_WIDTH / 2, GAME_HEIGHT / 2 + 100, "Move to try again", { font: "80px Arial", color: "#ffffff" }
        );

        renderer.drawText(
            GAME_WIDTH / 2, GAME_HEIGHT / 2 + 170, `Total Blocks Destroyed: ${this.blocksDestroyed}`, { font: "50px Arial", color: "#cccccc" }
        );
    }

    drawGameOver(renderer) {
        console.log("Game Over")
        this.drawGameHUD(renderer);

        renderer.drawText(
            GAME_WIDTH / 2, GAME_HEIGHT / 2, "GAME OVER", { font: "120px Arial", color: "#ff0000" }
        );

        renderer.drawText(
            GAME_WIDTH / 2, GAME_HEIGHT / 2 + 100, "Move to try again", { font: "80px Arial", color: "#ffffff" }
        );

        renderer.drawText(
            GAME_WIDTH / 2, GAME_HEIGHT / 2 + 170, `Total Blocks Destroyed: ${this.blocksDestroyed}`, { font: "50px Arial", color: "#cccccc" }
        );
    }

    static reset() { this.blocksDestroyed = 0; }
}