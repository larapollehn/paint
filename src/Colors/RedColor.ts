class RedColor implements IColor{

    id(): string {
        return "red";
    }

    rgbValue(): string {
        return "rgb(255,0,0)";
    }

}

const Red: RedColor = new RedColor();
Object.freeze(Red);

export default Red;