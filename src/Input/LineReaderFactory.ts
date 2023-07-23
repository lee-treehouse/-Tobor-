import { FileReadingService } from "./FileReadingService";
import { cliInputService } from "./cliInputService";
import { LineReader } from "./LineReader";
import { Logger } from "../Output/Logger";

export const getLineReader = (logger: Logger, fileName?: string): LineReader => {
  if (fileName && fileName.length > 0) return new FileReadingService(fileName);
  return new cliInputService(logger);
};
