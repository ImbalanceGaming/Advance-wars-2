module AdvanceWars {
    export interface IBehavior {
        revert: () => void;
        instantiate: () => void;
    }
} 