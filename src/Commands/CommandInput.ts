import { COULD_NOT_PARSE_ARGUMENTS_TO_COMMAND_NONE_EXPECTED } from "../ErrorMessages/Parsing";

export type CommandInput = {
    command: string;
    args: string[];
};

export const separateCommandAndArguments = (input: string, capitaliseCommandsAndArgs: boolean) => {
    const capitalizedInput = input.toUpperCase();
    const tokens = (capitaliseCommandsAndArgs ? capitalizedInput : input).split(" ");
    const command = tokens && tokens.length > 0 ? tokens[0] : "";
    const args = tokens && tokens.length > 1 ? tokens[1].split(",") : [];

    return {
        command,
        args,
    };
};

export const throwNoArgumentsExpected = (args: string[], command: string) => {
    throw new Error(COULD_NOT_PARSE_ARGUMENTS_TO_COMMAND_NONE_EXPECTED(args, command));
};
