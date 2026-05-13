import Vector from "../Utils/Vector.js";
import GameObject from "./GameObject.js";

export default class Player extends GameObject {
    constructor(position, input, config){
        super(position, config.WIDTH, config.HEIGHT, config.COLOR)
        this.input = input;
        this.speed = config.SPEED;
    }

    update(deltaTime){
        let direction = Vector.zero();

        if (this.input.isKeyDown("A") || this.input.isKeyDown("ARROWLEFT")) direction.x -= 1;
        if (this.input.isKeyDown("D") || this.input.isKeyDown("ARROWRIGHT")) direction.x += 1;
        
        this.velocity = direction.norm().scalar(this.speed);
        super.update(deltaTime);
    }
}