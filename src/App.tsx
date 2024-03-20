import NewGameModal from "./components/modals/new-game-modal";
import ResultsModal from "./components/modals/results-modal";
import ThemeToggle from "./components/theme-toggle";
import Word from "./components/word";
import useGame from "./hooks/use-game";

const App = () => {
  const {
    words,
    solution,
    roundState,
    pos,
    newGameModalOpen,
    resultsModalOpen,
    wordsScope,
    onEasyClick,
    onHardClick,
    onNewRound,
    setNewGameModalOpen,
    setResultsModalOpen,
  } = useGame();

  return (
    <div className="bg-background text-primary flex h-dvh flex-col">
      <header>
        <div className="container flex items-center justify-between py-2 font-semibold">
          <h1 className="text-lg">Yet another wordle</h1>
          <ThemeToggle />
        </div>
      </header>

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

      <div className={`grid h-full place-items-center`}>
        <div ref={wordsScope} className={`flex flex-col gap-2`}>
          {words &&
            words.map((word, wordIdx) => (
              <Word
                key={wordIdx}
                word={word}
                posLetterIdx={pos.letterIdx}
                selected={wordIdx === pos.wordIdx}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
export default App;
