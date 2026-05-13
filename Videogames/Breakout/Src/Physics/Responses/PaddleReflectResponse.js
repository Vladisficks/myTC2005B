import CollisionResponse from "./CollisionResponse.js";
import CollisionDetector from "../CollisionDetector.js";

export default class PaddleReflectResponse extends CollisionResponse {
    constructor(speedIncrement = 1.1, maxSpeed = 2000) {
        super();
        this.speedIncrement = speedIncrement;
        this.maxSpeed = maxSpeed;
    }

    resolve(event) {
        const ball = event.entityA;
        const player = event.entityB;

        const currentSpeed = ball.velocity.mangitude();

        const offset = CollisionDetector.clamp(
            (ball.position.x - player.position.x) / (player.width / 2),
            -0.9,
            0.9
        );

        const angle = (offset * 75) * (Math.PI / 180);

        ball.velocity.x = Math.sin(angle) * currentSpeed;
        ball.velocity.y = -Math.cos(angle) * currentSpeed;

        ball.velocity = ball.velocity.scalar(this.speedIncrement);

        const newSpeed = ball.velocity.mangitude();
        if (newSpeed > this.maxSpeed) {
            ball.velocity = ball.velocity.scalar(this.maxSpeed / newSpeed);
        }
    }
}