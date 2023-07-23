import { CompassDirection } from "../../Common/CompassDirection";
import { Position } from "../../Common/Position";
import { getCommand } from "../../Commands/CommandFactory";
import { ReportCommand } from "../../Commands/Report";

describe("Execute", () => {
  it("Should not return anything", () => {
    const reportCommand = getCommand({ command: "REPORT", args: [] });
    const currentPosition: Position = { coordinates: { x: 3, y: 5 }, directionFacing: CompassDirection.NORTH };
    const result = reportCommand.execute(currentPosition);
    expect(result).toBe(undefined);
  });

  it("Should console.log Position in specific format", () => {
    const reportCommand = getCommand({ command: "REPORT", args: [] });
    const currentPosition: Position = { coordinates: { x: 3, y: 5 }, directionFacing: CompassDirection.WEST };

    const consoleSpy = jest.spyOn(console, "log");

    reportCommand.execute(currentPosition);
    expect(consoleSpy).toHaveBeenCalledWith("3,5,WEST");
  });
});

describe("Properties", () => {
  it("Should be able to be ignored eg if item is not placed on a table", () => {
    const reportCommand = getCommand({ command: "MOVE", args: [] });
    expect(reportCommand.canBeIgnored).toBe(true);
  });

  it("Should have static command property 'REPORT' so command can be invoked", () => {
    expect(ReportCommand.command).toBe("REPORT");
  });
});

describe("Constructor", () => {
  it("Should throw specific error message when constructed with arguments", () => {
    const constructor = () => getCommand({ command: "REPORT", args: ["ARG"] });
    expect(constructor).toThrow(
      "ARG could not be parsed as arguments to REPORT command. No arguments should be supplied."
    );
  });
});
