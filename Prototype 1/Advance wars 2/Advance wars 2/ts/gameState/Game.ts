module AdvanceWars {

    export class Game {
        static current: Game;
        static canvas: Canvas;
        fps: number = 30;
        gameTime: number = 0;
        timeStep: number;
        ctx: CanvasRenderingContext2D;
        intervalId: number;
        map: GameMap;
        canvas: HTMLCanvasElement;
        canvasLocal: Canvas;
        gameObjects:IGameObject[] = [];
        

        constructor() {
            Game.current = this;
            this.timeStep = Math.floor(1000/ this.fps);
            this.canvas = <HTMLCanvasElement> document.getElementById("canvas");
            this.ctx = this.canvas.getContext("2d");
            
            this.intervalId = setInterval(() => { this.gameLoop(this); }, this.timeStep);
            
            this.canvasLocal = new Canvas(this.canvas);
            Game.canvas = this.canvasLocal;
            // temp

            this.map = new GameMap("dude");

            // temp

        }

        gameLoop(gameObject: Game) {
            this.gameTime += this.timeStep;
            this.update(this.gameTime);
            this.draw(this.gameTime);
        }

        update(gameTime: number) {
            this.canvasLocal.Update();
            this.map.Update(gameTime);
            for (var i = 0; i < this.gameObjects.length; i++)
                if (this.gameObjects[i] == null) {
                    this.gameObjects.splice(i, 1);
                    i--;
                }
            this.gameObjects.forEach(o => { o.Update(gameTime); });
        }

        draw(gameTime: number) {
            this.ctx.clearRect(0,0,this.canvas.clientWidth,this.canvas.clientHeight);
            this.map.Draw(this.ctx, gameTime);
            this.gameObjects.forEach(o => { o.Draw(this.ctx, gameTime); });
        }
    }
}
