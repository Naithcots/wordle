import { WordType } from "../../types";

const processWord = (word: WordType, solution: string): WordType => {
  const _word = { ...word };
  const solutionMap = new Map();
  solution.split("").forEach((letter) => {
    solutionMap.set(letter, solutionMap.get(letter) + 1 || 1);
  });

  // Check for green letters (correct)
  _word.output.forEach((letterState, letterIdx) => {
    if (!!letterState.key.length && letterState.key === solution[letterIdx]) {
      _word.output[letterIdx].variant = "correct";
      solutionMap.set(letterState.key, solutionMap.get(letterState.key) - 1);
    }
  });

  // Check for yellow and incorrect letters
  _word.output.forEach((letterState) => {
    if (!letterState.key.length || letterState.variant === "correct") return;
    if (solutionMap.get(letterState.key) > 0) {
      letterState.variant = "exists";
      solutionMap.set(letterState.key, solutionMap.get(letterState.key) - 1);
    } else {
      letterState.variant = "incorrect";
    }
  });

  return _word;
};

export default processWord;
