module AdvanceWars {
    export class MoveTile {
        rectangle:ClickableRectangle;
        animation: Animation;
        public shortestDistance:number;

        constructor(public tile: Tile, public unit: Unit, public previous: MoveTile, public collection: MoveTileCollection, public distance = 0) {
            this.rectangle = new ClickableRectangle(tile.position.x, tile.position.y, 50, 50);
            var self = this;
            this.rectangle.click = function() { self.Move(self); };
            var image = new Image();
            image.src = "assets/images/move.png";
            this.animation = new Animation(image, 50, 50, this.rectangle, 1, 1000);
        }

        Update(gametime:number) {
            this.animation.Update(gametime);
        }

        Draw(ctx:CanvasRenderingContext2D, gametime:number) {
            this.animation.Draw(ctx, gametime);
        }

        Move(self:MoveTile) {
            self.collection.Move(self);
        }

        Dispose() {
            this.rectangle.Dispose();
        }

    }
}