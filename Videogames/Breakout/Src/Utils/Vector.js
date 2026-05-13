export default class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    sum(v2) { return new Vector(this.x + v2.x, this.y + v2.y); }
    subtract(v2) { return new Vector(this.x - v2.x, this.y - v2.y); }
    scalar(n) { return new Vector(this.x * n, this.y * n); }
    mangitude() { return  Math.sqrt(this.x ** 2 + this.y ** 2); }

    norm() {
        const v_mag = this.mangitude();
        if (v_mag == 0) return new Vector(0, 0);
        return new Vector(this.x / v_mag, this.y / v_mag);
    }

    static zero() { return new Vector(0, 0); }
}