import { PrintCommand } from "../../Commands/Print";

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

describe("Execute", () => {
  it("Should return string in specific format", () => {
    const reportCommand = new PrintCommand([], COMPLEX_MAX_COORDINATES, COMPLEX_OBSTACLE_COORDINATES);
    const result = reportCommand.execute();

    const expected = `[   ]  [   ]  [ X ]  [   ]  [ X ]  [   ]
[   ]  [   ]  [ X ]  [   ]  [ X ]  [   ]
[   ]  [   ]  [ X ]  [ X ]  [ X ]  [   ]
[   ]  [   ]  [   ]  [ X ]  [   ]  [   ]
[   ]  [   ]  [   ]  [   ]  [   ]  [   ]
`;

    expect(result).toBe(expected);
  });
});

// describe("Properties", () => {
//   it("Should be able to be ignored eg if item is not placed on a table", () => {
//     const reportCommand = new PrintCommand([]);
//     expect(reportCommand.canBeIgnored).toBe(true);
//   });
// });

// describe("Constructor", () => {
//   it("Should throw specific error message when constructed with arguments", () => {
//     const constructor = () => new PrintCommand(["ARG"]);
//     expect(constructor).toThrow(
//       "ARG could not be parsed as arguments to REPORT command. No arguments should be supplied."
//     );
//   });
//);
