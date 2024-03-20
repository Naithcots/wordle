import { Variants, motion } from "framer-motion";
import { getComputedStyleValue } from "../lib/utils";
import { LetterType } from "../types";

type LetterProps = {
  letter: LetterType;
  letterIdx: number;
  selected: boolean;
};

const Letter = ({ letter, letterIdx, selected }: LetterProps) => {
  const letterVariants: Variants = {
    hidden: () => {
      const bgColorHiddenValue = getComputedStyleValue("--letter-bg");
      const bgColor = `rgb(${bgColorHiddenValue})`;
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
      const bgColorHiddenValue = getComputedStyleValue("--letter-bg");
      const bgColorCorrectValue = getComputedStyleValue("--letter-correct");
      const bgColorIncorrectValue = getComputedStyleValue("--letter-incorrect");
      const bgColorExistsValue = getComputedStyleValue("--letter-exists");

      const bgColorHidden = `rgb(${bgColorHiddenValue})`;
      const bgColorCorrect = `rgb(${bgColorCorrectValue})`;
      const bgColorIncorrect = `rgb(${bgColorIncorrectValue})`;
      const bgColorExists = `rgb(${bgColorExistsValue})`;

      let backgroundColor;
      switch (variant) {
        case "correct":
          backgroundColor = [
            bgColorHidden,
            bgColorHidden,
            bgColorHidden,
            bgColorCorrect,
          ];
          break;
        case "exists":
          backgroundColor = [
            bgColorHidden,
            bgColorHidden,
            bgColorHidden,
            bgColorExists,
          ];
          break;
        default:
          backgroundColor = [
            bgColorHidden,
            bgColorHidden,
            bgColorHidden,
            bgColorIncorrect,
          ];
          break;
      }

      return {
        rotateY: ["0deg", "-90deg", "-90deg", "0deg"],
        backgroundColor,
        transition: {
          delay: idx * 0.1,
        },
      };
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate={
        letter.state === "visible"
          ? "visible"
          : selected
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
      <span className={`text-4xl font-bold uppercase`}>{letter.key}</span>
    </motion.div>
  );
};

export default Letter;
