class OrangeColor implements IColor{

    name(): string {
        return "orange";
    }

    rgbValue(): string {
        return "rgb(255,255,0)";
    }

}

const Orange: OrangeColor = new OrangeColor();
Object.freeze(Orange);

export default Orange;