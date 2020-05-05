import Gear from "./Gear";
import {Color} from "../Colors/Color";
import {CONTEXT} from "../Globals";
// @ts-ignore
import triangle_icon from "../../public/assets/icons/triangle.png";

export default class Triangle extends Gear{
    constructor() {
        super(triangle_icon);
    }

    start(color): Function {
        function startDrawing(event){
            CONTEXT.beginPath();
            CONTEXT.fillStyle = color.rgbValue;
            CONTEXT.moveTo(event.clientX, event.clientY);
            CONTEXT.lineTo((event.clientX+50), event.clientY);
            CONTEXT.lineTo((event.clientX+25) ,(event.clientY-50));
            CONTEXT.fill();
        }
        return startDrawing;
    }

    finish(): void {
    }

    draw() {
    }
}