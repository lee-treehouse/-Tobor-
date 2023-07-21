import { ICommand } from './ICommand';
import { LeftCommand } from './Left';
import { MoveCommand } from './Move';
import { PlaceCommand } from './Place';
import { ReportCommand } from './Report';
import { RightCommand } from './Right';

export const getCommand = (input: string): ICommand => {
    const tokens = input.split(' ');
    const command = tokens.length > 0 ? tokens[0] : '';
    const args = tokens.length > 1 ? tokens[1].split(',') : [];

    if (command === LeftCommand.command) return new LeftCommand(args);
    if (command === MoveCommand.command) return new MoveCommand(args);
    if (command === RightCommand.command) return new RightCommand(args);
    if (command === PlaceCommand.command) return new PlaceCommand(args);
    if (command === ReportCommand.command) return new ReportCommand(args);

    // the commands themselves can manage throwing if args are unrecognized
    throw new Error(`Unrecognized input ${input}`);
};
