import {CANVAS} from "../Globals";

export default class ResizeCanvas {
    public dragging: boolean = false;

    constructor() {

        this.start = this.start.bind(this);
        this.resize = this.resize.bind(this);
        this.finish = this.finish.bind(this);
    }

    start() {
        console.log('start resizing');
        window.addEventListener('mousemove', this.resize);
        window.addEventListener('mouseup', this.finish);
        this.dragging = true;
    }

    resize(event) {
        if (this.dragging) {
            CANVAS.width += 1;
            CANVAS.height += 1;
        }
    }

    finish() {
        this.dragging = false;
        console.log('done');
        window.removeEventListener('mousemove', this.resize);
        window.removeEventListener('mouseup', this.finish);
    }


}