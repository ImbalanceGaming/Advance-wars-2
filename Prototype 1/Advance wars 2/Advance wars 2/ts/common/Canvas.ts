module AdvanceWars {
    export class Canvas {
        private click: boolean;
        private clickPoint:Point;
        clickEvent :any[] = [];

        constructor(public canvas: HTMLElement) {
            var self = this;
            this.canvas.onclick = function(mouseEvent:MouseEvent) {
                self.clickPoint = new Point(mouseEvent.offsetX, mouseEvent.offsetY);
                self.click = true;
            };
        }

        Update() {
            if (this.click) {
                this.clickEvent.forEach(func => {
                    func(this.clickPoint);
                    //func();
                });
                this.click = false;
            }
        }
    }
}