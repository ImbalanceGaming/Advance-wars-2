///<reference path='SpriteObject.ts' />

module AdvanceWars {

    export class AnimatedSpriteStripObject extends SpriteObject {
        private currentTime: number = 0;
        private previousTime: number = 0;
        private currentAnimationTime: number = 0;
        private currentFrame: number = 0;
        private frameWidth: number;
        private frameHeight: number;

        constructor(position: Point, image: HTMLElement, width:number, height:number, public frames: number, public duration: number, public loop = false) {
            super(position, image, width, height);
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
            ctx.drawImage(this.image, this.frameWidth * this.currentFrame, 0, this.frameWidth, this.frameHeight, this.position.x, this.position.y, this.frameWidth, this.frameHeight);
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