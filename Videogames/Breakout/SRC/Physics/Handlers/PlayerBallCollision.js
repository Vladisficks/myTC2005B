import Collision from "./Collisions.js";

export default class PlayerBallCollision extends Collision {
    constructor(){
        super();
        this.speedIncrement = 1.05;
        this.maxSpeed = 2000;
    }

    resolve(player, ball) {
        if (!this.rectCollision(player.getBounds(), ball.getBounds())) return;

        ball.velocity.y *= -1;
        ball.velocity = ball.velocity.times(this.speedIncrement);

        const currentSpeed = ball.velocity.magnitude();
        if (currentSpeed > this.maxSpeed){
            ball.velocity = ball.velocity.times(this.maxSpeed / currentSpeed);
        }
    }
}