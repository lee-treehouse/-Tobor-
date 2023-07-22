import { separateCommandAndArguments, throwNoArgumentsExpected } from "../../Commands/CommandInput";

describe("Separate Command and Arguments from input", () => {
    const DO_CAPITALISE_INPUT_COMMANDS_AND_ARGS = true;
    const DO_NOT_CAPITALISE_INPUT_COMMANDS_AND_ARGS = false;

    const validCases = [
        { input1: "MOVE", expected: { command: "MOVE", args: [] } },
        { input1: "PLACE 1,2,NORTH", expected: { command: "PLACE", args: ["1", "2", "NORTH"] } },
        { input1: "COMMAND ONEARG", expected: { command: "COMMAND", args: ["ONEARG"] } },
        { input1: "", expected: { command: "", args: [] } },
    ];

    test.each(validCases)(
        "Should separate input '$input1' into command `$expected.command` and args $expected.args",
        ({ input1, expected }) => {
            expect(separateCommandAndArguments(input1, DO_NOT_CAPITALISE_INPUT_COMMANDS_AND_ARGS)).toEqual(expected);
        }
    );

    it("Should not capitalise lowercase commands and args when capitalise command and arguments is set to false", () => {
        const inputWithLowercaseCommand = "place 1,2,NORTH";
        const result = separateCommandAndArguments(
            inputWithLowercaseCommand,
            DO_NOT_CAPITALISE_INPUT_COMMANDS_AND_ARGS
        );
        expect(result).toEqual({ command: "place", args: ["1", "2", "NORTH"] });

        const inputWithLowercaseArgs = "PLACE 1,2,north";
        const result2 = separateCommandAndArguments(inputWithLowercaseArgs, DO_NOT_CAPITALISE_INPUT_COMMANDS_AND_ARGS);
        expect(result2).toEqual({ command: "PLACE", args: ["1", "2", "north"] });
    });

    it("Should capitalise lowercase commands and args when capitalise command and arguments is set to true", () => {
        const inputWithLowercaseCommand = "place 1,2,NORTH";
        const result = separateCommandAndArguments(inputWithLowercaseCommand, DO_CAPITALISE_INPUT_COMMANDS_AND_ARGS);
        expect(result).toEqual({ command: "PLACE", args: ["1", "2", "NORTH"] });

        const inputWithLowercaseArgs = "PLACE 1,2,north";
        const result2 = separateCommandAndArguments(inputWithLowercaseArgs, DO_CAPITALISE_INPUT_COMMANDS_AND_ARGS);
        expect(result2).toEqual({ command: "PLACE", args: ["1", "2", "NORTH"] });
    });
});

describe("Throw when no arguments expected helper", () => {
    const validCases = [
        {
            command: "MOVE",
            args: ["foo"],
            expected: "foo could not be parsed as arguments to MOVE command. No arguments should be supplied.",
        },
        {
            command: "LEFT",
            args: ["1", "2", "NORTH"],
            expected: "1,2,NORTH could not be parsed as arguments to LEFT command. No arguments should be supplied.",
        },
    ];

    test.each(validCases)(
        "Should throw specific error message containing command '$command' and comma delimitted args $args",
        ({ command, args, expected }) => {
            const errorCreator = () => throwNoArgumentsExpected(args, command);
            expect(errorCreator).toThrow(expected);
        }
    );
});
