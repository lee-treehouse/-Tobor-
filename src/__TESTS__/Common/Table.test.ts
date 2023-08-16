import { getDefaultConfig } from "../../Config/Config";
import { Table } from "../../Common/Table";

const config = getDefaultConfig();
let table: Table;

describe("Are coordinates at the location of an obstacle", () => {
  beforeEach(() => {
    table = new Table(config.table);
  });

  const obstacleFoundCases = [{ coordinates: { x: 2, y: 1 } }, { coordinates: { x: 3, y: 4 } }];

  test.each(obstacleFoundCases)("should find obstacles at $coordinates", ({ coordinates }) => {
    expect(table.doCoordinatesHaveObstacles(coordinates)).toBe(true);
  });

  const obstacleNotFoundCases = [{ coordinates: { x: 3, y: 2 } }, { coordinates: { x: 3, y: 3 } }];

  test.each(obstacleNotFoundCases)("should not find obstacles at $coordinates", ({ coordinates }) => {
    expect(table.doCoordinatesHaveObstacles(coordinates)).toBe(false);
  });
});

describe("Are coordinates out of bounds", () => {
  beforeEach(() => {
    table = new Table(config.table);
  });

  const validCases = [
    { coordinates: { x: 4, y: 1 } },
    { coordinates: { x: 1, y: 4 } },
    { coordinates: { x: 0, y: 1 } },
    { coordinates: { x: 1, y: 0 } },
  ];

  test.each(validCases)(
    "Coordinates at corner edges of table's size are not out of bounds - $coordinates",
    ({ coordinates }) => {
      expect(table.areCoordinatesOutOfBounds(coordinates)).toBe(false);
    }
  );

  const invalidCases = [
    { coordinates: { x: 5, y: 1 } },
    { coordinates: { x: 1, y: 5 } },
    { coordinates: { x: -1, y: 1 } },
    { coordinates: { x: 1, y: -1 } },
  ];

  test.each(invalidCases)(
    "Coordinates just past corner of table's size are out of bounds - $coordinates",
    ({ coordinates }) => {
      expect(table.areCoordinatesOutOfBounds(coordinates)).toBe(true);
    }
  );
});
