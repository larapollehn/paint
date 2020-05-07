import Gear from "./Gear";
import {CONTEXT} from "../Globals";
// @ts-ignore
import dragRec_icon from "../../public/assets/icons/drag_rect.png";
import Point2D from "../Geo/Point2D";
import RGB from "../Geo/RGB";
import ParameterList from "../Parameters";

export default class DragRectangle extends Gear{
    startPoint: Point2D;

    constructor() {
        super(dragRec_icon);
    }

    start(color): Function {
        const self = this;
        function startDrawing(event) {
            self.startPoint = new Point2D(event.clientX, event.clientY);
        }
        return startDrawing;
    }

    /**
     * draws a filled rectangle, with the startPoint and current Position of the mouse-cursor
     * as opposite corners
     * @param parameterList hold the parameter that can be changed by the user
     */
    finish(parameterList: ParameterList): Function {
        const self = this;
        function finishDrawing(event){
            CONTEXT.beginPath();
            CONTEXT.fillStyle = parameterList.color.rgbValue;
            CONTEXT.moveTo(self.startPoint.x, self.startPoint.y);
            CONTEXT.lineTo(event.clientX, self.startPoint.y);
            CONTEXT.lineTo(self.startPoint.x, event.clientY);
            CONTEXT.moveTo(event.clientX, event.clientY);
            CONTEXT.lineTo(event.clientX, self.startPoint.y);
            CONTEXT.lineTo(self.startPoint.x, event.clientY);
            CONTEXT.fill();
        }
        return finishDrawing;
    }

    draw() {
    }

    reset() {
        this.startPoint = null;
    }
}