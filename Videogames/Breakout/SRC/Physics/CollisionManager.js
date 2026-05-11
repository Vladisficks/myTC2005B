import { GAME_HEIGHT, GAME_WIDTH } from "../Utils/Constants.js";
import BallBlockCollision from "./Handlers/BallBlockCollision.js";
import BallWallCollision from "./Handlers/BallWallCollision.js";
import PlayerBallCollision from "./Handlers/PlayerBallCollision.js";
import PlayerWallCollision from "./Handlers/PlayerWallCollision.js";

export default class CollisionManager{
    constructor(){
        this.playerWall = new PlayerWallCollision(GAME_WIDTH);
        this.ballWall = new BallWallCollision(GAME_WIDTH, GAME_HEIGHT);
        this.playerBall = new PlayerBallCollision();
        this.ballBlock = new BallBlockCollision();
    }

    update(player, ball, blocks){
        this.playerWall.resolve(player);
        this.ballWall.resolve(ball);
        this.playerBall.resolve(player, ball);
        this.ballBlock.resolve(ball, blocks);
    }
}
