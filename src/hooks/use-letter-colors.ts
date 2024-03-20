import { create } from "zustand";

type ColorsType = {
  background: string;
  correct: string;
  incorrect: string;
  exists: string;
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
};

const useLetterColors = create<LetterColorsState>((set) => ({
  colors: initialColorsState,
  setColors: (colors: ColorsType) => set({ colors }),
}));

export default useLetterColors;
