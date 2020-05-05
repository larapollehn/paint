class GreenColor implements IColor{

    id(): string {
        return "green";
    }

    rgbValue(): string {
        return "rgb(0,128,0)";
    }
}

const Green: GreenColor = new GreenColor();
Object.freeze(Green);

export default Green;