import * as readline from "node:readline/promises";
import { TOBOR_COMMAND_PROMPT, TOBOR_HELP_TEXT, TOBOR_WELCOME } from "../UX/messages";
import { LineReader } from "./LineReader";
import { Logger } from "../Output/Logger";

const LOOP_UNTIL_EXIT_COMMAND = true;

export class cliInputService implements LineReader {
  public constructor(private readonly logger: Logger) {}

  private readLineAsync = async (): Promise<string> => {
    const rl = readline.createInterface({
      input: process.stdin,
    });

    return new Promise((resolve) => {
      rl.prompt();
      rl.on("line", (line: string) => {
        rl.close();
        resolve(line);
      });
    });
  };

  public async getInputLineByLine(onReadLine: (line: string) => Promise<void>) {
    this.logger.log(TOBOR_WELCOME);
    this.logger.log(TOBOR_HELP_TEXT);

    while (LOOP_UNTIL_EXIT_COMMAND) {
      this.logger.log(`${TOBOR_COMMAND_PROMPT}`);
      const userInput = await this.readLineAsync();

      await onReadLine(userInput);
    }
  }
}
