module AdvanceWars {

    export class Game {
        fps: number = 30;
        gameTime: number = 0;
        timeStep: number;
        map: GameMap;
        ctx: CanvasRenderingContext2D;
        unit1: SpriteObject;
        unit2: AnimatedSpriteStripObject;
        intervalId:number;

        constructor() {

            this.timeStep = Math.floor(1000/ this.fps);

            this.map = new GameMap("joost");
            var canvas = <HTMLCanvasElement> document.getElementById("canvas");
            this.ctx = canvas.getContext("2d");

            var image = new Image();
            image.src = "assets/images/test.png";
            var image2 = new Image();
            image2.src = "assets/images/strip.png";
            this.unit1 = new SpriteObject(new Point(0, 0), image,0,0);
            this.unit2 = new AnimatedSpriteStripObject(new Point(0, 0), image2, 640, 64, 10, 1000, true);

            this.intervalId = setInterval(() => { this.gameLoop(this); }, this.timeStep);
        }

        gameLoop(gameObject: Game) {
            this.gameTime += this.timeStep;
            this.update(this.gameTime);
            this.draw(this.gameTime);
        }

        update(gameTime: number) {
            console.log("update");
            this.unit2.update(this.gameTime);
        }

        draw(gameTime: number) {
            this.unit2.draw(this.ctx, this.gameTime);
        }
    }
}
