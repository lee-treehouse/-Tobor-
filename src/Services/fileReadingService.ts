import { open } from 'node:fs/promises';
export class FileReadingService {
    public constructor(private readonly filename: string) {}

    public async processFileLineByLine(cb: (line: string) => Promise<void>) {
        const file = await open(this.filename);

        for await (const line of file.readLines()) {
            await cb(line);
        }
    }
}
