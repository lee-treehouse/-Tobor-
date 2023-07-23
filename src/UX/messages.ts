import { commandList } from "../Commands/CommandList";

export const TOBOR_WELCOME = "Hi, I'm Tobor. I can help you move an imaginary robot around an imaginary table.\n";

export const PLACE_HELP_TEXT = `PLACE command takes three arguments (X coordinate, Y coordinate, Direction) eg 'PLACE 1,2,NORTH'`;

export const TOBOR_HELP_TEXT = `Permitted commands are ${commandList.join(
  ", "
)}. \n${PLACE_HELP_TEXT}\nAll commands except PLACE are ignored until the robot is placed on the table.\n`;

export const TOBOR_COMMAND_PROMPT = "Please enter a command or type 'EXIT' to exit the application.";

export const TOBOR_ERROR_PREFIX = "Gosh, there's been an error. Here is what I know about it - I hope this helps!\n";
