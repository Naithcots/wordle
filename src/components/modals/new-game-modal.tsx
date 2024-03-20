import { Dispatch, SetStateAction } from "react";
import Modal from "../ui/modal";

type NewGameModalProps = {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  onEasyClick: () => void;
  onHardClick: () => void;
};

const NewGameModal = ({
  open,
  onOpenChange,
  onEasyClick,
  onHardClick,
}: NewGameModalProps) => {
  const handleEasyClick = () => {
    onEasyClick();
    onOpenChange(false);
  };

  const handleHardClick = () => {
    onHardClick();
    onOpenChange(false);
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange} canClose={false}>
      <div>
        <p className="mb-1 text-2xl font-semibold uppercase">
          Start a new game
        </p>
        <p className="text-muted-foreground mb-3 max-w-96">
          Select word difficulty. You can always change this option when you
          create a new game.
        </p>
        <div className="flex gap-4">
          <button
            onClick={handleEasyClick}
            className="hover:bg-accent border-border min-w-20 rounded-md border px-3 py-2 text-center"
          >
            <p className="text-xl text-green-600">Easy</p>
          </button>
          <button
            onClick={handleHardClick}
            className="hover:bg-accent border-border min-w-20 rounded-md border px-3 py-2 text-center"
          >
            <p className="text-xl text-red-600">Hard</p>
          </button>
        </div>
      </div>
    </Modal>
  );
};
export default NewGameModal;
