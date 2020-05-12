import {BOUNDS, CONTEXT} from "../Globals";
import Gear from "./Gear";
// @ts-ignore
import line_icon from "../../public/assets/icons/line.png";
import Point2D from "../Geo/Point2D";
import ParameterList from "../Parameters";

export default class LinePen extends Gear {
    painting: boolean = false;
    startPoint: Point2D;

    constructor() {
        super(line_icon);
    }

    /**
     * sets startPoint and startColor and painting
     * draws a "dot" at the Position of startPoint
     */
    start(): Function {
        const self = this;
        function startDrawing(event) {
            self.painting = true;
            self.startPoint = new Point2D(event.clientX-BOUNDS.left-scrollX, event.clientY-BOUNDS.top-scrollY);
            self.finish(event);
            self.painting = true;
        }
        return startDrawing;
    }

    /**
     * connects the startPoint with the current Position of the mouse-cursor
     * draws a Line between them
     * @param parameterList hold the parameter, that can be changes by the user
     */
    finish(parameterList: ParameterList): Function {
        const self = this;
        function finishDrawing(event) {
            self.painting = false;
            CONTEXT.beginPath();
            CONTEXT.lineWidth = 4;
            CONTEXT.lineCap = 'round';
            CONTEXT.moveTo(self.startPoint.x, self.startPoint.y);
            CONTEXT.lineTo(event.clientX-BOUNDS.left-scrollX, event.clientY-BOUNDS.top-scrollY);
            CONTEXT.strokeStyle = parameterList.color.rgbValue;
            CONTEXT.stroke();
            parameterList.undoButton.saveImage();
        }
        return finishDrawing;
    }

    draw() {
    }

    reset() {
        this.painting = false;
        this.startPoint = null;
    }
}