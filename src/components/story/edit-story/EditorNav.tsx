import { useState } from "react";
import { ChevronLeftIcon, HorizontalEllipsisIcon } from "../../../assets/icons";
import { useModal } from "../../../contexts/modal/useModal";
import { ModalTypes } from "../../../types/modal";
import Button from "../../Button";
import Logo from "../../Logo";

type Props = {
  saveDraft: () => Promise<void>;
};

function EditorNav(props: Props) {
  const { saveDraft } = props;

  const [isSavingDraft, setIsSavingDraft] = useState(false);

  const { openModal } = useModal();

  function handlePromptModal() {
    openModal(ModalTypes.SELECT_PROMPT_MODAL);
  }

  async function handleSaveDraft() {
    setIsSavingDraft(true);

    await saveDraft();
    setIsSavingDraft(false);
  }

  return (
    <nav className="h-14 ">
      <div className="wrapper h-full flex items-center justify-between ">
        <div className="flex items-center gap-4">
          <ChevronLeftIcon className="size-4.5" />
          <div className="hidden md:block">
            <Logo />
          </div>
          <div className="flex items-center gap-2">
            <p className="text-xs uppercase tracking-wide">Draft</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button>
            <HorizontalEllipsisIcon className="size-6" />
          </Button>

          <Button
            disabled={isSavingDraft}
            onClick={handleSaveDraft}
            className="hidden md:flex gap-1 text-xs uppercase tracking-wide"
          >
            <span className="">
              {isSavingDraft ? "saving..." : "save draft"}
            </span>
          </Button>

          <Button
            onClick={handlePromptModal}
            className="hidden md:flex gap-1 text-xs uppercase tracking-wide"
          >
            <span className="">Add Prompt</span>
          </Button>

          <Button className=" text-xs uppercase tracking-wide">Publish</Button>
          <div className="hidden bg-orange-700 rounded-full size-8" />
        </div>
      </div>
    </nav>
  );
}

export default EditorNav;
