import Gear from "./Gear";
import {CONTEXT} from "../Globals";
// @ts-ignore
import triangle_icon from "../../public/assets/icons/triangle.png";
import ParameterList from "../Parameters";

export default class Triangle extends Gear{
    constructor() {
        super(triangle_icon);
    }

    /**
     * draws a triangle at the current position of the mouse-cursor
     * @param parameterList sets the color of the drawn triangle
     */
    start(parameterList: ParameterList): Function {
        const leftDrift = (((parameterList.lineWidth.width*10)+10)/2);
        const rightDrift = ((parameterList.lineWidth.width*10)+10);
        function startDrawing(event){
            CONTEXT.beginPath();
            CONTEXT.fillStyle = parameterList.color.rgbValue;
            CONTEXT.moveTo(event.clientX-leftDrift, event.clientY+leftDrift);
            CONTEXT.lineTo(event.clientX+rightDrift-leftDrift, event.clientY+leftDrift);
            CONTEXT.lineTo(event.clientX,(event.clientY-rightDrift+leftDrift));
            CONTEXT.fill();
        }
        return startDrawing;
    }

    finish(): void {
    }

    draw() {
    }

    reset() {
    }
}