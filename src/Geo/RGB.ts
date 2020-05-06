/**
 * represents a RGB-Color
 * R = red
 * G = green
 * B = blue
 */
export default class RGB{
    public readonly R: number;
    public readonly G: number;
    public readonly B: number;
    public readonly A: number = 255;


    constructor(R: number, G: number, B: number) {
        this.R = R;
        this.G = G;
        this.B = B;
    }
}