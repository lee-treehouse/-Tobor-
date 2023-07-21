import { TABLE_HEIGHT_AND_TABLE_WIDTH_MUST_BE_NUMERIC } from './ErrorMessages';

export interface AppConfig {
    input: {
        fileName?: string;
        format: {
            ignoreCase: boolean;
        };
    };
    table: TableConfig;
}

export interface TableConfig {
    size: {
        width: number;
        height: number;
    };
}

export const parseEnv = () => {
    const config = defaultConfig;

    if (process.env.TABLE_HEIGHT && process.env.TABLE_WIDTH) {
        const height = parseInt(process.env.TABLE_HEIGHT);
        const width = parseInt(process.env.TABLE_WIDTH);

        if (isNaN(height) || isNaN(width)) {
            throw new Error(TABLE_HEIGHT_AND_TABLE_WIDTH_MUST_BE_NUMERIC);
        }

        config.table.size.height = height;
        config.table.size.width = width;
    }

    if (process.env.FILENAME) config.input.fileName = process.env.FILENAME;
    return config;
};

const defaultConfig: AppConfig = {
    input: {
        format: {
            ignoreCase: true,
        },
    },
    table: {
        size: {
            width: 5,
            height: 5,
        },
    },
};
