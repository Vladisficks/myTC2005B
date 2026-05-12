import BallBlockCollision from "./Handlers/BallBlockCollision.js";
import BallWallCollision from "./Handlers/BallWallCollision.js";
import PlayerBallCollision from "./Handlers/PlayerBallCollision.js";
import PlayerWallCollision from "./Handlers/PlayerWallCollision.js";

export default class CollisionManager {
    constructor(playerWall, ballWall, playerBall, ballBlock) {
        this.playerWall = playerWall;
        this.ballWall = ballWall;
        this.playerBall = playerBall;
        this.ballBlock = ballBlock;
    }

    update(player, ball, blocks) {
        this.playerWall.resolve(player);
        this.playerBall.resolve(player, ball);
        this.ballBlock.resolve(ball, blocks);
    }
}