import {CANVAS, COLORS, CONTEXT, DEFAULT_COLOR, DEFAULT_GEAR, GEARS} from "../Globals";
import Gear from "../Gear/Gear";
import RGB from "../Geo/RGB";

export default class PaintView {
    public currentColor: RGB = DEFAULT_COLOR;
    public currentGear: Gear = DEFAULT_GEAR;
    public currentLineWidth: number = 4;
    public cache: Map<string, Function> = new Map();
    public colorOptions: Map<string, RGB> = new Map<string, RGB>();
    public gearOptions: Map<string, Gear> = new Map<string, Gear>();

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
        })

        this.cache["oldStart"] = this.currentGear.start(this.currentColor, this.currentLineWidth);
        this.cache['oldFinish'] = this.currentGear.finish(this.currentLineWidth);
        this.cache['oldDraw'] = this.currentGear.draw(this.currentLineWidth);

        this.addEventListener = this.addEventListener.bind(this);
        this.displayColorPallet = this.displayColorPallet.bind(this);
        this.colorChange = this.colorChange.bind(this);
        this.displayGearOptions = this.displayGearOptions.bind(this);
        this.gearChange = this.gearChange.bind(this);
    }

    initialize(){
        this.displayColorPallet();
        this.displayCurrentColor();
        this.displayGearOptions();
        this.displayCurrentGear();
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

        this.cache["oldStart"] = this.currentGear.start(this.currentColor, this.currentLineWidth);
        this.cache['oldFinish'] = this.currentGear.finish(this.currentLineWidth);
        this.cache['oldDraw'] = this.currentGear.draw(this.currentLineWidth);

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

    colorChange(event) {
        this.currentColor = this.colorOptions[event.toElement.id];
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

}