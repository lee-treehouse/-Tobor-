import { parseCompassDirection } from "../Types/CompassDirection";
import { parseCoordinates } from "../Types/Coordinates";
import { Position } from "../Types/Position";
import { COULD_NOT_PARSE_PLACE_ARGUMENTS_EXPECTED_3_SUFFIX } from "./ErrorMessages";
import { ICommand } from "./Command";

export class PlaceCommand implements ICommand {
    public static command = "PLACE";

    public readonly canBeIgnored = false;

    private position: Position;

    public constructor(args?: string[]) {
        if (!args || args.length != 3) throw new Error(COULD_NOT_PARSE_PLACE_ARGUMENTS_EXPECTED_3_SUFFIX);
        const coordinates = parseCoordinates(args[0], args[1]);
        const directionFacing = parseCompassDirection(args[2]);
        this.position = { coordinates, directionFacing };
    }

    public execute(currentPosition: Position): Position | void {
        return this.position;
    }
}
