import { ChangeDirectionCommand } from "../../Commands/ChangeDirection";
import { CompassDirection } from "../../Common/CompassDirection";
import { DirectionChange } from "../../Common/DirectionChange";
import { Position } from "../../Common/Position";

describe("Execute - LEFT", () => {
  it("Should return a Position with coordinates that have not changed from the input position", () => {
    const leftCommand = new ChangeDirectionCommand([], DirectionChange.LEFT);
    const currentPosition: Position = { coordinates: { x: 3, y: 5 }, directionFacing: CompassDirection.NORTH };
    const result = leftCommand.execute(currentPosition);
    expect(result).toEqual(expect.objectContaining({ coordinates: currentPosition.coordinates }));
  });

  const validCases = [
    { currentDirection: CompassDirection.NORTH, expectedDirection: CompassDirection.WEST },
    { currentDirection: CompassDirection.EAST, expectedDirection: CompassDirection.NORTH },
    { currentDirection: CompassDirection.SOUTH, expectedDirection: CompassDirection.EAST },
    { currentDirection: CompassDirection.WEST, expectedDirection: CompassDirection.SOUTH },
  ];
  test.each(validCases)(
    "Should return a position with direction $expectedDirection when given an input direction $currentDirection",
    ({ currentDirection, expectedDirection }) => {
      const leftCommand = new ChangeDirectionCommand([], DirectionChange.LEFT);
      const currentPosition: Position = { coordinates: { x: 3, y: 5 }, directionFacing: currentDirection };
      const result = leftCommand.execute(currentPosition);
      expect(result).toEqual(expect.objectContaining({ directionFacing: expectedDirection }));
    }
  );
});

describe("Execute - RIGHT", () => {
  it("Should return a Position with coordinates that have not changed from the input position", () => {
    const rightCommand = new ChangeDirectionCommand([], DirectionChange.RIGHT);
    const currentPosition: Position = { coordinates: { x: 3, y: 5 }, directionFacing: CompassDirection.NORTH };
    const result = rightCommand.execute(currentPosition);
    expect(result).toEqual(expect.objectContaining({ coordinates: currentPosition.coordinates }));
  });

  const validCases = [
    { currentDirection: CompassDirection.NORTH, expectedDirection: CompassDirection.EAST },
    { currentDirection: CompassDirection.EAST, expectedDirection: CompassDirection.SOUTH },
    { currentDirection: CompassDirection.SOUTH, expectedDirection: CompassDirection.WEST },
    { currentDirection: CompassDirection.WEST, expectedDirection: CompassDirection.NORTH },
  ];
  test.each(validCases)(
    "Should return a position with direction $expectedDirection when given an input direction $currentDirection",
    ({ currentDirection, expectedDirection }) => {
      const rightCommand = new ChangeDirectionCommand([], DirectionChange.RIGHT);
      const currentPosition: Position = { coordinates: { x: 3, y: 5 }, directionFacing: currentDirection };
      const result = rightCommand.execute(currentPosition);
      expect(result).toEqual(expect.objectContaining({ directionFacing: expectedDirection }));
    }
  );
});

describe("Properties", () => {
  it("Should be able to be ignored eg if item is not placed on a table", () => {
    const leftCommand = new ChangeDirectionCommand([], DirectionChange.LEFT);
    expect(leftCommand.canBeIgnored).toBe(true);
  });
});

describe("Constructor", () => {
  it("Should throw specific error message when constructed with arguments", () => {
    const constructor = () => new ChangeDirectionCommand(["ARG"], DirectionChange.LEFT);
    expect(constructor).toThrow(
      "ARG could not be parsed as arguments to LEFT command. No arguments should be supplied."
    );
  });
});
