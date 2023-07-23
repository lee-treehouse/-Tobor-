import {
  TABLE_HEIGHT_AND_TABLE_WIDTH_BELOW_ONE_SUFFIX,
  TABLE_HEIGHT_AND_TABLE_WIDTH_MUST_BE_NUMERIC_SUFFIX,
} from "../ErrorMessages/Parsing";

export interface AppConfig {
  table: TableConfig;
  tobor: ToborConfig;
}

export interface TableConfig {
  size: {
    width: number;
    height: number;
  };
}

export interface ToborConfig {
  input: {
    fileName?: string;
    parser: {
      exitOnCommandParserError: boolean;
    };
    format: {
      capitaliseCommandsAndArgs: boolean;
    };
  };
}

export const getConfig = () => {
  const config = getDefaultConfig();

  const {
    TABLE_HEIGHT: tableHeight,
    TABLE_WIDTH: tableWidth,
    FILENAME: fileName,
    CAPITALISE_COMMANDS_AND_ARGS: capitaliseCommandsAndArgs,
    EXIT_ON_COMMAND_PARSER_ERROR: exitOnCommandParserError,
  } = process.env;

  if (tableHeight && tableWidth) {
    const height = parseInt(tableHeight, 10);
    const width = parseInt(tableWidth, 10);

    if (isNaN(height) || isNaN(width)) {
      throw new Error(`${tableHeight}, ${tableWidth} ${TABLE_HEIGHT_AND_TABLE_WIDTH_MUST_BE_NUMERIC_SUFFIX}`);
    }

    if (height < 1 || width < 1) {
      throw new Error(`${tableHeight}, ${tableWidth} ${TABLE_HEIGHT_AND_TABLE_WIDTH_BELOW_ONE_SUFFIX}`);
    }

    config.table.size.height = height;
    config.table.size.width = width;
  }

  if (fileName) config.tobor.input.fileName = fileName;

  if (capitaliseCommandsAndArgs) {
    const upperCase = capitaliseCommandsAndArgs.toUpperCase();
    if (upperCase === "TRUE" || upperCase === "FALSE")
      config.tobor.input.format.capitaliseCommandsAndArgs = upperCase === "TRUE";
  }

  if (exitOnCommandParserError) {
    const upperCase = exitOnCommandParserError.toUpperCase();
    if (upperCase === "TRUE" || upperCase === "FALSE")
      config.tobor.input.parser.exitOnCommandParserError = upperCase === "TRUE";
  }

  return config;
};

export const getDefaultConfig = (): AppConfig => {
  return {
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
  };
};
