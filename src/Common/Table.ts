import { TableConfig } from "../Config/Config";
import { Coordinates, LogicalCoordinate, isLogicalCoordinate } from "./Coordinates";

export class Table {
  public constructor(private readonly config: TableConfig) {}

  interpretCoordinates = (coordinates: Coordinates) => {
    const { x, y } = coordinates;

    const interpretX = isLogicalCoordinate(x);
    const interpretY = isLogicalCoordinate(y);

    const interpretedX = interpretX ? this.interpretLogicalCoordinate(x, this.config.size.width) : x;
    const interpretedY = interpretY ? this.interpretLogicalCoordinate(y, this.config.size.length) : y;

    return { x: interpretedX, y: interpretedY };
  };

  interpretLogicalCoordinate(coordinate: LogicalCoordinate, max: number) {
    if (coordinate === LogicalCoordinate.RANDOM) throw new Error("Not yet implemented");
    return max;
  }

  areCoordinatesOutOfBounds = (coordinates: Coordinates) => {
    const { x, y } = coordinates;

    const evaluateX = !isLogicalCoordinate(x);
    const evaluateY = !isLogicalCoordinate(y);

    if (evaluateX && (x < 0 || x > this.config.size.width - 1)) return true;
    if (evaluateY && (y < 0 || y > this.config.size.length - 1)) return true;

    return false;
  };
}
