import {
    CompassDirection,
    directionIsNorthOrEast,
    directionIsNorthOrSouth,
    parseCompassDirection,
} from "../../Common/CompassDirection";

describe("Direction Change Parsing", () => {
    const compassDirectionValidCases = [
        { input: "NORTH", compassDirection: CompassDirection.NORTH },
        { input: "SOUTH", compassDirection: CompassDirection.SOUTH },
        { input: "EAST", compassDirection: CompassDirection.EAST },
        { input: "WEST", compassDirection: CompassDirection.WEST },
    ];

    test.each(compassDirectionValidCases)(
        "Should parse input '$input' as compass direction $compassDirection",
        ({ input, compassDirection }) => {
            expect(parseCompassDirection(input)).toEqual(compassDirection);
        }
    );

    it("Should throw specific error message on invalid input", () => {
        const input = "foo";
        const parser = () => parseCompassDirection(input);
        expect(parser).toThrow(
            `${input} could not be parsed as compass direction. Value should be NORTH, SOUTH, EAST or WEST.`
        );
    });

    const compassDirectionInvalidCases = ["", "foo", "1234", "north", " NORTH", "NORTH "];
    test.each(compassDirectionInvalidCases)("Should throw on invalid compass direction input: '%s'", (input) => {
        expect(() => parseCompassDirection(input)).toThrow();
    });
});

describe("Direction Change Helpers", () => {
    describe("Direction is North or South", () => {
        const cases = [
            { compassDirection: CompassDirection.NORTH, expected: true },
            { compassDirection: CompassDirection.SOUTH, expected: true },
            { compassDirection: CompassDirection.EAST, expected: false },
            { compassDirection: CompassDirection.WEST, expected: false },
        ];

        test.each(cases)("Should return $expected for input '$compassDirection'", ({ compassDirection, expected }) => {
            expect(directionIsNorthOrSouth(compassDirection)).toEqual(expected);
        });
    });

    describe("Direction is North or East", () => {
        const cases = [
            { compassDirection: CompassDirection.NORTH, expected: true },
            { compassDirection: CompassDirection.SOUTH, expected: false },
            { compassDirection: CompassDirection.EAST, expected: true },
            { compassDirection: CompassDirection.WEST, expected: false },
        ];

        test.each(cases)("Should return $expected for input '$compassDirection'", ({ compassDirection, expected }) => {
            expect(directionIsNorthOrEast(compassDirection)).toEqual(expected);
        });
    });
});
