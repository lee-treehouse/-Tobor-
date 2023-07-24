import * as readline from "node:readline";
import { TOBOR_COMMAND_PROMPT, TOBOR_HELP_TEXT, TOBOR_WELCOME } from "../UX/messages";
import { LineReader } from "./LineReader";
import { Logger } from "../Output/Logger";

const LOOP_UNTIL_EXIT_COMMAND = true;

export class cliInputService implements LineReader {
  public constructor(private readonly logger: Logger) {}

  public readLineAsync = async (): Promise<string | void> => {
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

  // this is the one I would want to mock
  // public async getNextLine(): Promise<string | void> {
  //   return this.readLineAsync();
  // }

  public async getInputLineByLine(onReadLine: (line: string) => Promise<void>) {
    this.logger.log(TOBOR_WELCOME);
    this.logger.log(TOBOR_HELP_TEXT);

    let userInput: string | void = "";
    while (LOOP_UNTIL_EXIT_COMMAND && userInput !== undefined) {
      this.logger.log(`${TOBOR_COMMAND_PROMPT}`);
      userInput = await this.readLineAsync();

      if (userInput) await onReadLine(userInput);
    }
  }
}
