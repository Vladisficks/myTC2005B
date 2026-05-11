import Vector from "../Utils/Vector.js";
import GameObject from "./GameObject.js";

export default class Ball extends GameObject {
    constructor(gameWidth, gameHeight) {
        const x = gameWidth / 2;
        const y = gameHeight / 3;

        super(new Vector(x, y), 30, 30, "#ffffff", "Ball")

        this.initialSpeed = 700;
        this.randomVelocity();
    }

    update(deltaTime) {
        this.position = this.position.plus(this.velocity.times(deltaTime));
    }

    draw(renderer) {
        renderer.drawCircle(this.position.x, this.position.y, this.height, this.color);
    }

    randomVelocity() {
        let angleDegrees = Math.random() * (120 - 60) + 60;
        let angle = angleDegrees * Math.PI / 180;
        this.velocity = new Vector(Math.cos(angle), Math.sin(angle)).times(this.initialSpeed);
    }
}