import { CompassDirection } from "../Types/CompassDirection";
import { Position } from "../Types/Position";
import { RightCommand } from "./Right";

describe("Execute", () => {
    it("Should return a Position with coordinates that have not changed from the input position", () => {
        const rightCommand = new RightCommand([]);
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
            const rightCommand = new RightCommand([]);
            const currentPosition: Position = { coordinates: { x: 3, y: 5 }, directionFacing: currentDirection };
            const result = rightCommand.execute(currentPosition);
            expect(result).toEqual(expect.objectContaining({ directionFacing: expectedDirection }));
        }
    );
});
describe("Properties", () => {
    it("Should be able to be ignored eg if item is not placed on a table", () => {
        const rightCommand = new RightCommand([]);
        expect(rightCommand.canBeIgnored).toBe(true);
    });
});

describe("Constructor", () => {
    it("Should throw specific error message when constructed with arguments", () => {
        const constructor = () => new RightCommand(["ARG"]);
        expect(constructor).toThrow(
            "ARG could not be parsed as arguments to RIGHT command. No arguments should be supplied."
        );
    });
});
