import {
  Coordinates,
  areCoordinatesOutOfBounds,
  doCoordinatesHaveObstacles,
  parseCoordinates,
} from "../Common/Coordinates";
import { Position } from "../Common/Position";
import { COULD_NOT_PARSE_IWANTTOGOTOTHERE_ARGUMENTS_EXPECTED_2 } from "../ErrorMessages/Parsing";
import { Command } from "./Command";
import { CommandParserError } from "./CommandParserError";
import { CommandResult } from "./CommandResult";

export class IWantToGoToThereCommand implements Command {
  public static command = "IWANTTOGOTOTHERE";

  public readonly canBeIgnored = true;

  private desiredCoordinates: Coordinates;
  private maxCoordinates: Coordinates;
  private obstacleCoordinates: Coordinates[];

  public constructor(args: string[], maxCoordinates: Coordinates, obstacleCoordinates: Coordinates[]) {
    if (!args || args.length != 2)
      throw new CommandParserError(COULD_NOT_PARSE_IWANTTOGOTOTHERE_ARGUMENTS_EXPECTED_2(args));
    this.desiredCoordinates = parseCoordinates(args[0], args[1]);
    this.maxCoordinates = maxCoordinates;
    this.obstacleCoordinates = obstacleCoordinates;
  }

  public execute(currentPosition: Position): CommandResult {
    const coordinatesTravelled = this.breadthFirstSearch(
      [currentPosition.coordinates.x, currentPosition.coordinates.y],
      [this.desiredCoordinates.x, this.desiredCoordinates.y]
    );
    const result = coordinatesTravelled.join("\n");
    return result;
  }

  private coordinateArraysAreEqual = (array1: number[], array2: number[]) =>
    array1[0] === array2[0] && array1[1] === array2[1];

  private breadthFirstSearch = (initialCoordinate: number[], desiredCoordinate: number[]) => {
    const queue: number[][] = [initialCoordinate];
    const visitedCoordinates: number[][] = [];
    const result = [];

    while (queue.length) {
      const coordinate = queue.shift();

      if (coordinate) {
        const matchingVisitedCoordinates = visitedCoordinates.filter((visitedCoordinate) =>
          this.coordinateArraysAreEqual(visitedCoordinate, coordinate)
        );

        if (!matchingVisitedCoordinates || matchingVisitedCoordinates.length === 0) {
          visitedCoordinates.push(coordinate);
          result.push(coordinate);

          if (this.coordinateArraysAreEqual(coordinate, desiredCoordinate)) return result;

          const neighbours = this.getNeighbours(coordinate);

          for (const neighbour of neighbours) {
            queue.push(neighbour);
          }
        }
      }
    }
    return result;
  };

  private getNeighbours(coordinates: number[]) {
    const xCoord = coordinates[0];
    const yCoord = coordinates[1];

    const northNeighbour = [xCoord, yCoord + 1];
    const southNeighbour = [xCoord, yCoord - 1];
    const eastNeighbour = [xCoord + 1, yCoord];
    const westNeighbour = [xCoord - 1, yCoord];
    const possibleNeighbours = [northNeighbour, southNeighbour, eastNeighbour, westNeighbour];

    const neighbours: number[][] = [];
    possibleNeighbours.forEach((neighbour) => {
      const isBlocked = this.areArrayCoordinatesBlockedByObstacle(neighbour);
      const isOutOfBounds = this.areArrayCoordinatesOutOfBounds(neighbour);
      if (!isBlocked && !isOutOfBounds) neighbours.push(neighbour);
    });

    return neighbours;
  }

  private areArrayCoordinatesBlockedByObstacle = (coordinates: number[]): boolean => {
    return doCoordinatesHaveObstacles({ x: coordinates[0], y: coordinates[1] }, this.obstacleCoordinates);
  };

  private areArrayCoordinatesOutOfBounds = (coordinates: number[]) => {
    return areCoordinatesOutOfBounds({ x: coordinates[0], y: coordinates[1] }, this.maxCoordinates);
  };
}
