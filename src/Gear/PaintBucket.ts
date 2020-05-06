import Gear from "./Gear";
import Point2D from "../Geo/Point2D";
// @ts-ignore
import line_icon from "../../public/assets/icons/line.png";
import RGB from "../Geo/RGB";
import {CANVAS} from "../Globals";

export default class PaintBucket extends Gear {

    constructor() {
        super(line_icon);
    }

    start(fillColor): Function {
        function startDrawing(event) {
            let startPoint: Point2D = new Point2D(event.clientX, event.clientY);
            let startColor: RGB = startPoint.color;

            let neighborsQueue = new Array<Point2D>();
            let seenNeighbors = new Set<Point2D>();
            neighborsQueue.push(startPoint);

            while (neighborsQueue.length > 0) {
                console.log(neighborsQueue.length);
                const currentPoint: Point2D = neighborsQueue.shift();
                if(currentPoint.x < CANVAS.width && currentPoint.x > 0 && currentPoint.y < CANVAS.height && currentPoint.y > 0) {
                    if (!seenNeighbors.has(currentPoint)) {
                        if (currentPoint.color.compareTo(startColor)) {
                            const topNeighbor: Point2D = new Point2D(currentPoint.x, currentPoint.y - 1);
                            const bottomNeighbor: Point2D = new Point2D(currentPoint.x, currentPoint.y + 1);
                            const rightNeighbor: Point2D = new Point2D(currentPoint.x + 1, currentPoint.y);
                            const leftNeighbor: Point2D = new Point2D(currentPoint.x - 1, currentPoint.y);
                            neighborsQueue.push(topNeighbor);
                            neighborsQueue.push(bottomNeighbor);
                            neighborsQueue.push(rightNeighbor);
                            neighborsQueue.push(leftNeighbor);
                            currentPoint.color = fillColor;
                        }
                    }
                }
            }
        }
        return startDrawing;
    }

    finish(): void {
    }

    draw() {
    }

    reset() {
    }
}