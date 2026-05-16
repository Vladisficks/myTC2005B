import Block from "../Entities/Block.js";
import Vector from "../Utils/Vector.js";

export default class LevelManager {
    constructor(levelConfigs, blockConfig, gameWidth) {
        this.levelConfigs = levelConfigs;
        this.blockConfig = blockConfig;
        this.gameWidth = gameWidth;

        this.currentLevel = 1;
        this.blocks = [];
    }

    initialize() { this.generateLevel(this.currentLevel); }

    generateLevel(levelNumber) {
        const config = this.levelConfigs[levelNumber - 1];
        const { COLS, HEIGHT, SIDE_PADDING, TOP_PADDING, GAP } = this.blockConfig;

        const blockWidth = (this.gameWidth - SIDE_PADDING * 2 - GAP * (COLS - 1)) / COLS;

        this.blocks.length = 0;

        for (let row = 0; row < config.rows; row++) {
            for (let col = 0; col < COLS; col++) {
                const x = SIDE_PADDING + blockWidth / 2 + col * (blockWidth + GAP);
                const y = TOP_PADDING + HEIGHT / 2 + row * (HEIGHT + GAP);
                const color = config.colors[row % config.colors.length];

                this.blocks.push(new Block(new Vector(x, y), blockWidth, HEIGHT, color));
            }
        }
    }

    isLevelComplete() { return this.blocks.every(b => !b.active); }
    isLastLevel() { return this.currentLevel >= this.levelConfigs.length; }
    getCurrentLevel() { return this.currentLevel; }
    getDestroyedBlocks() { return this.blocks.filter(b => !b.active).length; }
    getCurrentBallSpeed() { return this.levelConfigs[this.currentLevel - 1].ballSpeed; }
    getCurrentEvilBallSpeed() { return this.levelConfigs[this.currentLevel - 1].evilBallSpeed; }

    nextLevel() {
        this.currentLevel++;
        this.generateLevel(this.currentLevel);
    }

    reset() {
        this.currentLevel = 1;
        this.generateLevel(this.currentLevel);
    }
}