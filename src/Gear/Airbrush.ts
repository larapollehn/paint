import Gear from "./Gear";
import {Color} from "../Colors/Color";
import {CONTEXT} from "../Globals";
import spray_icon from '../../public/assets/icons/spraycan.png';

export default class Airbrush extends Gear{
    painting: boolean = false;
    currentColor: Color;

    constructor() {
        super(spray_icon);
    }

    start(event): void {
        this.painting = true;
        this.draw(this.currentColor);
    }

    finish(): void {
        this.painting = false;
        CONTEXT.beginPath();
    }

    draw(color: Color) {
        const self = this;
        this.currentColor = color;
        function toDraw(event) {
            if (self.painting){
                CONTEXT.lineWidth = 0.1;
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

    airbrushEffect(x, y){
    }

}