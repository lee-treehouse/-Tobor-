import { COULD_NOT_PARSE_ARGUMENTS_TO_COMMAND_NONE_EXPECTED } from "../ErrorMessages/Parsing";
import { CommandParserError } from "./CommandParserError";

export type CommandInput = {
  command: string;
  args: string[];
};

export const separateCommandAndArguments = (input: string, capitaliseCommandsAndArgs: boolean): CommandInput => {
  const tokens = (capitaliseCommandsAndArgs ? input.toUpperCase() : input).split(" ");
  const command = tokens.length > 0 ? tokens[0] : "";
  const args = tokens.length > 1 ? tokens[1].split(",") : [];

  return {
    command,
    args,
  };
};

export const throwNoArgumentsExpected = (input: CommandInput) => {
  throw new CommandParserError(COULD_NOT_PARSE_ARGUMENTS_TO_COMMAND_NONE_EXPECTED(input.args, input.command));
};
