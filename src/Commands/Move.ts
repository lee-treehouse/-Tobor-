import { Position } from "../Types/Position";
import { ICommand } from "./ICommand";

export class MoveCommand implements ICommand {
  public static command = "MOVE";

  public readonly canBeIgnored = true;

  public constructor(args?: string[]) {
  }

  public execute(currentPosition: Position): Position | void {
    console.log(`I am ${MoveCommand.command} command and my current direction is ${currentPosition.directionFacing}`);
  }
}
