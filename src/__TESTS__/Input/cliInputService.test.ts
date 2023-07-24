import { Table } from "../../Common/Table";
import { getLogger } from "../../Output/LoggerFactory";
// import { LoggerType } from "../../Output/LoggerType";
import { ToborService } from "../../Services/ToborService";
import { cliInputService } from "../../Input/cliInputService";
//import { getConfig } from "../../Config/Config";
import { getDefaultTestConfig } from "../TestFiles/Config/DefaultTestConfig";

let loggerSpy: jest.SpyInstance;

//const env = process.env;
const config = getDefaultTestConfig();
const table = new Table(config.table);
const logger = getLogger();
const toborService = new ToborService(config.tobor, table, logger);

const service = new cliInputService(logger);
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

let mockExit: jest.SpyInstance;

describe("CLI Input Service", () => {
  beforeEach(() => {
    //    process.env = { ...env };
    loggerSpy = jest.spyOn(logger, "log");
    mockExit = jest.spyOn(process, "exit").mockImplementation();
  });
  afterEach(() => {
    //  process.env = env;
    loggerSpy.mockReset();
    mockExit.mockReset();
  });

  it("Should something something example3.txt", async () => {
    await service.getInputLineByLine(toborService.onReadInput);

    // it might be working but I have to make it end.. since i'm mocking EXIT and stopping it from actually exiting.

    // I need to replace this function
    // getNextLine
    // to have it send stdin

    expect(loggerSpy).toHaveBeenCalledWith("3,3,NORTH");

    expect(getNextLineMock).toHaveBeenCalledTimes(7);
  });

  // it("Should something something example3.txt lowercase", () => {
  //   service.getInputLineByLine(toborService.onReadInput);

  //   const stdin = mockStdin.stdin();

  //   stdin.send("place 1,2,east");
  //   stdin.send("MOVE");
  //   stdin.send("MOVE");
  //   stdin.send("LEFT");
  //   stdin.send("MOVE");
  //   stdin.send("REPORT");

  //   expect(loggerSpy).toHaveBeenCalledTimes(1);
  //   expect(loggerSpy).toHaveBeenCalledWith("3,3,NORTH");
  // });

  // it("Should something something example3.txt parser error", () => {
  //   service.getInputLineByLine(toborService.onReadInput);

  //   const stdin = mockStdin.stdin();

  //   stdin.send("SPACE 1,2,EAST");
  //   stdin.send("MOVE");
  //   stdin.send("MOVE");
  //   stdin.send("LEFT");
  //   stdin.send("MOVE");
  //   stdin.send("REPORT");

  //   expect(loggerSpy).toHaveBeenCalledTimes(1);
  //   expect(loggerSpy).toHaveBeenCalledWith("3,3,NORTH");
  // });
});
