import { GAME_WIDTH } from "../../Utils/Constants.js";
import Collision from "./Collisions.js";

export default class BallWallCollision extends Collision {
    constructor(gameWidth, gameHeight) {
        super();
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
    }

    resolve(ball) {
        const ballBounds = ball.getBounds();

        if (ballBounds.left <= 0 || ballBounds.right >= this.gameWidth) {
            ball.velocity.x *= -1;
            ball.position.x = this.clamp(ball.position.x, ball.width / 2, this.gameWidth - ball.width / 2);
        }

        if (ballBounds.top <= 0) {
            ball.velocity.y *= -1;
            ball.position.y = this.clamp(ball.position.y, ball.height / 2, this.gameHeight - ball.height / 2);
        }

        if (ballBounds.bottom >= this.gameHeight){
            return true;
        }
        return false;
    }
}