import { BLOCK_HEIGHT } from "../Utils/Constants.js";
import GameObject from "./GameObject.js";

export default class Block extends GameObject {
    constructor(position, width, color) {
        super(position, width, BLOCK_HEIGHT, color, "block")
        this.active = true;
    }

    hit() { this.active = false; }
}