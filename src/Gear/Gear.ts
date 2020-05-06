import RGB from "../Geo/RGB";

export default abstract class Gear {
    icon: any;

    protected constructor(icon) {
        this.icon = icon;
        this.start = this.start.bind(this);
        this.finish = this.finish.bind(this);
        this.draw = this.draw.bind(this);
    }

    abstract start(color?: RGB): Function;

    abstract finish(event?): void;

    abstract draw(event?): void | Function;

    abstract reset();
}