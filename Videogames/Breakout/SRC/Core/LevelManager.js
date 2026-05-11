import Block from "../Entities/Block.js";
import { BLOCK_HEIGHT, GAME_WIDTH, MAX_LEVEL } from "../Utils/Constants.js";
import Vector from "../Utils/Vector.js";

export default class LevelManager {
    constructor() {
        this.currentLevel = 1;
        this.blocks = [];
    }

    initialize() { this.generateLevel(this.currentLevel); }

    generateLevel(levelNumber) {
        const row = 2 + levelNumber;
        const col = 6;

        const sidePadding = 150;
        const topPadding = 150;
        const gap = 5;

        const availableWidth = GAME_WIDTH - sidePadding * 2;
        const totalGapWidth = gap * (col - 1);

        const blockWidth = (availableWidth - totalGapWidth) / col;

        const levelBlocks = []
        const colorsBlocks = ["#d80e0e", "#d86602", "#ffdb0c", "#089c28", "#1155e9"]

        for (let i = 0; i < row; i++) {
            for (let j = 0; j < 6; j++) {
                const blockX = sidePadding + blockWidth / 2 + j * (blockWidth + gap);
                const blockY = topPadding + BLOCK_HEIGHT / 2 + i * (BLOCK_HEIGHT + gap);

                levelBlocks.push(
                    new Block(new Vector(blockX, blockY), blockWidth, colorsBlocks[i])
                );
            }
        }
        this.blocks = levelBlocks;
    }

    isLevelComplete() { return this.blocks.every(block => !block.active); }

    nextLevel() {
        if (!this.isGameWon()){
            this.currentLevel++;
            this.generateLevel(this.currentLevel);
        }
    }

    isGameWon() { return this.currentLevel >= MAX_LEVEL; }
}