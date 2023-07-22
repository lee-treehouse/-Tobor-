import { TABLE_HEIGHT_AND_TABLE_WIDTH_MUST_BE_NUMERIC_SUFFIX } from "../ErrorMessages/Parsing";

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
        format: {
            ignoreCase: boolean;
        };
    };
}

export const parseEnv = () => {
    const config = defaultConfig;

    const { TABLE_HEIGHT, TABLE_WIDTH, FILENAME } = process.env;

    if (TABLE_HEIGHT && TABLE_WIDTH) {
        const height = parseInt(TABLE_HEIGHT);
        const width = parseInt(TABLE_WIDTH);

        if (isNaN(height) || isNaN(width)) {
            throw new Error(`${TABLE_HEIGHT} ${TABLE_WIDTH} ${TABLE_HEIGHT_AND_TABLE_WIDTH_MUST_BE_NUMERIC_SUFFIX}`);
        }

        config.table.size.height = height;
        config.table.size.width = width;
    }

    if (FILENAME) config.tobor.input.fileName = FILENAME;
    return config;
};

const defaultConfig: AppConfig = {
    tobor: {
        input: {
            format: {
                ignoreCase: true,
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
