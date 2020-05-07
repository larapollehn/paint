import Gear from "./Gear";
import {CONTEXT} from "../Globals";
// @ts-ignore
import brush_icon from '../../public/assets/icons/tools.png';
import RGB from "../Geo/RGB";
import Point2D from "../Geo/Point2D";

export default class Brush extends Gear {
    painting: boolean = false;
    currentColor: RGB;

    constructor() {
        super(brush_icon);
    }

    start(color): Function {
        CONTEXT.beginPath();
        const self = this;
        function startDrawing(event) {
            self.currentColor = color;
            self.painting = true;
            self.draw(event);
        }
        return startDrawing;
    }

    finish(): void {
        this.painting = false;
        CONTEXT.beginPath();
    }

    draw(event) {
        if (this.painting) {
            CONTEXT.lineWidth = 4;
            CONTEXT.lineCap = 'round';
            CONTEXT.lineTo(event.clientX, event.clientY);
            CONTEXT.strokeStyle = this.currentColor.rgbValue;
            CONTEXT.stroke();
            CONTEXT.beginPath();
            CONTEXT.moveTo(event.clientX, event.clientY);
        }
    }

    reset() {
        this.painting = false;
    }
}