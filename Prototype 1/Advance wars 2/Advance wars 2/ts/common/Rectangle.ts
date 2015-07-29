module AdvanceWars {
    export class Rectangle {
        constructor(public x: number, public y: number, public width: number, public height: number) { }

        public Contains(point: Point) {
            return this.x <= point.x && this.y <= point.y && this.x + this.width >= point.x && this.y + this.height >= point.y;
        }
    }
}