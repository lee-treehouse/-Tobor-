import { parseCompassDirection } from "../Common/CompassDirection";
import { parseCoordinates } from "../Common/Coordinates";
import { Position } from "../Common/Position";
import { COULD_NOT_PARSE_PLACE_ARGUMENTS_EXPECTED_3 } from "../ErrorMessages/Parsing";
import { Command } from "./Command";

export class PlaceCommand implements Command {
  public static command = "PLACE";

  public readonly canBeIgnored = false;

  private position: Position;

  public constructor(args: string[]) {
    if (!args || args.length != 3) throw new Error(COULD_NOT_PARSE_PLACE_ARGUMENTS_EXPECTED_3(args));
    const coordinates = parseCoordinates(args[0], args[1]);
    const directionFacing = parseCompassDirection(args[2]);
    this.position = { coordinates, directionFacing };
  }

  public execute(): Position | void {
    return this.position;
  }
}
