class BlueColor implements IColor{

    name(): string {
        return "blue";
    }

    rgbValue(): string {
        return "rgb(255,255,0)";
    }

}

const Blue: BlueColor = new BlueColor();
Object.freeze(Blue);

export default Blue;