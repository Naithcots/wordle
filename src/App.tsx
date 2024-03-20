import NewGameModal from "./components/modals/new-game-modal";
import ResultsModal from "./components/modals/results-modal";
import Word from "./components/word";
import useGame from "./hooks/useGame";

const App = () => {
  const {
    words,
    solution,
    roundState,
    pos,
    newGameModalOpen,
    resultsModalOpen,
    onEasyClick,
    onHardClick,
    onNewRound,
    setNewGameModalOpen,
    setResultsModalOpen,
  } = useGame();

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

      <div className={`grid h-full place-items-center`}>
        <div className={`flex flex-col gap-2`}>
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
