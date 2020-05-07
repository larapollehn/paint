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

    start(color, lineWidth): Function {
        CONTEXT.beginPath();
        const self = this;
        function startDrawing(event) {
            self.currentColor = color;
            self.painting = true;
        }
        return startDrawing;
    }

    finish(): Function {
        const self = this;
        function finishDrawing() {
            self.painting = false;
            CONTEXT.beginPath();
        }
        return finishDrawing;
    }

    draw(lineWidth): Function {
        const self = this;
        function toDraw(event) {
            if (self.painting) {
                CONTEXT.lineWidth = lineWidth;
                CONTEXT.lineCap = 'round';
                CONTEXT.lineTo(event.clientX, event.clientY);
                CONTEXT.strokeStyle = self.currentColor.rgbValue;
                CONTEXT.stroke();
                CONTEXT.beginPath();
                CONTEXT.moveTo(event.clientX, event.clientY);
            }
        }
        return toDraw;
    }

    reset() {
        this.painting = false;
    }
}