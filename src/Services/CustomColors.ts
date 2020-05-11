import RGB from "../Geo/RGB";

export default class CustomColors {
    public hex_color: string;
    public R: number;
    public G: number;
    public B: number;

    constructor(hex_color) {
        this.hex_color = hex_color
        this.R = parseInt(this.hex_color[1] + this.hex_color[2], 16);
        this.G = parseInt(this.hex_color[3] + this.hex_color[4], 16);
        this.B = parseInt(this.hex_color[5] + this.hex_color[6], 16);
        this.createRGB = this.createRGB.bind(this);
    }

    createRGB(): RGB {
        return new RGB(this.R, this.G, this.B);
    }

    rgbValue(): string{
        return `rgb(${this.R}, ${this.G}, ${this.B})`;
    }

}