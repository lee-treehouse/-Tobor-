import { COULD_NOT_PARSE_UNRECOGNIZED_COMMAND_SUFFIX } from "../ErrorMessages/Parsing";
import { DirectionChange } from "../Common/DirectionChange";
import { ChangeDirectionCommand } from "./ChangeDirection";
import { CommandInput } from "./CommandInput";
import { Command } from "./Command";

import { MoveCommand } from "./Move";
import { PlaceCommand } from "./Place";
import { ReportCommand } from "./Report";
import { ExitCommand } from "./Exit";
import { CommandParserError } from "./CommandParserError";
import { Coordinates } from "../Common/Coordinates";

export const getCommand = (input: CommandInput, maxCoordinates: Coordinates): Command => {
  const { command, args } = input;

  switch (command) {
    case MoveCommand.command:
      return new MoveCommand(args);
    case ExitCommand.command:
      return new ExitCommand(args);
    case PlaceCommand.command:
      return new PlaceCommand(args);
    case ReportCommand.command:
      return new ReportCommand(args);
    case DirectionChange.LEFT:
    case DirectionChange.RIGHT:
      return new ChangeDirectionCommand(args, command);
  }
  throw new CommandParserError(`${input.command} ${COULD_NOT_PARSE_UNRECOGNIZED_COMMAND_SUFFIX}`);
};
