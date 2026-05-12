import Block from "../Entities/Block.js";
import { GAME_WIDTH, MAX_LEVEL } from "../Utils/Constants.js";
import Vector from "../Utils/Vector.js";

// Configuración de niveles externalizad
const LEVEL_CONFIGS = [
    {
        rows: 3,
        blockWidth: null, // Calculado automáticamente
        colors: ["#d80e0e", "#d86602", "#ffdb0c"]
    },
    {
        rows: 4,
        blockWidth: null,
        colors: ["#d80e0e", "#d86602", "#ffdb0c", "#089c28"]
    },
    {
        rows: 5,
        blockWidth: null,
        colors: ["#d80e0e", "#d86602", "#ffdb0c", "#089c28", "#1155e9"]
    }
];

export default class LevelManager {
    constructor(levelConfigs = LEVEL_CONFIGS) {
        this.currentLevel = 1;
        this.blocks = [];
        this.levelConfigs = levelConfigs;
    }

    initialize() { this.generateLevel(this.currentLevel); }

    generateLevel(levelNumber) {
        const config = this.levelConfigs[levelNumber - 1];
        const rows = config.rows;
        const cols = 6;

        const sidePadding = 150;
        const topPadding = 150;
        const gap = 5;

        const availableWidth = GAME_WIDTH - sidePadding * 2;
        const totalGapWidth = gap * (cols - 1);
        const blockWidth = (availableWidth - totalGapWidth) / cols;

        const levelBlocks = [];
        const colors = config.colors;

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const blockX = sidePadding + blockWidth / 2 + j * (blockWidth + gap);
                const blockY = topPadding + 70 / 2 + i * (70 + gap); 

                levelBlocks.push(
                    new Block(new Vector(blockX, blockY), blockWidth, colors[i % colors.length])
                );
            }
        }

        this.blocks = levelBlocks;
    }

    isLevelComplete() { return this.blocks.every(block => !block.active); }

    nextLevel() {
        if (!this.isGameWon()) {
            this.currentLevel++;
            this.generateLevel(this.currentLevel);
        }
    }

    isGameWon() { return this.currentLevel >= MAX_LEVEL; }

    getCurrentLevel() { return this.currentLevel; }

    getBlocks() { return this.blocks.filter(block => !block.active).length; }

    getDestroyedBlocks() { return this.blocks.filter(block => !block.active).length; }

    reset() {
        this.currentLevel = 1;
        this.blocks = [];
        this.generateLevel(this.currentLevel);
    }
}