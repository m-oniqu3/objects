import { createContext, type Dispatch } from "react";
import type { Modal } from "../../types/modal";
import type { ModalActions } from "./actions";
import type { State } from "./reducer";

type ModalContextType = {
  state: State;
  dispatch: Dispatch<ModalActions>;
  openModal(modal: Modal): void;
  closeModal: () => void;
  stopPropagation(e: React.MouseEvent<HTMLElement, MouseEvent>): void;
};

export const ModalContext = createContext<ModalContextType | null>(null);

export default ModalContext;
