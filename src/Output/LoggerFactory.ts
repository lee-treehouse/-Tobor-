import { ConsoleLogger } from "./ConsoleLogger";
import { Logger } from "./Logger";
import { SilentLogger } from "./SilentLogger";

export const getLogger = (isSilent: boolean = false): Logger => {
  if (isSilent) return new SilentLogger();
  return new ConsoleLogger();
};
