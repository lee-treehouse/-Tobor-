import { Position } from "../Common/Position";
import { CommandResult } from "./CommandResult";

export interface Command {
  execute: (currentPosition: Position) => CommandResult;
  canBeIgnored: boolean;
}
