import RGB from "./Geo/RGB";
import LineWidth from "./Geo/LineWidth";
import Undo from "./Services/Undo";

export default class ParameterList{
    public color: RGB;
    public lineWidth: LineWidth;
    public undoButton: Undo;

    constructor(color: RGB, lineWidth: LineWidth, undoButton: Undo) {
        this.color = color;
        this.lineWidth = lineWidth;
        this.undoButton = undoButton;
    }
}