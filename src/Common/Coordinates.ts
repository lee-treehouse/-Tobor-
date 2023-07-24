import {
  COULD_NOT_PARSE_COORDINATES_BELOW_ZERO_SUFFIX,
  COULD_NOT_PARSE_COORDINATES_NON_NUMERIC_SUFFIX,
} from "../ErrorMessages/Parsing";

export type Coordinates = {
  x: number;
  y: number;
};

// TODO should this count as a parser error?
export const parseCoordinates = (X: string, Y: string): Coordinates => {
  const x = parseInt(X, 10);
  const y = parseInt(Y, 10);
  if (isNaN(x) || isNaN(y)) throw new Error(`${X}, ${Y} ${COULD_NOT_PARSE_COORDINATES_NON_NUMERIC_SUFFIX}`);
  if (x < 0 || y < 0) throw new Error(`${X}, ${Y} ${COULD_NOT_PARSE_COORDINATES_BELOW_ZERO_SUFFIX}`);
  return { x, y };
};
