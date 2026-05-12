import Renderer from "./Renderer.js";
import InputManager from "./Input.js";
import GameStateManager from "./GameStateManager.js";
import LevelManager from "./LevelManager.js";
import LifeManager from "./LifeManager.js";
import CollisionManager from "../Physics/CollisionManager.js"
import Player from "../Entities/Player.js";
import Ball from "../Entities/Ball.js";

export default class Game {
    constructor(canvas) {
        this.renderer = new Renderer(canvas);
        this.input = new InputManager();
        this.levelManager = new LevelManager();
        this.lifeManager = new LifeManager(3);
        this.collisionManager = new CollisionManager();
        this.stateManager = new GameStateManager(
            this.player,
            this.ball,
            this.levelManager,
        )

        this.levelManager.initialize();

        this.player = new Player(this.input);
        this.ball = new Ball();

        this.lastTime = 0;

        this.renderer.resize();
        this.renderer.setupResizeListener();

        this.start();
    }


    start() { requestAnimationFrame((timestamp) => this.gameLoop(timestamp)); }

    gameLoop(timestamp) {
        const deltaTime = (timestamp - this.lastTime) / 1000;
        this.lastTime = timestamp;

        // Update
        this.player.update(deltaTime);
        this.ball.update(deltaTime);
        this.collisionManager.update(this.player, this.ball, this.levelManager.blocks);

        // Game States
        const checkBallCollision = this.collisionManager.ballWall.resolve(this.ball);

        if (checkBallCollision){
            if (!this.stateManager.BallOutOfBounds()){
                console.log("GAME OVER");
                return;
            }
        }

        if (this.levelManager.isLevelComplete()){
            if(!this.stateManager.LevelComplete()){
                console.log("GAME WON");
                return;
            }
        }

        this.stateManager.update(this.input)

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