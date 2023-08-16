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
      obstaclesCoordinates: [],
    },
  };
};

export const getAlgoTestConfig = (): AppConfig => {
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
        width: 6,
        length: 5,
      },
      obstaclesCoordinates: [
        { x: 1, y: 4 },
        { x: 1, y: 3 },
        { x: 1, y: 2 },
        { x: 2, y: 2 },
        { x: 2, y: 1 },
        { x: 3, y: 4 },
        { x: 3, y: 3 },
        { x: 3, y: 2 },
      ],
    },
  };
};
