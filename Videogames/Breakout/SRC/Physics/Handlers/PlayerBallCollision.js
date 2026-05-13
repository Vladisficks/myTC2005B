import Collision from "./Collisions.js";

export default class PlayerBallCollision extends Collision {
    constructor(){
        super();
        this.speedIncrement = 1.1;
        this.maxSpeed = 2000;
    }

    resolve(player, ball) {
        if (!this.rectCollision(player.getBounds(), ball.getBounds())) return false;

        const currentSpeed = ball.velocity.magnitude();

        let offset = (ball.position.x - player.position.x) / (player.width / 2);
        offset = this.clamp(offset, -0.9, 0.9);

        ball.velocity.y *= -1;
        ball.velocity = ball.velocity.times(this.speedIncrement);

        const angle = (offset * 75) * (Math.PI / 180);

        const velocityX = Math.sin(angle) * currentSpeed;
        const velocityY = -Math.cos(angle) * currentSpeed;

        ball.velocity.x = velocityX;
        ball.velocity.y = velocityY;

        ball.velocity = ball.velocity.times(this.speedIncrement);
        const newSpeed = ball.velocity.magnitude();

        if (currentSpeed > this.maxSpeed){
            ball.velocity = ball.velocity.times(this.maxSpeed / newSpeed);
        }

        return true;
    }
}