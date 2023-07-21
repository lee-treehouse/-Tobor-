import { TableConfig } from "../Parsers/Config";
import { Coordinates } from "./Coordinates";

export class Table {
    public constructor(private readonly config: TableConfig) {}

    areCoordinatesOutOfBounds = (coordinates: Coordinates) => {
        if (coordinates.x < 0 || coordinates.y < 0) return true;
        if (coordinates.x > this.config.size.width - 1) return true;
        if (coordinates.y > this.config.size.height - 1) return true;
        return false;
    };
}
