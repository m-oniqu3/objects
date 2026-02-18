import { useRef, useState } from "react";

import createStoryComment from "../../../services/stories/comments/create-story-comment";
import Button from "../../Button";

type Props = {
  storyID: number;
  onCommentCreated: () => Promise<void>;
};

function CreateStoryComment(props: Props) {
  const { storyID, onCommentCreated } = props;

  const commentRef = useRef<HTMLDivElement | null>(null);
  const [isSavingComment, setIsSavingComment] = useState(false);
  const [canShowButtons, setCanShowButtons] = useState(false);

  function clearComment() {
    if (commentRef.current) {
      commentRef.current.textContent = ""; // ← Empty string, not " "
      setCanShowButtons(false);
    }
  }

  function checkCommentState() {
    const hasContent = !!commentRef.current?.textContent?.trim();
    setCanShowButtons(hasContent);
  }

  async function handleSubmit() {
    try {
      setIsSavingComment(true);
      const content = commentRef.current?.innerHTML?.trim();

      if (!storyID || !content) return;

      const { error } = await createStoryComment({
        story_id: storyID,
        content,
      });

      if (error) throw error;

      clearComment();

      onCommentCreated();
    } catch (error) {
      console.log(error);
    } finally {
      setIsSavingComment(false);
    }
  }

  return (
    <div className=" flex flex-col gap-8">
      <figure className="flex items-center gap-4">
        <img
          src="https://i.pinimg.com/736x/57/47/0e/57470e092368f03796bb0d34f2527478.jpg"
          alt={"Avatar"}
          className="object-cover size-8 rounded-full"
        />

        <figcaption>
          <p className="text-xs uppercase tracking-wider font-medium">
            palexa arin
          </p>
        </figcaption>
      </figure>

      <div className="w-full flex flex-col gap-4">
        <div
          ref={commentRef}
          contentEditable
          suppressContentEditableWarning
          onInput={checkCommentState}
          data-placeholder="Leave a comment..."
          className={`py-4 wrap-break-word border-y border-neutral-200 text focus:outline-none `}
        />

        <div className={`gap-4 self-end ${canShowButtons ? "flex" : "hidden"}`}>
          <Button onClick={clearComment}>Cancel</Button>

          <Button
            disabled={isSavingComment}
            className="bg-blue-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSubmit}
          >
            {isSavingComment ? "Saving..." : "Comment"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreateStoryComment;
