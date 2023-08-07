import { CompassDirection } from "../Common/CompassDirection";
import { Position } from "../Common/Position";
import { throwNoArgumentsExpected } from "./CommandInput";
import { Command } from "./Command";
import { CommandResult } from "./CommandResult";

export class DiagonalCommand implements Command {
  public static command = "DIAGONAL";

  public readonly canBeIgnored = true;

  public constructor(args: string[]) {
    if (args && args.length > 0) throwNoArgumentsExpected({ args, command: DiagonalCommand.command });
  }

  public execute(currentPosition: Position): CommandResult {
    return this.getNewPosition(currentPosition);
  }

  private getNewPosition = (currentPosition: Position): CommandResult => {
    const { coordinates, directionFacing } = currentPosition;

    const amountToChange = this.getAmountToChannge(directionFacing);

    return {
      coordinates: { x: coordinates.x + amountToChange.x, y: coordinates.y + amountToChange.y },
      directionFacing,
    };
  };

  private getAmountToChannge = (directionFacing: CompassDirection) => {
    switch (directionFacing) {
      case CompassDirection.NORTH:
        return {
          x: 1,
          y: 1,
        };
      case CompassDirection.SOUTH:
        return {
          x: -1,
          y: -1,
        };
      case CompassDirection.EAST:
        return {
          x: 1,
          y: -1,
        };
      case CompassDirection.WEST:
        return {
          x: -1,
          y: 1,
        };
    }
  };
}
