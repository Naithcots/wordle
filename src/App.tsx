import { Variants, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import wordsEasy from "./assets/words_easy.json";
import wordsHard from "./assets/words_hard.json";
import NewGameModal from "./components/modals/new-game-modal";
import ResultsModal from "./components/modals/results-modal";
import { Letter, RoundState, Word } from "./types";

const generateWords = (wordAmount: number, lettersPerWord: number) => {
  let words: Word[] = [];

  for (let i = 0; i < wordAmount; i++) {
    const output: Letter[] = [...Array(lettersPerWord)].map((_) => ({
      key: "",
      state: "hidden",
      variant: null,
    }));
    const word: Word = { input: "", output };
    words.push(word);
  }

  return words;
};

const removeLetterFromWord = (word: Word): Word => {
  // console.log("removeLetter ", word);

  const _word = { ...word };

  _word.input = _word.input.slice(0, -1);

  const currWordIdx = _word.input.length;
  _word.output[currWordIdx].key = "";

  // console.log(_word);
  return _word;
};

const insertLetterToWord = (key: string, word: Word): Word => {
  // console.log("insertLetter ", key, word);

  const _word = { ...word };

  _word.input += key;

  const currWordIdx = _word.input.length - 1;
  _word.output[currWordIdx].key = key;

  // console.log(_word);
  return _word;
};

const processWord = (word: Word, solution: string): Word => {
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

const App = () => {
  const theme: "light" | "dark" = "light";
  const wordAmount = 6;
  const lettersPerWord = 5;
  const resultsModalTimeout = 1000;

  const [roundState, setRoundState] = useState<RoundState>("init");
  const [newGameModalOpen, setNewGameModalOpen] = useState(true);
  const [resultsModalOpen, setResultsModalOpen] = useState(false);
  const [words, setWords] = useState<Word[] | null>(null);
  const solution = useRef<string | null>(null);
  const pos = useRef({
    wordIdx: 0,
    letterIdx: 0,
  });

  const onEasyClick = () => {
    const randomWord =
      wordsEasy[Math.floor(Math.random() * (wordsEasy.length - 1))];
    solution.current = randomWord;
    setRoundState("playing");

    console.log(solution.current);
  };

  const onHardClick = () => {
    const randomWord =
      wordsHard[Math.floor(Math.random() * (wordsHard.length - 1))];
    solution.current = randomWord;
    setRoundState("playing");

    console.log(solution.current);
  };

  const onNewRound = () => {
    pos.current = { letterIdx: 0, wordIdx: 0 };
    setWords(generateWords(wordAmount, lettersPerWord));
    setRoundState("init");
    setNewGameModalOpen(true);
  };

  useEffect(() => {
    const init = () => {
      setRoundState("init");
      setWords(generateWords(wordAmount, lettersPerWord));
      pos.current = { letterIdx: 0, wordIdx: 0 };
      setNewGameModalOpen(true);
    };

    init();
  }, []);

  useEffect(() => {
    const handleKeyUp = (ev: KeyboardEvent) => {
      const key = ev.key.toLowerCase();
      // console.log("handleKeyUp: ", words, key, pos.current);

      if (key === "enter") {
        if (words![pos.current.wordIdx].input.length !== lettersPerWord) return;

        const _words = [...words!];
        const _word = _words[pos.current.wordIdx];
        const _wordOutput: Letter[] = _word.output.map((letterState) => ({
          ...letterState,
          state: "visible",
        }));
        _word.output = _wordOutput;

        _words[pos.current.wordIdx] = _word;

        pos.current.wordIdx++;
        pos.current.letterIdx = 0;
        setWords(_words);

        // If word is corrent
        if (_word.input === solution.current) {
          setRoundState("resultsCorrect");
          setTimeout(() => {
            setResultsModalOpen(true);
          }, resultsModalTimeout);
          return;
        }

        // If last word is incorrect
        if (pos.current.wordIdx === wordAmount) {
          setRoundState("resultsIncorrect");
          setTimeout(() => {
            setResultsModalOpen(true);
          }, resultsModalTimeout);
          return;
        }
      }

      if (key === "backspace") {
        if (words![pos.current.wordIdx].input.length === 0) return;

        const _wordWithoutLetter = removeLetterFromWord(
          words![pos.current.wordIdx],
        );
        const _wordProcessed = processWord(
          _wordWithoutLetter,
          solution.current!,
        );

        const _words = [...words!];
        _words[pos.current.wordIdx] = _wordProcessed;

        pos.current.letterIdx--;
        setWords(_words);
      }

      if (new RegExp("^[a-z]$").test(key)) {
        if (words![pos.current.wordIdx].input.length === lettersPerWord) return;

        const _wordWithLetter = insertLetterToWord(
          key,
          words![pos.current.wordIdx],
        );
        const _wordProcessed = processWord(_wordWithLetter, solution.current!);

        const _words = [...words!];
        _words[pos.current.wordIdx] = _wordProcessed;

        pos.current.letterIdx++;
        setWords(_words);
      }
    };

    if (roundState !== "playing") return;
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [roundState, words]);

  const letterVariants: Variants = {
    hidden: () => {
      const bgColor = theme === "dark" ? "rgb(0, 0, 0)" : "rgb(255, 255, 255)";
      return {
        backgroundColor: bgColor,
        borderWidth: "2px",
        transition: { duration: 0.1 },
      };
    },
    selected: {
      borderWidth: "4px",
      transition: { duration: 0.1 },
    },
    typed: {
      scale: [1, 1.1, 1],
      transition: {
        scale: { duration: 0.125 },
      },
    },
    visible: ({ variant, idx }) => {
      const bgColorHidden =
        theme === "dark" ? "rgb(0, 0, 0)" : "rgb(255, 255, 255)";
      const bgColorCorrect =
        theme === "dark" ? "rgb(74, 222, 128)" : "rgb(74, 222, 128)";
      const bgColorIncorrect =
        theme === "dark" ? "rgb(156, 163, 175)" : "rgb(156, 163, 175)";
      const bgColorExists =
        theme === "dark" ? "rgb(250, 204, 21)" : "rgb(250, 204, 21)";

      return {
        rotateY: ["0deg", "-90deg", "-90deg", "0deg"],
        backgroundColor:
          variant === "correct"
            ? [bgColorHidden, bgColorHidden, bgColorCorrect]
            : variant === "exists"
              ? [bgColorHidden, bgColorHidden, bgColorExists]
              : [bgColorHidden, bgColorHidden, bgColorIncorrect],
        transition: {
          delay: idx * 0.1,
          duration: 0.5
        },
      };
    },
  };

  return (
    <div className="flex h-dvh flex-col">
      <NewGameModal
        open={newGameModalOpen}
        onOpenChange={setNewGameModalOpen}
        onEasyClick={onEasyClick}
        onHardClick={onHardClick}
      />

      <ResultsModal
        open={resultsModalOpen}
        onOpenChange={setResultsModalOpen}
        onNewRound={onNewRound}
        state={roundState}
        solution={solution.current!}
      />

      {words && (
        <div className={`grid h-full place-items-center`}>
          <div className={`flex flex-col gap-2`}>
            {words!.map((word, wordIdx) => (
              <motion.div key={wordIdx} className={`flex gap-2`}>
                {word.output.map((letter, letterIdx) => (
                  <motion.div
                    initial="hidden"
                    animate={
                      letter.state === "visible"
                        ? "visible"
                        : wordIdx === pos.current.wordIdx &&
                            letterIdx === pos.current.letterIdx
                          ? "selected"
                          : letter.key.length > 0
                            ? "typed"
                            : ""
                    }
                    variants={letterVariants}
                    custom={{
                      variant: letter.variant,
                      idx: letterIdx,
                    }}
                    key={letterIdx}
                    className={`grid h-16 w-16 place-items-center`}
                  >
                    <span className={`text-4xl font-bold uppercase`}>
                      {letter.key}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default App;
