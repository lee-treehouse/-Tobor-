import * as dotenv from "dotenv";
import { parseEnv } from "./Parsers/Config";
import { ToborService } from "./Services/toborService";
import { Table } from "./Types/Table";

dotenv.config();

export const start = async () => {
    const config = parseEnv();

    const table = new Table(config.table);
    const service = new ToborService(config, table);
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
        console.log("Oh yeah.. you're building software here, I'm not going to hide all your secrets");
        console.log(error);
    }
};

run();
