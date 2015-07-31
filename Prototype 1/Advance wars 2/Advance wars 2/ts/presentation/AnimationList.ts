module AdvanceWars {
    export class AnimationList {
        currentAnimationKey:string;
        currentAnimation: Animation;

        constructor(public animations:Animation[] = []) {
        }

        PlayAnimation(animation: string) {
            this.currentAnimationKey = animation;
            this.currentAnimation = this.animations[animation];
            this.currentAnimation.Reset();
        }

        Update(gameTime: number) {
            if (this.currentAnimation != null) this.currentAnimation.Update(gameTime);
        }

        Draw(ctx: CanvasRenderingContext2D, gameTime: number) {
            if (this.currentAnimation != null) this.currentAnimation.Draw(ctx, gameTime);
        }
    }
} 