class BlackColor implements Color{

    name(): string {
        return "black";
    }

    rgbValue(): string {
        return "rgb(0,0,0)";
    }

}

const Black: BlackColor = new BlackColor();
Object.freeze(Black);

export default Black;