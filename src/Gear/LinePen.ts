import {Color} from "../Colors/Color";
import {CONTEXT} from "../Globals";
import Gear from "./Gear";
import line_icon from "../../public/assets/icons/line.png";

export default class LinePen extends Gear {
    painting: boolean = false;
    currentColor: Color;
    startPoint: any;

    constructor() {
        super(line_icon);
    }

    start(event): void {
        this.painting = true;
        this.startPoint = [event.clientX, event.clientY];
        this.finish(event);
        this.painting = true;
    }

    finish(event): void {
        this.painting = false;
        CONTEXT.beginPath();
        CONTEXT.lineWidth = 4;
        CONTEXT.lineCap = 'round';
        CONTEXT.moveTo(this.startPoint[0], this.startPoint[1]);
        CONTEXT.lineTo(event.clientX, event.clientY);
        CONTEXT.strokeStyle = this.currentColor.rgbValue;
        CONTEXT.stroke();
    }

    draw(color: Color) {
        this.currentColor = color;
        /**
        const self = this;
        function toDraw(event) {
            if (self.painting){
                CONTEXT.beginPath();
                CONTEXT.lineWidth = 4;
                CONTEXT.lineCap = 'round';
                CONTEXT.moveTo(self.startPoint[0], self.startPoint[1]);
                CONTEXT.lineTo(event.clientX, event.clientY);
                CONTEXT.strokeStyle = self.currentColor.rgbValue;
                CONTEXT.stroke();
            }
        }
        return toDraw;
         **/
    }
}