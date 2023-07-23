import { getCommand } from "../Commands/CommandFactory";
import { separateCommandAndArguments } from "../Commands/CommandInput";
import { Command } from "../Commands/Command";
import { ToborConfig } from "../Config/Config";
import { Position, defaultPosition } from "../Common/Position";
import { Table } from "../Common/Table";
import { cliInputService } from "./cliInputService";
import { FileReadingService } from "./FileReadingService";

export class ToborService {
  public robotPosition: Position | "OFF" = "OFF";

  public constructor(private readonly config: ToborConfig, private readonly table: Table) {}

  public onReadInput = async (line: string): Promise<void> => {
    const commandInput = separateCommandAndArguments(line, this.config.input.format.capitaliseCommandsAndArgs);
    const command: Command = getCommand(commandInput);

    if (this.robotPosition === "OFF" && command.canBeIgnored) return Promise.resolve();

    const newPosition = command.execute(this.robotPosition !== "OFF" ? this.robotPosition : defaultPosition);

    if (newPosition && !this.table.areCoordinatesOutOfBounds(newPosition.coordinates)) this.robotPosition = newPosition;

    Promise.resolve();
  };

  public readInput = async () => {
    // TODO refactor to use an interface + factory + add tests
    if (this.config.input.fileName) {
      const fileReadingService = new FileReadingService(this.config.input.fileName);
      await fileReadingService.processFileLineByLine(this.onReadInput);
    } else {
      const inputService = new cliInputService();
      await inputService.requestInputLineByLine(this.onReadInput);
    }
  };
}
