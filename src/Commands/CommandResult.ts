import { Position } from "../Common/Position";

export type CommandResult = Position | string | void;

export const isPosition = (commandResult: CommandResult): commandResult is CommandResult => {
  // TODO should this look at the properties it has or just if it's not undefined or string - maybe can use in operator if there is a method to check
  if (typeof commandResult === "string") return false;
  if (!commandResult) return false;
  return true;
};
