import { GAME_HEIGHT, GAME_WIDTH } from "../Utils/Constants.js";
import Vector from "../Utils/Vector.js";
import GameObject from "./GameObject.js";

export default class Player extends GameObject {
    constructor(input) {
        const x = GAME_WIDTH / 2;
        const y = GAME_HEIGHT - 120;

        super(new Vector(x, y), 250, 40, "#cacaca", "player");

        this.input = input;
        this.speed = 1500;
    }

    update(deltaTime) {
        let direction = new Vector(0, 0);

        if (this.input.isKeyDown("A") || this.input.isKeyDown("ARROWLEFT")) { direction.x -= 1 };
        if (this.input.isKeyDown("D") || this.input.isKeyDown("ARROWRIGHT")) { direction.x += 1 };

        this.velocity = direction.normalize().times(this.speed);

        super.update(deltaTime);
    }
}