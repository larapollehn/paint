class GreenColor implements IColor{

    name(): string {
        return "green";
    }

    rgbValue(): string {
        return "rgb(0,255,0)";
    }

}

const Green: GreenColor = new GreenColor();
Object.freeze(Green);

export default Green;