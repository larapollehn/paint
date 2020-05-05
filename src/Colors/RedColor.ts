class RedColor implements IColor{

    name(): string {
        return "red";
    }

    rgbValue(): string {
        return "rgb(255,255,0)";
    }

}

const Red: RedColor = new RedColor();
Object.freeze(Red);

export default Red;