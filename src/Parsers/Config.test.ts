import { parseEnv } from "./Config";

// approach to process.env mocking as described here https://webtips.dev/how-to-mock-processenv-in-jest
describe("process.env settings tests", () => {
  const env = process.env;

  console.log(env);

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...env };
  });
  afterEach(() => {
    process.env = env;
  });

  it('Should produce config when table dimensions are specified in process.env"', () => {
    process.env.TABLE_HEIGHT = "6";
    process.env.TABLE_WIDTH = "9";

    const config = parseEnv();

    console.log(config);

    expect(config.table?.size.height).toBe(6);
    expect(config.table?.size.width).toBe(9);
    expect(true).toBeTruthy();
  });

  it('Should fail as process.env should not be mocked anymore"', () => {
    const config = parseEnv();

    console.log(config);

    expect(config.table?.size.height).toBe(6);
    expect(config.table?.size.width).toBe(9);
    expect(true).toBeTruthy();
  });
});
