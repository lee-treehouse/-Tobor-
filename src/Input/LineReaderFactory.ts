import { FileReadingService } from "./FileReadingService";
import { cliInputService } from "./cliInputService";
import { LineReader } from "./LineReader";

export const getLineReader = (fileName?: string): LineReader => {
  if (fileName && fileName.length > 0) return new FileReadingService(fileName);
  return new cliInputService();
};
