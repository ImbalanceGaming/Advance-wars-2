///<reference path='SpriteObject.ts' />

module AdvanceWars {

    export class Animation  {
        private currentTime: number = 0;
        private previousTime: number = 0;
        private currentAnimationTime: number = 0;
        private currentFrame: number = 0;
        private frameWidth: number;
        private frameHeight: number;

        constructor(public image: HTMLElement, public width:number, public height:number, public rectangle:Rectangle, public frames: number, public duration: number, public loop = false) {
            this.frameWidth = width / frames;
            this.frameHeight = height;
        }

        Update(gameTime: number) {
            this.previousTime = this.currentTime;
            this.currentTime = gameTime;
            var elapsedTime = this.currentTime - this.previousTime;
            this.currentAnimationTime = (this.currentAnimationTime + elapsedTime) % this.duration;
            this.currentFrame = Math.floor(this.frames * (this.currentAnimationTime / this.duration));
        }

        Draw(ctx: CanvasRenderingContext2D, gameTime: number) {
            ctx.drawImage(this.image, this.frameWidth * this.currentFrame, 0, this.frameWidth, this.frameHeight, this.rectangle.x, this.rectangle.y, this.rectangle.width, this.rectangle.height);
        }

        Reset() {
            this.currentAnimationTime = 0;
        }
    }
}


/*
frames : number;
firstFrame : point;
frameWidth : number;
frameHeight : number;
frameRows : number;
frameCollums : number;
duration : number;
loop: bool;
*/