import { Position } from "../Common/Position";
import { throwNoArgumentsExpected } from "./CommandInput";
import { Command } from "./Command";

export class ExitCommand implements Command {
  public static command = "EXIT";

  public readonly canBeIgnored = false;

  public constructor(args: string[]) {
    if (args && args.length > 0) throwNoArgumentsExpected({ args, command: ExitCommand.command });
  }

  public execute(): Position | void {
    process.exit();
  }
}
