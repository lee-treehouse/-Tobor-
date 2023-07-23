import { getConfig } from "./Config/Config";
import { ToborService } from "./Services/ToborService";
import { Table } from "./Common/Table";
import { TOBOR_ERROR_PREFIX } from "./UX/messages";
import { Logger } from "./Output/Logger";

const handleError = (error: unknown, logger: Logger) => {
  let message = "Unknown Error";
  if (error instanceof Error) message = error.message;
  logger.log(TOBOR_ERROR_PREFIX);
  logger.log(message);
};

export const run = async (logger: Logger) => {
  try {
    const config = getConfig();
    const table = new Table(config.table);
    const service = new ToborService(config.tobor, table, logger);
    await service.readInput();
  } catch (error) {
    handleError(error, logger);
    process.exit();
  }
};
