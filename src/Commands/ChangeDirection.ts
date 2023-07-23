import { CompassDirection } from "../Common/CompassDirection";
import { DirectionChange } from "../Common/DirectionChange";
import { Position } from "../Common/Position";
import { throwNoArgumentsExpected } from "./CommandInput";
import { Command } from "./Command";

export class ChangeDirectionCommand implements Command {
  public readonly canBeIgnored = true;
  public command: DirectionChange;

  public constructor(args: string[], command: DirectionChange) {
    this.command = command;
    if (args && args.length > 0) throwNoArgumentsExpected({ args, command });
  }

  public execute(currentPosition: Position): Position | void {
    const { directionFacing, coordinates } = currentPosition;

    const newPosition: Position = {
      coordinates,
      directionFacing: this.getNextDirection(directionFacing),
    };
    return newPosition;
  }

  private getNextDirection(directionFacing: CompassDirection) {
    return this.command === DirectionChange.LEFT
      ? this.getNextDirectionLeft(directionFacing)
      : this.getNextDirectionRight(directionFacing);
  }

  private getNextDirectionLeft(currentDirection: CompassDirection): CompassDirection {
    if (currentDirection === CompassDirection.NORTH) return CompassDirection.WEST;
    if (currentDirection === CompassDirection.WEST) return CompassDirection.SOUTH;
    if (currentDirection === CompassDirection.SOUTH) return CompassDirection.EAST;
    return CompassDirection.NORTH;
  }

  private getNextDirectionRight(currentDirection: CompassDirection): CompassDirection {
    if (currentDirection === CompassDirection.NORTH) return CompassDirection.EAST;
    if (currentDirection === CompassDirection.EAST) return CompassDirection.SOUTH;
    if (currentDirection === CompassDirection.SOUTH) return CompassDirection.WEST;
    return CompassDirection.NORTH;
  }
}
