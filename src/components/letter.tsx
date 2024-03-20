import { Variants, motion } from "framer-motion";
import useLetterColors from "../hooks/use-letter-colors";
import { LetterType } from "../types";
import { useTheme } from "./theme-provider";

type LetterProps = {
  letter: LetterType;
  letterIdx: number;
  selected: boolean;
};

const Letter = ({ letter, letterIdx, selected }: LetterProps) => {
  const { colors } = useLetterColors();
  const { theme } = useTheme();

  const letterVariants: Variants = {
    hidden: () => {
      const bgColor = `rgb(${colors.background})`;
      return {
        backgroundColor: bgColor,
        borderWidth: "2px",
        transition: { duration: 0.1 },
      };
    },
    selected: {
      borderWidth: "4px",
      borderColor: `rgb(${colors.selected})`,
      transition: { duration: 0.1 },
    },
    typed: {
      scale: [1, 1.1, 1],
      transition: {
        scale: { duration: 0.125 },
      },
    },
    visible: ({ variant, idx }) => {
      const bgColorHidden = `rgb(${colors.background})`;
      const bgColorCorrect = `rgb(${colors.correct})`;
      const bgColorIncorrect = `rgb(${colors.incorrect})`;
      const bgColorExists = `rgb(${colors.exists})`;

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
      key={theme + colors.background}
      variants={letterVariants}
      custom={{
        variant: letter.variant,
        idx: letterIdx,
      }}
      className={`grid h-16 w-16 place-items-center border-gray-200 dark:border-gray-700`}
    >
      <span className={`text-foreground text-4xl font-bold uppercase`}>
        {letter.key}
      </span>
    </motion.div>
  );
};

export default Letter;
