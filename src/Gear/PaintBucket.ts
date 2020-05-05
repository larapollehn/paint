import Gear from "./Gear";
import {Color} from "../Colors/Color";
import Point2D from "../Geo/Point2D";
import line_icon from "../../public/assets/icons/line.png";

export default class PaintBucket extends Gear {


    constructor() {
        super(line_icon);
    }

    start(color): void {
        let fillColor: Color;

        let point: Point2D = new Point2D(event.clientX, event.clientY);
        let startColor = point.color;
        let neighbors = new Array<Point2D>();
        let neighborsSet = new Set<Point2D>();
        neighbors.push(point);
        neighborsSet.add(point);

        while (neighbors.length > 0) {
            const currentPoint: Point2D = neighbors.shift();
            const topNeighbor: Point2D = new Point2D(currentPoint.x, currentPoint.y - 1);
            const bottomNeighbor: Point2D = new Point2D(currentPoint.x, currentPoint.y + 1);
            const rightNeighbor: Point2D = new Point2D(currentPoint.x + 1, currentPoint.y);
            const leftNeighbor: Point2D = new Point2D(currentPoint.x - 1, currentPoint.y);
            [topNeighbor, bottomNeighbor, rightNeighbor, leftNeighbor].forEach(neighbor => {
                if (neighbor.isValid() && neighbor.color === startColor) {
                    neighbors.push(neighbor);
                }
            });
            currentPoint.color = fillColor;
        }
    }

    finish(event?): void {
    }

    draw(color: Color) {
    }


}