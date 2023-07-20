import { TABLE_HEIGHT_AND_TABLE_WIDTH_MUST_BE_NUMERIC } from "./ErrorMessages";

interface AppConfig {
  input: {
    fileName?: string;
    format: {
      ignoreCase: boolean;
      ignoreWhitespace: boolean;
    };
  };
  table: TableConfig;
}

interface TableConfig {
  size: {
    width: number;
    height: number;
  };
}

export const parseEnv = () => {
  let table: undefined | TableConfig;
  if (process.env.TABLE_HEIGHT && process.env.TABLE_WIDTH) {
    const height = parseInt(process.env.TABLE_HEIGHT);
    const width = parseInt(process.env.TABLE_WIDTH);

    if (isNaN(height) || isNaN(width)) {
      throw new Error(TABLE_HEIGHT_AND_TABLE_WIDTH_MUST_BE_NUMERIC);
    }

    table = {
      size: { width, height },
    };
  }

  const fileName = process.env.FILENAME;
  return { ...defaultConfig, table, fileName };
};

const defaultConfig: AppConfig = {
  input: {
    format: {
      ignoreCase: true,
      ignoreWhitespace: true,
    },
  },
  table: {
    size: {
      width: 5,
      height: 5,
    },
  },
};
