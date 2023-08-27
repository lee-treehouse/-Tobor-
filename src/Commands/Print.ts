import { throwNoArgumentsExpected } from "./CommandInput";
import { Command } from "./Command";
import { CommandResult } from "./CommandResult";
import { Coordinates } from "../Common/Coordinates";
import { visualiseTable } from "../Common/Visualiser";

export class PrintCommand implements Command {
  public static command = "PRINT";

  public readonly canBeIgnored = true;
  private maxCoordinates: Coordinates;
  private obstacleCoordinates: Coordinates[];

  public constructor(args: string[], maxCoordinates: Coordinates, obstacleCoordinates: Coordinates[]) {
    if (args && args.length > 0) throwNoArgumentsExpected({ args, command: PrintCommand.command });
    this.maxCoordinates = maxCoordinates;
    this.obstacleCoordinates = obstacleCoordinates;
  }

  public execute(): CommandResult {
    return visualiseTable(this.maxCoordinates, this.obstacleCoordinates, []);
  }
}
