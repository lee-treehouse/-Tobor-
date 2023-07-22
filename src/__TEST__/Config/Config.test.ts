import { getConfig } from "../../Config/Config";

// approach to process.env mocking as described here https://webtips.dev/how-to-mock-processenv-in-jest
describe("Config derived from process.env", () => {
    const env = process.env;

    beforeEach(() => {
        jest.resetModules();
        process.env = { ...env };
    });
    afterEach(() => {
        process.env = env;
    });

    it("Should set table config when table dimensions are specified", () => {
        process.env.TABLE_HEIGHT = "6";
        process.env.TABLE_WIDTH = "9";

        const config = getConfig();

        expect(config.table?.size.height).toBe(6);
        expect(config.table?.size.width).toBe(9);
    });

    const nonNumericTableInputCases = [
        {
            height: "foo",
            width: "4",
            expected: "foo, 4 could not be parsed as table size. Values should be numeric.",
        },
        {
            height: "5",
            width: "bar",
            expected: "5, bar could not be parsed as table size. Values should be numeric.",
        },
    ];

    test.each(nonNumericTableInputCases)(
        "Should throw specific error messages on non numeric input for table Height or Width when the other dimension is specified",
        ({ height, width, expected }) => {
            process.env.TABLE_HEIGHT = height;
            process.env.TABLE_WIDTH = width;
            const configFunction = () => getConfig();
            expect(configFunction).toThrow(expected);
        }
    );

    const belowOneTableInputCases = [
        {
            height: "0",
            width: "4",
            expected: "0, 4 could not be parsed as table size. Values should be one or greater.",
        },
        {
            height: "5",
            width: "-3",
            expected: "5, -3 could not be parsed as table size. Values should be one or greater.",
        },
    ];

    test.each(belowOneTableInputCases)(
        "Should throw specific error messages on below one input for table Height or Width when the other dimension is specified",
        ({ height, width, expected }) => {
            process.env.TABLE_HEIGHT = height;
            process.env.TABLE_WIDTH = width;
            const configFunction = () => getConfig();
            expect(configFunction).toThrow(expected);
        }
    );

    it("Should set input filename in config when filename is specified", () => {
        process.env.FILENAME = "important.txt";
        const config = getConfig();

        expect(config.tobor.input.fileName).toBeDefined();
        expect(config.tobor.input.fileName).toBe("important.txt");
    });

    it("Should return default config when no environment variables are set", () => {
        const config = getConfig();

        expect(config).toEqual({
            tobor: {
                input: {
                    format: {
                        capitaliseCommandsAndArgs: true,
                    },
                },
            },
            table: {
                size: {
                    width: 5,
                    height: 5,
                },
            },
        });
    });
});
