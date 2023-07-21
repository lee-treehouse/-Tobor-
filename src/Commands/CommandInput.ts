export type CommandInput = {
    command: string;
    args: string[];
};

export const separateCommandAndArguments = (input: string) => {
    const tokens = input.split(" ");
    const command = tokens && tokens.length > 0 ? tokens[0] : "";
    const args = tokens && tokens.length > 1 ? tokens[1].split(",") : [];
    return {
        command,
        args,
    };
};
