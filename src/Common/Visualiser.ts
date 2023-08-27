/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable for-direction */
import { Coordinates, doCoordinatesHaveObstacles } from "./Coordinates";

const getStepNumOfCoord = (coord: Coordinates, coordinates: Coordinates[]): boolean | number => {
  for (let i = 0; i < coordinates.length; i++) {
    const c = coordinates[i];
    if (c.x === coord.x && c.y === coord.y) {
      return i + 1;
    }
  }
  return false;
};

export const visualiseTable = (
  maxCoordinates: Coordinates,
  obstacleCoordinates: Coordinates[],
  travelledPath: Coordinates[]
) => {
  let result = "";
  for (let y = maxCoordinates.y; y >= 0; y--) {
    for (let x = 0; x <= maxCoordinates.x; x++) {
      result += "[";
      const currentCoordinate: Coordinates = { x, y };

      if (doCoordinatesHaveObstacles(currentCoordinate, obstacleCoordinates)) {
        result += " X ";
      } else {
        const pathTravelledStepNum = getStepNumOfCoord(currentCoordinate, travelledPath);

        if (pathTravelledStepNum) {
          result += ` ${pathTravelledStepNum} `;
        } else {
          result += "   ";
        }
      }

      result += "]";
      if (x !== maxCoordinates.x) result += "  ";
    }
    result += "\n";
  }
  return result;
};
