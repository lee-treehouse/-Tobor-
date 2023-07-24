import { Position } from "../Common/Position";

export type CommandResult = Position | string | void;

export const isPosition = (commandResult: CommandResult): commandResult is Position => {
  if (typeof commandResult === "string") return false;
  return !!(commandResult?.coordinates && commandResult?.directionFacing);
};
