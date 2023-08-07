import { CompassDirection, directionIsNorthOrEast, directionIsNorthOrWest } from "../Common/CompassDirection";
import { Position } from "../Common/Position";
import { Command } from "./Command";
import { CommandResult } from "./CommandResult";
import { CommandParserError } from "./CommandParserError";
import { COULD_NOT_PARSE_PLACE_DIAGONAL_ARGUMENTS_EXPECTED_1 } from "../ErrorMessages/Parsing";

const DEFAULT_MOVE_UNITS = 1;
export class DiagonalCommand implements Command {
  public static command = "DIAGONAL";

  public readonly canBeIgnored = true;

  private readonly moveUnits: number = DEFAULT_MOVE_UNITS;

  public constructor(args: string[]) {
    if (args && args.length > 0) {
      if (args.length > 1) throw new CommandParserError(COULD_NOT_PARSE_PLACE_DIAGONAL_ARGUMENTS_EXPECTED_1(args));

      const moveUnits = parseInt(args[0], 10);

      if (isNaN(moveUnits) || moveUnits < 1)
        throw new CommandParserError(COULD_NOT_PARSE_PLACE_DIAGONAL_ARGUMENTS_EXPECTED_1(args));

      this.moveUnits = moveUnits;
    }
  }

  public execute(currentPosition: Position): CommandResult {
    return this.getNewPosition(currentPosition);
  }

  private getNewPosition = (currentPosition: Position): CommandResult => {
    const { coordinates, directionFacing } = currentPosition;

    const amountToChange = this.getAmountToChannge(directionFacing, this.moveUnits);

    return {
      coordinates: { x: coordinates.x + amountToChange.x, y: coordinates.y + amountToChange.y },
      directionFacing,
    };
  };

  private getAmountToChannge = (directionFacing: CompassDirection, moveUnits: number) => {
    const xAmountToChange = directionIsNorthOrEast(directionFacing) ? 1 : -1;
    const yAmountToChange = directionIsNorthOrWest(directionFacing) ? 1 : -1;
    return {
      x: xAmountToChange * moveUnits,
      y: yAmountToChange * moveUnits,
    };
  };
}
