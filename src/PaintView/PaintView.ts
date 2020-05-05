import BlackColor from "../Colors/BlackColor";
import Black from "../Colors/BlackColor";
import {CANVAS} from "../Globals";
import Gear from "../Gear/Gear";
import Brush from "../Gear/Brush";
import Magenta from "../Colors/MagentaColor";
import Yellow from "../Colors/YellowColor";
import Green from "../Colors/GreenColor";
import Orange from "../Colors/OrangeColor";
import Red from "../Colors/RedColor";
import Brown from "../Colors/BrownColor";
import Blue from "../Colors/BlueColor";

export default class PaintView {
    public currentColor: IColor = Magenta;
    public colorOptions: Map<string, IColor> = new Map<string, IColor>();
    public currentGear: Gear = new Brush();

    constructor() {
        this.colorOptions.set('black', Black);
        this.colorOptions.set('red', Red);
        this.colorOptions.set('yellow', Yellow);
        this.colorOptions.set('green', Green);
        this.colorOptions.set('brown', Brown);
        this.colorOptions.set('blue', Blue);
        this.colorOptions.set('orange', Orange);
        this.colorOptions.set('magenta', Magenta);

        this.addEventListener = this.addEventListener.bind(this);
        this.displayColorPallet = this.displayColorPallet.bind(this);
        this.colorChange = this.colorChange.bind(this);
    }

    addEventListener() {
        CANVAS.addEventListener('mousedown', this.currentGear.start)
        CANVAS.addEventListener('mouseup', this.currentGear.finish);
        CANVAS.addEventListener('mousemove', this.currentGear.draw(this.currentColor));
    }

    displayCurrentColor(){
        const currentColorSquare = document.getElementById('currentColor');
        currentColorSquare.style.backgroundColor = this.currentColor.name();
    }

    displayColorPallet(){
        const colorOptionsContainer = document.getElementById('colorOptions');
        this.colorOptions.forEach(color =>{
            const square = document.createElement('div');
            square.classList.add('colorOptions');
            square.style.backgroundColor = color.name();
            square.id = color.name();
            square.addEventListener('click', this.colorChange)
            colorOptionsContainer.appendChild(square);
        });
    }

    colorChange(event){
        this.currentColor = this.colorOptions.get(event.toElement.id)
        this.displayCurrentColor();
    }

}