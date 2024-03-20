import { Dispatch, SetStateAction } from "react";
import { RoundStateType } from "../../types";
import Modal from "../ui/modal";

type ResultsModalProps = {
  open: boolean;
  state: RoundStateType;
  solution: string;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  onNewRound: () => void;
};

const ResultsModal = ({
  open,
  state,
  solution,
  onOpenChange,
  onNewRound,
}: ResultsModalProps) => {
  const handleNewRound = () => {
    onNewRound();
    onOpenChange(false);
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange} canClose={false}>
      <div>
        <p className="mb-1 text-2xl font-semibold uppercase">
          {state === "resultsCorrect" && "Congratulations!"}
          {state === "resultsIncorrect" && "That was close..."}
        </p>
        <p className="text-muted-foreground mb-4 max-w-96">
          {state === "resultsCorrect" && "You guessed the correct word!"}
          {state === "resultsIncorrect" && (
            <span>
              The correct solution is{" "}
              <span className="font-semibold">{solution}</span>.
            </span>
          )}
        </p>
        <div className="flex gap-4">
          <button
            onClick={handleNewRound}
            className="hover:bg-secondary border-border bg-accent mx-auto rounded-md border px-4 py-2 text-center"
          >
            <p className="text-xl">Start a new round!</p>
          </button>
        </div>
      </div>
    </Modal>
  );
};
export default ResultsModal;
