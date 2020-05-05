import Gear from "./Gear";
import {CONTEXT} from "../Globals";
import {Color} from "../Colors/Color";
// @ts-ignore
import brush_icon from '../../public/assets/icons/tools.png';

export default class Brush extends Gear {
    painting: boolean = false;
    currentColor: Color;

    constructor() {
        super(brush_icon);
    }

    start(color): Function {
        const self = this;
        function startDrawing(event) {
            self.currentColor = color;
            self.painting = true;
            self.draw(event);
        }
        return startDrawing;
    }

    finish(): void {
        console.log('end');
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
}