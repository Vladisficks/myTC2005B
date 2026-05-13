import Ball from "../Entities/Ball.js";
import Player from "../Entities/Player.js";
import Wall from "../Entities/Wall.js";
import CollisionDispatcher from "../Physics/CollisionDispatcher.js";
import BlockDestroyResponse from "../Physics/Responses/BlockDestroyResponse.js";
import BounceResponse from "../Physics/Responses/BounceResponse.js";
import ClampResponse from "../Physics/Responses/ClampResponse.js";
import ExitResponse from "../Physics/Responses/ExitResponse.js";
import PaddleReflectResponse from "../Physics/Responses/PaddleReflectResponse.js";
import GameStateManager from "../Managers/GameStateManager.js";
import HUDManager from "../Managers/HUDManager.js";
import LevelManager from "../Managers/LevelManager.js";
import LifeManager from "../Managers/LifeManager.js";
import ScoreManager from "../Managers/ScoreManager.js";
import Renderer from "../Rendering/Renderer.js";
import InputManager from "./InputManager.js";
import Vector from "../Utils/Vector.js";
import {
    GAME_WIDTH, GAME_HEIGHT,
    PLAYER_CONFIG, BALL_CONFIG,
    BLOCK_CONFIG, GAME_CONFIG,
    DISPLAY_CONFIG, LEVEL_CONFIG
} from "../Utils/Constants.js";
import AudioManager from "../Audio/AudioManager.js";

export default class Breakout {
    constructor(canvas) {
        // Core
        this.renderer = new Renderer(canvas, GAME_WIDTH, GAME_HEIGHT);
        this.inputManager = new InputManager();
        this.lastTime = 0;

        // Audio
        this.audio = new AudioManager();
        this.audio.loadSound("hit", "Assets/Audio/ballCollision.wav");

        // Entities
        this.player = new Player(new Vector(GAME_WIDTH / 2, GAME_HEIGHT * 0.9), this.inputManager, PLAYER_CONFIG);
        this.ball = new Ball(new Vector(GAME_WIDTH / 2, GAME_HEIGHT / 3), BALL_CONFIG);
        this.walls = Wall.createBounds(GAME_WIDTH, GAME_HEIGHT);

        // Managers
        this.score = new ScoreManager();
        this.lives = new LifeManager(GAME_CONFIG.LIVES);
        this.levels = new LevelManager(LEVEL_CONFIG, BLOCK_CONFIG, GAME_WIDTH);
        this.state = new GameStateManager(
            this.player, this.ball, this.levels, this.lives,
            GAME_CONFIG, GAME_WIDTH, GAME_HEIGHT,
            () => this.score.reset()
        );
        this.hud = new HUDManager(
            this.levels, this.lives, this.state, this.score,
            DISPLAY_CONFIG, GAME_WIDTH, GAME_HEIGHT
        );

        // Collisions
        this.dispatcher = new CollisionDispatcher();

        this.dispatcher.register(this.ball, [this.walls.left, this.walls.right, this.walls.top], new BounceResponse(), "ballVSWall");
        this.dispatcher.register(this.ball, this.walls.bottom, new ExitResponse(), "ballExit");
        this.dispatcher.register(this.player, [this.walls.left, this.walls.right], new ClampResponse(), "playerVSWall");
        this.dispatcher.register(this.ball, this.player, new PaddleReflectResponse(), "ballVSPlayer");
        this.dispatcher.register(this.ball, this.levels.blocks, new BlockDestroyResponse(), "ballVSBlock",
            () => this.state.isGameActive()
        );

        // Init
        this.levels.initialize();
        this.#start();
    }

    update(deltaTime) {
        const wantsAction =
            this.inputManager.isKeyDown("A") || this.inputManager.isKeyDown("D") ||
            this.inputManager.isKeyDown("ARROWLEFT") || this.inputManager.isKeyDown("ARROWRIGHT");

        this.state.update(wantsAction, deltaTime);

        if (this.state.isGameActive()) {
            this.player.update(deltaTime);
            this.ball.update(deltaTime);

            const events = this.dispatcher.dispatch();

            for (const event of events) {
                if (event.type === "ballExit") this.state.ballOutOfBounds();
                if (event.type === "ballVSBlock") { this.score.addBlock(); this.audio.playSound("hit"); }
                if (event.type === "ballVSWall") this.audio.playSound("hit");
                if (event.type == "ballVSPlayer") this.audio.playSound("hit");
            }

            if (this.levels.isLevelComplete()) this.state.levelComplete();
        }

        this.inputManager.flush();
    }

    render() {
        this.renderer.clear();

        const state = this.state.getGameState();

        if (state === "playing" || state === "waiting") {
            this.player.draw(this.renderer);
            this.ball.draw(this.renderer);
            this.levels.blocks.forEach(b => { if (b.active) b.draw(this.renderer); });
        }

        this.hud.draw(this.renderer);
    }

    #start() { requestAnimationFrame(timestamp => this.#loop(timestamp)); }

    #loop(timestamp) {
        const deltaTime = (timestamp - this.lastTime) / 1000;
        this.lastTime = timestamp;

        this.update(deltaTime);
        this.render();

        requestAnimationFrame(timestamp => this.#loop(timestamp));
    }
}