import Gear from "./Gear";
import {Color} from "../Colors/Color";
import {CONTEXT} from "../Globals";
// @ts-ignore
import dragRec_icon from "../../public/assets/icons/drag_rect.png";
import Point2D from "../Geo/Point2D";

export default class DragRectangle extends Gear{
    currentColor: Color;
    startPoint: Point2D;

    constructor() {
        super(dragRec_icon);
    }

    start(color): Function {
        const self = this;
        function startDrawing(event) {
            self.currentColor = color;
            self.startPoint = new Point2D(event.clientX, event.clientY);
        }
        return startDrawing;
    }

    finish(event): void {
        CONTEXT.beginPath();
        CONTEXT.fillStyle = this.currentColor.rgbValue;
        CONTEXT.moveTo(this.startPoint.x, this.startPoint.y);
        CONTEXT.lineTo(event.clientX, this.startPoint.y);
        CONTEXT.lineTo(this.startPoint.x, event.clientY);
        CONTEXT.moveTo(event.clientX, event.clientY);
        CONTEXT.lineTo(event.clientX, this.startPoint.y);
        CONTEXT.lineTo(this.startPoint.x, event.clientY);
        CONTEXT.fill();
    }

    draw() {
    }
}