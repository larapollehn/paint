import {CANVAS, CONTEXT} from "../Globals";

export default class Download {

    constructor() {
        this.download = this.download.bind(this);
        this.saveWhiteBackground = this.saveWhiteBackground.bind(this);
    }

    download() {
        window.location.href = CANVAS.toDataURL("image/png").replace("image/png", "image/octet-stream");
    }


    saveWhiteBackground() {
        let picture = CANVAS.toDataURL();
        CONTEXT.beginPath();
        CONTEXT.rect(0, 0, CANVAS.width, CANVAS.height);
        CONTEXT.fillStyle = 'rgb(255, 255, 255)';
        CONTEXT.fill();
        CONTEXT.closePath();
        let img = new Image;
        img.src = picture;
        img.onload = function () {
            CONTEXT.drawImage(img, 0, 0);
            window.location.href = CANVAS.toDataURL("image/png").replace("image/png", "image/octet-stream");
            CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height);
            CONTEXT.drawImage(img, 0, 0);
        }
    }

}