import { CompassDirection } from "../../Common/CompassDirection";
import { Position } from "../../Common/Position";
import { getCommand } from "../../Commands/CommandFactory";
import { PlaceCommand } from "../../Commands/Place";

describe("Execute", () => {
  it("Should return the requested position regardless of current position", () => {
    const placeCommand = getCommand({ command: "PLACE", args: ["1", "2", "NORTH"] });
    const expectedResult = { coordinates: { x: 1, y: 2 }, directionFacing: CompassDirection.NORTH };

    const currentPosition: Position = { coordinates: { x: 3, y: 5 }, directionFacing: CompassDirection.SOUTH };
    const laterCurrentPosition: Position = { coordinates: { x: 5, y: 3 }, directionFacing: CompassDirection.EAST };

    expect(placeCommand.execute(currentPosition)).toEqual(expectedResult);
    expect(placeCommand.execute(laterCurrentPosition)).toEqual(expectedResult);
  });
});

describe("Properties", () => {
  it("Should not be able to be ignored eg if item is not placed on a table", () => {
    const placeCommand = getCommand({ command: "PLACE", args: ["1", "2", "NORTH"] });
    expect(placeCommand.canBeIgnored).toBe(false);
  });

  it("Should have static command property 'PLACE' so command can be invoked", () => {
    expect(PlaceCommand.command).toBe("PLACE");
  });
});

describe("Constructor", () => {
  const cases = [
    {
      args: [],
      expected:
        "Could not parse arguments to PLACE command. Three arguments are expected (X coordinate, Y coordinate, Direction) eg '1,2,NORTH'",
    },
    {
      args: ["1"],
      expected:
        "1 could not be parsed as arguments to PLACE command. Three arguments are expected (X coordinate, Y coordinate, Direction) eg '1,2,NORTH'.",
    },
    {
      args: ["1", "foo"],
      expected:
        "1,foo could not be parsed as arguments to PLACE command. Three arguments are expected (X coordinate, Y coordinate, Direction) eg '1,2,NORTH'.",
    },
    {
      args: ["1", "2", "3", "4"],
      expected:
        "1,2,3,4 could not be parsed as arguments to PLACE command. Three arguments are expected (X coordinate, Y coordinate, Direction) eg '1,2,NORTH'.",
    },
  ];

  test.each(cases)(
    "Should throw specific error message when constructed with $args.length argument/s",
    ({ args, expected }) => {
      const constructor = () => getCommand({ command: "PLACE", args });
      expect(constructor).toThrow(expected);
    }
  );
});
