export default class GameStateManager {
    constructor(player, ball, levelManager, lifeManager) {
        this.player = player;
        this.ball = ball;
        this.levelManager = levelManager;
        this.lifeManager = lifeManager;

        this.waitingInput = true;
        this.gameState = "playing";
    }

    resetTurn() {
        this.player.position.x = GAME_WIDTH / 2;
        this.player.velocity = new Vector(0, 0);

        this.ball.position = new Vector(GAME_WIDTH / 2, GAME_HEIGHT / 3);
        this.ball.velocity = new Vector(0, 0);

        this.waitingInput = true;
    }

    BallOutOfBounds() {
        this.lifeManager.loseLife();

        if (this.lifeManager.isGameOver()) {
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
            }
        }
    }

    update(input) {
        if (this.gameState === "playing") {
            this.PlayerInputStart(input);
        }
    }

    isGameActive() { return this.gameState === "playing"; }
    getGameState() { return this.gameState; }
}