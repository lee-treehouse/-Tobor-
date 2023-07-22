import { getCommand } from "../Commands/CommandFactory";
import { separateCommandAndArguments } from "../Commands/CommandInput";
import { ICommand } from "../Commands/ICommand";
import { ToborConfig } from "../Config/Config";
import { Position, zeroPosition } from "../Common/Position";
import { Table } from "../Common/Table";
import { cliInputService } from "./cliInputService";
import { FileReadingService } from "./fileReadingService";

export class ToborService {
    private robotPosition: Position | "OFF" = "OFF";

    public constructor(private readonly config: ToborConfig, private readonly table: Table) {}

    public onReadInput = async (line: string): Promise<void> => {
        const commandInput = separateCommandAndArguments(line, this.config.input.format.capitaliseCommandsAndArgs);

        console.log(commandInput);

        const command: ICommand = getCommand(commandInput);

        let newPosition;

        if (this.robotPosition !== "OFF") {
            newPosition = command.execute(this.robotPosition);
        } else {
            if (command.canBeIgnored) Promise.resolve();
            // maybe we'll rename this default position or starting position
            newPosition = command.execute(zeroPosition);
        }

        if (newPosition && !this.table.areCoordinatesOutOfBounds(newPosition.coordinates))
            this.robotPosition = newPosition;

        Promise.resolve();
    };

    readInput = async () => {
        if (this.config.input.fileName) {
            const fileReadingService = new FileReadingService(this.config.input.fileName);
            await fileReadingService.processFileLineByLine(this.onReadInput);
        } else {
            const inputService = new cliInputService();
            await inputService.requestInputLineByLine(this.onReadInput);
        }
        console.log("I am all done");
    };
}
