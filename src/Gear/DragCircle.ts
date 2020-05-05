import Gear from "./Gear";
import {Color} from "../Colors/Color";
import {CONTEXT} from "../Globals";
import drag_arc from "../../public/assets/icons/drag_arc.png";


export default class DragCircle extends Gear{
    currentColor: Color;
    startPoint: Array<number>;

    constructor() {
        super(drag_arc);
    }

    start(event): void {
        this.startPoint = [event.clientX, event.clientY];
    }

    finish(event): void {
        const radius = Math.sqrt(Math.pow(event.clientX - this.startPoint[0], 2) + Math.pow(event.clientY - this.startPoint[1],2))/2
        CONTEXT.beginPath();
        CONTEXT.arc((event.clientX + this.startPoint[0])/2, (event.clientY + this.startPoint[1])/2, radius, 0, 2* Math.PI);
        CONTEXT.strokeStyle = this.currentColor.rgbValue;
        CONTEXT.stroke();
    }

    draw(color: Color) {
        this.currentColor = color;
    }
}