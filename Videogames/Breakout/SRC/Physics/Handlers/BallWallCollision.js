import Collision from "./Collisions.js";

export default class BallWallCollision extends Collision{
    constructor(gameWidth, gameHeight){
        super();
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
    }

    resolve(ball){
        const ballBounds = ball.getBounds();

        if (ballBounds.left <= 0 || ballBounds.right >= this.gameWidth){
            ball.velocity.x *= -1;
        }

        if (ballBounds.top <= 0){
            ball.velocity.y *= -1;
        }
    }
}