import { GAME_HEIGHT, GAME_WIDTH } from "../Utils/Constants.js";
import Vector from "../Utils/Vector.js";
import Ball from "./Ball.js";

export default class EvilBall extends Ball {
    constructor() {
        super()
        this.color = "#ff0000";
        this.type = "EvilBall";
    }
}