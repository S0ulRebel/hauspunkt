export type BathroomElementType = 'toilet' | 'urinal' | 'sink' | 'bidet';

export default class BathroomElement {
    type: BathroomElementType;
    width: number;
    x: number;

    constructor(t: BathroomElementType, w: number, x: number) {
        this.type = t;
        this.width = w;
        this.x = x;
    }

}