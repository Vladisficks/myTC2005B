import CollisionResponse from "./CollisionResponse.js";

export default class BounceResponse extends CollisionResponse {
    resolve(event) {
        const entity = event.entityA;
        const { x: overlapX, y: overlapY } = event.overlap;

        const dx = event.entityA.position.x - event.entityB.position.x;
        const dy = event.entityA.position.y - event.entityB.position.y;

        if (overlapX < overlapY) {
            entity.velocity.x *= -1;
            entity.position.x += dx > 0 ? overlapX : -overlapX;
        } else {
            entity.velocity.y *= -1;
            entity.position.y += dy > 0 ? overlapY : -overlapY;
        }
    }
}