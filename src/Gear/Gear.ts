import RGB from "../Geo/RGB";
import LineWidth from "../Geo/LineWidth";
import ParameterList from "../Parameters";

export default abstract class Gear {
    icon: any;

    protected constructor(icon) {
        this.icon = icon;
        this.start = this.start.bind(this);
        this.finish = this.finish.bind(this);
        this.draw = this.draw.bind(this);
    }

    abstract start(parameters:ParameterList): Function;

    abstract finish(lineWidth?): void | Function;

    abstract draw(lineWidth?): void | Function;

    abstract reset();
}