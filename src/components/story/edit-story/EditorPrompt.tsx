import { useModal } from "../../../contexts/modal/useModal";
import { usePrompt } from "../../../contexts/prompt/usePrompt";
import { ModalTypes } from "../../../types/modal";

function EditorPrompt() {
  const { prompt, clearPrompt } = usePrompt();
  const { openModal } = useModal();

  function handleEditPrompt() {
    openModal(ModalTypes.SELECT_PROMPT_MODAL);
  }

  if (!prompt) return null;

  const prompt_actions: Record<string, () => void> = {
    Change: handleEditPrompt,
    Remove: clearPrompt,
  };

  const rendered_prompt_actions = Object.keys(prompt_actions).map((key) => {
    return (
      <button
        key={key}
        className="text-xs text-zinc-500 tracking-wide uppercase cursor-pointer hover:text-black"
        onClick={prompt_actions[key]}
      >
        {key}
      </button>
    );
  });

  return (
    <div className="flex flex-col gap-2">
      <p className="uppercase text-sm tracking-wide leading-relaxed">
        {prompt.title}
      </p>
      <div className="flex gap-2 ">{rendered_prompt_actions}</div>
    </div>
  );
}

export default EditorPrompt;
