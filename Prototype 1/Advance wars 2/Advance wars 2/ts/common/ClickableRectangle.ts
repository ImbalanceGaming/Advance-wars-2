///<reference path='Rectangle.ts' />

module AdvanceWars {
    export class ClickableRectangle extends Rectangle {
        click: any;
        private getClickedFunction :any;
        //get click(): any {
        //    return this._click;
        //}
        //set click(clickFunction: any) {
        //    var index = Game.canvas.clickEvent.indexOf(this._click);
        //    if (index != -1)
        //        Game.canvas.clickEvent.splice(index, 1);
        //    Game.canvas.clickEvent.push(clickFunction);
        //    this._click = clickFunction;
        //}

        constructor(x: number, y: number, width: number, height: number) {
            super(x, y, width, height);

            var self = this;
            this.getClickedFunction = function(point: Point) {
                if (self.click != null && self.Contains(point))
                    self.click();
            };
            Game.canvas.clickEvent.push(this.getClickedFunction);
        }

        public Dispose() {
            var index = Game.canvas.clickEvent.indexOf(this.getClickedFunction);
            Game.canvas.clickEvent.splice(index, 1);
        }
    }
}