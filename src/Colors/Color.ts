import RGB from "../Geo/RGB";

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

    getRGB(): RGB{
        return new RGB(this.R, this.G, this.B);
    }

    get rgbValue(): string{
        return `rgb(${this.R}, ${this.G}, ${this.B})`;
    }
}