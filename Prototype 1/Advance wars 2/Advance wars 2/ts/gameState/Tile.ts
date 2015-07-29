module AdvanceWars {
    export class Tile {
        unit: Unit;
        animationList: AnimationList;
        position: Point; 

        constructor(public type: string, public index: Point) {
            this.position = new Point(index.x * 50, index.y * 50);

            // temp
            var random = Math.random() * 100;
            
            if (random < 5)
                this.unit = new Unit("soldier",this);
            // temp

        }

        Update(gameTime: number) {
            if (this.animationList != null) this.animationList.Update(gameTime);
            if (this.unit != null) this.unit.Update(gameTime);
        }

        Draw(ctx: CanvasRenderingContext2D, gameTime: number) {
            if (this.animationList != null) this.animationList.Draw(ctx, gameTime);
            if (this.unit != null) this.unit.Draw(ctx, gameTime);
        }

        GetAdjacentTiles() {
            var tiles = [];

            if (this.index.x - 1 >= 0)
                tiles.push(Game.current.map.tiles[this.index.x - 1][this.index.y]);
            if (this.index.y - 1 >= 0)
                tiles.push(Game.current.map.tiles[this.index.x][this.index.y-1]);
            if (this.index.x + 1 < Game.current.map.tiles.length)
                tiles.push(Game.current.map.tiles[this.index.x + 1][this.index.y]);
            if (this.index.y + 1 < Game.current.map.tiles[0].length)
                tiles.push(Game.current.map.tiles[this.index.x][this.index.y+1]);

            return tiles;
        }
    }
} 