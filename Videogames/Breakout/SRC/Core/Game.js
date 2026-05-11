import Ball from "../Entities/Ball.js";
import Block from "../Entities/Block.js";
import Player from "../Entities/Player.js";
import CollisionManager from "../Physics/CollisionManager.js";
import { GAME_HEIGHT, GAME_WIDTH } from "../Utils/Constants.js";
import Vector from "../Utils/Vector.js";
import InputManager from "./Input.js";
import LevelManager from "./LevelManager.js";
import LifeManager from "./LifeManager.js";
import Renderer from "./Renderer.js";

export default class Game {
    constructor(canvas) {
        this.renderer = new Renderer(canvas);
        this.input = new InputManager();
        this.levelManager = new LevelManager();
        this.lifeManager = new LifeManager();
        this.collision = new CollisionManager();

        this.levelManager.initialize();

        this.player = new Player(this.input);
        this.ball = new Ball();

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

        // Check if ball out game
        const checkBallCollision = this.collision.ballWall.resolve(this.ball);
        console.log(checkBallCollision);

        if (checkBallCollision) {
            this.lifeManager.loseLife();

            if (this.lifeManager.isGameOver()) {
                console.log("GAME OVER");
                return;
            }
            this.ball.resetBall();
        }

        if (this.levelManager.isLevelComplete()) {
            if (this.levelManager.isGameWon()) {
                console.log("GAME WON");
                return;
            }
            this.levelManager.nextLevel();
            this.ball.resetBall();
        }

        // Clear and Draw
        this.renderer.clear();
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