export enum CompassDirection {
  NORTH = "NORTH",
  SOUTH = "SOUTH",
  EAST = "EAST",
  WEST = "WEST"
}

export const directionIsNorthOrSouth = (direction: CompassDirection) =>
  direction === CompassDirection.NORTH || direction === CompassDirection.SOUTH;
export const directionIsNorthOrEast = (direction: CompassDirection) =>
  direction === CompassDirection.NORTH || direction === CompassDirection.EAST;
