import Collision from "./Collisions.js";

export default class BallBlockCollision extends Collision {
    resolve(ball, blocks) {
        for (const block of blocks) {
            if (!block.active) continue;
            if (!this.rectCollision(ball.getBounds(), block.getBounds())) continue;

            const { overlapX, overlapY } = this.getOverlap(ball.getBounds(), block.getBounds());

            if (overlapX < overlapY) { 
                ball.velocity.x *= -1;
            } else {
                ball.velocity.y *= -1;
            }

            block.hit();
            return block;
        }
        return null;
    }
}