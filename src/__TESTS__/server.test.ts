import { run } from "../server";

// approach to process.env mocking as described here https://webtips.dev/how-to-mock-processenv-in-jest
describe("Integration tests from fixtures", () => {
    const env = process.env;
    let consoleSpy: jest.SpyInstance;

    beforeEach(() => {
        jest.resetModules();
        process.env = { ...env };
        consoleSpy = jest.spyOn(console, "log");
    });
    afterEach(() => {
        process.env = env;
        consoleSpy.mockReset();
    });

    const fixtures = [
        { fileName: "instructions_example1.txt", expected: "0,1,NORTH" },
        { fileName: "instructions_example2.txt", expected: "0,0,WEST" },
        { fileName: "instructions_example3.txt", expected: "3,3,NORTH" },
    ];
    test.each(fixtures)(
        "Should run test cases specified in INSTRUCTIONS.md ($fileName.txt) with result $expected",
        async ({ fileName, expected }) => {
            process.env.FILENAME = `src/__TESTS__/TestFiles/Scenarios/${fileName}`;

            await run();
            expect(consoleSpy).toHaveBeenCalledTimes(1);
            expect(consoleSpy).toHaveBeenCalledWith(expected);
            expect(true).toBeTruthy();
        }
    );
});
