import { IWantToGoToThereCommand } from "../../Commands/IWantToGoToThere";
import { CompassDirection } from "../../Common/CompassDirection";
import { Position } from "../../Common/Position";

const DEFAULT_MAX_COORDINATES = { x: 4, y: 4 };
const DEFAULT_OBSTACLES_COORDINATES = [
  { x: 2, y: 1 },
  { x: 3, y: 4 },
];

describe("Execute", () => {
  it("Should return the requested position", () => {
    const iWantToGoToThereCommand = new IWantToGoToThereCommand(
      ["1", "2"],
      DEFAULT_MAX_COORDINATES,
      DEFAULT_OBSTACLES_COORDINATES
    );
    const expectedResult: Position = { coordinates: { x: 1, y: 2 }, directionFacing: CompassDirection.NORTH };
    expect(iWantToGoToThereCommand.execute()).toEqual(expectedResult);
  });
});

describe("Properties", () => {
  it("Should be able to be ignored eg if item is not placed on a table", () => {
    const iWantToGoToThereCommand = new IWantToGoToThereCommand(
      ["1", "2"],
      DEFAULT_MAX_COORDINATES,
      DEFAULT_OBSTACLES_COORDINATES
    );
    expect(iWantToGoToThereCommand.canBeIgnored).toBe(true);
  });
});

describe("Constructor", () => {
  const cases = [
    {
      args: [],
      expected:
        "Could not parse arguments to IWANTTOGOTOTHERE command. Two arguments are expected (X coordinate, Y coordinate) eg '1,2'",
    },
    {
      args: ["1"],
      expected:
        "1 could not be parsed as arguments to IWANTTOGOTOTHERE command. Two arguments are expected (X coordinate, Y coordinate) eg '1,2'.",
    },
    {
      args: ["1", "2", "NORTH"],
      expected:
        "1,2,NORTH could not be parsed as arguments to IWANTTOGOTOTHERE command. Two arguments are expected (X coordinate, Y coordinate) eg '1,2'.",
    },
  ];

  test.each(cases)(
    "Should throw specific error message when constructed with $args.length argument/s",
    ({ args, expected }) => {
      const constructor = () =>
        new IWantToGoToThereCommand(args, DEFAULT_MAX_COORDINATES, DEFAULT_OBSTACLES_COORDINATES);
      expect(constructor).toThrow(expected);
    }
  );
});
