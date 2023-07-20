import { CompassDirection } from "../Types/CompassDirection";
import { DirectionChange } from "../Types/DirectionChange";
import { IChangeDirectionCommand } from "./IChangeDirectionCommand";

export class RightCommand implements IChangeDirectionCommand {
  public readonly command = "RIGHT";

  public readonly directionChange = DirectionChange.RIGHT;

  public getNextDirection(currentDirection: CompassDirection): CompassDirection {
    if (currentDirection === CompassDirection.NORTH) return CompassDirection.EAST;
    if (currentDirection === CompassDirection.EAST) return CompassDirection.SOUTH;
    if (currentDirection === CompassDirection.SOUTH) return CompassDirection.WEST;
    // current direction must be west
    return CompassDirection.NORTH;
  }
}
