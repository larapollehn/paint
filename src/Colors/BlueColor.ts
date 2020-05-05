class BlueColor implements IColor{

    id(): string {
        return "blue";
    }

    rgbValue(): string {
        return "rgb(0,0,255)";
    }

}

const Blue: BlueColor = new BlueColor();
Object.freeze(Blue);

export default Blue;