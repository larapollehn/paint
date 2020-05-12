import {BOUNDS, CANVAS, CONTEXT} from "../Globals";

export default class ResizeCanvas {
    public dragging: boolean = false;

    constructor() {

        this.start = this.start.bind(this);
        this.resize = this.resize.bind(this);
        this.finish = this.finish.bind(this);
    }

    start() {
        window.addEventListener('mousemove', this.resize);
        window.addEventListener('mouseup', this.finish);
        this.dragging = true;
    }

    resize(event) {
        if (this.dragging) {
            let picture = CANVAS.toDataURL();
            let img = new Image;
            img.src = picture;
            if(event.clientY-BOUNDS.top-scrollY >= CANVAS.height){
                CANVAS.width += 5;
                CANVAS.height += 5;
                img.onload = function () {
                    CONTEXT.drawImage(img, 0, 0);
                }
            } else {
                CANVAS.width -= 5;
                CANVAS.height -= 5;
                img.onload = function () {
                    CONTEXT.drawImage(img, 0, 0);
                }
            }
        }
    }

    finish() {
        this.dragging = false;
        console.log('done');
        window.removeEventListener('mousemove', this.resize);
        window.removeEventListener('mouseup', this.finish);
    }


}