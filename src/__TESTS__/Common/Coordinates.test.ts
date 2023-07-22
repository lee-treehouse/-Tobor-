import { parseCoordinates } from "../../Common/Coordinates";

describe("Coordinates Parsing", () => {
    const validCases = [
        { input1: "2", input2: "4", coordinates: { x: 2, y: 4 } },
        { input1: "3.5", input2: "5.6", coordinates: { x: 3, y: 5 } },
    ];

    test.each(validCases)(
        "Should parse inputs '$input1' and '$input2' as coordinates $coordinates",
        ({ input1, input2, coordinates }) => {
            expect(parseCoordinates(input1, input2)).toEqual(coordinates);
        }
    );

    const nonNumericInputCases = [
        { input1: "foo", input2: "4" },
        { input1: "3.5", input2: "bar" },
    ];

    test.each(nonNumericInputCases)(
        "Should throw specific error messages on non numeric input (inputs '$input1' and '$input2')",
        ({ input1, input2 }) => {
            const parser = () => parseCoordinates(input1, input2);
            expect(parser).toThrow(
                `${input1}, ${input2} could not be parsed as coordinates. Values should be numeric.`
            );
        }
    );

    const belowZeroInputCases = [
        { input1: "-2", input2: "4" },
        { input1: "3.5", input2: "-3" },
    ];

    test.each(belowZeroInputCases)(
        "Should throw specific error messages on below zero input (inputs '$input1' and '$input2')",
        ({ input1, input2 }) => {
            const parser = () => parseCoordinates(input1, input2);
            expect(parser).toThrow(
                `${input1}, ${input2} could not be parsed as coordinates. Values should be zero or greater.`
            );
        }
    );
});
