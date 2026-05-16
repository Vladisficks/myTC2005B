import Vector from "../Utils/Vector.js";

export default class GameStateManager {
    constructor(player, ball, evilBall, levelManager, lifeManager, gameConfig, gameWidth, gameHeight, onReset = null) {
        this.player = player;
        this.ball = ball;
        this.evilBall = evilBall;
        this.levelManager = levelManager;
        this.lifeManager = lifeManager;

        // A small time before player can restart a game after game over
        this.endCooldownTime = gameConfig.END_COOLDOWN;
        this.endCooldown = 0;

        // Time before Evil Ball spawn in the game
        this.evilBallRespawnTime = gameConfig.EVIL_BALL_RESPAWN;
        this.evilBallTimer = 0;

        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.onReset = onReset;

        this.gameState = "waiting";
    }

    update(wantsAction, deltaTime) {
        // Game is waiting, so we can start
        if (this.gameState === "waiting") {
            if (wantsAction) this.#startRound();
        } else if (this.gameState === "gameOver" || this.gameState === "gameWon") {
            if (this.endCooldown > 0) {
                this.endCooldown -= deltaTime;
                return;
            }
            if (wantsAction) this.resetGame();
        } else {
            if (this.evilBallTimer > 0) {
                this.evilBallTimer -= deltaTime;
                return;
            }
            // Countdown of Evil Ball. Game is playing
            if (!this.evilBall.active) {
                console.log("activa spawnEvilBall");
                this.#spawnEvilBall();
            }
        }
    }

    playerLosesLife() {
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
        this.ball.speed = this.levelManager.getCurrentBallSpeed();
        this.ball.velocity = Vector.zero();

        this.evilBall.active = false;
        this.evilBall.position = new Vector(this.gameWidth / 2, this.gameHeight / 3);
        this.evilBall.velocity = Vector.zero();
        this.evilBallTimer = this.evilBallRespawnTime;

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
        this.ball.speed = this.levelManager.getCurrentBallSpeed();
        this.gameState = "playing";

        this.evilBall.active = false; // Evil Ball desaparece
        this.evilBall.velocity = Vector.zero();
        this.evilBallTimer = this.evilBallRespawnTime; // Evil Ball timer sets in 5s 
    }

    #spawnEvilBall() {
        this.evilBall.active = true;
        this.evilBall.speed = this.levelManager.getCurrentEvilBallSpeed();
        this.evilBall.position = new Vector(this.gameWidth / 2, this.gameHeight / 3);
        this.evilBall.randomVelocity();
    }
}