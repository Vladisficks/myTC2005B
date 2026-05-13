import { GAME_WIDTH } from "../../Utils/Constants.js";
import Collision from "./Collisions.js";

export default class EvilBallWallCollision extends Collision {
    constructor(gameWidth, gameHeight) {
        super();
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
    }

    resolve(ball) {
        const ballBounds = ball.getBounds();

        // Collision walls LEFT/RIGHT
        if (ballBounds.left <= 0 || ballBounds.right >= this.gameWidth) {
            ball.velocity.x *= -1;
            ball.position.x = this.clamp(ball.position.x, ball.width / 2, this.gameWidth - ball.width / 2);
        }

        // Collision wall TOP
        if (ballBounds.top <= 0 || ballBounds.bottom >= this.gameHeight) {
            ball.velocity.y *= -1;
            ball.position.y = this.clamp(ball.position.y, ball.height / 2, this.gameHeight - ball.height / 2);
        }
    }
}