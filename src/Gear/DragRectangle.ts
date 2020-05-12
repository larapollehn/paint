import Gear from "./Gear";
import {BOUNDS, CONTEXT} from "../Globals";
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
            self.startPoint = new Point2D(event.clientX-BOUNDS.left-scrollX, event.clientY-BOUNDS.top-scrollY);
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
            CONTEXT.lineTo(event.clientX-BOUNDS.left-scrollX, self.startPoint.y);
            CONTEXT.lineTo(self.startPoint.x, event.clientY-BOUNDS.top-scrollY);
            CONTEXT.moveTo(event.clientX-BOUNDS.left-scrollX, event.clientY-BOUNDS.top-scrollY);
            CONTEXT.lineTo(event.clientX-BOUNDS.left-scrollX, self.startPoint.y);
            CONTEXT.lineTo(self.startPoint.x, event.clientY-BOUNDS.top-scrollY);
            CONTEXT.fill();
            parameterList.undoButton.saveImage();
        }
        return finishDrawing;
    }

    draw() {
    }

    reset() {
        this.startPoint = null;
    }
}