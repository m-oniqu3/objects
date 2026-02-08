import type { Modal } from "../../types/modal";
import { type ModalActions, ModalActionTypes } from "./actions";

export type State = {
  currentModal: Modal;
};

export const initialState: State = {
  currentModal: null,
};

export function modalReducer(state: State, action: ModalActions) {
  switch (action.type) {
    case ModalActionTypes.OPEN_MODAL:
      return {
        ...state,
        currentModal: action.payload,
      };
    case ModalActionTypes.CLOSE_MODAL:
      return {
        ...state,
        currentModal: null,
      };
    default:
      return state;
  }
}
