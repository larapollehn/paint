import Gear from "./Gear";
import {Color} from "../Colors/Color";
import {CONTEXT} from "../Globals";
import spray_icon from '../../public/assets/icons/spraycan.png';

export default class Airbrush extends Gear{
    painting: boolean = false;
    currentColor: Color;

    constructor() {
        super(spray_icon);

        this.airbrushEffect = this.airbrushEffect.bind(this);
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
                self.airbrushEffect(event.clientX, event.clientY);
                CONTEXT.strokeStyle = color.rgbValue;
                CONTEXT.stroke();
                CONTEXT.beginPath();
                self.airbrushEffect(event.clientX, event.clientY);
            }
        }
        return toDraw;
    }

    airbrushEffect(x, y){
        for (let i = 0; i < 50; i++){
            const randomPosX = Math.floor(Math.random() * Math.floor(20))
            const randomPosY = Math.floor(Math.random() * Math.floor(20))
            CONTEXT.lineTo(x+randomPosX, y+randomPosY);
        }
    }

}