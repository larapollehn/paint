import Gear from "./Gear";
import {CANVAS, CONTEXT} from "../Globals";
// @ts-ignore
import brush_icon from '../../public/assets/icons/tools.png';
import RGB from "../Geo/RGB";
import ParameterList from "../Parameters";

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

    finish(parameterList: ParameterList): Function {
        const self = this;
        function finishDrawing() {
            self.painting = false;
            parameterList.undoButton.saveImage();
            CONTEXT.beginPath();
        }
        return finishDrawing;
    }

    draw(parameterList): Function {
        const self = this;
        const bounds = CANVAS.getBoundingClientRect();
        function toDraw(event) {
            if (self.painting) {
                CONTEXT.lineWidth = parameterList.lineWidth.width;
                CONTEXT.lineCap = 'round';
                CONTEXT.lineTo(event.pageX-bounds.left-scrollX, event.pageY-bounds.top-scrollY);
                CONTEXT.strokeStyle = parameterList.color.rgbValue;
                CONTEXT.stroke();
                CONTEXT.beginPath();
                CONTEXT.moveTo(event.pageX-bounds.left-scrollX, event.pageY-bounds.top-scrollY);
            }
        }
        return toDraw;
    }

    reset() {
        this.painting = false;
    }
}