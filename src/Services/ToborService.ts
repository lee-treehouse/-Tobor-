import { getCommand } from "../Commands/CommandFactory";
import { separateCommandAndArguments } from "../Commands/CommandInput";
import { Command } from "../Commands/Command";
import { ToborConfig } from "../Config/Config";
import { Position, defaultPosition } from "../Common/Position";
import { Table } from "../Common/Table";
import { getLineReader } from "../Input/LineReaderFactory";
import { CommandResult, isPosition } from "../Commands/CommandResult";
import { Logger } from "../Output/Logger";
import { CommandParserError } from "../Commands/CommandParserError";

export class ToborService {
  public robotPosition: Position | "OFF" = "OFF";

  public constructor(
    private readonly config: ToborConfig,
    private readonly table: Table,
    private readonly logger: Logger
  ) {}

  public onReadInput = async (line: string): Promise<void> => {
    const commandInput = separateCommandAndArguments(line, this.config.input.format.capitaliseCommandsAndArgs);

    try {
      const command: Command = getCommand(
        commandInput,
        this.table.getMaxCoordinates(),
        this.table.getObstaclesCoordinates()
      );
      if (this.robotPosition === "OFF" && command.canBeIgnored) return Promise.resolve();
      const commandResult = command.execute(this.robotPosition !== "OFF" ? this.robotPosition : defaultPosition);
      this.processCommandResult(commandResult);
    } catch (error) {
      const exitOnCommandParserError = this.config.input.parser.exitOnCommandParserError;
      const errorIsCommandParserError = error instanceof CommandParserError;

      if (exitOnCommandParserError || !errorIsCommandParserError) throw error;
      if (!exitOnCommandParserError && errorIsCommandParserError) this.logger.log(error.message);
    }

    Promise.resolve();
  };

  private processCommandResult = (commandResult: CommandResult) => {
    if (!commandResult) return;

    if (isPosition(commandResult)) {
      this.processNewPosition(commandResult);
      return;
    }
    this.logger.log(commandResult);
  };

  private processNewPosition = (newPosition: Position) => {
    const positionHasObstaclesInTheWay = this.table.doCoordinatesHaveObstacles(newPosition.coordinates);
    const positionIsOutOfBounds = this.table.areCoordinatesOutOfBounds(newPosition.coordinates);

    if (!(positionHasObstaclesInTheWay || positionIsOutOfBounds)) {
      this.robotPosition = newPosition;
    }
  };

  public readInput = async () => {
    const lineReader = getLineReader(this.logger, this.config.input.fileName);
    await lineReader.getInputLineByLine(this.onReadInput);
  };
}
