module AdvanceWars {
    export class BehaviorTree {
        current: IBehavior;
        root: IBehavior;
        active: boolean;
        
        activate() {
            this.active = true;
            this.current = this.root;
            this.current.instantiate();
        }

        update(gameTime: number) {
            if (this.active)
                this.current.update(gameTime);
        }

        draw(ctx: CanvasRenderingContext2D, gameTime: number) {
            if (this.active)
                this.current.draw(ctx, gameTime);
        }

    }
} 