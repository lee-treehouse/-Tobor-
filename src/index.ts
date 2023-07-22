import * as dotenv from "dotenv";
import { getConfig } from "./Config/Config";
import { ToborService } from "./Services/toborService";
import { Table } from "./Common/Table";

dotenv.config();

export const start = async () => {
    const config = getConfig();

    const table = new Table(config.table);
    const service = new ToborService(config.tobor, table);
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
