import { open } from "node:fs/promises";
import { TOBOR_FILE_HANDLING_ERROR_PREFIX } from "../ErrorMessages/FileHandling";
export class FileReadingService {
    public constructor(private readonly filename: string) {}

    handleError = (error: unknown) => {
        let message = "Unknown Error";
        if (error instanceof Error) message = error.message;
        console.log(TOBOR_FILE_HANDLING_ERROR_PREFIX);
        console.log(message);
    };

    public async processFileLineByLine(onReadLine: (line: string) => Promise<void>) {
        let file;

        try {
            file = await open(this.filename);
            for await (const line of file.readLines()) {
                await onReadLine(line);
            }
        } catch (error) {
            this.handleError(error);
        } finally {
            await file?.close();
        }
    }
}
