import { COULD_NOT_PARSE_UNRECOGNIZED_COMMAND_SUFFIX } from "../ErrorMessages/Parsing";
import { CommandInput } from "./CommandInput";
import { ICommand } from "./ICommand";
import { LeftCommand } from "./Left";
import { MoveCommand } from "./Move";
import { PlaceCommand } from "./Place";
import { ReportCommand } from "./Report";
import { RightCommand } from "./Right";

export const getCommand = (input: CommandInput): ICommand => {
    const { command, args } = input;

    switch (command) {
        case LeftCommand.command:
            return new LeftCommand(args);
        case MoveCommand.command:
            return new MoveCommand(args);
        case RightCommand.command:
            return new RightCommand(args);
        case PlaceCommand.command:
            return new PlaceCommand(args);
        case ReportCommand.command:
            return new ReportCommand(args);
    }

    throw new Error(`${input} ${COULD_NOT_PARSE_UNRECOGNIZED_COMMAND_SUFFIX}`);
};
