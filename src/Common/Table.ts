import { TableConfig } from "../Config/Config";

import { Coordinates } from "./Coordinates";

export class Table {
  public constructor(private readonly config: TableConfig) {}

  bfs = (start: number[]) => {
    const queue: number[][] = [start];
    const visitedCoordinates: number[][] = [];
    const result = [];

    while (queue.length) {
      const coordinate = queue.shift();

      if (coordinate) {
        const matchingVisitedCoordinates = visitedCoordinates.filter(
          (visitedCoordinate) => visitedCoordinate[0] === coordinate[0] && visitedCoordinate[1] === coordinate[1]
        );

        if (!matchingVisitedCoordinates || matchingVisitedCoordinates.length === 0) {
          visitedCoordinates.push(coordinate);
          result.push(coordinate);

          const neighbours = this.getNeighbours(coordinate);

          for (const neighbour of neighbours) {
            queue.push(neighbour);
          }
        }
      }
    }
    return result;
  };

  getNeighbours(coordinates: number[]) {
    const xCoord = coordinates[0];
    const yCoord = coordinates[1];

    const northNeighbour = [xCoord, yCoord + 1];
    const southNeighbour = [xCoord, yCoord - 1];
    const eastNeighbour = [xCoord + 1, yCoord];
    const westNeighbour = [xCoord - 1, yCoord];
    const possibleNeighbours = [northNeighbour, southNeighbour, eastNeighbour, westNeighbour];

    const neighbours: number[][] = [];
    possibleNeighbours.forEach((neighbour) => {
      const isBlocked = this.areArrayCoordinatesBlocked(neighbour);
      const isOutOfBounds = this.areArrayCoordinatesOutOfBounds(neighbour);
      if (!isBlocked && !isOutOfBounds) neighbours.push(neighbour);
    });

    return neighbours;
  }

  areArrayCoordinatesBlocked = (coordinates: number[]): boolean => {
    return this.canHazObstacles({ x: coordinates[0], y: coordinates[1] });
  };

  canHazObstacles = (coordinates: Coordinates): boolean => {
    const matchingObstacles = this.config.obstacles?.filter(
      (obstacle) => coordinates.x === obstacle.x && coordinates.y === obstacle.y
    );
    return !!(matchingObstacles && matchingObstacles.length > 0);
  };

  areArrayCoordinatesOutOfBounds = (coordinates: number[]) => {
    return this.areCoordinatesOutOfBounds({ x: coordinates[0], y: coordinates[1] });
  };

  areCoordinatesOutOfBounds = (coordinates: Coordinates) => {
    if (coordinates.x < 0 || coordinates.y < 0) return true;

    const maxCoordinates = this.getMaxCoordinates();
    if (coordinates.x > maxCoordinates.x) return true;
    if (coordinates.y > maxCoordinates.y) return true;
    return false;
  };

  getMaxCoordinates = (): Coordinates => {
    return {
      x: this.config.size.width - 1,
      y: this.config.size.length - 1,
    };
  };

  getObstaclesCoordinates = (): Coordinates[] => {
    return this.config.obstacles;
  };
}
