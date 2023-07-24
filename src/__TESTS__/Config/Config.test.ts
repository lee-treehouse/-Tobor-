import { getConfig, getDefaultConfig } from "../../Config/Config";

describe("Config derived from process.env", () => {
  const env = process.env;

  beforeEach(() => {
    process.env = { ...env };
  });
  afterEach(() => {
    process.env = env;
  });

  it("Should set table config when table dimensions are specified", () => {
    process.env.TABLE_HEIGHT = "6";
    process.env.TABLE_WIDTH = "9";

    const config = getConfig();

    expect(config.table.size.height).toBe(6);
    expect(config.table.size.width).toBe(9);
  });

  const nonNumericTableInputCases = [
    {
      height: "foo",
      width: "4",
      expected: "foo, 4 could not be parsed as table size. Values should be numeric.",
    },
    {
      height: "5",
      width: "bar",
      expected: "5, bar could not be parsed as table size. Values should be numeric.",
    },
  ];

  test.each(nonNumericTableInputCases)(
    "Should throw specific error messages on non numeric input for table Height or Width when the other dimension is specified",
    ({ height, width, expected }) => {
      process.env.TABLE_HEIGHT = height;
      process.env.TABLE_WIDTH = width;
      const configFunction = () => getConfig();
      expect(configFunction).toThrow(expected);
    }
  );

  const belowOneTableInputCases = [
    {
      height: "0",
      width: "4",
      expected: "0, 4 could not be parsed as table size. Values should be one or greater.",
    },
    {
      height: "5",
      width: "-3",
      expected: "5, -3 could not be parsed as table size. Values should be one or greater.",
    },
  ];

  test.each(belowOneTableInputCases)(
    "Should throw specific error messages on below one input for table Height or Width when the other dimension is specified",
    ({ height, width, expected }) => {
      process.env.TABLE_HEIGHT = height;
      process.env.TABLE_WIDTH = width;
      const configFunction = () => getConfig();
      expect(configFunction).toThrow(expected);
    }
  );

  it("Should set input filename in config when filename is specified", () => {
    process.env.FILENAME = "important.txt";
    const config = getConfig();

    expect(config.tobor.input.fileName).toBeDefined();
    expect(config.tobor.input.fileName).toBe("important.txt");
  });

  it("Should return default config when no environment variables are set", () => {
    const config = getConfig();

    expect(config).toEqual({
      tobor: {
        input: {
          parser: {
            exitOnCommandParserError: false,
          },
          format: {
            capitaliseCommandsAndArgs: false,
          },
        },
      },
      table: {
        size: {
          width: 5,
          height: 5,
        },
      },
    });
  });

  const capitaliseCommandAndArgsValidCases = [
    { value: "true", result: true },
    { value: "TRUE", result: true },
    { value: "false", result: false },
    { value: "FALSE", result: false },
  ];
  test.each(capitaliseCommandAndArgsValidCases)(
    "Should set capitalise commands and args to $value when value $value is provided",
    ({ value, result }) => {
      process.env.CAPITALISE_COMMANDS_AND_ARGS = value;
      const config = getConfig();
      expect(config.tobor.input.format.capitaliseCommandsAndArgs).toBe(result);
    }
  );

  const capitaliseCommandAndArgsInvalidCases = [{ value: "foo" }, { value: "1" }, { value: "yes" }, { value: "" }];
  test.each(capitaliseCommandAndArgsInvalidCases)(
    "Should not override capitalise commands and args default value when invalid value $value is provided",
    ({ value }) => {
      process.env.CAPITALISE_COMMANDS_AND_ARGS = value;
      const config = getConfig();
      expect(config.tobor.input.format.capitaliseCommandsAndArgs).toBe(
        getDefaultConfig().tobor.input.format.capitaliseCommandsAndArgs
      );
    }
  );

  const exitOnCommandParserErrorValidCases = [
    { value: "true", result: true },
    { value: "TRUE", result: true },
    { value: "false", result: false },
    { value: "FALSE", result: false },
  ];
  test.each(exitOnCommandParserErrorValidCases)(
    "Should set exit on command parser error to $value when value $value is provided",
    ({ value, result }) => {
      process.env.EXIT_ON_COMMAND_PARSER_ERROR = value;
      const config = getConfig();

      expect(config.tobor.input.parser.exitOnCommandParserError).toBe(result);
    }
  );

  const exitOnCommandParserErrorInvalidCases = [{ value: "foo" }, { value: "1" }, { value: "yes" }, { value: "" }];
  test.each(exitOnCommandParserErrorInvalidCases)(
    "Should not override exit on command parser error default value when invalid value $value is provided",
    ({ value }) => {
      process.env.EXIT_ON_COMMAND_PARSER_ERROR = value;
      const config = getConfig();
      expect(config.tobor.input.parser.exitOnCommandParserError).toBe(
        getDefaultConfig().tobor.input.parser.exitOnCommandParserError
      );
    }
  );
});
