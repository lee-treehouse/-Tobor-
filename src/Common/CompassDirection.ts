import { CommandParserError } from "../Commands/CommandParserError";
import { COULD_NOT_PARSE_COMPASS_DIRECTION_SUFFIX } from "../ErrorMessages/Parsing";

export enum CompassDirection {
  NORTH = "NORTH",
  SOUTH = "SOUTH",
  EAST = "EAST",
  WEST = "WEST",
}

const isCompassDirection = (direction: string): direction is CompassDirection => {
  const validDirections = Object.keys(CompassDirection);
  return validDirections.includes(direction);
};

export const directionIsNorthOrSouth = (direction: CompassDirection) =>
  direction === CompassDirection.NORTH || direction === CompassDirection.SOUTH;
export const directionIsNorthOrEast = (direction: CompassDirection) =>
  direction === CompassDirection.NORTH || direction === CompassDirection.EAST;
export const directionIsNorthOrWest = (direction: CompassDirection) =>
  direction === CompassDirection.NORTH || direction === CompassDirection.WEST;

export const parseCompassDirection = (direction: string): CompassDirection => {
  if (isCompassDirection(direction)) return direction;
  throw new CommandParserError(`${direction} ${COULD_NOT_PARSE_COMPASS_DIRECTION_SUFFIX}`);
};
