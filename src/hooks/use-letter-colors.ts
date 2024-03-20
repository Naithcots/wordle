import { create } from "zustand";

type ColorsType = {
  background: string;
  correct: string;
  incorrect: string;
  exists: string;
  selected: string;
};

type LetterColorsState = {
  colors: ColorsType;
  setColors: (colors: ColorsType) => void;
};

const initialColorsState: ColorsType = {
  background: "",
  correct: "",
  incorrect: "",
  exists: "",
  selected: "",
};

const useLetterColors = create<LetterColorsState>((set) => ({
  colors: initialColorsState,
  setColors: (colors: ColorsType) => set({ colors }),
}));

export default useLetterColors;
