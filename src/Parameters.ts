import RGB from "./Geo/RGB";
import LineWidth from "./Geo/LineWidth";

export default class ParameterList{
    public color: RGB;
    public lineWidth: LineWidth;

    constructor(color: RGB, lineWidth: LineWidth) {
        this.color = color;
        this.lineWidth = lineWidth;
    }
}