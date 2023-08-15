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
    try {
      const allCoordinates = this.getAllCoordinatesTravelledToVisitDestination(currentPosition);
      if (allCoordinates && allCoordinates.length > 0) {
        const getRouteIncludingBacktracking = this.getRouteFromAllCoordinates(allCoordinates);
        return getRouteIncludingBacktracking?.join("\n");
      }
      return "No Route Found";
    } catch (error) {
      let message = "Unknown Error";
      if (error instanceof Error) message = error.message;
      return message;
    }
  }

  private getRouteFromAllCoordinates = (coordinates: number[][]) => {
    /*
// are all of these moves one at a time? No 
0,3
0,2
0,1
0,0
1,1 // processing forwards, here is the first move that is problematic //
1,0
2,0
3,0
3,1  
4,0
4,1
4,2

// so what would route including backtrackign look like at this stage 
0,3
0,2
0,1
0,0
0,1 // went back as couldn't get to 1,1
1,1 
1,0
2,0
3,0
3,1
3,0 // went back as couldn't get to 3,1
4,0  
4,1
4,2
*/
    const routeIncludingBacktracking: number[][] = [];
    if (coordinates.length > 0) {
      routeIncludingBacktracking.push(coordinates[0]);
    }

    for (let i = 0; i < coordinates.length - 1; i++) {
      const currentCoordinate = routeIncludingBacktracking[routeIncludingBacktracking.length - 1];
      const nextCoordinate = coordinates[i + 1];

      //routeIncludingBacktracking.push(currentCoordinate);

      const areCoordinatesAdjacent = this.areCoordinatesAdjacent(currentCoordinate, nextCoordinate);

      if (areCoordinatesAdjacent) {
        routeIncludingBacktracking.push(nextCoordinate);
      } else {
        let howFarToGoBack = 0;
        for (let j = i - 1; j >= 0; j--) {
          console.log("i is " + i);
          console.log("I am in the for loop and j is " + j);

          const candidateCoordinate = coordinates[j];
          routeIncludingBacktracking.push(candidateCoordinate);
          if (this.areCoordinatesAdjacent(candidateCoordinate, nextCoordinate)) {
            // I couldn't get from 0,0 to 1,1 so I went back the prior coord
            // which is 0,1
            // I can get from 0,1 to 1,1 so I want to go back 1.. but in another scenario maybe I woudl have had to go back 2 eg
            // when i found the problem i was 3
            // in this case j is going to be 2
            howFarToGoBack = i - j;
            //console.log("going back " + howFarToGoBack);
            break;
            // we need to go back until we can find a previous coordinate that can get us to our next coordinate. we should
            // not put the current coordinate in our route
          }
        }
        // once this loop is complete, you have definitely backtracked to where you can get to the next coordinate so lets add it
        routeIncludingBacktracking.push(nextCoordinate);
      }
    }

    console.log(routeIncludingBacktracking);

    return routeIncludingBacktracking;
  };

  private areCoordinatesAdjacent = (coordinate1: number[], coordinate2: number[]) => {
    const xDiff = Math.abs(coordinate1[0] - coordinate2[0]);
    const yDiff = Math.abs(coordinate1[1] - coordinate2[1]);
    if (xDiff === 0 && yDiff === 1) return true;
    if (yDiff === 0 && xDiff === 1) return true;
    return false;
  };

  public getAllCoordinatesTravelledToVisitDestination(currentPosition: Position) {
    const coordinatesTravelled = this.breadthFirstSearch(
      [currentPosition.coordinates.x, currentPosition.coordinates.y],
      [this.desiredCoordinates.x, this.desiredCoordinates.y]
    );

    const matchingVisitedCoordinates = coordinatesTravelled.filter((visitedCoordinate) =>
      this.coordinateArraysAreEqual(visitedCoordinate, [this.desiredCoordinates.x, this.desiredCoordinates.y])
    );

    if (!matchingVisitedCoordinates || matchingVisitedCoordinates.length === 0) {
      throw new Error("PATH NOT FOUND!");
    }

    return coordinatesTravelled;

    //const result = coordinatesTravelled.join("\n");
    // console.log(result);
    //return result;

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

  private coordinateIsContainedInVisited = (coordinate: number[], visited: number[][]) => {
    const matchingCoordinates = visited.filter((visited) => this.coordinateArraysAreEqual(visited, coordinate));
    return matchingCoordinates && matchingCoordinates.length > 0;
  };

  private coordinateArraysAreEqual = (array1: number[], array2: number[]) =>
    array1[0] === array2[0] && array1[1] === array2[1];

  private breadthFirstSearch = (initialCoordinate: number[], desiredCoordinate: number[]) => {
    const queue: number[][] = [initialCoordinate];
    const visitedCoordinates: number[][] = [];
    const actualPath: number[][] = [];
    const result = [];

    while (queue.length) {
      const coordinate = queue.shift();

      if (coordinate) {
        if (!this.coordinateIsContainedInVisited(coordinate, visitedCoordinates)) {
          visitedCoordinates.push(coordinate);
          result.push(coordinate);

          // exit early if destination is found
          if (this.coordinateArraysAreEqual(coordinate, desiredCoordinate)) {
            actualPath.push(coordinate);
            return actualPath;
          }
          const neighbours = this.getNeighbours(coordinate);
          // if you have visited a neighbour, there is no reason to requeue it
          // if you have visited all the neighbours, this is a dead end
          const alreadyVisitedNeighbours: number[][] = [];
          for (const neighbour of neighbours) {
            if (this.coordinateIsContainedInVisited(neighbour, visitedCoordinates)) {
              alreadyVisitedNeighbours.push(neighbour);
            } else {
              queue.push(neighbour);
            }
          }

          // make sure it's not a dead end before adding it to the actual path
          if (!(alreadyVisitedNeighbours.length === neighbours.length)) {
            actualPath.push(coordinate);
          }
        }
      }
    }
    return actualPath;
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
