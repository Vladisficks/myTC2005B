export default class LifeManager {
    constructor(maxLives) {
        this.maxLives = maxLives;
        this.currentLives = maxLives;
    }

    loseLife() { if (this.currentLives > 0) this.currentLives--; }
    isGameOver() { return this.currentLives <= 0; }
    getCurrentLives() { return this.currentLives; }
    reset() { this.currentLives = this.maxLives; }
}