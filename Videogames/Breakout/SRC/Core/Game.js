import Ball from "../Entities/Ball.js";
import Block from "../Entities/Block.js";
import Player from "../Entities/Player.js";
import CollisionManager from "../Physics/CollisionManager.js";
import { GAME_HEIGHT, GAME_WIDTH } from "../Utils/Constants.js";
import Vector from "../Utils/Vector.js";
import InputManager from "./Input.js";
import LevelManager from "./LevelManager.js";
import Renderer from "./Renderer.js";

export default class Game {
    constructor(canvas) {
        this.renderer = new Renderer(canvas);
        this.input = new InputManager();
        this.levelManager = new LevelManager();
        this.collision = new CollisionManager();

        this.levelManager.initialize();

        this.player = new Player(this.input);
        this.ball = new Ball(GAME_WIDTH, GAME_HEIGHT);

        this.lastTime = 0;

        this.renderer.resize();
        this.renderer.setupResizeListener();

        this.start();
    }

    start() {
        requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    }

    gameLoop(timestamp) {
        const deltaTime = (timestamp - this.lastTime) / 1000;
        this.lastTime = timestamp;

        // Update
        this.player.update(deltaTime);
        this.ball.update(deltaTime);
        this.collision.update(this.player, this.ball, this.levelManager.blocks);

        if (this.levelManager.isLevelComplete()) {

            if (this.levelManager.isGameWon()) {
                console.log("GAME WON");
                return;
            }

            this.levelManager.nextLevel();
        }

        // Clear
        this.renderer.clear();

        // Draw
        this.player.draw(this.renderer);
        this.ball.draw(this.renderer);
        this.levelManager.blocks.forEach(block => {
            if (block.active) {
                block.draw(this.renderer);
            }
        })

        requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    }
}