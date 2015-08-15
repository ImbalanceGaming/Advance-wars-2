 module AdvanceWars {
     export class SelectBehaviour implements IBehavior {
         public selectOptions: SelectOption[];

         constructor(private unit: Unit) {
         }

         instantiate() {
             this.selectOptions.forEach(s => {
                 s.rectangle.x = this.unit.rectangle.x;
             });
         }

         revert() {
         }

         update(gameTime: number) {
             this.selectOptions.forEach(s => { s.update(gameTime); });
         }

         draw(ctx: CanvasRenderingContext2D, gameTime: number) {
             this.selectOptions.forEach(s => { s.update(gameTime); });
         }
    }
} 