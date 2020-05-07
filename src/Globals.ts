import Brush from "./Gear/Brush";
import Airbrush from "./Gear/Airbrush";
import LinePen from "./Gear/LinePen";
import Rectangle from "./Gear/Rectangle";
import Triangle from "./Gear/Triangle";
import DragRectangle from "./Gear/DragRectangle";
import DragCircle from "./Gear/DragCircle";
import PaintBucket from "./Gear/PaintBucket";
import RGB from "./Geo/RGB";
import LineWidth from "./Geo/LineWidth";

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
    new DragCircle()
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