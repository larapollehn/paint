import Gear from "./Gear";
import {CONTEXT} from "../Globals";
import {Color} from "../Colors/Color";
import brush_icon from '../../public/assets/icons/tools.png';

export default class Brush extends Gear {
    painting: boolean = false;
    currentColor: Color;

    constructor() {
        super(brush_icon);
    }

    start(event): void {
        this.painting = true;
        this.draw(this.currentColor)(event);
    }

    finish(): void {
        this.painting = false;
        CONTEXT.beginPath();
    }

    draw(color: Color) {
        this.currentColor = color;
        const self = this;
        function toDraw(event) {
            if (self.painting) {
                CONTEXT.lineWidth = 4;
                CONTEXT.lineCap = 'round';
                CONTEXT.lineTo(event.clientX, event.clientY);
                CONTEXT.strokeStyle = color.rgbValue;
                CONTEXT.stroke();
                CONTEXT.beginPath();
                CONTEXT.moveTo(event.clientX, event.clientY);
            }
        }
        return toDraw;
    }
}