import Gear from "./Gear";
import {Color} from "../Colors/Color";
import {CONTEXT} from "../Globals";
import dragRec_icon from "../../public/assets/icons/drag_rect.png";

export default class DragRectangle extends Gear{
    currentColor: Color;
    startPoint: Array<number>;

    constructor() {
        super(dragRec_icon);
    }

    start(event): void {
        this.startPoint = [event.clientX, event.clientY];
    }

    finish(event): void {
        CONTEXT.beginPath();
        CONTEXT.fillStyle = this.currentColor.rgbValue;
        CONTEXT.moveTo(this.startPoint[0], this.startPoint[1]);
        CONTEXT.lineTo(event.clientX, this.startPoint[1]);
        CONTEXT.lineTo(this.startPoint[0], event.clientY);
        CONTEXT.moveTo(event.clientX, event.clientY);
        CONTEXT.lineTo(event.clientX, this.startPoint[1]);
        CONTEXT.lineTo(this.startPoint[0], event.clientY);
        CONTEXT.fill();
    }

    draw(color: Color) {
        this.currentColor = color;
    }
}