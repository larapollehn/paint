import {
    CANVAS,
    COLORING_TEMPLATES,
    COLORS,
    CONTEXT,
    DEFAULT_COLOR,
    DEFAULT_GEAR,
    DEFAULT_LINE_WIDTH,
    GEARS,
    LINE_WIDTHS
} from "../Globals";
import Gear from "../Gear/Gear";
import RGB from "../Geo/RGB";
import LineWidth from "../Geo/LineWidth";
import ParameterList from "../Parameters";
import Undo from "../Services/Undo";
import Download from "../Services/Download";
import ColoringTemplate from "../Services/ColoringTemplate";
import ResizeCanvas from "../Services/ResizeCanvas";

export default class PaintView {
    public currentColor: RGB = DEFAULT_COLOR;
    public currentGear: Gear = DEFAULT_GEAR;
    public currentLineWidth: LineWidth = DEFAULT_LINE_WIDTH;
    public cache: Map<string, Function> = new Map();
    public colorOptions: Map<string, RGB> = new Map<string, RGB>();
    public gearOptions: Map<string, Gear> = new Map<string, Gear>();
    public lineWidthOptions : Map<string, LineWidth> = new Map<string, LineWidth>();
    public coloringTemplates: Map<string, ColoringTemplate> = new Map<string, ColoringTemplate>();
    public UndoButton: Undo = new Undo();
    public ResizeButton: ResizeCanvas = new ResizeCanvas();
    public DownloadButton: Download = new Download();
    public ParameterList: ParameterList = new ParameterList(this.currentColor, this.currentLineWidth, this.UndoButton);


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

        COLORING_TEMPLATES.forEach(template => {
            this.coloringTemplates[template.name] = template;
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
        this.newDrawing = this.newDrawing.bind(this);
        this.displayColoringTemplates = this.displayColoringTemplates.bind(this);
        this.drawColoringTemplate = this.drawColoringTemplate.bind(this);
    }

    initialize(){
        this.displayColorPallet();
        this.displayCurrentColor();
        this.displayGearOptions();
        this.displayCurrentGear();
        this.displayLineWidthOptions();
        this.displayCurrentLineWidth();
        this.displayColoringTemplates();
        this.addEventListener();
        this.addServiceEventListener();
        CANVAS.width = 700;
        CANVAS.height = 400;
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

    addServiceEventListener(){
        const undo_btn = document.getElementById('undoBtn');
        undo_btn.addEventListener('click', this.UndoButton.undo);

        const download_btn = document.getElementById('downloadBtn');
        download_btn.addEventListener('click', this.DownloadButton.download);

        const newDrawing_btn = document.getElementById('newDrawingBtn');
        newDrawing_btn.addEventListener('click', this.newDrawing);

        const resize_drag_btn = document.getElementById('dragBtn');
        resize_drag_btn.addEventListener('mousedown', this.ResizeButton.start);
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

    displayCurrentLineWidth(){
        const CurrentLineWidthSquare = document.getElementById('currentLineWidth');
        CurrentLineWidthSquare.innerText = `${this.currentLineWidth.width}`;
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

    displayColoringTemplates(){
        const TemplateContainer = document.getElementById('coloringTemplates');
        for (let template in this.coloringTemplates){
            const square = document.createElement('div');
            square.classList.add('coloringTemplates');
            square.id = template;
            square.style.backgroundImage = 'url("' + this.coloringTemplates[template].png + '")';
            square.style.backgroundSize = 'cover';
            square.addEventListener('click', this.drawColoringTemplate);
            TemplateContainer.appendChild(square);
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
        this.displayCurrentLineWidth();
        this.addEventListener();
    }

    drawColoringTemplate(event){
        let template = new Image;
        template.src = this.coloringTemplates[event.toElement.id].png;
        template.onload = function () {
            CONTEXT.drawImage(template, 0, 0, CANVAS.width, CANVAS.height);
        }
    }

    newDrawing(){
        CONTEXT.clearRect(0,0, CANVAS.width, CANVAS.height);
        sessionStorage.clear();
        this.currentColor = DEFAULT_COLOR;
        this.currentGear.reset();
        this.currentGear = DEFAULT_GEAR;
        this.currentGear.reset();
        this.currentLineWidth = DEFAULT_LINE_WIDTH;
        this.ParameterList.color = DEFAULT_COLOR;
        this.ParameterList.lineWidth = DEFAULT_LINE_WIDTH;
        this.displayCurrentColor();
        this.displayCurrentGear();
        this.displayCurrentLineWidth();
        this.addEventListener();
    }

}