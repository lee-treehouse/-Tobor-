import { CompassDirection } from "../Types/CompassDirection";
import { DirectionChange } from "../Types/DirectionChange";
import { IChangeDirectionCommand } from "./IChangeDirectionCommand";

export class LeftCommand implements IChangeDirectionCommand {
  public readonly command = "LEFT";

  public readonly directionChange = DirectionChange.LEFT;

  public getNextDirection(currentDirection: CompassDirection): CompassDirection {
    if (currentDirection === CompassDirection.NORTH) return CompassDirection.WEST;
    if (currentDirection === CompassDirection.WEST) return CompassDirection.SOUTH;
    if (currentDirection === CompassDirection.SOUTH) return CompassDirection.EAST;
    // current direction must be east
    return CompassDirection.NORTH;
  }
}
