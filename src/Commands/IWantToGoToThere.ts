import { CompassDirection } from "../Common/CompassDirection";
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

    const matchingVisitedCoordinates = coordinatesTravelled.filter((visitedCoordinate) =>
      this.coordinateArraysAreEqual(visitedCoordinate, [this.desiredCoordinates.x, this.desiredCoordinates.y])
    );
    if (!matchingVisitedCoordinates || matchingVisitedCoordinates.length === 0) {
      return "PATH NOT FOUND!";
    }

    const result = coordinatesTravelled.join("\n");
    console.log(result);
    return result;

    // const commandsToAchieveResult: string[] = [];
    // for (let i = 0; i < coordinatesTravelled.length - 1; i++) {
    //   const currentCoordinates = coordinatesTravelled[i];
    //   const nextCoordinate = coordinatesTravelled[i + 1];
    //   const commands = this.getCommandsToMoveFromOneCoordinateToAnother(
    //     currentPosition.directionFacing,
    //     currentCoordinates,
    //     nextCoordinate
    //   );
    //   commands.forEach((command) => commandsToAchieveResult.push(command));
    // }

    // const commandsResult = commandsToAchieveResult.join("\n");

    // const finalResult = `${result}\n\n${commandsResult}`;
    // console.log(finalResult);
    // return finalResult;
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

  private getCommandsToMoveFromOneCoordinateToAnother = (
    curentDirectionFacing: CompassDirection,
    initialCoordinate: number[],
    destinationCoordinate: number[]
  ) => {
    const commands: string[] = [];

    const axisToChange = destinationCoordinate[0] === initialCoordinate[0] ? "X" : "Y";
    const amountToChange =
      axisToChange === "X"
        ? destinationCoordinate[0] - initialCoordinate[0]
        : destinationCoordinate[1] - initialCoordinate[1];
    let directionChangeCommands: string[] = [];

    if (axisToChange === "Y") {
      if (amountToChange === 1) {
        directionChangeCommands = this.getCommandsToFaceDirection(curentDirectionFacing, CompassDirection.NORTH);
      } else {
        directionChangeCommands = this.getCommandsToFaceDirection(curentDirectionFacing, CompassDirection.SOUTH);
      }
    }

    if (axisToChange === "X") {
      if (amountToChange === 1) {
        directionChangeCommands = this.getCommandsToFaceDirection(curentDirectionFacing, CompassDirection.EAST);
      } else {
        directionChangeCommands = this.getCommandsToFaceDirection(curentDirectionFacing, CompassDirection.WEST);
      }
    }

    directionChangeCommands.forEach((directionChangeCommand) => {
      commands.push(directionChangeCommand);
    });
    commands.push("MOVE");
    return commands;
  };

  private getCommandsToFaceDirection(currentDirection: CompassDirection, targetDirection: CompassDirection): string[] {
    if (currentDirection === targetDirection) return [];

    // TODO simplify this logic
    if (currentDirection === CompassDirection.NORTH) {
      if (targetDirection === CompassDirection.SOUTH) return ["RIGHT", "RIGHT"];
      if (targetDirection === CompassDirection.EAST) return ["RIGHT"];
      if (targetDirection === CompassDirection.WEST) return ["LEFT"];
    }

    if (currentDirection === CompassDirection.SOUTH) {
      if (targetDirection === CompassDirection.NORTH) return ["RIGHT", "RIGHT"];
      if (targetDirection === CompassDirection.EAST) return ["LEFT"];
      if (targetDirection === CompassDirection.WEST) return ["RIGHT"];
    }

    if (currentDirection === CompassDirection.EAST) {
      if (targetDirection === CompassDirection.SOUTH) return ["RIGHT"];
      if (targetDirection === CompassDirection.NORTH) return ["LEFT"];
      if (targetDirection === CompassDirection.WEST) return ["RIGHT, RIGHT"];
    }

    if (currentDirection === CompassDirection.WEST) {
      if (targetDirection === CompassDirection.NORTH) return ["RIGHT"];
      if (targetDirection === CompassDirection.EAST) return ["RIGHT, RIGHT"];
      if (targetDirection === CompassDirection.SOUTH) return ["LEFT"];
    }

    return [];
  }

  private areArrayCoordinatesBlockedByObstacle = (coordinates: number[]): boolean => {
    return doCoordinatesHaveObstacles({ x: coordinates[0], y: coordinates[1] }, this.obstacleCoordinates);
  };

  private areArrayCoordinatesOutOfBounds = (coordinates: number[]) => {
    return areCoordinatesOutOfBounds({ x: coordinates[0], y: coordinates[1] }, this.maxCoordinates);
  };
}
