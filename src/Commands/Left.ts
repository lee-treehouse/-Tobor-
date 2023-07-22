import { CompassDirection } from "../Types/CompassDirection";
import { DirectionChange } from "../Types/DirectionChange";
import { Position } from "../Types/Position";
import { throwNoArgumentsExpected } from "./CommandInput";
import { IChangeDirectionCommand } from "./IChangeDirectionCommand";

export class LeftCommand implements IChangeDirectionCommand {
    public static command = "LEFT";

    public readonly canBeIgnored = true;

    public readonly directionChange = DirectionChange.LEFT;

    public constructor(args: string[]) {
        throwNoArgumentsExpected(args, LeftCommand.command);
    }

    public execute(currentPosition: Position): Position | void {
        const { directionFacing, coordinates } = currentPosition;

        const newPosition: Position = {
            coordinates,
            directionFacing: this.getNextDirection(directionFacing),
        };
    }

    private getNextDirection(currentDirection: CompassDirection): CompassDirection {
        if (currentDirection === CompassDirection.NORTH) return CompassDirection.WEST;
        if (currentDirection === CompassDirection.WEST) return CompassDirection.SOUTH;
        if (currentDirection === CompassDirection.SOUTH) return CompassDirection.EAST;
        // current direction must be east
        return CompassDirection.NORTH;
    }
}
