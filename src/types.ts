export type Word = {
  input: string;
  output: Letter[];
};

export type Letter = {
  key: string;
  state: "hidden" | "visible";
  variant: "correct" | "incorrect" | "exists" | null;
};

export type RoundState =
  | "init"
  | "playing"
  | "resultsCorrect"
  | "resultsIncorrect";
