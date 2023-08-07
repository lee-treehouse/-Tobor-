import { DiagonalCommand } from "../../Commands/Diagonal";
import { CompassDirection } from "../../Common/CompassDirection";
import { Position } from "../../Common/Position";

describe("Execute", () => {
  it("Should return a Position with the same direction as the input position", () => {
    const diagonalCommand = new DiagonalCommand([]);
    const currentPosition: Position = { coordinates: { x: 3, y: 5 }, directionFacing: CompassDirection.NORTH };
    const result = diagonalCommand.execute(currentPosition);
    expect(result).toEqual(expect.objectContaining({ directionFacing: currentPosition.directionFacing }));
  });

  const coordinates = { x: 3, y: 5 };
  const validCases = [
    {
      currentPosition: { coordinates, directionFacing: CompassDirection.NORTH },
      expectedCoordinates: { coordinates: { x: 4, y: 6 } },
    },
    {
      currentPosition: { coordinates, directionFacing: CompassDirection.EAST },
      expectedCoordinates: { coordinates: { x: 4, y: 4 } },
    },
    {
      currentPosition: { coordinates, directionFacing: CompassDirection.SOUTH },
      expectedCoordinates: { coordinates: { x: 2, y: 4 } },
    },
    {
      currentPosition: { coordinates, directionFacing: CompassDirection.WEST },
      expectedCoordinates: { coordinates: { x: 2, y: 6 } },
    },
  ];

  test.each(validCases)(
    "Should return a Position with coordinates moved one unit in direction $currentPosition.directionFacing and one unit right of $currentPosition.directionFacing ",
    ({ currentPosition, expectedCoordinates }) => {
      const diagonalCommand = new DiagonalCommand([]);
      const result = diagonalCommand.execute(currentPosition);
      expect(result).toEqual(expect.objectContaining({ coordinates: expectedCoordinates.coordinates }));
    }
  );

  const multipleMoveUnitCases = [
    {
      currentPosition: { coordinates, directionFacing: CompassDirection.NORTH },
      moveUnits: "2",
      expectedCoordinates: { coordinates: { x: 5, y: 7 } },
    },
    {
      currentPosition: { coordinates, directionFacing: CompassDirection.EAST },
      moveUnits: "2",
      expectedCoordinates: { coordinates: { x: 5, y: 3 } },
    },
    {
      currentPosition: { coordinates, directionFacing: CompassDirection.SOUTH },
      moveUnits: "2",
      expectedCoordinates: { coordinates: { x: 1, y: 3 } },
    },
    {
      currentPosition: { coordinates, directionFacing: CompassDirection.WEST },
      moveUnits: "2",
      expectedCoordinates: { coordinates: { x: 1, y: 7 } },
    },
  ];

  test.each(multipleMoveUnitCases)(
    "Should return a Position with coordinates moved $moveUnits unit/s in direction $currentPosition.directionFacing and $moveUnits unit/s right of $currentPosition.directionFacing ",
    ({ currentPosition, moveUnits, expectedCoordinates }) => {
      const diagonalCommand = new DiagonalCommand([moveUnits]);
      const result = diagonalCommand.execute(currentPosition);
      expect(result).toEqual(expect.objectContaining({ coordinates: expectedCoordinates.coordinates }));
    }
  );
});

describe("Properties", () => {
  it("Should be able to be ignored eg if item is not placed on a table", () => {
    const diagonalCommand = new DiagonalCommand([]);
    expect(diagonalCommand.canBeIgnored).toBe(true);
  });
});

describe("Constructor", () => {
  it("Should not throw error message when constructed with no arguments", () => {
    const constructor = () => new DiagonalCommand([]);
    expect(constructor).not.toThrow();
  });

  it("Should not throw error message when constructed with one argument", () => {
    const constructor = () => new DiagonalCommand(["2"]);
    expect(constructor).not.toThrow();
  });

  const invalidCases = [
    {
      args: ["foo"],
    },
    {
      args: ["0"],
    },
    {
      args: ["-1"],
    },
    {
      args: ["1", "2"],
    },
  ];

  test.each(invalidCases)(
    "Should throw specific error message when constructed with $args.length argument/s",
    ({ args }) => {
      const constructor = () => new DiagonalCommand(args);
      expect(constructor).toThrow(
        "Could not parse arguments to DIAGONAL command. At most one numeric argument greater than zero is expected eg '5'"
      );
    }
  );
});
