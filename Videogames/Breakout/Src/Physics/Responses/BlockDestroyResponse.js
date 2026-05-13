import CollisionResponse from "./CollisionResponse.js";
import BounceResponse from "./BounceResponse.js";

export default class BlockDestroyResponse extends CollisionResponse {
    #bounce = new BounceResponse();

    resolve(event) {
        this.#bounce.resolve(event);
        event.entityB.hit();
    }
}