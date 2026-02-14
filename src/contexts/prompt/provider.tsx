import { useState, type ReactNode } from "react";
import { type PromptPreview } from "../../types/story";
import { PromptContext } from "./context";

type Props = {
  children: ReactNode;
};
function PromptContextProvider({ children }: Props) {
  const [prompt, setPrompt] = useState<PromptPreview | null>(null);

  function clearPrompt() {
    setPrompt(null);
  }
  const values = {
    prompt,
    setPrompt,
    clearPrompt,
  };

  return (
    <PromptContext.Provider value={values}>{children}</PromptContext.Provider>
  );
}

export default PromptContextProvider;
