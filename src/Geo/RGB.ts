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

    compareTo(rgb: RGB): boolean{
        return this.R === rgb.R && this.G === rgb.G && this.B === rgb.B && this.A === rgb.A;
    }
    get rgbValue(): string{
        return `rgb(${this.R}, ${this.G}, ${this.B})`;
    }
}