import { WordType } from "../../types";

const removeLetterFromWord = (word: WordType): WordType => {
  const _word = { ...word };

  _word.input = _word.input.slice(0, -1);

  const currWordIdx = _word.input.length;
  _word.output[currWordIdx].key = "";

  return _word;
};

export default removeLetterFromWord;
