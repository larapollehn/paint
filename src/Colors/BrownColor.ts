class BrownColor implements IColor{

    id(): string {
        return "brown";
    }

    rgbValue(): string {
        return "rgb(49,12,12)";
    }

}

const Brown: BrownColor = new BrownColor();
Object.freeze(Brown);

export default Brown;