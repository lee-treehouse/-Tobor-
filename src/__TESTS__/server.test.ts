import {
  COULD_NOT_PARSE_PLACE_ARGUMENTS_EXPECTED_3,
  COULD_NOT_PARSE_UNRECOGNIZED_COMMAND_SUFFIX,
} from "../ErrorMessages/Parsing";
import { getLogger } from "../Output/LoggerFactory";
import { LoggerType } from "../Output/LoggerType";
import { TOBOR_ERROR_PREFIX } from "../UX/messages";
import { run } from "../server";

const env = process.env;
const logger = getLogger(LoggerType.SILENT);
let loggerSpy: jest.SpyInstance;

beforeEach(() => {
  process.env = { ...env };
  loggerSpy = jest.spyOn(logger, "log");
});
afterEach(() => {
  process.env = env;
  loggerSpy.mockReset();
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

      await run(logger);
      expect(loggerSpy).toHaveBeenCalledTimes(1);
      expect(loggerSpy).toHaveBeenCalledWith(expected);
    }
  );

  it("Should recognize lowercase commands when capitalise commands and args is true", async () => {
    process.env.FILENAME = `src/__TESTS__/TestFiles/Scenarios/instructions_example3_lowercase.txt`;
    process.env.CAPITALISE_COMMANDS_AND_ARGS = "true";
    await run(logger);

    expect(loggerSpy).toHaveBeenCalledWith("3,3,NORTH");
  });

  const exploreBoundaryCases = [
    {
      tableWidth: "5",
      tableLength: "5",
      output: ["0,4,NORTH", "0,4,NORTH", "4,4,EAST", "4,4,EAST", "4,0,SOUTH", "4,0,SOUTH", "0,0,WEST"],
    },
    {
      tableWidth: "6",
      tableLength: "6",
      output: ["0,4,NORTH", "0,5,NORTH", "4,5,EAST", "5,5,EAST", "5,1,SOUTH", "5,0,SOUTH", "1,0,WEST"],
    },
  ];
  test.each(exploreBoundaryCases)(
    "Should explore table boundaries with varied output depending on table size",
    async ({ tableWidth, tableLength, output }) => {
      process.env.FILENAME = `src/__TESTS__/TestFiles/Scenarios/explore_table_boundaries.txt`;
      process.env.TABLE_WIDTH = tableWidth;
      process.env.TABLE_LENGTH = tableLength;
      await run(logger);

      output.forEach((item) => {
        expect(loggerSpy).toHaveBeenCalledWith(item);
      });
    }
  );
});

// TODO add tests here that test EXIT_ON_COMMAND_PARSER_ERROR configuration e2e
describe("E2E failure tests from fixtures", () => {
  let mockExit: jest.SpyInstance;

  beforeEach(() => {
    mockExit = jest.spyOn(process, "exit").mockImplementation();
  });

  afterEach(() => {
    mockExit.mockReset();
  });

  it("Should display specific error message for test case with missing arguments and exit on command parser error setting true", async () => {
    process.env.FILENAME = `src/__TESTS__/TestFiles/Scenarios/instructions_example1_missing_arguments.txt`;
    process.env.EXIT_ON_COMMAND_PARSER_ERROR = "true";
    await run(logger);

    expect(loggerSpy).toHaveBeenCalledWith(TOBOR_ERROR_PREFIX);
    expect(loggerSpy).toHaveBeenCalledWith(COULD_NOT_PARSE_PLACE_ARGUMENTS_EXPECTED_3([]));
  });

  it("Should display specific error message for test case with lowercase commands when capitalise commands and args is false and exit on command parser error setting true", async () => {
    process.env.FILENAME = `src/__TESTS__/TestFiles/Scenarios/instructions_example3_lowercase.txt`;
    process.env.CAPITALISE_COMMANDS_AND_ARGS = "false";
    process.env.EXIT_ON_COMMAND_PARSER_ERROR = "true";
    await run(logger);

    expect(loggerSpy).toHaveBeenCalledWith(TOBOR_ERROR_PREFIX);
    expect(loggerSpy).toHaveBeenCalledWith(`place ${COULD_NOT_PARSE_UNRECOGNIZED_COMMAND_SUFFIX}`);
  });
});
