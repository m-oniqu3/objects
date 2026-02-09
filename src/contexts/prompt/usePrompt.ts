import { useContext } from "react";
import { PromptContext } from "./context";

export function usePrompt() {
  const context = useContext(PromptContext);

  if (!context) {
    throw new Error("No prompt context found");
  }

  return context;
}
