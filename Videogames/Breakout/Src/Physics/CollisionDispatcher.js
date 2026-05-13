import CollisionDetector from "./CollisionDetector.js";
import CollisionEvent from "./CollisionEvent.js";

export default class CollisionDispatcher {
    #pairs;
    constructor() {
        this.#pairs = [];
    }

    register(entityA, targets, response, type, condition = null) { this.#pairs.push({ entityA, targets, response, type }); }

    dispatch() {
        const events = [];

        for (const pair of this.#pairs) {
            const { entityA, targets, response, type, condition } = pair;

            if (condition && !condition()) continue;

            const targetList = Array.isArray(targets) ? targets : [targets];


            for (const entityB of targetList) {
                if (entityB.active === false) continue;
                const boundsA = entityA.getBounds();
                const boundsB = entityB.getBounds();

                const collided = CollisionDetector.overlaps(boundsA, boundsB);

                if (!collided) continue;

                const overlap = CollisionDetector.getOverlap(boundsA, boundsB);
                const event = new CollisionEvent(type, entityA, entityB, overlap);

                response.resolve(event);
                events.push(event);
            }
        }
        return events;
    }
}
