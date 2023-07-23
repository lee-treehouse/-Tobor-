import { Logger } from "./Logger";

export class SilentLogger implements Logger {
  public constructor() {}

  public log(): void {}
}
