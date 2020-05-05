import Gear from "./Gear";
import {Color} from "../Colors/Color";
import {CONTEXT} from "../Globals";
import triangle_icon from "../../public/assets/icons/triangle.png";

export default class Triangle extends Gear{
    currentColor:Color;

    constructor() {
        super(triangle_icon);
    }

    start(event): void {
        CONTEXT.beginPath();
        CONTEXT.fillStyle = this.currentColor.rgbValue;
        CONTEXT.moveTo(event.clientX, event.clientY);
        CONTEXT.lineTo((event.clientX+50), event.clientY);
        CONTEXT.lineTo((event.clientX+25) ,(event.clientY-50));
        CONTEXT.fill();
    }

    finish(event?): void {
    }

    draw(color: Color) {
        this.currentColor= color;
    }
}