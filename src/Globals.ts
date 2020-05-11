import Brush from "./Gear/Brush";
import Airbrush from "./Gear/Airbrush";
import LinePen from "./Gear/LinePen";
import Rectangle from "./Gear/Rectangle";
import Triangle from "./Gear/Triangle";
import DragRectangle from "./Gear/DragRectangle";
import DragCircle from "./Gear/DragCircle";
import RGB from "./Geo/RGB";
import LineWidth from "./Geo/LineWidth";
import Eraser from "./Gear/Eraser";
// @ts-ignore
import fish_template from "../public/assets/images/fish.jpg";
// @ts-ignore
import frog_template from "../public/assets/images/frog.png";
import ColoringTemplate from "./Services/ColoringTemplate";

const CANVAS: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('myCanvas');
const CONTEXT = CANVAS.getContext('2d');

export {CANVAS, CONTEXT};

export const DEFAULT_GEAR = new Brush();

export const GEARS = [
    DEFAULT_GEAR,
    new Airbrush(),
    new LinePen(),
    new Rectangle(),
    new Triangle(),
    new DragRectangle(),
    new DragCircle(),
    new Eraser()
];

export const DEFAULT_COLOR = new RGB( 0,0,0);

export const COLORS = [
    DEFAULT_COLOR,
    new RGB(255, 0, 0),
    new RGB(0, 0, 255),
    new RGB(0, 128, 0),
];

export const DEFAULT_LINE_WIDTH = new LineWidth(4);

export const LINE_WIDTHS = [
    new LineWidth(2),
    DEFAULT_LINE_WIDTH,
    new LineWidth(6),
    new LineWidth(8),
    new LineWidth(10),
    new LineWidth(12)
];

export const COLORING_TEMPLATES = [
    new ColoringTemplate('fish', fish_template),
    new ColoringTemplate('frog', frog_template)
]