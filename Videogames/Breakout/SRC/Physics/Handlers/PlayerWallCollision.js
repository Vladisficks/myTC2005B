import Collision from "./Collisions.js";

export default class PlayerWallCollision extends Collision{
    constructor(gameWidth) {
        super();
        this.gameWidth = gameWidth;
    }

    resolve(player){
        const halfWidth = player.width / 2;
        player.position.x = Math.max(
            halfWidth,
            Math.min(this.gameWidth - halfWidth, player.position.x)
        );
    }
}