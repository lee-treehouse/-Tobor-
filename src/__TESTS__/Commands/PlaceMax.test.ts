import { CompassDirection } from "../../Common/CompassDirection";
import { Position } from "../../Common/Position";
import { PlaceMaxCommand } from "../../Commands/PlaceMax";
import { Coordinates } from "../../Common/Coordinates";

describe("Execute", () => {
  it("Should return a position consisting of maximum coordintes and supplied direction", () => {
    const maxCoordinates: Coordinates = { x: 22, y: 38 };
    const placeMaxCommand = new PlaceMaxCommand(["SOUTH"], maxCoordinates);
    const expectedResult: Position = { coordinates: { x: 22, y: 38 }, directionFacing: CompassDirection.SOUTH };
    expect(placeMaxCommand.execute()).toEqual(expectedResult);
  });
});

describe("Properties", () => {
  it("Should not be able to be ignored eg if item is not placed on a table", () => {
    const placeMaxCommand = new PlaceMaxCommand(["SOUTH"], { x: 22, y: 38 });
    expect(placeMaxCommand.canBeIgnored).toBe(false);
  });
});

describe("Constructor", () => {
  const cases = [
    {
      args: [],
      expected: "Could not parse arguments to PLACEMAX command. One argument is expected (Direction) eg 'NORTH'",
    },
    {
      args: ["1"],
      expected: "1 could not be parsed as compass direction. Value should be NORTH, SOUTH, EAST or WEST.",
    },
    {
      args: ["NORTH", "WEST"],
      expected:
        "NORTH,WEST could not be parsed as arguments to PLACEMAX command. One argument is expected (Direction) eg 'NORTH'.",
    },
  ];

  test.each(cases)(
    "Should throw specific error message when constructed with $args.length argument/s",
    ({ args, expected }) => {
      const constructor = () => new PlaceMaxCommand(args, { x: 22, y: 38 });
      expect(constructor).toThrow(expected);
    }
  );
});
