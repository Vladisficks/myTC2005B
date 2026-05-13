import GameObject from "./GameObject.js";

export default class Block extends GameObject {
    constructor(position, width, color, config) {
        super(position, width, config.HEIGHT, color);
        this.active = true;
    }

    hit() { this.active = false; }
}