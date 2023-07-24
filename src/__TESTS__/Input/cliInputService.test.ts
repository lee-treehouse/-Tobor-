import { Table } from "../../Common/Table";
import { getLogger } from "../../Output/LoggerFactory";
// import { LoggerType } from "../../Output/LoggerType";
import { ToborService } from "../../Services/ToborService";
import { cliInputService } from "../../Input/cliInputService";
//import { getConfig } from "../../Config/Config";
import { getDefaultTestConfig } from "../TestFiles/Config/DefaultTestConfig";
let loggerSpy: jest.SpyInstance;

const env = process.env;
const config = getDefaultTestConfig();
const table = new Table(config.table);
const logger = getLogger();
const toborService = new ToborService(config.tobor, table, logger);

const service = new cliInputService(logger);
let mockExit: jest.SpyInstance;

describe("CLI Input Service", () => {
  beforeEach(() => {
    process.env = { ...env };
    loggerSpy = jest.spyOn(logger, "log");
    mockExit = jest.spyOn(process, "exit").mockImplementation();
  });
  afterEach(() => {
    process.env = env;
    loggerSpy.mockReset();
    mockExit.mockReset();
  });

  it("Should produce correct result for scenario desribed in TestFiles example3.txt", async () => {
    const getNextLineMock = jest
      .spyOn(service, "readLineAsync")
      .mockImplementationOnce(async () => Promise.resolve("PLACE 1,2,EAST"))
      .mockImplementationOnce(async () => Promise.resolve("MOVE"))
      .mockImplementationOnce(async () => Promise.resolve("MOVE"))
      .mockImplementationOnce(async () => Promise.resolve("LEFT"))
      .mockImplementationOnce(async () => Promise.resolve("MOVE"))
      .mockImplementationOnce(async () => Promise.resolve("REPORT"))
      // exiting with void allows the test to finish running
      .mockImplementation(async () => Promise.resolve());

    await service.getInputLineByLine(toborService.onReadInput);
    expect(loggerSpy).toHaveBeenCalledWith("3,3,NORTH");
    expect(getNextLineMock).toHaveBeenCalledTimes(7);
  });
});
