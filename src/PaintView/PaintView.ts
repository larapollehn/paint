import {CANVAS} from "../Globals";
import Gear from "../Gear/Gear";
import Brush from "../Gear/Brush";
import {COLORS} from "../Colors/Colors";
import Black from "../Colors/BlackColor";

export default class PaintView {
    public currentColor: IColor = Black;
    public currentGear: Gear = new Brush();
    public cache: Map<string, Function> = new Map();
    public colorOptions: Map<string, IColor> = new Map<string, IColor>();

    constructor() {
        COLORS.forEach(color => {
            this.colorOptions[color.id()] = color;
        })
        this.cache["oldStart"] = this.currentGear.start;
        this.cache['oldFinish'] = this.currentGear.finish;
        this.cache['oldDraw'] = this.currentGear.draw(this.currentColor);

        this.addEventListener = this.addEventListener.bind(this);
        this.displayColorPallet = this.displayColorPallet.bind(this);
        this.colorChange = this.colorChange.bind(this);
    }

    initialize(){
        this.addEventListener();
        this.displayColorPallet();
        this.displayCurrentColor();
    }

    addEventListener() {
        CANVAS.removeEventListener("mousedown", this.cache["oldStart"]);
        CANVAS.removeEventListener('mouseup', this.cache['oldFinish']);
        CANVAS.removeEventListener('mousemove', this.cache['oldDraw']);

        this.cache["oldStart"] = this.currentGear.start;
        this.cache['oldFinish'] = this.currentGear.finish;
        this.cache['oldDraw'] = this.currentGear.draw(this.currentColor);

        CANVAS.addEventListener('mousedown',  this.cache["oldStart"])
        CANVAS.addEventListener('mouseup', this.cache['oldFinish']);
        CANVAS.addEventListener('mousemove', this.cache['oldDraw']);
    }

    displayCurrentColor() {
        const currentColorSquare = document.getElementById('currentColor');
        currentColorSquare.style.backgroundColor = this.currentColor.rgbValue();
    }

    displayColorPallet() {
        const colorOptionsContainer = document.getElementById('colorOptions');
        for(let color in this.colorOptions){
            const square = document.createElement('div');
            square.classList.add('colorOptions');
            square.style.backgroundColor = this.colorOptions[color].rgbValue();
            square.id = this.colorOptions[color].id();
            square.addEventListener('click', this.colorChange)
            colorOptionsContainer.appendChild(square);
        }
    }

    colorChange(event) {
        this.currentColor = this.colorOptions[event.toElement.id];
        this.displayCurrentColor();
        this.addEventListener();
    }

}