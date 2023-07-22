import { CompassDirection } from "../Types/CompassDirection";
import { DirectionChange } from "../Types/DirectionChange";
import { Position } from "../Types/Position";
import { throwNoArgumentsExpected } from "./CommandInput";
import { ICommand } from "./ICommand";

export class LeftCommand implements ICommand {
    public static command = "LEFT";

    public readonly canBeIgnored = true;

    public constructor(args: string[]) {
        if (args && args.length > 0) throwNoArgumentsExpected(args, LeftCommand.command);
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
        if (currentDirection === CompassDirection.NORTH) return CompassDirection.WEST;
        if (currentDirection === CompassDirection.WEST) return CompassDirection.SOUTH;
        if (currentDirection === CompassDirection.SOUTH) return CompassDirection.EAST;
        return CompassDirection.NORTH;
    }
}
