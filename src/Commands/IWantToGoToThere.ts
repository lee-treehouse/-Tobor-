import { CompassDirection } from "../Common/CompassDirection";
import { Coordinates, parseCoordinates } from "../Common/Coordinates";
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

  public execute(): CommandResult {
    const position: Position = { coordinates: this.desiredCoordinates, directionFacing: CompassDirection.NORTH };
    return position;
  }
}
