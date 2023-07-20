import { DirectionChange } from "../Types/DirectionChange";
import { ICommand } from "./ICommand";

export interface IChangeDirectionCommand extends ICommand {
  directionChange: DirectionChange;
}
