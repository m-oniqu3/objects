import { useState } from "react";
import { useAuthContext } from "../../../contexts/auth/useAuth";
import { useModalContext } from "../../../contexts/modal/useModal";
import quoteStory from "../../../services/stories/quote-story";
import { formatDate } from "../../../utils/validation/format-date";
import Button from "../../Button";

function QuoteStory() {
  const {
    stopPropagation,
    closeModal,
    state: { currentModal },
  } = useModalContext();
  const { user } = useAuthContext();

  const isQuoteStoryModal = currentModal?.type === "quote_story";
  const story = isQuoteStoryModal ? currentModal.payload?.story : null;

  const [quote, setQuote] = useState("");

  async function handleSubmit() {
    if (!quote || !user || !story) return;

    closeModal();

    const { data, error } = await quoteStory({
      user_id: user.id,
      content: quote,
      story_id: story.id,
    });

    if (error) {
      console.log(error);
      return;
    }

    if (data) {
      console.log(data?.id);
    }
  }

  const rendered_original_story = (() => {
    if (!story) return;
    const {
      title,
      subtitle,
      snippet,
      updated_at,
      author: { fullname, avatar_url },
      prompt,
    } = story;

    const avatar =
      avatar_url ?? `https://ui-avatars.com/api/?name=${fullname}?rounded=true`;

    return (
      <article className="flex flex-col gap-4 p-4 rounded-2xl border border-neutral-200">
        <div className="flex items-center gap-4">
          <figure>
            <img
              src={avatar}
              alt={"Avatar" + fullname}
              className="object-cover size-8 rounded-full"
            />
          </figure>

          <p className="text-xs uppercase leading-8 tracking-wider flex items-center gap-2">
            <span className="font-medium">{fullname}</span>
            &bull;
            <span className="lowercase text-neutral-500">
              {formatDate(updated_at)}
            </span>
          </p>
        </div>

        {prompt && (
          <p className="text-sm capitalize leading-5 tracking-wider text-neutral-600">
            {prompt.title}
          </p>
        )}

        <div className="flex flex-col gap-1">
          <h1 className="text-lg font-medium">{title}</h1>

          {subtitle && (
            <p className="text-sm capitalize leading-8 tracking-wider text-neutral-600 ">
              {subtitle}
            </p>
          )}
        </div>

        <p className=" text-sm leading-8 tracking-wider text-neutral-800">
          {snippet}
        </p>

        <p className="text-sm pt-1 capitalize leading-4 tracking-wider text-neutral-600">
          {["Fiction", "Young Adult", "Romance"].join(", ")}.
        </p>
      </article>
    );
  })();

  return (
    <div className="flex items-center justify-center h-screen w-screen sm:p-8">
      <div
        className="bg-white w-full sm:max-w-xl flex flex-col sm:rounded-2xl relative h-full sm:h-fit sm:min-h-fit sm:max-h-[calc(100vh-4rem)] overflow-hidden"
        onClick={stopPropagation}
      >
        <header className="sticky top-0 left-0 w-full bg-white grid grid-cols-[100px_auto_100px] place-items-center border-b border-neutral-200 py-4 px-6 shrink-0">
          <button className="cursor-pointer mr-auto" onClick={closeModal}>
            Cancel
          </button>

          <h2 className="text-md font-medium mx-auto ">Quote Story</h2>

          <Button
            className="w-fit ml-auto  bg-neutral-800 text-white disabled:opacity-50"
            disabled={!quote.trim()}
            onClick={handleSubmit}
          >
            Post
          </Button>
        </header>

        <div className="flex flex-col gap-4 p-6 overflow-y-scroll no-scrollbar">
          <figure className="flex items-center gap-4">
            <img
              src="https://i.pinimg.com/736x/57/47/0e/57470e092368f03796bb0d34f2527478.jpg"
              alt={"Avatar"}
              className="object-cover size-9 rounded-full"
            />

            <figcaption className="text-xs uppercase tracking-wider font-medium">
              palexa arin
            </figcaption>
          </figure>

          <div
            contentEditable
            suppressContentEditableWarning
            data-placeholder="Share your thoughts..."
            onInput={(e) => setQuote(e.currentTarget.innerHTML)}
            className="text wrap-break-word outline-none "
          />

          <div>{rendered_original_story}</div>
        </div>
      </div>
    </div>
  );
}

export default QuoteStory;
