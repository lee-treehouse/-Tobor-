import { ChangeDirectionCommand } from "../../Commands/ChangeDirection";
import { getCommand } from "../../Commands/CommandFactory";
import { ExitCommand } from "../../Commands/Exit";
import { MoveCommand } from "../../Commands/Move";
import { PlaceCommand } from "../../Commands/Place";
import { ReportCommand } from "../../Commands/Report";
import { Table } from "../../Common/Table";
import { FORMATTED_COMMAND_LIST } from "../../UX/messages";
import { getDefaultTestConfig } from "../TestFiles/Config/DefaultTestConfig";

const DEFAULT_MAX_COORDINATES = new Table(getDefaultTestConfig().table).getMaxCoordinates();

describe("Command Factory", () => {
  const validCases = [
    { input: { command: "LEFT", args: [] }, classType: ChangeDirectionCommand },
    { input: { command: "MOVE", args: [] }, classType: MoveCommand },
    { input: { command: "PLACE", args: ["1", "2", "NORTH"] }, classType: PlaceCommand },
    { input: { command: "REPORT", args: [] }, classType: ReportCommand },
    { input: { command: "RIGHT", args: [] }, classType: ChangeDirectionCommand },
    { input: { command: "EXIT", args: [] }, classType: ExitCommand },
  ];

  test.each(validCases)(
    "Should return correct type of object when given command $input.command with valid arguments",
    ({ input, classType }) => {
      const command = getCommand(input, DEFAULT_MAX_COORDINATES);
      expect(command).toBeInstanceOf(classType);
    }
  );

  it("Should throw specific error message on unrecognized command", () => {
    const input = { command: "DANCE", args: [] };
    const factory = () => getCommand(input, DEFAULT_MAX_COORDINATES);
    expect(factory).toThrow(
      `DANCE could not be parsed as a command. Value should be one of ${FORMATTED_COMMAND_LIST}.`
    );
  });
});
