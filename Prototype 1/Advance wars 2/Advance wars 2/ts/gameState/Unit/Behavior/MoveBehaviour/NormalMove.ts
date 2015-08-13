module AdvanceWars {
    export class NormalMove implements IBehavior {
        private moveTileCollection: MoveTileCollection;
        currentAnimation:string = "north";
        pathIndex: number;
        unitPreviousPosition: Tile;


        constructor(private unit: Unit, private path: Tile[], private northAnimation: string, private eastAnimation: string, private southAnimation: string, private westAnimation: string) {
        }

        move(path: Tile[]) {
            this.pathIndex = 0;
            this.unitPreviousPosition = this.unit.tile;
        }

        revert() {
            this.unit.tile.unit = null;
            this.unit.tile = this.unitPreviousPosition;
            this.unitPreviousPosition.unit = this.unit;
        }

        instantiate() {
            this.moveTileCollection = new MoveTileCollection(this.unit, this.move);
        }

        update(gameTime: number) {
            if (this.moveTileCollection != null)
                this.moveTileCollection.Update(gameTime);
        }

        draw(ctx: CanvasRenderingContext2D, gameTime: number) {
            if (this.moveTileCollection != null)
                this.moveTileCollection.Draw(ctx, gameTime);
        }

    }
} 