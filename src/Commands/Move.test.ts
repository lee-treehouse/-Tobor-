import { CompassDirection } from "../Types/CompassDirection";
import { Position } from "../Types/Position";
import { MoveCommand } from "./Move";

// describe("Execute", () => {
//     it("Should return a Position with coordinates that have not changed from the input position", () => {
//         const moveCommand = new MoveCommand([]);
//         const currentPosition: Position = { coordinates: { x: 3, y: 5 }, directionFacing: CompassDirection.NORTH };
//         const result = moveCommand.execute(currentPosition);
//         expect(result).toEqual(expect.objectContaining({ coordinates: currentPosition.coordinates }));
//     });

//     const validCases = [
//         { currentDirection: CompassDirection.NORTH, expectedDirection: CompassDirection.WEST },
//         { currentDirection: CompassDirection.EAST, expectedDirection: CompassDirection.NORTH },
//         { currentDirection: CompassDirection.SOUTH, expectedDirection: CompassDirection.EAST },
//         { currentDirection: CompassDirection.WEST, expectedDirection: CompassDirection.SOUTH },
//     ];

//     test.each(validCases)(
//         "Should return a position with direction $expectedDirection when given an input direction $currentDirection",
//         ({ currentDirection, expectedDirection }) => {
//             const moveCommand = new MoveCommand([]);
//             const currentPosition: Position = { coordinates: { x: 3, y: 5 }, directionFacing: currentDirection };
//             const result = moveCommand.execute(currentPosition);
//             expect(result).toEqual(expect.objectContaining({ directionFacing: expectedDirection }));
//         }
//     );
// });
describe("Properties", () => {
    it("Should be able to be ignored eg if item is not placed on a table", () => {
        const moveCommand = new MoveCommand([]);
        expect(moveCommand.canBeIgnored).toBe(true);
    });
});

describe("Constructor", () => {
    it("Should throw specific error message when constructed with arguments", () => {
        const constructor = () => new MoveCommand(["ARG"]);
        expect(constructor).toThrow(
            "ARG could not be parsed as arguments to MOVE command. No arguments should be supplied."
        );
    });
});
