import CollisionResponse from "./CollisionResponse.js";

export default class ClampResponse extends CollisionResponse {
    resolve(event) {
        const player = event.entityA;
        const wallBounds = event.entityB.getBounds();
        const halfWidth = player.width / 2;

        if (event.entityB.side === "left") {
            player.position.x = wallBounds.right + halfWidth;
        } else if (event.entityB.side === "right") {
            player.position.x = wallBounds.left - halfWidth;
        }
    }
}