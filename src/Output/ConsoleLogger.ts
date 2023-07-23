import { Logger } from "./Logger";

export class ConsoleLogger implements Logger {
  public constructor() {}

  public log(value: string): void {
    console.log(value);
  }
}
