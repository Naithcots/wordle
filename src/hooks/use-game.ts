import { useAnimate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import dictionary from "../assets/dictionary.json";
import wordsEasy from "../assets/words_easy.json";
import wordsHard from "../assets/words_hard.json";
import { useTheme } from "../components/theme-provider";
import generateWords from "../lib/functions/generate-words";
import insertLetterToWord from "../lib/functions/insert-letter-to-word";
import processWord from "../lib/functions/process-word";
import removeLetterFromWord from "../lib/functions/remove-letter-from-word";
import { getComputedStyleValue } from "../lib/utils";
import { LetterType, RoundStateType, WordType } from "../types";
import useLetterColors from "./use-letter-colors";

const useGame = () => {
  const wordAmount = 6;
  const lettersPerWord = 5;
  const resultsModalTimeout = 1000;

  const [roundState, setRoundState] = useState<RoundStateType>("init");
  const [newGameModalOpen, setNewGameModalOpen] = useState(true);
  const [resultsModalOpen, setResultsModalOpen] = useState(false);
  const [words, setWords] = useState<WordType[] | null>(null);

  const solution = useRef<string | null>(null);
  const pos = useRef({
    wordIdx: 0,
    letterIdx: 0,
  });

  const [scope, animate] = useAnimate();

  const { theme } = useTheme();
  const { setColors } = useLetterColors();

  const onEasyClick = () => {
    const randomWord =
      wordsEasy[Math.floor(Math.random() * (wordsEasy.length - 1))];
    solution.current = randomWord;
    setRoundState("playing");

    // console.log(solution.current);
  };

  const onHardClick = () => {
    const randomWord =
      wordsHard[Math.floor(Math.random() * (wordsHard.length - 1))];
    solution.current = randomWord;
    setRoundState("playing");

    // console.log(solution.current);
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
    setTimeout(() => {
      setColors({
        background: getComputedStyleValue("--letter-bg"),
        correct: getComputedStyleValue("--letter-correct"),
        incorrect: getComputedStyleValue("--letter-incorrect"),
        exists: getComputedStyleValue("--letter-exists"),
        selected: getComputedStyleValue("--letter-selected"),
      });
    });
  }, [theme]);

  useEffect(() => {
    const handleKeyUp = (ev: KeyboardEvent) => {
      const key = ev.key.toLowerCase();
      // console.log("handleKeyUp: ", words, key, pos.current);

      if (key === "enter") {
        if (words![pos.current.wordIdx].input.length !== lettersPerWord) return;

        // If word not in dictionary
        if (!dictionary.includes(words![pos.current.wordIdx].input)) {
          animate(
            `.word:nth-child(${pos.current.wordIdx + 1}) > .letter:nth-child(odd)`,
            { y: [8, -8, 5, -5, 0] },
            { duration: 0.3 },
          );
          animate(
            `.word:nth-child(${pos.current.wordIdx + 1}) > .letter:nth-child(even)`,
            { y: [-8, 8, -10, 10, 0] },
            { duration: 0.3 },
          );
          return;
        }

        const _words = [...words!];
        const _word = _words[pos.current.wordIdx];
        const _wordOutput: LetterType[] = _word.output.map((letterState) => ({
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

  return {
    newGameModalOpen,
    setNewGameModalOpen,
    resultsModalOpen,
    setResultsModalOpen,
    onEasyClick,
    onHardClick,
    onNewRound,
    roundState,
    solution,
    words,
    pos: { wordIdx: pos.current.wordIdx, letterIdx: pos.current.letterIdx },
    wordsScope: scope,
  };
};

export default useGame;
