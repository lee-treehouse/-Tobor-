import { getDefaultConfig } from "../../Config/Config";
import { Table } from "../../Common/Table";
// import { Position } from "../../Common/Position";
// import { CompassDirection } from "../../Common/CompassDirection";
// import { Coordinates } from "../../Common/Coordinates";

const config = getDefaultConfig();
let table: Table;

describe("figuring out how to get to a desired place", () => {
  it("breadth first search returns expected result", () => {
    table = new Table(config.table);

    const start = [0, 0];

    const expected = [
      [0, 0],
      [0, 1],
      [1, 0],
      [0, 2],
      [1, 1],
      [2, 0],
      [0, 3],
      [1, 2],
      [3, 0],
      [0, 4],
      [1, 3],
      [2, 2],
      [3, 1],
      [4, 0],
      [1, 4],
      [2, 3],
      [3, 2],
      [4, 1],
      [2, 4],
      [3, 3],
      [4, 2],
      [4, 3],
      [4, 4],
    ];

    const result = table.bfs(start);

    console.log(result);

    expect(result).toEqual(expected);
  });

  it("get Neighbours doesn't include out of bounds coordinates or obstacles at north east boundary", () => {
    table = new Table(config.table);

    const expected = [[4, 3]];

    const result = table.getNeighbours([4, 4]);

    expect(result).toEqual(expected);
  });

  it("get Neighbours doesn't include out of bounds coordinates or obstacles at south east boundary", () => {
    table = new Table(config.table);

    const expected = [
      [0, 1],
      [1, 0],
    ];

    const result = table.getNeighbours([0, 0]);

    expect(result).toEqual(expected);
  });
});

describe("Are coordinates at the location of an obstacle", () => {
  beforeEach(() => {
    table = new Table(config.table);
  });

  const obstacleFoundCases = [{ coordinates: { x: 2, y: 1 } }, { coordinates: { x: 3, y: 4 } }];

  test.each(obstacleFoundCases)("can haz $coordinates", ({ coordinates }) => {
    expect(table.canHazObstacles(coordinates)).toBe(true);
  });

  const obstacleNotFoundCases = [{ coordinates: { x: 3, y: 2 } }, { coordinates: { x: 3, y: 3 } }];

  test.each(obstacleNotFoundCases)("can not haz $coordinates", ({ coordinates }) => {
    expect(table.canHazObstacles(coordinates)).toBe(false);
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
