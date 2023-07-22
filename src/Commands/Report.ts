import { Position } from "../Common/Position";
import { throwNoArgumentsExpected } from "./CommandInput";
import { ICommand } from "./ICommand";

export class ReportCommand implements ICommand {
    public static command = "REPORT";

    public readonly canBeIgnored = true;

    public constructor(args: string[]) {
        if (args && args.length > 0) throwNoArgumentsExpected(args, ReportCommand.command);
    }

    public execute(currentPosition: Position): Position | void {
        const { directionFacing, coordinates } = currentPosition;
        console.log(`${coordinates.x},${coordinates.y},${directionFacing}`);
    }
}
