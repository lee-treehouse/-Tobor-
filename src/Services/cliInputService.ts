import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

export class cliInputService {
  public async requestInputLineByLine(cb: (line: string) => void) {
    const rl = readline.createInterface({ input, output });

    console.log("Here is some intro and helper text");

    let userInput = "";
    while (userInput !== "EXIT") {
      userInput = await rl.question("Enter command or type EXIT to exit. \n");
      // TODO why is rl.question console.logging the answer?
      cb(userInput);
    }
  }
}
