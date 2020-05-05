import Gear from "./Gear";
import {CONTEXT} from "../Globals";

export default class Brush implements Gear {
    painting: boolean = false;
    currentColor: IColor;

    constructor() {
        this.start = this.start.bind(this);
        this.finish = this.finish.bind(this);
        this.draw = this.draw.bind(this);
    }

    start(event): void {
        this.painting = true;
        this.draw(this.currentColor)(event);
    }

    finish(): void {
        this.painting = false;
        CONTEXT.beginPath();
    }

    draw(color: IColor) {
        this.currentColor = color;
        const self = this;
        function toDraw(event) {
            if (self.painting) {
                CONTEXT.lineWidth = 4;
                CONTEXT.lineCap = 'round';
                CONTEXT.lineTo(event.clientX, event.clientY);
                CONTEXT.strokeStyle = color.rgbValue();
                CONTEXT.stroke();
                CONTEXT.beginPath();
                CONTEXT.moveTo(event.clientX, event.clientY);
            }
        }
        return toDraw;
    }
}