import RGB from "./RGB";
import {CANVAS, CONTEXT} from "../Globals";

export default class Point2D {
    public readonly x: number;
    public readonly y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    distance(otherPoint: Point2D): number {
        return 0;
    }

    get color(): RGB {
        const data = CONTEXT.getImageData(this.x, this.y, 1, 1).data;
        return new RGB(data[0], data[1], data[2]);
    }

    set color(color: RGB) {
        const pixel = CONTEXT.createImageData(1, 1);
        let data = pixel.data;
        data[0] = color.R;
        data[1] = color.G;
        data[2] = color.B;
        CONTEXT.putImageData(pixel, this.x, this.y);
    }

    isValid(): boolean {
        return (this.x < CANVAS.width && this.y < CANVAS.height && this.x >= 0 && this.y >= 0);
    }

}