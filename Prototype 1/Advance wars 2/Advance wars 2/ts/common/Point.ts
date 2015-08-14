module AdvanceWars {
    export class Point {
        constructor(public x: number, public y: number) { }

        minus(point: Point) {
            return new Point(this.x - point.x, this.y - point.y);
        }

        plus(point: Point) {
            return new Point(this.x + point.x, this.y + point.y);
        }

        multiply(point: Point) {
            return new Point(this.x * point.x, this.y * point.y);
        }

        length() {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }
    }
}