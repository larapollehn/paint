import Brush from "./Gear/Brush";
import {Color} from "./Colors/Color";
import Airbrush from "./Gear/Airbrush";
import LinePen from "./Gear/LinePen";

const CANVAS: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('myCanvas');
const CONTEXT = CANVAS.getContext('2d');

export {CANVAS, CONTEXT};

export const DEFAULT_GEAR = new Brush();

export const GEARS = [
    DEFAULT_GEAR,
    new Airbrush(),
    new LinePen()
];

export const DEFAULT_COLOR = new Color("black", "rgb(0,0, 0)")

export const COLORS = [
    DEFAULT_COLOR,
    new Color('red', "rgb(255,0,0)"),
    new Color('blue', "rgb(0,0,255)"),
    new Color('green', "rgb(0,128,0)")
];
