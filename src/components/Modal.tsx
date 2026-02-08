import { type ReactNode } from "react";
import { useModal } from "../contexts/modal/useModal";
import { ModalTypes } from "../types/modal";
import Portal from "./Portal";

function Modal() {
  const {
    state: { currentModal },
    closeModal,
    stopPropagation,
  } = useModal();

  if (!currentModal) return null;

  let ModalContent: ReactNode = null;

  switch (currentModal) {
    case ModalTypes.CREATE_PROMPT_MODAL:
      ModalContent = <p>hey</p>;
      break;

    default:
      return null;
  }

  return (
    <Portal selector="body" close={closeModal}>
      <div
        className="fixed p-4 w-full inset-0 z-50 flex items-center justify-center bg-black/50"
        onClick={closeModal}
      >
        <div onClick={stopPropagation}>{ModalContent}</div>
      </div>
    </Portal>
  );
}

export default Modal;
