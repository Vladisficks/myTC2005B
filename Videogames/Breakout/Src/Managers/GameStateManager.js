import Vector from "../Utils/Vector.js";

export default class GameStateManager {
    constructor(player, ball, levelManager, lifeManager, gameConfig, gameWidth, gameHeight, onReset = null) {
        this.player = player;
        this.ball = ball;
        this.levelManager = levelManager;
        this.lifeManager = lifeManager;

        this.endCooldownTime = gameConfig.END_COOLDOWN;
        this.endCooldown = 0;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.onReset = onReset;

        this.gameState = "waiting";
    }

    update(wantsAction, deltaTime) {
        if (this.gameState === "waiting") {
            if (wantsAction) this.#startRound();

        } else if (this.gameState === "gameOver" || this.gameState === "gameWon") {
            if (this.endCooldown > 0) {
                this.endCooldown -= deltaTime;
                return;
            }
            if (wantsAction) this.resetGame();
        }
    }

    ballOutOfBounds() {
        this.lifeManager.loseLife();

        if (this.lifeManager.isGameOver()) {
            this.gameState = "gameOver";
            this.endCooldown = this.endCooldownTime;
            return;
        }

        this.resetTurn();
    }

    levelComplete() {
        if (this.levelManager.isLastLevel()) {
            this.gameState = "gameWon";
            this.endCooldown = this.endCooldownTime;
            return;
        }

        this.levelManager.nextLevel();
        this.resetTurn();
    }

    resetTurn() {
        this.player.position = new Vector(this.gameWidth / 2, this.player.position.y);
        this.player.velocity = Vector.zero();

        this.ball.position = new Vector(this.gameWidth / 2, this.gameHeight / 3);
        this.ball.velocity = Vector.zero();

        this.gameState = "waiting";
    }

    resetGame() {
        this.lifeManager.reset();
        this.levelManager.reset();
        if (this.onReset) this.onReset();
        this.resetTurn();
    }

    isGameActive() { return this.gameState === "playing"; }
    getGameState() { return this.gameState; }

    #startRound() {
        this.ball.randomVelocity();
        this.gameState = "playing";
    }
}