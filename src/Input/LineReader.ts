export interface LineReader {
  getInputLineByLine(onReadLine: (line: string) => Promise<void>): Promise<void>;
}
