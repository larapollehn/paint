import {CANVAS, CONTEXT} from "../Globals";

export default class Undo {
    private picCount: number = 1;
    private currentPic: number = 4;
    private savedImages: Array<string> = new Array<string>();

    constructor() {

        this.saveImage = this.saveImage.bind(this);
        this.undo = this.undo.bind(this);
        this.clearCanvas = this.clearCanvas.bind(this);
    }

    /**
     * saves the canvas image to sessionStorage
     * works like stack
     */
    saveImage() {
        if (this.picCount <= 4) {
            this.savedImages[this.picCount - 1] = CANVAS.toDataURL();
            this.picCount++;
        } else if (this.picCount === 4) {
            this.savedImages[this.picCount - 1] = CANVAS.toDataURL();
        } else {
            this.savedImages.shift();
            this.savedImages.push(CANVAS.toDataURL());
        }

        for (let i = 1; i <= this.savedImages.length; i++) {
            sessionStorage.setItem(`pic${i}`, this.savedImages[i - 1]);
        }
    }

    /**
     * gets up to the three last pictures in session storage
     */
    undo() {
        this.clearCanvas();
        if (this.currentPic >= 2) {
            let dataURL = sessionStorage.getItem(`pic${this.currentPic}`);
            this.currentPic = this.currentPic - 1;
            let img = new Image;
            img.src = dataURL;
            img.onload = function () {
                CONTEXT.drawImage(img, 0, 0);
            }
        } else {
            this.currentPic = 4;
        }
    }

    /**
     * clears the Canvas
     * otherwise the undo function doesnt show, old pictures layer over the newer ones
     * because the pictures have a transparent background
     */
    clearCanvas() {
        /**
        CONTEXT.beginPath();
        CONTEXT.rect(0, 0, CANVAS.width, CANVAS.height);
        CONTEXT.fillStyle = "rgb(255, 255, 255)";
        CONTEXT.fill();
         **/
        CONTEXT.clearRect(0,0, CANVAS.width, CANVAS.height);
    }

}