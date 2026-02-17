import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeftIcon, HorizontalEllipsisIcon } from "../../../assets/icons";
import { useModalContext } from "../../../contexts/modal/useModal";
import type { DraftStoryType } from "../../../types/story";
import Button from "../../Button";
import Logo from "../../Logo";

type Props = {
  hasDraftContentChanged: boolean;
  draft: {
    isDraftPublishable: boolean;
    type: DraftStoryType | null;
  };
  saveDraft: () => Promise<void>;
  saveStory: () => Promise<
    | {
        id: number;
        slug: string;
      }
    | null
    | undefined
  >;
};

function EditorNav(props: Props) {
  const { saveStory, saveDraft, draft, hasDraftContentChanged } = props;

  const [isSavingContent, setIsSavingContent] = useState<DraftStoryType | null>(
    null,
  );
  const { openModal } = useModalContext();
  const navigate = useNavigate();

  function handlePromptModal() {
    openModal({ type: "select_prompt" });
  }

  async function handleSaveStory() {
    try {
      setIsSavingContent("story");

      const story = await saveStory();
      if (story) {
        navigate(`/s/${story.slug}-${story.id}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSavingContent(null);
    }
  }

  async function handleSaveDraft() {
    try {
      setIsSavingContent("draft");
      await saveDraft();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSavingContent(null);
    }
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
            disabled={!!isSavingContent || !hasDraftContentChanged}
            onClick={handleSaveDraft}
            className="hidden md:flex gap-1 text-xs uppercase tracking-wide disabled:opacity-50"
          >
            <span className="">
              {isSavingContent === "draft" ? "saving..." : "save draft"}
            </span>
          </Button>

          <Button
            onClick={handlePromptModal}
            className="hidden md:flex gap-1 text-xs uppercase tracking-wide"
          >
            <span className="">Add Prompt</span>
          </Button>

          <Button
            disabled={!!isSavingContent || !hasDraftContentChanged}
            onClick={handleSaveStory}
            className=" text-xs uppercase tracking-wide disabled:opacity-50"
          >
            {isSavingContent === "story"
              ? "saving..."
              : draft.type === "story"
                ? "save and publish"
                : "publish"}
          </Button>
          <div className="hidden bg-orange-700 rounded-full size-8" />
        </div>
      </div>
    </nav>
  );
}

export default EditorNav;
