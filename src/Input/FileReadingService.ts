import { open } from "node:fs/promises";
import { LineReader } from "../Input/LineReader";
export class FileReadingService implements LineReader {
  public constructor(private readonly filename: string) {}

  public async getInputLineByLine(onReadLine: (line: string) => Promise<void>) {
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
