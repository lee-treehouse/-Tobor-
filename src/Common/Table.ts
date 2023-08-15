import { TableConfig } from "../Config/Config";

import { Coordinates, areCoordinatesOutOfBounds, doCoordinatesHaveObstacles } from "./Coordinates";

export class Table {
  public constructor(private readonly config: TableConfig) {}

  doCoordinatesHaveObstacles = (coordinates: Coordinates): boolean =>
    doCoordinatesHaveObstacles(coordinates, this.config.obstaclesCoordinates);

  areCoordinatesOutOfBounds = (coordinates: Coordinates) =>
    areCoordinatesOutOfBounds(coordinates, this.getMaxCoordinates());

  getMaxCoordinates = (): Coordinates => {
    return {
      x: this.config.size.width - 1,
      y: this.config.size.length - 1,
    };
  };

  getObstaclesCoordinates = (): Coordinates[] => {
    return this.config.obstaclesCoordinates;
  };
}
