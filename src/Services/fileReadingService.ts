import { open } from "node:fs/promises";
export class FileReadingService {
    public constructor(private readonly filename: string) {}

    public async processFileLineByLine(onReadLine: (line: string) => Promise<void>) {
        const file = await open(this.filename);

        for await (const line of file.readLines()) {
            await onReadLine(line);
        }
    }
}
