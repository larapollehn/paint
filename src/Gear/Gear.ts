import RGB from "../Geo/RGB";

export default abstract class Gear {
    icon: any;

    protected constructor(icon) {
        this.icon = icon;
        this.start = this.start.bind(this);
        this.finish = this.finish.bind(this);
        this.draw = this.draw.bind(this);
    }

    abstract start(color?: RGB, lineWidth?): Function;

    abstract finish(lineWidth?): void | Function;

    abstract draw(lineWidth?): void | Function;

    abstract reset();
}