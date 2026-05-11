export default class LifeManager {
    constructor(lives) {
        this.currentLife = lives;
        this.maxLives = lives;
    }

    loseLife() {
        if (this.currentLife > 0) {
            this.currentLife--;
        }
    }

    isGameOver() { return this.currentLife <= 0; }

    getCurrentLives() { return this.currentLife; }
}