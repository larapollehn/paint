import Gear from "./Gear";
import {BOUNDS, CANVAS, CONTEXT} from "../Globals";
// @ts-ignore
import spray_icon from '../../public/assets/icons/spraycan.png';
import ParameterList from "../Parameters";

export default class Airbrush extends Gear {
    painting: boolean = false;

    constructor() {
        super(spray_icon);
        this.airbrushEffect = this.airbrushEffect.bind(this);
    }

    start(): Function {
        CONTEXT.beginPath();
        const self = this;
        function startDrawing() {
            self.painting = true;
        }
        return startDrawing;
    }

    finish(parameterList: ParameterList): Function {
        const self = this;
        function finishDrawing() {
            self.painting = false;
            parameterList.undoButton.saveImage();
            CONTEXT.beginPath();
        }
        return finishDrawing;
    }

    draw(parameterList): Function {
        const self = this;
        function toDraw(event) {
            if (self.painting) {
                CONTEXT.lineWidth = 0.2;
                CONTEXT.lineCap = 'round';
                self.airbrushEffect(event.clientX-BOUNDS.left-scrollX, event.clientY-BOUNDS.top-scrollY, parameterList);
                CONTEXT.strokeStyle = parameterList.color.rgbValue;
                CONTEXT.stroke();
                CONTEXT.beginPath();
                self.airbrushEffect(event.clientX-BOUNDS.left-scrollX, event.clientY-BOUNDS.top-scrollY, parameterList);
            }
        }
        return toDraw;
    }

    /**
     * creates an airbrush-effect based on a random distribution of colored short lines
     * @param x is the position of the mouse-cursor on the x-axis
     * @param y is the position of the mouse-cursor on the y-axis
     * @param parameterList is the list if parameters that can be changed by the user
     */
    airbrushEffect(x, y, parameterList) {
        for (let i = 0; i < 40; i++) {
            const randomPosX = Math.floor(Math.random() * Math.floor(((parameterList.lineWidth.width*10)/2)))
            const randomPosY = Math.floor(Math.random() * Math.floor(((parameterList.lineWidth.width*10)/2)))
            CONTEXT.lineTo(x + randomPosX, y + randomPosY);
        }
    }

    reset() {
        this.painting = false;
    }
}