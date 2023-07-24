import { Table } from "../../Common/Table";
import { getLogger } from "../../Output/LoggerFactory";
//import { LoggerType } from "../../Output/LoggerType";
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
  .spyOn(service, "getNextLine")
  .mockImplementationOnce(() => Promise.resolve("PLACE 1,2,EAST"))
  .mockImplementationOnce(() => Promise.resolve("MOVE"))
  .mockImplementationOnce(() => Promise.resolve("MOVE"))
  .mockImplementationOnce(() => Promise.resolve("LEFT"))
  .mockImplementationOnce(() => Promise.resolve("MOVE"))
  .mockImplementationOnce(() => Promise.resolve("REPORT"))
  .mockImplementationOnce(() => Promise.resolve("EXIT"));

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

  it("Should something something example3.txt", () => {
    service.getInputLineByLine(toborService.onReadInput);

    // I need to replace this function
    // getNextLine
    // to have it send stdin

    // stdin.send("PLACE 1,2,EAST");
    // stdin.send("MOVE");
    // stdin.send("MOVE");
    // stdin.send("LEFT");
    // stdin.send("MOVE");
    // stdin.send("REPORT");

    // // TODO this needs further thought as the output/prompt is going to be spied on too

    expect(getNextLineMock).toHaveBeenCalledTimes(7);

    expect(loggerSpy).toHaveBeenCalledWith("3,3,NORTH");
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
