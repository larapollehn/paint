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
            neighborsSet.add(point);

            let i = 10000;
            while (i > 0) {
                const currentPoint: Point2D = neighbors.shift();

                const topNeighbor: Point2D = new Point2D(currentPoint.x, currentPoint.y - 1);
                const bottomNeighbor: Point2D = new Point2D(currentPoint.x, currentPoint.y + 1);
                const rightNeighbor: Point2D = new Point2D(currentPoint.x + 1, currentPoint.y);
                const leftNeighbor: Point2D = new Point2D(currentPoint.x - 1, currentPoint.y);
                const diagonalLeftUpNeighbor: Point2D = new Point2D(currentPoint.x - 1, currentPoint.y - 1);
                const diagonalLeftDownNeighbor: Point2D = new Point2D(currentPoint.x - 1, currentPoint.y + 1);
                const diagonalRightUpNeighbor: Point2D = new Point2D(currentPoint.x + 1, currentPoint.y - 1);
                const diagonalRightDownNeighbor: Point2D = new Point2D(currentPoint.x + 1, currentPoint.y - 1);

                [topNeighbor, bottomNeighbor, rightNeighbor, leftNeighbor].forEach(neighbor => {
                    if (neighbor.isValid() && neighbor.getRgbValue(neighbor.color) === startColorValue && !neighborsSet.has(neighbor)) {
                        neighbors.push(neighbor);
                        neighborsSet.add(neighbor);
                    }
                });
                console.log(neighbors.length);

                let before = Date.now();
                currentPoint.color = fillColor;
                let after = Date.now();
                console.log('set color of currentPoint', after - before);
                i--;
            }
        }
        return startDrawing;
    }

    finish(): void {
    }

    draw() {
    }


}