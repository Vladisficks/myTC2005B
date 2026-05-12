import { GAME_HEIGHT, GAME_WIDTH } from "../Utils/Constants.js";
import Vector from "../Utils/Vector.js";
import LevelManager from "./LevelManager.js";
import LifeManager from "./LifeManager.js";

export default class GameStateManager {
    constructor(player, ball, levelManager, lifeManager) {
        this.player = player;
        this.ball = ball;
        this.levelManager = levelManager;
        this.lifeManager = lifeManager;

        this.waitingInput = true;
        this.gameState = "waiting";
    }

    resetGame() {
        this.lifeManager.reset();
        this.levelManager.reset();

        this.resetTurn();
        this.gameState = "waiting";
        this.waitingInput = true;
    }

    resetTurn() {
        this.player.position.x = GAME_WIDTH / 2;
        this.player.velocity = new Vector(0, 0);
        this.ball.position = new Vector(GAME_WIDTH / 2, GAME_HEIGHT / 3);
        this.ball.velocity = new Vector(0, 0);
        this.waitingInput = true;
        this.gameState = "waiting";
    }

    BallOutOfBounds() {
        this.lifeManager.loseLife();

        if (this.lifeManager.isGameOver()) {
            console.log(this.gameState);
            this.gameState = "gameOver";
            return false;
        }

        this.resetTurn();
        return true;
    }

    LevelComplete() {
        if (this.levelManager.isGameWon()) {
            this.gameState = "gameWon";
            return false;
        }

        this.levelManager.nextLevel();
        this.resetTurn();
        return true;
    }

    PlayerInputStart(input) {
        if (this.waitingInput) {
            if (
                input.isKeyDown("A") || input.isKeyDown("D") ||
                input.isKeyDown("ARROWLEFT") || input.isKeyDown("ARROWRIGHT")
            ) {
                this.waitingInput = false;
                this.ball.randomVelocity();
                this.gameState = "playing";
            }
        }
    }

    update(input) {
        if (this.gameState === "waiting") {
            this.PlayerInputStart(input);
        } else if (this.gameState === "playing") {

        } else if (this.gameState === "gameOver" || this.gameState === "gameWon") {
            this.PlayerInputStart(input);
            if (!this.waitingInput) this.resetGame();
        }
    }

    isGameActive() { return this.gameState === "playing"; }
    getGameState() { return this.gameState; }
}