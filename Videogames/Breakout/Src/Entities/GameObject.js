import Vector from "../Utils/Vector.js";

export default class GameObject {
    constructor(position, width, height, color) {
        this.position = position;
        this.velocity = Vector.zero();
        this.width = width;
        this.height = height;
        this.color = color;
    }

    getBounds() {
        return {
            left: this.position.x - this.width / 2,
            right: this.position.x + this.width / 2,
            top: this.position.y - this.height / 2,
            bottom: this.position.y + this.height / 2
        }
    }
    draw(renderer) {
        const drawX = this.position.x - this.width / 2;
        const drawY = this.position.y - this.height / 2;

        renderer.drawRect(drawX, drawY, this.width, this.height, this.color);
    }

    update(deltaTime) { this.position = this.position.sum(this.velocity.scalar(deltaTime)); }
}