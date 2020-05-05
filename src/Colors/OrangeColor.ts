class OrangeColor implements IColor{

    id(): string {
        return "orange";
    }

    rgbValue(): string {
        return "rgb(251,151,27)";
    }

}

const Orange: OrangeColor = new OrangeColor();
Object.freeze(Orange);

export default Orange;