import { CompassDirection } from "./CompassDirection";
import { Coordinates } from "./Coordinates";

export type Position = {
  coordinates: Coordinates;
  directionFacing: CompassDirection;
};
