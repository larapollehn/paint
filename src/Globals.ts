import Brush from "./Gear/Brush";
import {Color} from "./Colors/Color";
import brush_icon from '../public/assets/icons/tools.png'

const CANVAS: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('myCanvas');
const CONTEXT = CANVAS.getContext('2d');

export {CANVAS, CONTEXT};

export const DEFAULT_GEAR = new Brush(brush_icon);

export const GEARS = [
    DEFAULT_GEAR,
];

export const DEFAULT_COLOR = new Color("black", "rgb(0,0, 0)")

export const COLORS = [
    DEFAULT_COLOR,
    new Color('red', "rgb(255,0,0)"),
    new Color('blue', "rgb(0,0,255)"),
    new Color('green', "rgb(0,128,0)")
];
