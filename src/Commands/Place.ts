import { Position } from '../Types/Position';
import { ICommand } from './ICommand';

export class PlaceCommand implements ICommand {
    public static command = 'PLACE';

    public readonly canBeIgnored = false;

    public constructor(args?: string[]) {}

    public execute(currentPosition: Position): Position | void {
        console.log(
            `I am ${PlaceCommand.command} command and my current direction is ${currentPosition.directionFacing}`
        );
    }
}
