import { type ReactNode } from "react";
import { useModalContext } from "../contexts/modal/useModal";
import Portal from "./Portal";
import CreatePrompt from "./prompt/CreatePrompt";
import SelectPrompt from "./prompt/SelectPrompt";
import RepostStory from "./story/repost-story/QuoteStory";
import RepostStoryOptions from "./story/repost-story/RepostStoryOptions";

function Modal() {
  const {
    state: { currentModal },
    closeModal,
  } = useModalContext();

  if (!currentModal) return null;
  let ModalContent: ReactNode = null;

  (() => {
    switch (currentModal.type) {
      case "create_prompt":
        ModalContent = <CreatePrompt />;
        return;

      case "select_prompt":
        ModalContent = <SelectPrompt />;
        return;

      case "repost_story_options":
        ModalContent = <RepostStoryOptions />;
        return;

      case "quote_story":
        ModalContent = <RepostStory />;
        return;

      default:
        return null;
    }
  })();

  return (
    <Portal selector="#body" close={closeModal}>
      <div
        className="fixed  w-full inset-0 z-40  bg-black/50 md:flex md:justify-center md:items-center"
        onClick={closeModal}
      >
        {/* <div onClick={closeModal} className=" w-full z-50"> */}
        {ModalContent}
      </div>
    </Portal>
  );
}

export default Modal;
