module AdvanceWars {
    export class Presentation {
        ctx: CanvasRenderingContext2D;
        tiles: SpriteObject[];
        units: SpriteObject[];

        constructor() {
            var canvas = <HTMLCanvasElement> document.getElementById("canvas");
            this.ctx = canvas.getContext("2d");
        }

        Update() {
            
        }

        Draw(game: Game) {
            
        }
    }
}