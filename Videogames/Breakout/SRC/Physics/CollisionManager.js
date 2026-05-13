export default class CollisionManager {
    constructor(playerWall, ballWall, playerBall, ballBlock, evilBallWall, evil) {
        this.playerWall = playerWall;
        this.ballWall = ballWall;
        this.playerBall = playerBall;
        this.ballBlock = ballBlock;
        this.evilBallWall = evilBallWall;
    }
}