module AdvanceWars {
    export class Unit {
        moveSpeed: number = 2;
        moveSpeedAnimation: number = 10;
        rectangle: ClickableRectangle;
        animationList: AnimationList;
        private self: Unit;
        state: string = "iddle";
        currentAnimation:string = "iddle";
        path:Tile[];

        constructor(public type: string, public tile: Tile) {
            this.rectangle = new ClickableRectangle(tile.position.x, tile.position.y,50,50);
            this.animationList = new AnimationList();
            var self = this;
            this.rectangle.click = function() {self.CreateMoveTiles(self)};
            var image = new Image();
            image.src = "assets/images/infantry_iddle.png";
            this.animationList.animations["iddle"] = new Animation(image, 64, 16, this.rectangle, 4, 1000);
            var image2 = new Image();
            image2.src = "assets/images/infantry_move_left.png";
            this.animationList.animations["moveLeft"] = new Animation(image2, 68, 17, this.rectangle, 4, 1000);
            var image3 = new Image();
            image3.src = "assets/images/infantry_move_right.png";
            this.animationList.animations["moveRight"] = new Animation(image3, 68, 17, this.rectangle, 4, 1000);
            this.animationList.PlayAnimation("iddle");
        }

        Update(gameTime:number) {
            if (this.animationList != null) this.animationList.Update(gameTime);

            switch (this.state) {
            case "iddle":
                break;
                case "moving":
                    this.MoveAnimation();
                break;
            default:
            }
        }

        Draw(ctx: CanvasRenderingContext2D, gameTime:number) {
            if (this.animationList != null) this.animationList.Draw(ctx, gameTime);
        }

        GetReachableTiles() {
            var index = this.tile.index;
            var reachableTiles = [Game.current.map.tiles[index.x + 1][index.y]];

            return reachableTiles;
        }

        CreateMoveTiles(self:Unit) {
            Game.current.gameObjects.push(new MoveTileCollection(self));
        }

        Move(tiles:Tile[]) {
            this.tile.unit = null;
            this.tile = tiles[0];
            this.path = tiles;
            this.state = "moving";
            this.tile.unit = this;
        }

        MoveAnimation() {

            if (this.path.length == 0) {
                this.state = "iddle";
                this.currentAnimation = "iddle";
                this.animationList.PlayAnimation("iddle");
                return;
            }

            var desinationTile = this.path[this.path.length - 1];
            var distance = 0;
            if ((distance = this.rectangle.x - desinationTile.position.x) < 0) {
                this.rectangle.x += Math.min(this.moveSpeedAnimation, Math.abs(distance));
                if (this.currentAnimation != "moveRight") {
                    this.currentAnimation = "moveRight";
                    this.animationList.PlayAnimation("moveRight");
                }
            }
            else if ((distance = this.rectangle.x - desinationTile.position.x) > 0) {
                this.rectangle.x -= Math.min(this.moveSpeedAnimation, Math.abs(distance));
                this.animationList.PlayAnimation("moveLeft");
                if (this.currentAnimation != "moveLeft") {
                    this.currentAnimation = "moveLeft";
                    this.animationList.PlayAnimation("moveLeft");
                }
            }
            else if ((distance = this.rectangle.y - desinationTile.position.y) < 0) {
                this.rectangle.y += Math.min(this.moveSpeedAnimation, Math.abs(distance));
            }
            else if ((distance = this.rectangle.y - desinationTile.position.y) > 0) {
                this.rectangle.y -= Math.min(this.moveSpeedAnimation, Math.abs(distance));
            }

            if (this.rectangle.x == desinationTile.position.x && this.rectangle.y == desinationTile.position.y)
                this.path.pop();
        }

        Dispose() {
            this.rectangle.Dispose();
        }
    }
} 