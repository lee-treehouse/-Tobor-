import { directionIsNorthOrEast, directionIsNorthOrSouth } from "../Common/CompassDirection";
import { Position } from "../Common/Position";
import { throwNoArgumentsExpected } from "./CommandInput";
import { Command } from "./Command";

export class MoveCommand implements Command {
  public static command = "MOVE";

  public readonly canBeIgnored = true;

  public constructor(args: string[]) {
    if (args && args.length > 0) throwNoArgumentsExpected(args, MoveCommand.command);
  }

  public execute(currentPosition: Position): Position | void {
    return this.getNewPosition(currentPosition);
  }

  private getNewPosition = (currentPosition: Position): Position => {
    const { coordinates, directionFacing } = currentPosition;

    const axisToChange = directionIsNorthOrSouth(directionFacing) ? "Y" : "X";
    const amountToChange = directionIsNorthOrEast(directionFacing) ? 1 : -1;

    if (axisToChange === "Y") {
      return { coordinates: { x: coordinates.x, y: coordinates.y + amountToChange }, directionFacing };
    } else {
      return { coordinates: { x: coordinates.x + amountToChange, y: coordinates.y }, directionFacing };
    }
  };
}
