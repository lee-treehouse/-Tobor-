import { ICommand, separateCommandAndArguments } from "./Command";
import { LeftCommand } from "./Left";
import { MoveCommand } from "./Move";
import { PlaceCommand } from "./Place";
import { ReportCommand } from "./Report";
import { RightCommand } from "./Right";

export const getCommand = (input: string): ICommand => {
    const { command, args } = separateCommandAndArguments(input);

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
    // if (command === LeftCommand.command) return new LeftCommand(args);
    // if (command === MoveCommand.command) return new MoveCommand(args);
    // if (command === RightCommand.command) return new RightCommand(args);
    // if (command === PlaceCommand.command) return new PlaceCommand(args);
    // if (command === ReportCommand.command) return new ReportCommand(args);

    // TODO the commands themselves can manage throwing if args are unrecognized
    throw new Error(`Unrecognized input ${input}`);
};
