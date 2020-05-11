import {CONTEXT} from "../Globals";

export default class ColoringTemplate{
    public name: string;
    public png: CanvasImageSource;

    constructor(name, png) {
        this.name = name;
        this.png = png;
    }
}