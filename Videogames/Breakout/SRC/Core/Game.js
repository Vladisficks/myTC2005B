import Ball from "../Entities/Ball.js";
import Block from "../Entities/Block.js";
import Player from "../Entities/Player.js";
import CollisionManager from "../Physics/CollisionManager.js";
import BallBlockCollision from "../Physics/Handlers/BallBlockCollision.js";
import BallWallCollision from "../Physics/Handlers/BallWallCollision.js";
import PlayerBallCollision from "../Physics/Handlers/PlayerBallCollision.js";
import PlayerWallCollision from "../Physics/Handlers/PlayerWallCollision.js";
import { GAME_HEIGHT, GAME_WIDTH, MAX_LEVEL } from "../Utils/Constants.js";
import Vector from "../Utils/Vector.js";
import InputManager from "./Input.js";
import LevelManager from "./LevelManager.js";
import LifeManager from "./LifeManager.js";
import Renderer from "./Renderer.js";
import GameStateManager from "./GameStateManager.js";
import HUDManager from "./HUDManager.js";
import AudioManager from "../Audio/AudioManager.js";
import EvilBall from "../Entities/EvilBall.js";
import EvilBallWallCollision from "../Physics/Handlers/EvilBallWallCollision.js";

export default class Game {
    constructor(canvas) {
        // Systems and Core
        this.renderer = new Renderer(canvas);
        this.input = new InputManager();
        this.levelManager = new LevelManager();
        this.lifeManager = new LifeManager(MAX_LEVEL);
        this.lastTime = 0;

        // Audio 
        this.audio = new AudioManager();
        this.audio.loadSound("ballCollision", "Assets/Audio/ballCollision.wav");

        // Entities
        this.player = new Player(this.input);
        this.ball = new Ball();
        this.evilBall = new EvilBall();

        // Collision Logic
        const playerWall = new PlayerWallCollision(GAME_WIDTH);
        const ballWall = new BallWallCollision(GAME_WIDTH, GAME_HEIGHT);
        const playerBall = new PlayerBallCollision();
        const ballBlock = new BallBlockCollision();
        const evilBallWall = new EvilBallWallCollision(GAME_WIDTH, GAME_HEIGHT);
        this.collision = new CollisionManager(playerWall, ballWall, playerBall, ballBlock, evilBallWall);

        // Management and Game States
        this.stateManager = new GameStateManager(
            this.player,
            this.ball,
            this.levelManager,
            this.lifeManager
        );

        this.hudManager = new HUDManager(
            this.levelManager,
            this.lifeManager,
            this.stateManager
        );

        // Initialization and SetUp
        this.levelManager.initialize();
        this.renderer.resize();
        this.renderer.setupResizeListener();

        // Execution
        this.start();
    }

    start() { requestAnimationFrame((timestamp) => this.gameLoop(timestamp)); }

    gameLoop(timestamp) {
        // Time calculation
        const deltaTime = (timestamp - this.lastTime) / 1000;
        this.lastTime = timestamp;

        // Update States
        this.stateManager.update(this.input, deltaTime);

        // Logic and Physics
        if (this.stateManager.isGameActive()) {
            this.player.update(deltaTime);
            this.ball.update(deltaTime);
            this.evilBall.update(deltaTime);

            this.collision.playerWall.resolve(this.player);
            this.collision.evilBallWall.resolve(this.evilBall);

            // Events and Resolutions
            const hitPlayer = this.collision.playerBall.resolve(this.player, this.ball);
            if (hitPlayer) this.audio.playSound("ballCollision");

            const hitBlock = this.collision.ballBlock.resolve(this.ball, this.levelManager.blocks);
            if (hitBlock) {
                this.hudManager.incrementBlocksDestroyed();
                this.audio.playSound("ballCollision");
            }

            const wallCollisionResult = this.collision.ballWall.resolve(this.ball);

            if (wallCollisionResult === "out") {
                this.stateManager.BallOutOfBounds();
            } else if (wallCollisionResult === true) { 
                this.audio.playSound("ballCollision");
            }

            if (this.levelManager.isLevelComplete()) this.stateManager.LevelComplete();
        }

        // Rendering
        this.renderer.clear();
        const state = this.stateManager.getGameState();

        if (state === "playing" || state === "waiting") {
            this.player.draw(this.renderer);
            this.ball.draw(this.renderer);
            this.evilBall.draw(this.renderer);
            this.levelManager.blocks.forEach(block => {
                if (block.active) block.draw(this.renderer);
            });
        }
        this.hudManager.draw(this.renderer);

        // Output and Recursion
        this.input.flush();
        requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    }
}