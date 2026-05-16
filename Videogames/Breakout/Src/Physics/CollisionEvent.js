// Data class where holds info about one collision

export default class CollisionEvent{
    constructor (type, entityA, entityB, overlap){
        this.type = type;           // Name of the collision
        this.entityA = entityA;     // Active object
        this.entityB = entityB;     // Target object
        this.overlap = {            // How deep the boxes overlap 
            x: overlap.x,
            y: overlap.y
        }
    }
}