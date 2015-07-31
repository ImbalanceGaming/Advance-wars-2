module AdvanceWars {
    export class Moving {
        constructor(public unit: Unit, public path: Tile[], public moveSpeed:number) {
            
        }

        Update() {
            
        }

        Draw() {
            
        }

        MoveAnimation() {

            if (this.path.length == 0) {
                this.unit.state = "iddle";
                this.unit.animationList.PlayAnimation("iddle");
                return;
            }

            var desinationTile = this.path[this.path.length - 1];
            var distance = 0;
            if ((distance = this.unit.rectangle.x - desinationTile.position.x) < 0) {
                this.unit.rectangle.x += Math.min(this.moveSpeed, Math.abs(distance));
                if (this.unit.animationList.currentAnimationKey != "moveRight") {
                    this.unit.animationList.PlayAnimation("moveRight");
                }
            }
            else if ((distance = this.unit.rectangle.x - desinationTile.position.x) > 0) {
                this.unit.rectangle.x -= Math.min(this.moveSpeed, Math.abs(distance));
                this.unit.animationList.PlayAnimation("moveLeft");
                if (this.unit.animationList.currentAnimationKey != "moveLeft") {
                    this.unit.animationList.PlayAnimation("moveLeft");
                }
            }
            else if ((distance = this.unit.rectangle.y - desinationTile.position.y) < 0) {
                this.unit.rectangle.y += Math.min(this.moveSpeed, Math.abs(distance));
            }
            else if ((distance = this.unit.rectangle.y - desinationTile.position.y) > 0) {
                this.unit.rectangle.y -= Math.min(this.moveSpeed, Math.abs(distance));
            }

            if (this.unit.rectangle.x == desinationTile.position.x && this.unit.rectangle.y == desinationTile.position.y)
                this.path.pop();
        }
    }
} 