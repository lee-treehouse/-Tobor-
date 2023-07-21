import { CompassDirection } from '../Types/CompassDirection';
import { DirectionChange } from '../Types/DirectionChange';
import { Position } from '../Types/Position';
import { IChangeDirectionCommand } from './IChangeDirectionCommand';

export class RightCommand implements IChangeDirectionCommand {
    public static command = 'RIGHT';

    public readonly canBeIgnored = true;

    public readonly directionChange = DirectionChange.RIGHT;

    public constructor(args?: string[]) {}

    public execute(currentPosition: Position): Position | void {
        const { directionFacing, coordinates } = currentPosition;

        const newPosition: Position = {
            coordinates,
            directionFacing: this.getNextDirection(directionFacing),
        };
    }

    private getNextDirection(currentDirection: CompassDirection): CompassDirection {
        if (currentDirection === CompassDirection.NORTH) return CompassDirection.EAST;
        if (currentDirection === CompassDirection.EAST) return CompassDirection.SOUTH;
        if (currentDirection === CompassDirection.SOUTH) return CompassDirection.WEST;
        // current direction must be west
        return CompassDirection.NORTH;
    }
}
