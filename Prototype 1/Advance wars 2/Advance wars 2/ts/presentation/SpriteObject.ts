module AdvanceWars {

    export class SpriteObject {
        constructor(public position: Point, public image: HTMLElement, public width:number, public height:number) {}

        draw(ctx: CanvasRenderingContext2D, gameTime: number) {
            ctx.drawImage(this.image, this.position.x, this.position.y);
        }
    }
}