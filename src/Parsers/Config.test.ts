import { parseEnv } from "./Config";

// approach to process.env mocking as described here https://webtips.dev/how-to-mock-processenv-in-jest
describe("Config derived from process.env", () => {
  const env = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...env };
  });
  afterEach(() => {
    process.env = env;
  });

  it('Should produce table config when table dimensions are specified in process.env"', () => {
    process.env.TABLE_HEIGHT = "6";
    process.env.TABLE_WIDTH = "9";

    const config = parseEnv();

    expect(config.table?.size.height).toBe(6);
    expect(config.table?.size.width).toBe(9);
  });

  it('Should throw if table HEIGHT specified in process.env is not numeric and process.env.TABLE_WIDTH is specified"', () => {
    process.env.TABLE_HEIGHT = "foo";
    process.env.TABLE_WIDTH = "9";
    expect(() => parseEnv()).toThrow();
  });

  it('Should throw if table WIDTH specified in process.env is not numeric and process.env.TABLE_HEIGHT is specified"', () => {
    process.env.TABLE_HEIGHT = "9";
    process.env.TABLE_WIDTH = "bar";
    expect(() => parseEnv()).toThrow();
  });

  it('Should throw if table WIDTH specified in process.env is not numeric and process.env.TABLE_HEIGHT is specified"', () => {
    process.env.FILENAME = "important.txt";
    const config = parseEnv();

    expect(config.input.fileName).toBeDefined();
    expect(config.input.fileName).toBe("important.txt");
  });
});
