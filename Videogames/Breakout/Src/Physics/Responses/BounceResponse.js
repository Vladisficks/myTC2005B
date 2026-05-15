import CollisionResponse from "./CollisionResponse.js";

export default class BounceResponse extends CollisionResponse {
    resolve(event) {
        const ball = event.entityA;
        const wall = event.entityB;

        const ballBounds = ball.getBounds();
        const wallBounds = wall.getBounds();

        const overlapX = event.overlap.x;
        const overlapY = event.overlap.y;

        if (overlapX < overlapY) {

            // LEFT WALL
            if (ballBounds.left < wallBounds.left) { ball.position.x -= overlapX; }

            // RIGHT WALL
            else { ball.position.x += overlapX; }
            ball.velocity.x *= -1;
        }
        else {
            // TOP WALL
            if (ballBounds.top < wallBounds.top) { ball.position.y -= overlapY; }

            // BOTTOM HIT
            else { ball.position.y += overlapY; }
            ball.velocity.y *= -1;
        }
    }
}