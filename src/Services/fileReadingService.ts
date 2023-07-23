import { open } from "node:fs/promises";
export class FileReadingService {
  public constructor(private readonly filename: string) {}

  // handleError = (error: unknown) => {
  //     if (error instanceof Error) {
  //         error.message = `${TOBOR_FILE_HANDLING_ERROR_PREFIX}${error.message}`;
  //         throw error;
  //     } else {
  //         throw new Error(`${TOBOR_FILE_HANDLING_ERROR_PREFIX}Unknown Error`);
  //     }
  // };

  public async processFileLineByLine(onReadLine: (line: string) => Promise<void>) {
    let file;

    try {
      file = await open(this.filename);
      for await (const line of file.readLines()) {
        await onReadLine(line);
      }
    } finally {
      await file?.close();
    }
  }
}
