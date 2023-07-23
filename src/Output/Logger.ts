export interface Logger {
  // TODO add history and reset() so I can check if something was outputted in tests instead of spying

  log: (value: string) => void;
}
