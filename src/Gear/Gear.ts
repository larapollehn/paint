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

    abstract start(color?: Color): Function;

    abstract finish(event?): void;

    abstract draw(event?): void | Function;
}