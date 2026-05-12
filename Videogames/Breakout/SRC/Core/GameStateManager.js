import { END_COOLDOWN_TIME, GAME_HEIGHT, GAME_WIDTH } from "../Utils/Constants.js";
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

        this.endCoolDown = 0
        this.END_COOLDOWN_TIME = END_COOLDOWN_TIME;
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

    update(input, deltaTime) {
        if (this.gameState === "waiting") {
            this.PlayerInputStart(input);
        } else if (this.gameState === "playing") {
            // nothing
        } else if (this.gameState === "gameOver" || this.gameState === "gameWon") {

            if (this.endCoolDown > 0) {
                this.endCoolDown -= deltaTime;
                return;
            }

            if (
                input.isKeyJustPressed("A") || input.isKeyJustPressed("D") ||
                input.isKeyJustPressed("ARROWLEFT") || input.isKeyJustPressed("ARROWRIGHT")
            ) {
                this.resetGame();
            }
        }
    }

    BallOutOfBounds() {
        this.lifeManager.loseLife();

        if (this.lifeManager.isGameOver()) {
            this.gameState = "gameOver";
            this.endCoolDown = this.END_COOLDOWN_TIME;
            return false;
        }

        this.resetTurn();
        return true;
    }

    LevelComplete() {
        if (this.levelManager.isGameWon()) {
            this.gameState = "gameWon";
            this.endCoolDown = this.END_COOLDOWN_TIME;
            return false;
        }

        this.levelManager.nextLevel();
        this.resetTurn();
        return true;
    }

    isGameActive() { return this.gameState === "playing"; }
    getGameState() { return this.gameState; }
}