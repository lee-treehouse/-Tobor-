import { IWantToGoToThereCommand } from "../../Commands/IWantToGoToThere";
import { CompassDirection } from "../../Common/CompassDirection";
import { Position } from "../../Common/Position";

const DEFAULT_MAX_COORDINATES = { x: 4, y: 4 };
const DEFAULT_OBSTACLES_COORDINATES = [
  { x: 2, y: 1 },
  { x: 3, y: 4 },
];

describe("Execute", () => {
  it("Should return a list of coordinates to pass through retrieved through breadth first search, including source and destination coordinates", () => {
    const startingPosition: Position = { coordinates: { x: 1, y: 1 }, directionFacing: CompassDirection.NORTH };
    const desiredPositionArgs = ["3", "3"];

    const iWantToGoToThereCommand = new IWantToGoToThereCommand(
      desiredPositionArgs,
      DEFAULT_MAX_COORDINATES,
      DEFAULT_OBSTACLES_COORDINATES
    );

    const expected = `1,1
1,2
1,0
0,1
1,3
2,2
0,2
2,0
0,0
1,4
2,3
0,3
3,2
3,0
2,4
0,4
3,3`;

    const expectedCommands = `LEFT
MOVE
LEFT
MOVE
MOVE
RIGHT
RIGHT
MOVE
RIGHT
RIGHT
MOVE
RIGHT
RIGHT
MOVE
RIGHT
RIGHT
MOVE
RIGHT
RIGHT
MOVE
RIGHT
RIGHT
MOVE
RIGHT
RIGHT
MOVE
RIGHT
RIGHT
MOVE
RIGHT
RIGHT
MOVE
LEFT
MOVE
RIGHT
RIGHT
MOVE
RIGHT
RIGHT
MOVE
RIGHT
RIGHT
MOVE`;

    expect(iWantToGoToThereCommand.execute(startingPosition)).toEqual(`${expected}\n\n${expectedCommands}`);
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
