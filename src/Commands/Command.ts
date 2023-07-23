import { Position } from "../Common/Position";

export interface Command {
  execute: (currentPosition: Position) => Position | void;
  canBeIgnored: boolean;
}
