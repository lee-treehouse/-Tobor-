import { ConsoleLogger } from "./ConsoleLogger";
import { Logger } from "./Logger";
import { SilentLogger } from "./SilentLogger";
import { LoggerType } from "./LoggerType";

export const getLogger = (loggerType: LoggerType = LoggerType.CONSOLE): Logger => {
  if (loggerType === LoggerType.SILENT) return new SilentLogger();
  return new ConsoleLogger();
};
