module AdvanceWars {
    export class MoveTileCollection {
        moveTiles: MoveTile[] = [];
        constructor(private unit: Unit, private moveAction: (tiles:Tile[]) => void) {

            var firstMoveTile = new MoveTile(unit.tile, unit, null, this, 0);
            var explore = [firstMoveTile];
            var explored = [];
            for (var i = 0; i < Game.current.map.tiles.length; i++) {
                explored.push([]);
                for (var j = 0; j < Game.current.map.tiles[i].length; j++)
                    explored[i].push(9999);
            }

            while (explore.length > 0) {
                // sort
                var exploreTile = explore.pop();
                this.Scout(exploreTile,this.moveTiles,explore,explored);
                explore.sort((t1, t2) => { return t2.previous.distance - t1.previous.distance});
            }
        }

        // TODO: Needs refactoring
        Scout(moveTile: MoveTile, moveTiles: MoveTile[], explore: MoveTile[], explored:number[][]) {
            var distance = moveTile.previous == null ? 0 : moveTile.previous.distance + 1;
            if (distance <= this.unit.moveSpeed && distance < explored[moveTile.tile.index.x][moveTile.tile.index.y]) {
                explored[moveTile.tile.index.x][moveTile.tile.index.y] = distance;
                moveTile.distance = distance;
                moveTiles.push(moveTile);
                var adjacentTiles = moveTile.tile.GetAdjacentTiles();
                adjacentTiles.forEach(t => {
                    explore.push(new MoveTile(t, this.unit, moveTile, this));
                });
            } else {
                moveTile.Dispose();
            }
        }

        Dispose() {
            this.moveTiles.forEach(m => { m.Dispose(); });
            
        }

        Update(gametime: number) {
            this.moveTiles.forEach(m => m.Update(gametime));
        }
        Draw(ctx: CanvasRenderingContext2D, gametime: number) {
            this.moveTiles.forEach(m => m.Draw(ctx, gametime));
        }

        Move(moveTile: MoveTile) {
            var moveTileCurrent = moveTile;
            var path = [moveTile.tile];
            while (moveTileCurrent.previous != null) {
                path.push(moveTileCurrent.previous.tile);
                moveTileCurrent = moveTileCurrent.previous;
            }
            path.reverse();
            this.Dispose();
            this.moveAction(path);
            
        }
    }
}