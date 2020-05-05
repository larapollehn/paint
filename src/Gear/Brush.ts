import Gear from "./Gear";
import {CONTEXT} from "../Globals";

export default class Brush implements Gear{
    painting: boolean = false;

    start(event): void {
        console.log('start');
        this.painting = true;
    }

    finish(): void {
        console.log('finish');
        this.painting = false;
        CONTEXT.beginPath();
    }

    draw(color: Color) {
        console.log('draw');
        const self = this;
        function toDraw(event) {
            console.log('toDraw', self.painting);
                CONTEXT.lineWidth = 4;
                CONTEXT.lineCap = 'round';
                CONTEXT.lineTo(event.clientX, event.clientY);
                CONTEXT.strokeStyle = color.name();
                CONTEXT.stroke();
                CONTEXT.beginPath();
                CONTEXT.moveTo(event.clientX, event.clientY);

        }
       return toDraw;
    }
}