import { CompassDirection } from "../Types/CompassDirection";
import { DirectionChange } from "../Types/DirectionChange";
import { Position } from "../Types/Position";
import { throwNoArgumentsExpected } from "./CommandInput";
import { ICommand } from "./ICommand";

export class RightCommand implements ICommand {
    public static command = "RIGHT";

    public readonly canBeIgnored = true;

    public constructor(args: string[]) {
        if (args && args.length > 0) throwNoArgumentsExpected(args, RightCommand.command);
    }

    public execute(currentPosition: Position): Position | void {
        const { directionFacing, coordinates } = currentPosition;

        const newPosition: Position = {
            coordinates,
            directionFacing: this.getNextDirection(directionFacing),
        };
        return newPosition;
    }

    private getNextDirection(currentDirection: CompassDirection): CompassDirection {
        if (currentDirection === CompassDirection.NORTH) return CompassDirection.EAST;
        if (currentDirection === CompassDirection.EAST) return CompassDirection.SOUTH;
        if (currentDirection === CompassDirection.SOUTH) return CompassDirection.WEST;
        return CompassDirection.NORTH;
    }
}
