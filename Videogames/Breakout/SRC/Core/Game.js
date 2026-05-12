import Ball from "../Entities/Ball.js";
import Block from "../Entities/Block.js";
import Player from "../Entities/Player.js";
import CollisionManager from "../Physics/CollisionManager.js";
import BallBlockCollision from "../Physics/Handlers/BallBlockCollision.js";
import BallWallCollision from "../Physics/Handlers/BallWallCollision.js";
import PlayerBallCollision from "../Physics/Handlers/PlayerBallCollision.js";
import PlayerWallCollision from "../Physics/Handlers/PlayerWallCollision.js";
import { GAME_HEIGHT, GAME_WIDTH } from "../Utils/Constants.js";
import Vector from "../Utils/Vector.js";
import InputManager from "./Input.js";
import LevelManager from "./LevelManager.js";
import LifeManager from "./LifeManager.js";
import Renderer from "./Renderer.js";
import GameStateManager from "./GameStateManager.js";
import HUDManager from "./HUDManager.js";

export default class Game {
    constructor(canvas) {
        this.renderer = new Renderer(canvas);
        this.input = new InputManager();
        this.levelManager = new LevelManager();
        this.lifeManager = new LifeManager(3);

        this.levelManager.initialize();

        this.player = new Player(this.input);
        this.ball = new Ball();

        const playerWall = new PlayerWallCollision(GAME_WIDTH);
        const ballWall = new BallWallCollision(GAME_WIDTH, GAME_HEIGHT);
        const playerBall = new PlayerBallCollision();
        const ballBlock = new BallBlockCollision();

        this.collision = new CollisionManager(playerWall, ballWall, playerBall, ballBlock);

        this.stateManager = new GameStateManager(
            this.player,
            this.ball,
            this.levelManager,
            this.lifeManager
        );

        this.hudManager = new HUDManager(this.levelManager, this.lifeManager, this.stateManager);

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
        this.collision.update(this.player, this.ball, this.levelManager.blocks);

        const hitBlock = this.collision.ballBlock.resolve(this.ball, this.levelManager.blocks);
        if (hitBlock) this.hudManager.incrementBlocksDestroyed();

        const checkBallCollision = this.collision.ballWall.resolve(this.ball);
        if (checkBallCollision) { if (!this.stateManager.BallOutOfBounds()) { } }

        if (this.levelManager.isLevelComplete()) { if (!this.stateManager.LevelComplete()) { } }

        this.stateManager.update(this.input);

        // Clear and Draw
        this.renderer.clear();
        this.player.draw(this.renderer);
        this.ball.draw(this.renderer);
        this.levelManager.blocks.forEach(block => {
            if (block.active) block.draw(this.renderer);
        })

        if (this.stateManager.isGameActive() || this.stateManager.getGameState() === "waiting") {
            this.player.draw(this.renderer);
            this.ball.draw(this.renderer);
            this.levelManager.blocks.forEach(block => {
                if (block.active) block.draw(this.renderer);
            })
        }

        this.hudManager.draw(this.renderer);

        requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    }
}