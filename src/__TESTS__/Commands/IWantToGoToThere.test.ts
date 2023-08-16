import { IWantToGoToThereCommand } from "../../Commands/IWantToGoToThere";
import { CompassDirection } from "../../Common/CompassDirection";
import { Position } from "../../Common/Position";

const DEFAULT_MAX_COORDINATES = { x: 4, y: 4 };
const DEFAULT_OBSTACLES_COORDINATES = [
  { x: 2, y: 1 },
  { x: 3, y: 4 },
];

const COMPLEX_MAX_COORDINATES = { x: 5, y: 4 };
const COMPLEX_OBSTACLE_COORDINATES = [
  { x: 2, y: 4 },
  { x: 2, y: 3 },
  { x: 2, y: 2 },
  { x: 3, y: 2 },
  { x: 3, y: 1 },
  { x: 4, y: 4 },
  { x: 4, y: 3 },
  { x: 4, y: 2 },
];

/*
Visualising complex obstacle coordinates

start and destination

[ ] [ ] [X] [ ] [X] [ ]
[s] [ ] [X] [ ] [X] [ ]
[ ] [ ] [X] [X] [X] [d]
[ ] [ ] [ ] [X] [ ] [ ]
[ ] [ ] [ ] [ ] [ ] [ ]

path

[ ] [ ] [X] [ ] [X] [ ]
[1] [ ] [X] [ ] [X] [ ]
[2] [ ] [X] [X] [X] [11]
[3] [ ] [ ] [X] [9] [10]
[4] [5] [6] [7] [8] [ ]

[0,4] [1,4] [2,4] [3,4] [4,4] [5,4]
[0,3] [1,3] [2,3] [3,3] [4,3] [5,3]
[0,2] [1,2] [2,2] [3,2] [4,2] [5,2]
[0,1] [1,1] [2,1] [3,1] [4,1] [5,1]
[0,0] [1,0] [2,0] [3,0] [4,0] [5,0]

*/

describe("Execute", () => {
  it("Should identify impossible journey", () => {
    const EXAMPLE_IMPOSSIBLE_JOURNEY = {
      start: { x: 1, y: 4 },
      end: ["2", "4"],
    };

    const startingPosition: Position = {
      coordinates: EXAMPLE_IMPOSSIBLE_JOURNEY.start,
      directionFacing: CompassDirection.NORTH,
    };

    const iWantToGoToThereCommand = new IWantToGoToThereCommand(
      EXAMPLE_IMPOSSIBLE_JOURNEY.end,
      COMPLEX_MAX_COORDINATES,
      COMPLEX_OBSTACLE_COORDINATES
    );

    const expected = "PATH NOT FOUND";

    expect(iWantToGoToThereCommand.execute(startingPosition)).toEqual(expected);
  });

  it("get shortest path and list of commands to get there", () => {
    const startingPosition: Position = { coordinates: { x: 0, y: 3 }, directionFacing: CompassDirection.NORTH };
    const desiredPositionArgs = ["5", "2"];

    const iWantToGoToThereCommand = new IWantToGoToThereCommand(
      desiredPositionArgs,
      COMPLEX_MAX_COORDINATES,
      COMPLEX_OBSTACLE_COORDINATES
    );

    const expected = `0,3
0,2
0,1
0,0
1,0
2,0
3,0
4,0
4,1
5,1
5,2`;

    const expectedCommands = `PLACE 0,3,NORTH
RIGHT
RIGHT
MOVE
MOVE
MOVE
LEFT
MOVE
MOVE
MOVE
MOVE
LEFT
MOVE
RIGHT
MOVE
LEFT
MOVE`;

    expect(iWantToGoToThereCommand.execute(startingPosition)).toEqual(`${expected}\n${expectedCommands}`);
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
