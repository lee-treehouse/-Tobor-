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
});

describe("Properties", () => {
  it("Should be able to be ignored eg if item is not placed on a table", () => {
    const diagonalCommand = new DiagonalCommand([]);
    expect(diagonalCommand.canBeIgnored).toBe(true);
  });
});

describe("Constructor", () => {
  it("Should throw specific error message when constructed with arguments", () => {
    const constructor = () => new DiagonalCommand(["ARG"]);
    expect(constructor).toThrow(
      "ARG could not be parsed as arguments to DIAGONAL command. No arguments should be supplied."
    );
  });
});
