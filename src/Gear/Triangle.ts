import Gear from "./Gear";
import {Color} from "../Colors/Color";
import {CONTEXT} from "../Globals";
// @ts-ignore
import triangle_icon from "../../public/assets/icons/triangle.png";

export default class Triangle extends Gear{
    constructor() {
        super(triangle_icon);
    }

    /**
     * draws a triangle at the current position of the mouse-cursor
     * @param color sets the color of the drawn triangle
     */
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