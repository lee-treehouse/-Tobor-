import { COULD_NOT_PARSE_COMPASS_DIRECTION_SUFFIX } from "../ErrorMessages/Parsing";

// TODO turn into a class

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

export const parseCompassDirection = (direction: string): CompassDirection => {
  if (isCompassDirection(direction)) return direction;
  throw new Error(`${direction} ${COULD_NOT_PARSE_COMPASS_DIRECTION_SUFFIX}`);
};
