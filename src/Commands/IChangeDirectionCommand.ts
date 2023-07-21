import { DirectionChange } from "../Types/DirectionChange";
import { ICommand } from "./Command";

export interface IChangeDirectionCommand extends ICommand {
    directionChange: DirectionChange;
}
