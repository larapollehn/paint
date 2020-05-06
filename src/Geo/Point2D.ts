import RGB from "./RGB";
import {CANVAS, CONTEXT} from "../Globals";

export default class Point2D {
    public readonly x: number;
    public readonly y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    /**
     * returns the RGB-Color of the Pixel on the Canvas at the Position of the specific Point
     */
    get color(): RGB {
        const data = CONTEXT.getImageData(this.x, this.y, 1, 1).data;
        return new RGB(data[0], data[1], data[2]);
    }

    getRgbValue(color:RGB): string{
        return `rgb(${color.R}, ${color.G}, ${color.B})`
    }

    /**
     * sets the color of a specific Point based on the RGB-Values of the given Color
     * @param color is the RGB-Object holding the needed color-values
     */
    set color(color: RGB) {
        const pixel = CONTEXT.createImageData(1, 1);
        let data = pixel.data;
        data[0] = color.R;
        data[1] = color.G;
        data[2] = color.B;
        data[3] = 255;
        CONTEXT.putImageData(pixel, this.x, this.y);
    }

    /**
     * checks if a Point is within the frame of the Canvas or not
     */
    isValid(): boolean {
        return (this.x < CANVAS.width && this.y < CANVAS.height && this.x >= 0 && this.y >= 0);
    }

}