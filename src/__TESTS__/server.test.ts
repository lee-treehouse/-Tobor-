import { getLogger } from "../Output/LoggerFactory";
import { LoggerType } from "../Output/LoggerType";
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

  it("Should recognize commands when capitaliseCommandsAndArgs is default(true)", async () => {
    process.env.FILENAME = `src/__TESTS__/TestFiles/Scenarios/instructions_example3_lowercase.txt`;
    process.env.CAPITALISE_COMMANDS_AND_ARGS = "true";
    await run(logger);

    expect(loggerSpy).toHaveBeenCalledWith("3,3,NORTH");
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
      process.env.FILENAME = `src/__TESTS__/TestFiles/Scenarios/explore_table_boundaries.txt`;
      process.env.TABLE_WIDTH = tableWidth;
      process.env.TABLE_HEIGHT = tableHeight;
      await run(logger);

      output.forEach((item) => {
        expect(loggerSpy).toHaveBeenCalledWith(item);
      });
    }
  );
});

// TODO add tests here that test EXIT_ON_COMMAND_PARSER_ERROR configuration e2e
// describe("E2E failure tests from fixtures", () => {
//   let mockExit: jest.SpyInstance;

//   beforeEach(() => {
//     mockExit = jest.spyOn(process, "exit").mockImplementation();
//   });

//   afterEach(() => {
//     mockExit.mockReset();
//   });
// });
