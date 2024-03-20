import { AnimatePresence, useAnimate, usePresence } from "framer-motion";
import { X } from "lucide-react";
import { Dispatch, SetStateAction, useEffect } from "react";

type ModalProps = {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  canClose?: boolean;
  children: React.ReactNode;
};

type ModalComponentProps = {
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  canClose: boolean;
  children: React.ReactNode;
};

const ModalComponent = ({
  onOpenChange,
  canClose,
  children,
}: ModalComponentProps) => {
  const [scope, animate] = useAnimate();
  const [isPresent, safeToRemove] = usePresence();

  const closeModal = () => {
    onOpenChange(false);
  };

  useEffect(() => {
    const startAnimation = async () => {
      animate(
        ".modal-bg",
        {
          opacity: [0, 1],
          backdropFilter: ["blur(0px)", "blur(3px)"],
        },
        {
          opacity: {
            duration: 0.25,
          },
          backdropFilter: {
            duration: 0.75,
          },
        },
      );

      animate(
        ".modal-window",
        {
          scale: [0, 1],
        },
        { duration: 0.25 },
      );
    };

    const exitAnimation = async () => {
      animate(
        ".modal-window",
        {
          scale: [1, 0],
        },
        { duration: 0.25 },
      );

      await animate(
        ".modal-bg",
        {
          opacity: [1, 0],
          backdropFilter: ["blur(3px)", "blur(0px)"],
        },
        {
          opacity: {
            duration: 0.25,
          },
          backdropFilter: {
            duration: 0.75,
          },
        },
      );

      safeToRemove!();
    };

    if (isPresent) startAnimation();
    else exitAnimation();
  }, [isPresent]);

  return (
    <div ref={scope} className="fixed inset-0 z-[999] grid place-items-center">
      <div
        onClick={canClose ? closeModal : () => {}}
        className="modal-bg | bg-background/75 absolute inset-0"
      />
      <div className="modal-window | bg-card text-card-foreground rounded-primary relative min-w-[50%] overflow-hidden shadow-sm">
        {canClose && (
          <button className="absolute right-3 top-3">
            <X onClick={closeModal} />
          </button>
        )}
        <div className="px-8 py-6">{children}</div>
      </div>
    </div>
  );
};

const Modal = ({
  open,
  onOpenChange,
  canClose = true,
  children,
}: ModalProps) => {
  return (
    <AnimatePresence>
      {open && (
        <ModalComponent
          onOpenChange={onOpenChange}
          canClose={canClose}
          children={children}
        />
      )}
    </AnimatePresence>
  );
};
export default Modal;
