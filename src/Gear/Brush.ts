import Gear from "./Gear";
import {CONTEXT} from "../Globals";
// @ts-ignore
import brush_icon from '../../public/assets/icons/tools.png';
import RGB from "../Geo/RGB";

export default class Brush extends Gear {
    painting: boolean = false;

    constructor() {
        super(brush_icon);
    }

    start(): Function {
        CONTEXT.beginPath();
        const self = this;
        function startDrawing() {
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

    draw(parameterList): Function {
        const self = this;
        function toDraw(event) {
            if (self.painting) {
                CONTEXT.lineWidth = parameterList.lineWidth.width;
                CONTEXT.lineCap = 'round';
                CONTEXT.lineTo(event.clientX, event.clientY);
                CONTEXT.strokeStyle = parameterList.color.rgbValue;
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