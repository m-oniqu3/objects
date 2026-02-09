import { createContext, type Dispatch, type SetStateAction } from "react";
import type { PromptPreview } from "../../types/story";

type PromptContext = {
  prompt: PromptPreview | null;
  setPrompt: Dispatch<SetStateAction<PromptPreview | null>>;
  clearPrompt: () => void;
};

export const PromptContext = createContext<PromptContext | null>(null);
