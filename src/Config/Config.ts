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
        format: {
            capitaliseCommandsAndArgs: boolean;
        };
    };
}

export const getConfig = () => {
    const config = getDefaultConfig();

    const { TABLE_HEIGHT: tableHeight, TABLE_WIDTH: tableWidth, FILENAME: fileName } = process.env;

    if (tableHeight && tableWidth) {
        const height = parseInt(tableHeight);
        const width = parseInt(tableWidth);

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
    return config;
};

const getDefaultConfig = (): AppConfig => {
    return {
        tobor: {
            input: {
                format: {
                    capitaliseCommandsAndArgs: true,
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
