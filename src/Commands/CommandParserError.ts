export class CommandParserError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CommandParserError";
  }
}
