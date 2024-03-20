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
        <p className="mb-3 max-w-96 opacity-75">
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
            className="min-w-20 rounded-md border px-3 py-2 text-center hover:bg-gray-100"
          >
            <p className="text-xl text-green-600">Start a new round!</p>
          </button>
        </div>
      </div>
    </Modal>
  );
};
export default ResultsModal;
