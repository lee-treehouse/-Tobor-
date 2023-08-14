import { TableConfig } from "../Config/Config";
import { Coordinates } from "./Coordinates";

export class Table {
  public constructor(private readonly config: TableConfig) {}

  // TODO add test if time
  getMaxCoordinates = (): Coordinates => {
    return {
      x: this.config.size.width - 1,
      y: this.config.size.length - 1,
    };
  };

  areCoordinatesOutOfBounds = (coordinates: Coordinates) => {
    if (coordinates.x < 0 || coordinates.y < 0) return true;

    const maxCoordinates = this.getMaxCoordinates();

    if (coordinates.x > maxCoordinates.x) return true;
    if (coordinates.y > maxCoordinates.y) return true;
    return false;
  };
}
