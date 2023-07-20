import { AppConfig } from "../Parsers/Config";
import { Position } from "../Types/Position";
import { cliInputService } from "./cliInputService";
import { FileReadingService } from "./fileReadingService";

export class ToborService {
  private robotPosition: Position | "OFF" = "OFF";

  public constructor(private readonly config: AppConfig) {
    console.log(`Tobor service running for Table ${config.table.size.width} x ${config.table.size.height}`);
  }

  public async onReadInput(line: string): Promise<void> {
    console.log(`the line I read was ${line}`);
    Promise.resolve();
  }

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
