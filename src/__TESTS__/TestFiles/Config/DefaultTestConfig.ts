import { AppConfig } from "../../../Config/Config";

export const getDefaultTestConfig = (): AppConfig => {
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
        length: 5,
      },
      obstacles: [],
    },
  };
};
