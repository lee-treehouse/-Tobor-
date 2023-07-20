import * as dotenv from "dotenv";
import { parseEnv } from "./Parsers/Config";
import { ToborService } from "./Services/toborService";

dotenv.config();

export const start = async () => {
  const config = parseEnv();

  const service = new ToborService(config);
  await service.readInput();
};

const run = async () => {
  try {
    await start();
  } catch (error) {
    // TODO source from configs
    let message = "Unknown Error";
    if (error instanceof Error) message = error.message;
    console.log("Oh dear. something went wrong. Here is what I know about it, I hope it helps!");
    console.log(message);
  }
};

run();
