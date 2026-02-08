import type { Modal } from "../../types/modal";

export enum ModalActionTypes {
  OPEN_MODAL = "OPEN_MODAL",
  CLOSE_MODAL = "CLOSE_MODAL",
}

export type OpenModalAction = {
  type: ModalActionTypes.OPEN_MODAL;
  payload: Modal;
};

export type CloseModalAction = {
  type: ModalActionTypes.CLOSE_MODAL;
};

export type ModalActions = OpenModalAction | CloseModalAction;
