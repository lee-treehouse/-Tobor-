import { Position } from "../Types/Position";

export interface ICommand {
    execute: (currentPosition: Position) => Position | void;
    canBeIgnored: boolean;
}
