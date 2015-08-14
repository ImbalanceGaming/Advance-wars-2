module AdvanceWars {
    export interface IBehavior extends IUpdate, IDraw {
        revert: () => void;
        instantiate: () => void;
    }
} 