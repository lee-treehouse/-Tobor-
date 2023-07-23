import { COULD_NOT_PARSE_PLACE_ARGUMENTS_EXPECTED_3 } from "../ErrorMessages/Parsing";
import { TOBOR_ERROR_PREFIX } from "../UX/messages";
import { run } from "../server";

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

describe("E2E success from fixtures", () => {
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
});

describe("E2E failure tests from fixtures", () => {
  let mockExit: jest.SpyInstance;

  beforeEach(() => {
    mockExit = jest.spyOn(process, "exit").mockImplementation();
  });

  afterEach(() => {
    mockExit.mockReset();
  });

  it("Should display specific error message for test case with missing arguments", async () => {
    process.env.FILENAME = `src/__TESTS__/TestFiles/Scenarios/Errors/instructions_example1_missing_arguments.txt`;
    await run();
    expect(consoleSpy).toHaveBeenCalledWith(TOBOR_ERROR_PREFIX);
    expect(consoleSpy).toHaveBeenCalledWith(COULD_NOT_PARSE_PLACE_ARGUMENTS_EXPECTED_3([]));
  });
});
