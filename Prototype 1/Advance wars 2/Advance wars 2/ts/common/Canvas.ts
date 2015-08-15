module AdvanceWars {
    export class Canvas {
        // Private click, is async
        private click: boolean;
        private clickPoint: Point;

        // Public click, not async
        public clicked: boolean;
        public clickedAt: Point;

        constructor(public canvas: HTMLElement) {
            var self = this;
            this.canvas.onclick = function(mouseEvent:MouseEvent) {
                self.clickPoint = new Point(mouseEvent.offsetX, mouseEvent.offsetY);
                self.click = true;
            };
        }

        Update() {
            if (this.click) {
                this.clicked = true;
                this.clickedAt = this.clickPoint;
                this.click = false;
            }
            else
            {
                this.clicked = false;
            }
        }
    }
}