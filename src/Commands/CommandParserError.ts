// TODO add checks to tests that throw this error to confirm they are throwing it and not just error
export class CommandParserError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CommandParserError";
  }
}
