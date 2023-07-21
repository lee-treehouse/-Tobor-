import { separateCommandAndArguments } from "./CommandInput";

describe("Separate Command and Arguments from input", () => {
    const validCases = [
        { input1: "MOVE", expected: { command: "MOVE", args: [] } },
        { input1: "PLACE 1,2,NORTH", expected: { command: "PLACE", args: ["1", "2", "NORTH"] } },
        { input1: "COMMAND ONEARG", expected: { command: "COMMAND", args: ["ONEARG"] } },
        { input1: "", expected: { command: "", args: [] } },
    ];

    test.each(validCases)(
        "Should separate input '$input1' into command `$expected.command` and args $expected.args",
        ({ input1, expected }) => {
            expect(separateCommandAndArguments(input1)).toEqual(expected);
        }
    );
});
