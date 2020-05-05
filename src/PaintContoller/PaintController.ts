import PaintView from "../PaintView/PaintView";

export default class PaintController{
    view: PaintView;

    constructor() {
        this.view = new PaintView();
    }

    setup(){
        this.view.addEventListener();
        this.view.displayColorPallet();
        this.view.displayCurrentColor();
    }
}