import { getConfig } from "./Config";

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

    it("Should throw specific message if table HEIGHT is not numeric and table WIDTH is specified", () => {
        process.env.TABLE_HEIGHT = "foo";
        process.env.TABLE_WIDTH = "9";
        const configFunction = () => getConfig();
        expect(configFunction).toThrow("foo 9 could not be parsed as table size. Values should be numeric.");
    });

    it("Should throw specific message if table WIDTH is not numeric and table HEIGHT is specified", () => {
        process.env.TABLE_HEIGHT = "7";
        process.env.TABLE_WIDTH = "bar";
        const configFunction = () => getConfig();
        expect(configFunction).toThrow("7 bar could not be parsed as table size. Values should be numeric.");
    });

    it("Should set input filename in config when filename is specified", () => {
        process.env.FILENAME = "important.txt";
        const config = getConfig();

        expect(config.tobor.input.fileName).toBeDefined();
        expect(config.tobor.input.fileName).toBe("important.txt");
    });

    it("Should set default config when no environment variables are set", () => {
        const config = getConfig();

        expect(config).toEqual({
            tobor: {
                input: {
                    format: {
                        ignoreCase: true,
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
