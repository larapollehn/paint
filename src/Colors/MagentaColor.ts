class MagentaColor implements IColor{

    name(): string {
        return "magenta";
    }

    rgbValue(): string {
        return "rgb(255,0,255)";
    }

}

const Magenta: MagentaColor = new MagentaColor();
Object.freeze(Magenta);

export default Magenta;