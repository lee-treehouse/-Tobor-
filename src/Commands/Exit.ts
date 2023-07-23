import { throwNoArgumentsExpected } from "./CommandInput";
import { Command } from "./Command";
import { CommandResult } from "./CommandResult";

export class ExitCommand implements Command {
  public static command = "EXIT";

  public readonly canBeIgnored = false;

  public constructor(args: string[]) {
    if (args && args.length > 0) throwNoArgumentsExpected({ args, command: ExitCommand.command });
  }

  public execute(): CommandResult {
    process.exit();
  }
}
