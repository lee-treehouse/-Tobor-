import { CompassDirection } from "./CompassDirection";
import { Coordinates } from "./Coordinates";

export type Position = {
  coordinates: Coordinates;
  directionFacing: CompassDirection;
};

export const defaultPosition: Position = {
  coordinates: {
    x: 0,
    y: 0,
  },
  directionFacing: CompassDirection.NORTH,
};
