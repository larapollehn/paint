import BlackColor from "../Colors/BlackColor";
import Black from "../Colors/BlackColor";
import {CANVAS} from "../Globals";
import Gear from "../Gear/Gear";
import Brush from "../Gear/Brush";
import Magenta from "../Colors/MagentaColor";

export default class PaintView{
   public currentColor: Color = Magenta;
   public currentGear: Gear = new Brush();

   constructor() {

   }

   addEventListener(){
       CANVAS.addEventListener('mousedown', this.currentGear.start)
       CANVAS.addEventListener('mouseup', this.currentGear.finish);
       CANVAS.addEventListener('mousemove', this.currentGear.draw(this.currentColor));
   }

}