export default class CollisionEvent{
    constructor (type, entityA, entityB, overlap){
        this.type = type;
        this.entityA = entityA;
        this.entityB = entityB;
        this.overlap = {
            x: overlap.x,
            y: overlap.y
        }
    }
}