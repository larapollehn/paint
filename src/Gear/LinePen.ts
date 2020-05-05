import {Color} from "../Colors/Color";
import {CONTEXT} from "../Globals";
import Gear from "./Gear";
import line_icon from "../../public/assets/icons/line.png";

export default class LinePen extends Gear {
    currentColor: Color;
    startPoint: any;

    constructor() {
        super(line_icon);
    }

    start(event): void {
        this.startPoint = [event.clientX, event.clientY];
        this.finish(event);
    }

    finish(event): void {
        CONTEXT.beginPath();
        CONTEXT.lineWidth = 4;
        CONTEXT.lineCap = 'round';
        CONTEXT.moveTo(this.startPoint[0], this.startPoint[1]);
        CONTEXT.lineTo(event.clientX, event.clientY);
        CONTEXT.strokeStyle = this.currentColor.rgbValue;
        CONTEXT.stroke();
    }

    draw(color: Color) {
        this.currentColor = color;

    }
}