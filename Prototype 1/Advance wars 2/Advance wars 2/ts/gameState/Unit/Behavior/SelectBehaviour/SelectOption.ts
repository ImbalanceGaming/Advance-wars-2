 module AdvanceWars {
     export class SelectOption {
         constructor(public rectangle: ClickableRectangle, private name: string, private behaviour: IBehavior, private condition: () => boolean, private behaviourTree: BehaviorTree) {
             var self = this;
             this.rectangle.click = () => {
                 self.behaviourTree.current = behaviour;
             };
         }

         update(gameTime: number) {
             if (this.condition)
                 this.rectangle.update(gameTime);
         }

         draw(ctx: CanvasRenderingContext2D, gameTime: number) {
             if (this.condition)
                ctx.fillText(this.name, this.rectangle.x, this.rectangle.y);
         }
    }
} 