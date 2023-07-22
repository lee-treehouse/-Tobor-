import { COULD_NOT_PARSE_COMPASS_DIRECTION_SUFFIX } from "../ErrorMessages/Parsing";

export enum CompassDirection {
    NORTH = "NORTH",
    SOUTH = "SOUTH",
    EAST = "EAST",
    WEST = "WEST",
}

export const directionIsNorthOrSouth = (direction: CompassDirection) =>
    direction === CompassDirection.NORTH || direction === CompassDirection.SOUTH;
export const directionIsNorthOrEast = (direction: CompassDirection) =>
    direction === CompassDirection.NORTH || direction === CompassDirection.EAST;

export const parseCompassDirection = (direction: string): CompassDirection => {
    const keys = Object.keys(CompassDirection);
    if (keys.includes(direction)) return direction as CompassDirection;
    throw new Error(`${direction} ${COULD_NOT_PARSE_COMPASS_DIRECTION_SUFFIX}`);
};
