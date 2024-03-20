import { LetterType, WordType } from "../../types";

const generateWords = (wordAmount: number, lettersPerWord: number) => {
  let words: WordType[] = [];

  for (let i = 0; i < wordAmount; i++) {
    const output: LetterType[] = [...Array(lettersPerWord)].map((_) => ({
      key: "",
      state: "hidden",
      variant: null,
    }));
    const word: WordType = { input: "", output };
    words.push(word);
  }

  return words;
};

export default generateWords;
