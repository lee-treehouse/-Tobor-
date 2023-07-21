import { Position } from "../Types/Position";
import { ICommand } from "./Command";

export class ReportCommand implements ICommand {
    public static command = "REPORT";

    public readonly canBeIgnored = true;

    public constructor(args?: string[]) {}

    public execute(currentPosition: Position): Position | void {
        const { directionFacing, coordinates } = currentPosition;
        console.log(`${coordinates.x},${coordinates.y},${directionFacing}`);
    }
}
