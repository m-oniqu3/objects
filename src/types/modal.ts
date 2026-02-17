import type { StoryRepostPreview } from "./story";

export type ModalType =
  | "create_prompt"
  | "select_prompt"
  | "repost_story_options"
  | "quote_story";

type ModalState<K extends ModalType, P = null> = {
  type: K;
  payload?: P;
};

type CreatePromptModal = ModalState<"create_prompt">;

type SelectPromptModal = ModalState<"select_prompt">;

type RepostStoryOptionsModal = ModalState<
  "repost_story_options",
  { story: StoryRepostPreview }
>;

type QuoteStoryModal = ModalState<"quote_story", { story: StoryRepostPreview }>;

export type Modal =
  | CreatePromptModal
  | SelectPromptModal
  | RepostStoryOptionsModal
  | QuoteStoryModal
  | null;
