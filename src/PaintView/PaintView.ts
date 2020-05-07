import {CANVAS, COLORS, DEFAULT_COLOR, DEFAULT_GEAR, DEFAULT_LINE_WIDTH, GEARS, LINE_WIDTHS} from "../Globals";
import Gear from "../Gear/Gear";
import RGB from "../Geo/RGB";
import LineWidth from "../Geo/LineWidth";
import ParameterList from "../Parameters";

export default class PaintView {
    public currentColor: RGB = DEFAULT_COLOR;
    public currentGear: Gear = DEFAULT_GEAR;
    public currentLineWidth: LineWidth = DEFAULT_LINE_WIDTH;
    public cache: Map<string, Function> = new Map();
    public colorOptions: Map<string, RGB> = new Map<string, RGB>();
    public gearOptions: Map<string, Gear> = new Map<string, Gear>();
    public lineWidthOptions : Map<string, LineWidth> = new Map<string, LineWidth>();
    public ParameterList: ParameterList = new ParameterList(this.currentColor, this.currentLineWidth);

    /**
     * sets the colorOptions based on the globaly set Colors
     * sets the gearOptions based on the globaly set Gears
     * fills the cache with the current methods of start, finish and draw
     */
    constructor() {
        COLORS.forEach(color => {
            this.colorOptions[color.rgbValue] = color;
        });

        GEARS.forEach(gear => {
            this.gearOptions[gear.constructor.name] = gear;
        });

        LINE_WIDTHS.forEach(width => {
            this.lineWidthOptions[width.width] = width;
        });

        this.cache["oldStart"] = this.currentGear.start(this.ParameterList);
        this.cache['oldFinish'] = this.currentGear.finish(this.ParameterList);
        this.cache['oldDraw'] = this.currentGear.draw(this.ParameterList);

        this.addEventListener = this.addEventListener.bind(this);
        this.displayColorPallet = this.displayColorPallet.bind(this);
        this.colorChange = this.colorChange.bind(this);
        this.displayGearOptions = this.displayGearOptions.bind(this);
        this.gearChange = this.gearChange.bind(this);
        this.changeLineWidth = this.changeLineWidth.bind(this);
    }

    initialize(){
        this.displayColorPallet();
        this.displayCurrentColor();
        this.displayGearOptions();
        this.displayCurrentGear();
        this.displayLineWidthOptions();
        this.addEventListener();
    }

    /**
     * removes the old EventListeners
     * puts new methods of start, finish and draw in the cache, by overriding the old ones
     * adds new EventListener with the current parameter for Color
     */
    addEventListener() {
        CANVAS.removeEventListener("mousedown", this.cache["oldStart"]);
        CANVAS.removeEventListener('mouseup', this.cache['oldFinish']);
        CANVAS.removeEventListener('mousemove', this.cache['oldDraw']);

        this.cache["oldStart"] = this.currentGear.start(this.ParameterList);
        this.cache['oldFinish'] = this.currentGear.finish(this.ParameterList);
        this.cache['oldDraw'] = this.currentGear.draw(this.ParameterList);

        CANVAS.addEventListener('mousedown',  this.cache["oldStart"])
        CANVAS.addEventListener('mouseup', this.cache['oldFinish']);
        CANVAS.addEventListener('mousemove', this.cache['oldDraw']);
    }

    displayCurrentColor() {
        const currentColorSquare = document.getElementById('currentColor');
        currentColorSquare.style.backgroundColor = this.currentColor.rgbValue;
    }

    /**
     * creates an HTML-Div for each Color of the globally set colors and fills it accordingly
     */
    displayColorPallet() {
        const colorOptionsContainer = document.getElementById('colorOptions');
        for(let color in this.colorOptions){
            const square = document.createElement('div');
            square.classList.add('colorOptions');
            square.style.backgroundColor = this.colorOptions[color].rgbValue;
            square.id = this.colorOptions[color].rgbValue;
            square.addEventListener('click', this.colorChange)
            colorOptionsContainer.appendChild(square);
        }
    }

    displayCurrentGear(){
        const currentGearSquare = document.getElementById('currentGear');
        currentGearSquare.style.backgroundImage = 'url("' + this.currentGear.icon + '")';
        currentGearSquare.style.backgroundSize = 'cover';
    }

    /**
     * creates an HTML-Div for each Gear of the globally set gears and displays the specific icon
     */
    displayGearOptions(){
        const GearOptionContainer = document.getElementById('gearOptions');
        for (let gear in this.gearOptions){
            const square = document.createElement('div');
            square.classList.add('gearOption');
            square.id = gear;
            square.style.backgroundImage = 'url("' + this.gearOptions[gear].icon + '")';
            square.style.backgroundSize = 'cover';
            square.addEventListener('click', this.gearChange);
            GearOptionContainer.appendChild(square);
        }
    }

    displayLineWidthOptions(){
        const LineWidthOptionsContainer = document.getElementById('lineWidthOptions');
        for (let option in this.lineWidthOptions){
            const square = document.createElement('div');
            square.classList.add('lineWidthOptions');
            square.id = option;
            square.innerText = this.lineWidthOptions[option].width;
            square.addEventListener('click', this.changeLineWidth);
            LineWidthOptionsContainer.appendChild(square);
        }
    }

    colorChange(event) {
        this.currentColor = this.colorOptions[event.toElement.id];
        this.ParameterList.color = this.colorOptions[event.toElement.id];
        this.displayCurrentColor();
        this.addEventListener();
    }

    gearChange(event) {
        this.currentGear.reset();
        this.currentGear = this.gearOptions[event.toElement.id];
        this.currentGear.reset();
        this.displayCurrentGear();
        this.addEventListener();
    }

    changeLineWidth(event){
        this.currentLineWidth = this.lineWidthOptions[event.toElement.id];
        this.ParameterList.lineWidth = this.lineWidthOptions[event.toElement.id];
        this.addEventListener();
    }

}