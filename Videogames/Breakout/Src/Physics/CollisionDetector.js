export default class CollisionDetector {
    static overlaps(boundsA, boundsB) {
        return (
            boundsA.left <= boundsB.right &&
            boundsA.right >= boundsB.left &&
            boundsA.top <= boundsB.bottom &&
            boundsA.bottom >= boundsB.top
        )
    }

    static getOverlap(boundsA, boundsB) {
        const overlapX = Math.min(boundsA.right, boundsB.right) - Math.max(boundsA.left, boundsB.left);
        const overlapY = Math.min(boundsA.bottom, boundsB.bottom) - Math.max(boundsA.top, boundsB.top);

        return { x: overlapX, y: overlapY };
    }

    static clamp(val, min, max) { return Math.max(min, Math.min(max, val)); }
}