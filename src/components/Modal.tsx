import { type ReactNode } from "react";
import { useModal } from "../contexts/modal/useModal";
import { ModalTypes } from "../types/modal";
import Portal from "./Portal";
import CreatePrompt from "./prompt/CreatePrompt";
import SelectPrompt from "./prompt/SelectPrompt";

function Modal() {
  const {
    state: { currentModal },
    closeModal,
  } = useModal();

  if (!currentModal) return null;
  let ModalContent: ReactNode = null;

  (() => {
    switch (currentModal) {
      case ModalTypes.CREATE_PROMPT_MODAL:
        ModalContent = <CreatePrompt />;
        return;

      case ModalTypes.SELECT_PROMPT_MODAL:
        ModalContent = <SelectPrompt />;
        return;

      default:
        return null;
    }
  })();

  return (
    <Portal selector="#body" close={closeModal}>
      <div
        className="fixed p-4 w-full inset-0 z-40 flex items-center justify-center bg-black/50"
        onClick={closeModal}
      >
        <div onClick={closeModal} className="wrapper z-50">
          {ModalContent}
        </div>
      </div>
    </Portal>
  );
}

export default Modal;
