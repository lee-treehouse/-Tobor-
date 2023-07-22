import { directionIsNorthOrEast, directionIsNorthOrSouth } from "../Types/CompassDirection";
import { Position } from "../Types/Position";
import { throwNoArgumentsExpected } from "./CommandInput";
import { ICommand } from "./ICommand";

export class MoveCommand implements ICommand {
    public static command = "MOVE";

    public readonly canBeIgnored = true;

    public constructor(args: string[]) {
        throwNoArgumentsExpected(args, MoveCommand.command);
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
