import Gear from "./Gear";
import {Color} from "../Colors/Color";
import Point2D from "../Geo/Point2D";
// @ts-ignore
import line_icon from "../../public/assets/icons/line.png";
import RGB from "../Geo/RGB";

export default class PaintBucket extends Gear {

    constructor() {
        super(line_icon);
    }

    start(color): Function {
        function startDrawing(event) {
            let fillColor: RGB = color.getRGB();
            let point: Point2D = new Point2D(event.clientX, event.clientY);
            let startColor = point.color;
            let startColorValue = point.getRgbValue(startColor);
            let neighbors = new Array<Point2D>();
            let neighborsSet = new Set<Point2D>();
            neighbors.push(point);
            console.log(point);
            neighborsSet.add(point);

            console.log(neighbors);
                const currentPoint: Point2D = neighbors.shift();
                console.log(currentPoint);
                const topNeighbor: Point2D = new Point2D(currentPoint.x, currentPoint.y - 1);
                const bottomNeighbor: Point2D = new Point2D(currentPoint.x, currentPoint.y + 1);
                const rightNeighbor: Point2D = new Point2D(currentPoint.x + 1, currentPoint.y);
                const leftNeighbor: Point2D = new Point2D(currentPoint.x - 1, currentPoint.y);
                console.log(startColorValue, topNeighbor.getRgbValue(topNeighbor.color));
                [topNeighbor, bottomNeighbor, rightNeighbor, leftNeighbor].forEach(neighbor => {
                    if (neighbor.isValid() && neighbor.getRgbValue(neighbor.color) === startColorValue) {
                        console.log('valid');
                        neighbors.push(neighbor);
                    }
                });
                currentPoint.color = fillColor;
            console.log(neighbors);
        }

        return startDrawing;
    }

    finish(): void {
    }

    draw() {
    }


}