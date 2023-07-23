import { run } from "../server";

describe("E2E tests from fixtures", () => {
  const env = process.env;
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    process.env = { ...env };
    consoleSpy = jest.spyOn(console, "log");
  });
  afterEach(() => {
    process.env = env;
    consoleSpy.mockReset();
  });

  const validTestCases = [
    { fileName: "instructions_example1.txt", expected: "0,1,NORTH" },
    { fileName: "instructions_example2.txt", expected: "0,0,WEST" },
    { fileName: "instructions_example3.txt", expected: "3,3,NORTH" },
  ];
  test.each(validTestCases)(
    "Should run test cases specified in INSTRUCTIONS.md ($fileName.txt) with result $expected",
    async ({ fileName, expected }) => {
      process.env.FILENAME = `src/__TESTS__/TestFiles/Scenarios/${fileName}`;

      await run();
      expect(consoleSpy).toHaveBeenCalledTimes(1);
      expect(consoleSpy).toHaveBeenCalledWith(expected);
      expect(true).toBeTruthy();
    }
  );

  // it("Should display specific error message for test case with missing arguments", async () => {
  //     process.env.FILENAME = `src/__TESTS__/TestFiles/Scenarios/Errors/instructions_example1_missing_arguments.txt`;

  //     await run();
  //     //       expect(consoleSpy).toHaveBeenCalledTimes(1);

  //     //"Gosh, there's been an error. Here is what I know about it - I hope this helps!"

  //     expect(consoleSpy).toHaveBeenCalledWith(
  //         "Could not parse arguments to PLACE command. Three arguments are expected (X coordinate, Y coordinate, Direction) eg '1,2,NORTH'."
  //     );
  //     expect(true).toBeTruthy();
  // });
});
