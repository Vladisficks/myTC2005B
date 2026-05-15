import Vector from "../Utils/Vector.js";
import GameObject from "./GameObject.js";

export default class Wall extends GameObject{
    constructor(x, y, width, height, side){
        super(new Vector(x, y), width, height, "transparent");
        this.side = side; 
    }

    static createBounds(gameWidth, gameHeight){
        const thickness = 200;

        return {
            left: new Wall(-thickness / 2, gameHeight / 2, thickness, gameHeight, "left"),
            right: new Wall(gameWidth + thickness / 2, gameHeight / 2, thickness, gameHeight, "right"),
            top: new Wall(gameWidth / 2, -thickness / 2, gameWidth, thickness, "top"),
            bottom: new Wall(gameWidth / 2, gameHeight + thickness / 2, gameWidth, thickness, "bottom")
        };
    }
}