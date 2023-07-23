import { run } from "..";

// approach to process.env mocking as described here https://webtips.dev/how-to-mock-processenv-in-jest
describe("Integration tests from fixtures", () => {
    const env = process.env;

    beforeEach(() => {
        jest.resetModules();
        process.env = { ...env };
    });
    afterEach(() => {
        process.env = env;
    });

    const fixtures = [
        { fileName: "instructions_example1" },
        { fileName: "instructions_example2" },
        { fileName: "instructions_example3" },
    ];
    test.each(fixtures)(
        "Should run test case specified in INSTRUCTIONS.md ($fileName.txt - expected specified in $filename_expected.txt)",
        async ({ fileName }) => {
            process.env.FILENAME = `src/__TESTS__/TestFiles/Scenarios/${fileName}.txt`;
            const consoleSpy = jest.spyOn(console, "log");
            await run();
            // WIP
            expect(consoleSpy).toHaveBeenCalled();
            expect(true).toBeTruthy();
        }
    );
});
