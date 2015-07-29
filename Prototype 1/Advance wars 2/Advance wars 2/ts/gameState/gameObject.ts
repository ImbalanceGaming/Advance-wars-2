module AdvanceWars {
    export interface  IGameObject {
        Update: UpdateFunction;
        Draw: DrawFunction;
    }

    export interface UpdateFunction { (gametime: number): void; }
    export interface DrawFunction { (ctx:CanvasRenderingContext2D, gametime: number): void; }
} 