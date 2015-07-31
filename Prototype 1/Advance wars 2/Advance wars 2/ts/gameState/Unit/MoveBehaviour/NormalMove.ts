module AdvanceWars {
    export class NormalMove implements IMoveBehaviour {
        currentAnimation:string = "north";

        constructor(private rectangle: Rectangle, private northAnimation: Action, private eastAnimation: Action, private southAnimation: Action, private westAnimation: Action) {
        }

        move(path: Tile[]) {
            
        }
    }
} 