import RGB from "../Geo/RGB";

/**
 * class represents Colors as RGB
 * R = red
 * G = green
 * B = blue
 */
export class Color {
    public readonly id: string;
    public readonly R: number;
    public readonly G: number;
    public readonly B: number;

    constructor(id: string, R: number, G: number, B: number) {
        this.id = id;
        this.R = R;
        this.G = G;
        this.B = B;
    }

    /**
     * return an RGB-Object based on the RGB-values of the given Color
     */
    getRGB(): RGB{
        return new RGB(this.R, this.G, this.B);
    }

    /**
     * returns RGB-Value of Color as a String, valid for use as style-property in css
     */
    get rgbValue(): string{
        return `rgb(${this.R}, ${this.G}, ${this.B})`;
    }

    compareTo(color: Color): boolean{
        return this.R === color.R && this.G === color.G && this.B === color.B;
    }
}