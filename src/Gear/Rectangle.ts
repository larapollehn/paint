import Gear from "./Gear";
import {Color} from "../Colors/Color";
import rect_icon from "../../public/assets/icons/rect.png";
import {CONTEXT} from "../Globals";

export default class Rectangle extends Gear{
    constructor() {
        super(rect_icon);
    }

    start(color): Function {
        function startDrawing(event){
            CONTEXT.beginPath();
            CONTEXT.fillStyle = color.rgbValue;
            CONTEXT.fillRect(event.clientX, event.clientY, 20, 20);
        }
       return startDrawing;
    }

    finish(): void {
    }

    draw():void {
    }



}