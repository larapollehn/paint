import {Color} from "../Colors/Color";

export default abstract class Gear {
    painting: boolean;
    icon: any;

    protected constructor(icon) {
        this.icon = icon;
        this.start = this.start.bind(this);
        this.finish = this.finish.bind(this);
        this.draw = this.draw.bind(this);
    }

    abstract start(event?: MouseEvent, color?: Color): void;

    abstract finish(event?: MouseEvent, color?: Color): void;

    abstract draw(event?: MouseEvent, color?: Color);
}