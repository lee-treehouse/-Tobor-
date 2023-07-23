import { Position } from "../Common/Position";
import { throwNoArgumentsExpected } from "./CommandInput";
import { Command } from "./Command";
import { CommandResult } from "./CommandResult";

export class ReportCommand implements Command {
  public static command = "REPORT";

  public readonly canBeIgnored = true;

  public constructor(args: string[]) {
    if (args && args.length > 0) throwNoArgumentsExpected({ args, command: ReportCommand.command });
  }

  public execute(currentPosition: Position): CommandResult {
    const { directionFacing, coordinates } = currentPosition;
    return `${coordinates.x},${coordinates.y},${directionFacing}`;
  }
}
