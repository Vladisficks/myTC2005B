import GameObject from "./GameObject.js";

export default class Block extends GameObject {
    constructor(position, width, height, color) {
        super(position, width, height, color);
        this.active = true;
    }

    hit() { this.active = false; }
}