import { WordType } from "../../types";

const insertLetterToWord = (key: string, word: WordType): WordType => {
  const _word = { ...word };

  _word.input += key;

  const currWordIdx = _word.input.length - 1;
  _word.output[currWordIdx].key = key;

  return _word;
};

export default insertLetterToWord;
