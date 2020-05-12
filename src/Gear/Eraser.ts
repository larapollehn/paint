import Gear from "./Gear";
import ParameterList from "../Parameters";
import RGB from "../Geo/RGB";
import {CONTEXT} from "../Globals";
// @ts-ignore
import eraser_icon from "../../public/assets/icons/eraser.png";

export default class Eraser extends Gear{
    painting: boolean = false;
    color: RGB = new RGB(255,255,255);

    constructor() {
        super(eraser_icon);
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

    draw(parameterList: ParameterList): void | Function {
        const self = this;
        function toDraw(event) {
            if (self.painting) {
                CONTEXT.lineWidth = parameterList.lineWidth.width*2;
                CONTEXT.lineCap = 'round';
                CONTEXT.lineTo(event.clientX, event.clientY);
                CONTEXT.strokeStyle = self.color.rgbValue;
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