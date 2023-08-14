import { parseCompassDirection } from "../Common/CompassDirection";
import { Coordinates } from "../Common/Coordinates";
import { Position } from "../Common/Position";
import { COULD_NOT_PARSE_PLACEMAX_ARGUMENTS_EXPECTED_1 } from "../ErrorMessages/Parsing";
import { Command } from "./Command";
import { CommandParserError } from "./CommandParserError";
import { CommandResult } from "./CommandResult";

export class PlaceMaxCommand implements Command {
  public static command = "PLACEMAX";

  public readonly canBeIgnored = false;

  private position: Position;

  public constructor(args: string[], maxCoordinates: Coordinates) {
    if (!args || args.length != 1) throw new CommandParserError(COULD_NOT_PARSE_PLACEMAX_ARGUMENTS_EXPECTED_1(args));
    const coordinates = maxCoordinates;
    const directionFacing = parseCompassDirection(args[0]);
    this.position = { coordinates, directionFacing };
  }

  public execute(): CommandResult {
    return this.position;
  }
}
