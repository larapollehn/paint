import Gear from "./Gear";
// @ts-ignore
import rect_icon from "../../public/assets/icons/rect.png";
import {BOUNDS, CONTEXT} from "../Globals";
import ParameterList from "../Parameters";

export default class Rectangle extends Gear{
    constructor() {
        super(rect_icon);
    }

    /**
     * draws a rectangle on the canvas at the current Position of the mouse-cursor
     * @param parameterList hold the parameter, that can be changes by the user
     */
    start(parameterList: ParameterList): Function {
        function startDrawing(event){
            CONTEXT.beginPath();
            CONTEXT.fillStyle = parameterList.color.rgbValue;
            CONTEXT.fillRect(event.clientX-((parameterList.lineWidth.width *10)/2)-BOUNDS.left-scrollX, event.clientY-((parameterList.lineWidth.width *10)/2)-BOUNDS.top-scrollY, parameterList.lineWidth.width *10, parameterList.lineWidth.width *10);
            parameterList.undoButton.saveImage();
        }
       return startDrawing;
    }

    finish(): void {
    }

    draw():void {
    }

    reset() {
    }
}