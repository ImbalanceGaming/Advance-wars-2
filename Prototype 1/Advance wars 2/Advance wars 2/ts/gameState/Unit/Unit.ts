module AdvanceWars {
    export class Unit {
        moveSpeed: number = 2;
        moveSpeedAnimation: number = 10;
        rectangle: ClickableRectangle;
        animationList: AnimationList;
        private self: Unit;
        state: string = "iddle";
        currentAnimation:string = "iddle";
        path: Tile[];
        behaviourTree: BehaviorTRee;

        constructor(public type: string, public tile: Tile) {
            this.rectangle = new ClickableRectangle(tile.position.x, tile.position.y,50,50);
            this.animationList = new AnimationList();
            var self = this;
            this.behaviourTree = new BehaviorTRee();
            var moveBehaviour = new NormalMove(self, this.behaviourTree, "moveLeft", "moveLeft", "moveLeft", "moveLeft", "iddle");
            this.behaviourTree.root = moveBehaviour;
            this.rectangle.click = function () { self.behaviourTree.activate(); };
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
            this.behaviourTree.update(gameTime);
        }

        Draw(ctx: CanvasRenderingContext2D, gameTime:number) {
            if (this.animationList != null) this.animationList.Draw(ctx, gameTime);
            this.behaviourTree.draw(ctx, gameTime);
        }

        GetReachableTiles() {
            var index = this.tile.index;
            var reachableTiles = [Game.current.map.tiles[index.x + 1][index.y]];

            return reachableTiles;
        }

        Move(tiles:Tile[]) {
            this.tile.unit = null;
            this.tile = tiles[0];
            this.path = tiles;
            this.state = "moving";
            this.tile.unit = this;
        }

        Dispose() {
            this.rectangle.Dispose();
        }
    }
} 