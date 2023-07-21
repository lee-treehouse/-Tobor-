import { getCommand } from '../Commands/CommandFactory';
import { ICommand } from '../Commands/ICommand';
import { AppConfig } from '../Parsers/Config';
import { Position, zeroPosition } from '../Types/Position';
import { Table } from '../Types/Table';
import { cliInputService } from './cliInputService';
import { FileReadingService } from './fileReadingService';

export class ToborService {
    private robotPosition: Position | 'OFF' = 'OFF';

    public constructor(private readonly config: AppConfig, private readonly table: Table) {
        console.log(`Tobor service running for Table ${config.table.size.width} x ${config.table.size.height}`);
    }

    public onReadInput = async (line: string): Promise<void> => {
        const command: ICommand = getCommand(line);

        let newPosition;

        if (this.robotPosition !== 'OFF') {
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
        console.log('I am all done');
    };
}
