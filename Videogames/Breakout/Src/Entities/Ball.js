import Vector from "../Utils/Vector.js";
import GameObject from "./GameObject.js";

export default class Ball extends GameObject {
    constructor(position, config) {
        super(position, config.WIDTH, config.HEIGHT, config.COLOR);
        this.speed = config.SPEED;
        this.initialPosition = new Vector(position.x, position.y);

        this.randomVelocity();
    }

    draw(renderer) { renderer.drawCircle(this.position.x, this.position.y, this.width, this.color); }

    randomVelocity() {
        let angleDegrees = Math.random() * (120 - 60) + 60;
        const angle = angleDegrees * Math.PI / 180;
        this.velocity = new Vector(Math.cos(angle), Math.sin(angle)).scalar(this.speed);
    }

    reset() {
        this.position = this.initialPosition;
        this.randomVelocity();
    }
}