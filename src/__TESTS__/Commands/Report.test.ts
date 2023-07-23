import { CompassDirection } from "../../Common/CompassDirection";
import { Position } from "../../Common/Position";
import { ReportCommand } from "../../Commands/Report";

describe("Execute", () => {
  it("Should return string in specific format", () => {
    const reportCommand = new ReportCommand([]);
    const currentPosition: Position = { coordinates: { x: 3, y: 5 }, directionFacing: CompassDirection.WEST };
    const result = reportCommand.execute(currentPosition);
    expect(result).toBe("3,5,WEST");
  });
});

describe("Properties", () => {
  it("Should be able to be ignored eg if item is not placed on a table", () => {
    const reportCommand = new ReportCommand([]);
    expect(reportCommand.canBeIgnored).toBe(true);
  });
});

describe("Constructor", () => {
  it("Should throw specific error message when constructed with arguments", () => {
    const constructor = () => new ReportCommand(["ARG"]);
    expect(constructor).toThrow(
      "ARG could not be parsed as arguments to REPORT command. No arguments should be supplied."
    );
  });
});
