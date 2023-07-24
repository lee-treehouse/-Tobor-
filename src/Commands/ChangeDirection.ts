import { CompassDirection } from "../Common/CompassDirection";
import { DirectionChange } from "../Common/DirectionChange";
import { Position } from "../Common/Position";
import { throwNoArgumentsExpected } from "./CommandInput";
import { Command } from "./Command";
import { CommandResult } from "./CommandResult";

export class ChangeDirectionCommand implements Command {
  public readonly canBeIgnored = true;
  public command: DirectionChange;

  public constructor(args: string[], command: DirectionChange) {
    this.command = command;
    if (args && args.length > 0) throwNoArgumentsExpected({ args, command });
  }

  public execute(currentPosition: Position): CommandResult {
    const { directionFacing, coordinates } = currentPosition;

    const newPosition: Position = {
      coordinates,
      directionFacing: this.getNextDirection(directionFacing),
    };
    return newPosition;
  }

  private getNextDirection(directionFacing: CompassDirection) {
    const offset = this.command === DirectionChange.LEFT ? -1 : 1;
    return this.getNextDirectionByOffset(directionFacing, offset);
  }

  private getNextDirectionByOffset(directionFacing: CompassDirection, offset: number): CompassDirection {
    const directions = [CompassDirection.NORTH, CompassDirection.EAST, CompassDirection.SOUTH, CompassDirection.WEST];

    const currentIndex = directions.indexOf(directionFacing);
    const nextIndex = (currentIndex + directions.length + offset) % directions.length;
    return directions[nextIndex];
  }
}
