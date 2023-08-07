import { CommandParserError } from "../Commands/CommandParserError";
import {
  COULD_NOT_PARSE_COORDINATES_BELOW_ZERO_SUFFIX,
  COULD_NOT_PARSE_COORDINATES_NON_NUMERIC_SUFFIX,
} from "../ErrorMessages/Parsing";

export type Coordinate = number | LogicalCoordinate;

export type Coordinates = {
  x: Coordinate;
  y: Coordinate;
};

export enum LogicalCoordinate {
  MAX = "MAX",
  RANDOM = "RANDOM",
}

export const isLogicalCoordinate = (coordinate: Coordinate): coordinate is LogicalCoordinate => {
  if (typeof coordinate === "number") return false;
  return true;
};

const canBeParsedAsLogicalCoordinate = (coordinate: string): coordinate is LogicalCoordinate => {
  if (typeof coordinate === "number") return false;
  const validLogicalCoordinates = Object.keys(LogicalCoordinate);
  return validLogicalCoordinates.includes(coordinate);
};

export const parseLogicalCoordinate = (coordinate: string): LogicalCoordinate => {
  if (canBeParsedAsLogicalCoordinate(coordinate)) return coordinate;
  // do something about this
  throw new CommandParserError(`${coordinate} could not be parsed as a logical coordinate`);
};

export const parseCoordinates = (X: string, Y: string, allowLogicalCoordinates = false): Coordinates => {
  if (allowLogicalCoordinates) throw new Error("Not yet implemented");

  const x = parseInt(X, 10);
  const y = parseInt(Y, 10);
  if (isNaN(x) || isNaN(y))
    throw new CommandParserError(`${X}, ${Y} ${COULD_NOT_PARSE_COORDINATES_NON_NUMERIC_SUFFIX}`);
  if (x < 0 || y < 0) throw new CommandParserError(`${X}, ${Y} ${COULD_NOT_PARSE_COORDINATES_BELOW_ZERO_SUFFIX}`);
  return { x, y };
};
