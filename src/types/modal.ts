import type { StoryRepostPreview } from "./story";

export type ModalType =
  | "create_prompt"
  | "select_prompt"
  | "repost_story_options"
  | "repost_story";

type ModalState<K extends ModalType, P = null> = {
  type: K;
  payload?: P;
};

type RepostModal = ModalState<
  "repost_story",
  {
    story: StoryRepostPreview;
  }
>;

export type Modal = ModalType | RepostModal | null;
