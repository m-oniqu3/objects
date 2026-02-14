export enum ModalTypes {
  CREATE_PROMPT_MODAL = "CREATE_PROMPT_MODAL",
  SELECT_PROMPT_MODAL = "SELECT_PROMPT_MODAL",
}

export type Modal =
  | ModalTypes.CREATE_PROMPT_MODAL
  | ModalTypes.SELECT_PROMPT_MODAL
  | null;
