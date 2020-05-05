class BrownColor implements IColor{

    name(): string {
        return "brown";
    }

    rgbValue(): string {
        return "rgb(255,255,0)";
    }

}

const Brown: BrownColor = new BrownColor();
Object.freeze(Brown);

export default Brown;