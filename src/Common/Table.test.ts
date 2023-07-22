import { getDefaultConfig } from "../Config/Config";
import { Table } from "./Table";

const config = getDefaultConfig();
let table: Table;

describe("Are coordinates out of bounds", () => {
    beforeEach(() => {
        table = new Table(config.table);
    });

    const validCases = [{ coordinates: { x: 4, y: 1 } }, { coordinates: { x: 1, y: 4 } }];

    test.each(validCases)(
        "Coordinates at far edge of table's size are not out of bounds - $coordinates",
        ({ coordinates }) => {
            expect(table.areCoordinatesOutOfBounds(coordinates)).toBe(false);
        }
    );

    const invalidCases = [{ coordinates: { x: 5, y: 1 } }, { coordinates: { x: 1, y: 5 } }];

    test.each(invalidCases)(
        "Coordinates just past far edge of table's size are not out of bounds - $coordinates",
        ({ coordinates }) => {
            expect(table.areCoordinatesOutOfBounds(coordinates)).toBe(true);
        }
    );
});
