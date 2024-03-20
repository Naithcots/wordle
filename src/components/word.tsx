import { WordType } from "../types";
import Letter from "./letter";

type WordProps = {
  word: WordType;
  selected: boolean;
  posLetterIdx: number;
};

const Word = ({ word, selected, posLetterIdx }: WordProps) => {
  return (
    <div className={`word | flex gap-2`}>
      {word.output.map((letter, letterIdx) => (
        <Letter
          key={letterIdx}
          letter={letter}
          letterIdx={letterIdx}
          selected={selected && letterIdx === posLetterIdx}
        />
      ))}
    </div>
  );
};
export default Word;
