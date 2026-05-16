import Ball from "./Ball.js";

export default class EvilBall extends Ball {
    constructor(position, config) {
        super(position, config);
        this.active = false;
    }

    update(deltaTime) {
        if (!this.active) return;
        super.update(deltaTime);
    }

    draw(renderer) {
        if (!this.active) return;
        super.draw(renderer);
    }
}