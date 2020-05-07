import Gear from "./Gear";
import {CONTEXT} from "../Globals";
// @ts-ignore
import spray_icon from '../../public/assets/icons/spraycan.png';
import RGB from "../Geo/RGB";

export default class Airbrush extends Gear {
    painting: boolean = false;
    currentColor: RGB;

    constructor() {
        super(spray_icon);
        this.airbrushEffect = this.airbrushEffect.bind(this);
    }

    start(color): Function {
        CONTEXT.beginPath();
        const self = this;
        function startDrawing(event) {
            self.currentColor = color;
            self.painting = true;
        }
        return startDrawing;
    }

    finish(color): Function {
        const self = this;
        function finishDrawing() {
            self.painting = false;
            CONTEXT.beginPath();
        }
        return finishDrawing;
    }

    draw() {
        const self = this;
        function toDraw(event) {
            if (self.painting) {
                CONTEXT.lineWidth = 0.1;
                CONTEXT.lineCap = 'round';
                self.airbrushEffect(event.clientX-20, event.clientY-20);
                CONTEXT.strokeStyle = self.currentColor.rgbValue;
                CONTEXT.stroke();
                CONTEXT.beginPath();
                self.airbrushEffect(event.clientX-20, event.clientY-20);
            }
        }
        return toDraw;
    }

    /**
     * creates an airbrush-effect based on a random distribution of colored short lines
     * @param x is the position of the mouse-cursor on the x-axis
     * @param y is the position of the mouse-cursor on the y-axis
     */
    airbrushEffect(x, y) {
        for (let i = 0; i < 50; i++) {
            const randomPosX = Math.floor(Math.random() * Math.floor(20))
            const randomPosY = Math.floor(Math.random() * Math.floor(20))
            CONTEXT.lineTo(x + randomPosX, y + randomPosY);
        }
    }

    reset() {
        this.painting = false;
    }
}