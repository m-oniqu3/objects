import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeftIcon, HorizontalEllipsisIcon } from "../../../assets/icons";
import { useModalContext } from "../../../contexts/modal/useModal";
import type { StoryType } from "../../../types/story";
import Button from "../../Button";
import Logo from "../../Logo";

type Props = {
  saveStory: (
    type: StoryType,
  ) => Promise<{ id: string; slug: string } | null | undefined>;
};

function EditorNav(props: Props) {
  const { saveStory } = props;

  const [isSavingStory, setIsSavingStory] = useState<StoryType | null>(null);
  const { openModal } = useModalContext();
  const navigate = useNavigate();

  function handlePromptModal() {
    openModal({ type: "select_prompt" });
  }

  async function handleSaveStory(type: StoryType) {
    try {
      setIsSavingStory(type);

      const story = await saveStory(type);

      if (story) {
        console.log(story.id);
        console.log(type === "draft" ? "draft saved!" : "story published");

        // todo: navigate to the new story
        navigate(`/s/${story.slug}/${story.id}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSavingStory(null);
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
            disabled={!!isSavingStory}
            onClick={() => handleSaveStory("draft")}
            className="hidden md:flex gap-1 text-xs uppercase tracking-wide"
          >
            <span className="">
              {isSavingStory === "draft" ? "saving..." : "save draft"}
            </span>
          </Button>

          <Button
            onClick={handlePromptModal}
            className="hidden md:flex gap-1 text-xs uppercase tracking-wide"
          >
            <span className="">Add Prompt</span>
          </Button>

          <Button
            disabled={!!isSavingStory}
            onClick={() => handleSaveStory("publish")}
            className=" text-xs uppercase tracking-wide"
          >
            {isSavingStory === "publish" ? "saving..." : "publish"}
          </Button>
          <div className="hidden bg-orange-700 rounded-full size-8" />
        </div>
      </div>
    </nav>
  );
}

export default EditorNav;
