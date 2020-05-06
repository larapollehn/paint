import Gear from "./Gear";
import {CONTEXT} from "../Globals";
// @ts-ignore
import drag_arc from "../../public/assets/icons/drag_arc.png";
import Point2D from "../Geo/Point2D";
import RGB from "../Geo/RGB";


export default class DragCircle extends Gear{
    currentColor: RGB;
    startPoint: Point2D;

    constructor() {
        super(drag_arc);
    }

    start(color): Function {
        const self = this;
        function startDrawing(event) {
            self.currentColor = color;
            self.startPoint = new Point2D(event.clientX, event.clientY);
        }
        return startDrawing;
    }

    /**
     * draws a circle between the startPoint an the current mouse-cursor-Position of event
     * @param event holds the current position of the mouse-cursor
     */
    finish(event): void {
        const radius = Math.sqrt(Math.pow(event.clientX - this.startPoint.x, 2) + Math.pow(event.clientY - this.startPoint.y,2))/2
        CONTEXT.beginPath();
        CONTEXT.arc((event.clientX + this.startPoint.x)/2, (event.clientY + this.startPoint.y)/2, radius, 0, 2* Math.PI);
        CONTEXT.fillStyle = this.currentColor.rgbValue;
        CONTEXT.fill();
    }

    draw(): void {
    }

    reset() {
        this.startPoint = null;
    }
}