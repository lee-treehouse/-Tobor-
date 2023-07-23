import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { TOBOR_COMMAND_PROMPT, TOBOR_HELP_TEXT, TOBOR_WELCOME } from "../UX/messages";

const LOOP_UNTIL_EXIT_COMMAND = true;

export class cliInputService {
  public async requestInputLineByLine(onReadLine: (line: string) => Promise<void>) {
    const rl = readline.createInterface({ input, output });

    console.log(TOBOR_WELCOME);
    console.log(TOBOR_HELP_TEXT);

    while (LOOP_UNTIL_EXIT_COMMAND) {
      const userInput = await rl.question(`${TOBOR_COMMAND_PROMPT}\n`);

      // TODO why is rl.question console.logging the answer?
      await onReadLine(userInput);
    }
  }
}
