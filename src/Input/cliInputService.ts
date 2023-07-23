import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { TOBOR_COMMAND_PROMPT, TOBOR_HELP_TEXT, TOBOR_WELCOME } from "../UX/messages";
import { LineReader } from "./LineReader";
import { Logger } from "../Output/Logger";

const LOOP_UNTIL_EXIT_COMMAND = true;

export class cliInputService implements LineReader {
  public constructor(private readonly logger: Logger) {}

  public async getInputLineByLine(onReadLine: (line: string) => Promise<void>) {
    const rl = readline.createInterface({ input, output });

    this.logger.log(TOBOR_WELCOME);
    this.logger.log(TOBOR_HELP_TEXT);

    while (LOOP_UNTIL_EXIT_COMMAND) {
      const userInput = await rl.question(`${TOBOR_COMMAND_PROMPT}\n`);

      // TODO why is rl.question console.logging the answer?
      await onReadLine(userInput);
    }
  }
}
