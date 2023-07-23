import { ExitCommand } from "../../Commands/Exit";

describe("Execute", () => {
  let mockExit: jest.SpyInstance;
  beforeEach(() => {
    mockExit = jest.spyOn(process, "exit").mockImplementation();
  });

  afterEach(() => {
    mockExit.mockReset();
  });

  it("Should not return anything", () => {
    const exitCommand = new ExitCommand([]);
    const result = exitCommand.execute();
    expect(result).toBe(undefined);
  });

  it("Should call process.exit", () => {
    const exitCommand = new ExitCommand([]);
    exitCommand.execute();
    expect(mockExit).toHaveBeenCalled();
  });
});

describe("Properties", () => {
  it("Should not be able to be ignored eg if item is not placed on a table", () => {
    const exitCommand = new ExitCommand([]);

    expect(exitCommand.canBeIgnored).toBe(false);
  });

  it("Should have static command property 'EXIT' so command can be invoked", () => {
    expect(ExitCommand.command).toBe("EXIT");
  });
});

describe("Constructor", () => {
  it("Should throw specific error message when constructed with arguments", () => {
    const constructor = () => new ExitCommand(["ARG"]);
    expect(constructor).toThrow(
      "ARG could not be parsed as arguments to EXIT command. No arguments should be supplied."
    );
  });
});
