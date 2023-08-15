import { IWantToGoToThereCommand } from "../../Commands/IWantToGoToThere";
import { CompassDirection } from "../../Common/CompassDirection";
import { Position } from "../../Common/Position";

const DEFAULT_MAX_COORDINATES = { x: 4, y: 4 };
const DEFAULT_OBSTACLES_COORDINATES = [
  { x: 2, y: 1 },
  { x: 3, y: 4 },
];

const EXAMPLE_TRICKY_OBSTACLE_CPPRDONATES = [
  { x: 1, y: 4 },
  { x: 1, y: 3 },
  { x: 1, y: 2 },
  { x: 2, y: 2 },
  { x: 2, y: 1 },
  { x: 3, y: 4 },
  { x: 3, y: 3 },
  { x: 3, y: 2 },
];

/*
Visualising tricky coordinates

[  ] [1,4] [   ] [3,4] [   ]
[  ] [1,3] [   ] [3,3] [   ]
[  ] [1,2] [2,2] [3,2] [   ]
[  ] [   ] [2,1] [   ] [   ]
[  ] [   ] [   ] [   ] [   ]


[ ] [X] [ ] [X] [ ]
[ ] [X] [ ] [X] [ ]
[ ] [X] [X] [X] [ ]
[ ] [ ] [X] [ ] [ ]
[ ] [ ] [ ] [ ] [ ]

[0,4] [1,4] [2,4] [3,4] [4,4]
[0,3] [1,3] [2,3] [3,3] [4,3]
[0,2] [1,2] [2,2] [3,2] [4,2]
[0,1] [1,1] [2,1] [3,1] [4,1]
[0,0] [1,0] [2,0] [3,0] [4,0]
*/

describe("Execute", () => {
  it("Should identify impossible journey", () => {
    const EXAMPLE_IMPOSSIBLE_JOURNEY = {
      start: { x: 2, y: 4 },
      end: ["4", "4"],
    };

    const startingPosition: Position = {
      coordinates: EXAMPLE_IMPOSSIBLE_JOURNEY.start,
      directionFacing: CompassDirection.NORTH,
    };

    const iWantToGoToThereCommand = new IWantToGoToThereCommand(
      EXAMPLE_IMPOSSIBLE_JOURNEY.end,
      DEFAULT_MAX_COORDINATES,
      EXAMPLE_TRICKY_OBSTACLE_CPPRDONATES
    );

    const expected = "PATH NOT FOUND!";

    expect(iWantToGoToThereCommand.execute(startingPosition)).toEqual(expected);
  });

  it("Should return a list of all coordinates travelled by breadth first search before reaching destination, including source and destination coordinates", () => {
    const startingPosition: Position = { coordinates: { x: 0, y: 3 }, directionFacing: CompassDirection.NORTH };
    const desiredPositionArgs = ["4", "2"];

    const iWantToGoToThereCommand = new IWantToGoToThereCommand(
      desiredPositionArgs,
      DEFAULT_MAX_COORDINATES,
      EXAMPLE_TRICKY_OBSTACLE_CPPRDONATES
    );

    const expected = `0,3
0,4
0,2
0,1
0,0
1,1
1,0
2,0
3,0
3,1
4,0
4,1
4,2`;

    //    expect(iWantToGoToThereCommand.execute(startingPosition)).toEqual(`${expected}\n\n${expectedCommands}`);
    expect(iWantToGoToThereCommand.execute(startingPosition)).toEqual(`${expected}`);
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
