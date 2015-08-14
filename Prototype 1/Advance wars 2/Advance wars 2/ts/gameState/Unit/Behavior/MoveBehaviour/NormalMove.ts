 module AdvanceWars {
    export class NormalMove implements IBehavior {
        private moveTileCollection: MoveTileCollection;
        private currentAnimation:string;
        private pathIndex: number;
        private unitPreviousPosition: Tile;
        private animationActive: Boolean = false;
        private path: Tile[];
        private self: NormalMove;


        constructor(private unit: Unit, private behaviourTree: BehaviorTRee, private northAnimation: string, private eastAnimation: string, private southAnimation: string, private westAnimation: string, private iddleAnimation: string) {
            this.currentAnimation = iddleAnimation;
            this.self = this;
        }

        move(path: Tile[], self: NormalMove) {
            self.moveTileCollection = null;
            self.unit.tile.unit = null;
            self.unit.tile = path[path.length - 1];
            path[path.length - 1].unit = self.unit;
            self.pathIndex = 0;
            self.unitPreviousPosition = self.unit.tile;
            self.path = path;
            self.animationActive = true;
        }

        revert() {
            this.unit.tile.unit = null;
            this.unit.tile = this.unitPreviousPosition;
            this.unitPreviousPosition.unit = this.unit;
        }

        instantiate() {
            var self = this;
            this.moveTileCollection = new MoveTileCollection(this.unit, (path: Tile[]) => { self.move(path,self) });
            this.animationActive = false;
        }

        update(gameTime: number) {
            if (this.moveTileCollection != null)
                this.moveTileCollection.Update(gameTime);

            if (this.animationActive)
                this.doAnimation();
        }

        doAnimation() {
            if (this.pathIndex == this.path.length) {
                this.animationEnd();                
                return;
            }

            var desinationTile = this.path[this.pathIndex];
            var distanceVector = desinationTile.position.minus(new Point(this.unit.rectangle.x, this.unit.rectangle.y));
            var animations = [this.northAnimation, this.eastAnimation, this.southAnimation, this.westAnimation];
            var directions = [
                new Point(0, Math.max(0, distanceVector.y)), //north
                new Point(Math.max(0, distanceVector.x), 0), //east
                new Point(0, Math.min(0, distanceVector.y)), //south
                new Point(Math.min(0, distanceVector.x), 0)  //west
            ]

            for (var i = 0; i < 4; i++)
            {
                var directionVector = directions[i];
                var distance = directionVector.length();
                if (distance > 0) {
                    // Move to the direction but do not overshoot the destination.
                    this.unit.rectangle.x += Math.max(-this.unit.moveSpeedAnimation, (Math.min(this.unit.moveSpeedAnimation, directionVector.x)));
                    this.unit.rectangle.y += Math.max(-this.unit.moveSpeedAnimation, (Math.min(this.unit.moveSpeedAnimation, directionVector.y)));
                    if (this.currentAnimation != animations[i]) {
                        this.currentAnimation = animations[i];
                        this.unit.animationList.PlayAnimation(animations[i]);
                    }
                }
            }

            if (this.unit.rectangle.x == desinationTile.position.x && this.unit.rectangle.y == desinationTile.position.y) {
                this.pathIndex++;
            }
        }

        animationEnd() {
            this.unit.animationList.PlayAnimation(this.iddleAnimation);
            this.currentAnimation = this.iddleAnimation;
            this.animationActive = false;
            /// TODO: add next behavior call
            this.behaviourTree.active = false;
        }

        draw(ctx: CanvasRenderingContext2D, gameTime: number) {
            if (this.moveTileCollection != null && this.animationActive == false)
                this.moveTileCollection.Draw(ctx, gameTime);
        }

    }
} 