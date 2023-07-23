import {
  COULD_NOT_PARSE_PLACE_ARGUMENTS_EXPECTED_3,
  COULD_NOT_PARSE_UNRECOGNIZED_COMMAND_SUFFIX,
} from "../ErrorMessages/Parsing";
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

// TODO improve test descriptions here

describe("E2E success cases from fixtures", () => {
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
    }
  );

  it("Should recognize commands when capitaliseCommandsAndArgs is default(true)", async () => {
    process.env.FILENAME = `src/__TESTS__/TestFiles/Scenarios/Configuration/instructions_example3_lowercase.txt`;
    process.env.CAPITALISE_COMMANDS_AND_ARGS = "true";
    await run();
    expect(consoleSpy).toHaveBeenCalledWith("3,3,NORTH");
  });

  const exploreBoundaryCases = [
    {
      tableWidth: "5",
      tableHeight: "5",
      output: ["0,4,NORTH", "0,4,NORTH", "4,4,EAST", "4,4,EAST", "4,0,SOUTH", "4,0,SOUTH", "0,0,WEST"],
    },
    {
      tableWidth: "6",
      tableHeight: "6",
      output: ["0,4,NORTH", "0,5,NORTH", "4,5,EAST", "5,5,EAST", "5,1,SOUTH", "5,0,SOUTH", "1,0,WEST"],
    },
  ];
  test.each(exploreBoundaryCases)(
    "Should explore table boundaries with varied output depending on table size",
    async ({ tableWidth, tableHeight, output }) => {
      process.env.FILENAME = `src/__TESTS__/TestFiles/Scenarios/Configuration/explore_table_boundaries.txt`;
      process.env.TABLE_WIDTH = tableWidth;
      process.env.TABLE_HEIGHT = tableHeight;
      await run();
      output.forEach((item) => {
        expect(consoleSpy).toHaveBeenCalledWith(item);
      });
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

  it("Should not recognize lowercase commands when capitaliseCommandsAndArgs is default (false)", async () => {
    process.env.FILENAME = `src/__TESTS__/TestFiles/Scenarios/Configuration/instructions_example3_lowercase.txt`;
    await run();
    expect(consoleSpy).toHaveBeenCalledWith(TOBOR_ERROR_PREFIX);
    expect(consoleSpy).toHaveBeenCalledWith(`place ${COULD_NOT_PARSE_UNRECOGNIZED_COMMAND_SUFFIX}`);
  });
});
