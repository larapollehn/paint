import {CONTEXT} from "../Globals";
import Gear from "./Gear";
// @ts-ignore
import line_icon from "../../public/assets/icons/line.png";
import Point2D from "../Geo/Point2D";
import RGB from "../Geo/RGB";

export default class LinePen extends Gear {
    painting: boolean = false;
    currentColor: RGB;
    startPoint: Point2D;

    constructor() {
        super(line_icon);
    }

    /**
     * sets startPoint and startColor and painting
     * draws a "dot" at the Position of startPoint
     * @param color
     */
    start(color): Function {
        const self = this;
        function startDrawing(event) {
            self.currentColor = color;
            self.painting = true;
            self.startPoint = new Point2D(event.clientX, event.clientY);
            self.finish(event);
            self.painting = true;
        }
        return startDrawing;
    }

    /**
     * connects the startPoint with the current Position of the mouse-cursor
     * draws a Line between them
     * @param event holds the current Position of the mouse-cursor
     */
    finish(event): Function {
        const self = this;
        function finishDrawing(event) {
            self.painting = false;
            CONTEXT.beginPath();
            CONTEXT.lineWidth = 4;
            CONTEXT.lineCap = 'round';
            CONTEXT.moveTo(self.startPoint.x, self.startPoint.y);
            CONTEXT.lineTo(event.clientX, event.clientY);
            CONTEXT.strokeStyle = self.currentColor.rgbValue;
            CONTEXT.stroke();
        }
        return finishDrawing;
    }

    draw() {
    }

    reset() {
        this.painting = false;
        this.startPoint = null;
        this.currentColor = null;
    }
}