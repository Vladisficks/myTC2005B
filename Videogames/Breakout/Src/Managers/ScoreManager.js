export default class ScoreManager {
    constructor() {
        this.blocksDestroyed = 0;
    }

    addBlock() { this.blocksDestroyed++; }
    getTotal() { return this.blocksDestroyed; }
    reset() { this.blocksDestroyed = 0; }
}