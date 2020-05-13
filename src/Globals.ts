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
import fish_template from "../public/assets/images/fish.png";
// @ts-ignore
import house_template from "../public/assets/images/house.png";
// @ts-ignore
import mandala1_template from "../public/assets/images/mandala1.png";
// @ts-ignore
import mandala2_template from "../public/assets/images/mandala2.png";
// @ts-ignore
import minion_template from "../public/assets/images/minion.png";
// @ts-ignore
import pokemon_template from "../public/assets/images/pokemon.png";
// @ts-ignore
import princess_template from "../public/assets/images/princess.png";
// @ts-ignore
import pig_template from "../public/assets/images/pig.png";
import ColoringTemplate from "./Services/ColoringTemplate";
import XS_icon from "../public/assets/icons/XS.png";
import S_icon from "../public/assets/icons/S.png";
import M_icon from "../public/assets/icons/M.png";
import L_icon from "../public/assets/icons/L.png";
import XL_icon from "../public/assets/icons/XL.png";
import XXL_icon from "../public/assets/icons/XXL.png";

const CANVAS: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('myCanvas');
const CONTEXT = CANVAS.getContext('2d');
const BOUNDS = CANVAS.getBoundingClientRect();

export {CANVAS, CONTEXT, BOUNDS};

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

export let COLORS = [
    DEFAULT_COLOR,
    new RGB(223, 34, 34),
    new RGB(50, 115, 69),
    new RGB(34, 80, 206),
    new RGB(255, 215, 0),
];

export const DEFAULT_LINE_WIDTH = new LineWidth(4, S_icon);

export const LINE_WIDTHS = [
    new LineWidth(2, XS_icon),
    DEFAULT_LINE_WIDTH,
    new LineWidth(6, M_icon),
    new LineWidth(8, L_icon),
    new LineWidth(10, XL_icon),
    new LineWidth(12, XXL_icon)
];

export const COLORING_TEMPLATES = [
    new ColoringTemplate('fish', fish_template),
    new ColoringTemplate('frog', house_template),
    new ColoringTemplate('mandala1', mandala1_template),
    new ColoringTemplate('mandala2', mandala2_template),
    new ColoringTemplate('minion', minion_template),
    new ColoringTemplate('pokemon', pokemon_template),
    new ColoringTemplate('princess', princess_template),
    new ColoringTemplate('unicorn', pig_template)
]