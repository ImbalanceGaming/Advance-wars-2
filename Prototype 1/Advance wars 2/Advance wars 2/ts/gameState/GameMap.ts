
module AdvanceWars {
    export class GameMap {
        name: string;
        tiles: Tile[][] = [];

        constructor(name: string) {
            this.name = name;
            this.initMap();
        }

        Update(gameTime: number) {
            this.tiles.forEach(a => { a.forEach(tile => { tile.Update(gameTime); }); });
        }

        Draw(ctx: CanvasRenderingContext2D, gameTime: number) {
            this.tiles.forEach(a => { a.forEach(tile => { tile.Draw(ctx, gameTime); }); });
        }

        initMap() {
            for (var x = 0; x < 10; x++) {
                this.tiles.push([]);
                for (var y = 0; y < 10; y++) {
                    this.tiles[x].push(new Tile("normal", new Point(x,y)));
                }
            }
        }
    }
}
