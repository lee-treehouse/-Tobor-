import { getDefaultConfig } from "../../Config/Config";
import { Table } from "../../Common/Table";

const config = getDefaultConfig();
let table: Table;

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
