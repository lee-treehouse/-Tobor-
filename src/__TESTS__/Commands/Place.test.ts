import { CompassDirection } from "../../Common/CompassDirection";
import { PlaceCommand } from "../../Commands/Place";
import { Position } from "../../Common/Position";

describe("Execute", () => {
  it("Should return the requested position", () => {
    const placeCommand = new PlaceCommand(["1", "2", "NORTH"]);
    const expectedResult: Position = { coordinates: { x: 1, y: 2 }, directionFacing: CompassDirection.NORTH };
    expect(placeCommand.execute()).toEqual(expectedResult);
  });
});

describe("Properties", () => {
  it("Should not be able to be ignored eg if item is not placed on a table", () => {
    const placeCommand = new PlaceCommand(["1", "2", "NORTH"]);
    expect(placeCommand.canBeIgnored).toBe(false);
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
      const constructor = () => new PlaceCommand(args);
      expect(constructor).toThrow(expected);
    }
  );
});
