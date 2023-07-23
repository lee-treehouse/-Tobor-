import { getLogger } from "./Output/LoggerFactory";
import { run } from "./server";
import * as dotenv from "dotenv";

dotenv.config();

run(getLogger());
