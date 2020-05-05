import Gear from "./Gear";
import {CONTEXT} from "../Globals";

export default class Brush implements Gear {
    painting: boolean = false;

    constructor() {
        this.start = this.start.bind(this);
        this.finish = this.finish.bind(this);
        this.draw = this.draw.bind(this);
    }

    start(event): void {
        console.log('start');
        this.painting = true;
        console.log(this.painting);
    }

    finish(): void {
        console.log('finish');
        this.painting = false;
        CONTEXT.beginPath();
        console.log(this.painting);
    }

    draw(color: Color) {
        const self = this;
        function toDraw(event) {
            if (self.painting) {
                CONTEXT.lineWidth = 4;
                CONTEXT.lineCap = 'round';
                CONTEXT.lineTo(event.clientX, event.clientY);
                CONTEXT.strokeStyle = color.name();
                CONTEXT.stroke();
                CONTEXT.beginPath();
                CONTEXT.moveTo(event.clientX, event.clientY);
            }
        }
        return toDraw;
    }
}