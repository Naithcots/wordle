export type WordType = {
  input: string;
  output: LetterType[];
};

export type LetterType = {
  key: string;
  state: "hidden" | "visible";
  variant: "correct" | "incorrect" | "exists" | null;
};

export type RoundStateType =
  | "init"
  | "playing"
  | "resultsCorrect"
  | "resultsIncorrect";
