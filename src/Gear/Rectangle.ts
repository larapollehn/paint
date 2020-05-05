import Gear from "./Gear";
import {Color} from "../Colors/Color";
import rect_icon from "../../public/assets/icons/rect.png";
import {CONTEXT} from "../Globals";

export default class Rectangle extends Gear{
    currentColor: Color;

    constructor() {
        super(rect_icon);
    }

    start(event): void {
        CONTEXT.beginPath();
        CONTEXT.fillStyle = this.currentColor.rgbValue;
        CONTEXT.fillRect(event.clientX, event.clientY, 20, 20);
    }

    finish(event): void {
    }

    draw(color: Color) {
        this.currentColor = color;
    }



}