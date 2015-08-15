///<reference path='Rectangle.ts' />

module AdvanceWars {
    export class ClickableRectangle extends Rectangle {
        click: ()=>void;

        constructor(x: number, y: number, width: number, height: number) {
            super(x, y, width, height);
        }

        public update(gameTime: number) {
            if (Game.canvas.clicked && this.Contains(Game.canvas.clickedAt)) {
                this.click();
            }
        }

        public Dispose() {
        }
    }
}