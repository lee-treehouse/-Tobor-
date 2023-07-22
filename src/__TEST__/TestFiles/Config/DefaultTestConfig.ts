import { AppConfig } from "../../../Config/Config";

export const getDefaultTestConfig = (): AppConfig => {
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
