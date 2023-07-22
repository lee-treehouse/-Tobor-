import { Position } from "../Common/Position";

export interface ICommand {
    execute: (currentPosition: Position) => Position | void;
    canBeIgnored: boolean;
}
