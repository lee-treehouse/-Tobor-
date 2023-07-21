import { Position } from '../Types/Position';
import { ICommand } from './ICommand';

export class ReportCommand implements ICommand {
    public static command = 'REPORT';

    public readonly canBeIgnored = true;

    public constructor(args?: string[]) {}

    public execute(currentPosition: Position): Position | void {
        console.log(
            `I am ${ReportCommand.command} command and my current direction is ${currentPosition.directionFacing}`
        );
    }
}
