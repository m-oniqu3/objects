import { QuoteIcon, RepostIcon } from "../../../assets/icons";
import { useModalContext } from "../../../contexts/modal/useModal";

function RepostStoryOptions() {
  const {
    openModal,
    stopPropagation,
    state: { currentModal },
  } = useModalContext();
  console.log(currentModal);

  const isRepostModal = currentModal?.type === "repost_story_options";
  const story = isRepostModal ? currentModal.payload?.story : null;

  function handleRepostStory() {
    if (!story) return;

    console.log(story);
    console.log("reposting");
  }

  function handleQuoteStory() {
    if (!story) return;

    openModal({ type: "quote_story", payload: { story } });
  }

  const repost_options = [
    { title: "repost", handler: handleRepostStory, icon: RepostIcon },
    { title: "quote", handler: handleQuoteStory, icon: QuoteIcon },
  ];

  const rendered_repost_options = repost_options.map((opt) => {
    const Icon = opt.icon;

    return (
      <button
        key={opt.title}
        onClick={opt.handler}
        className={`h-14 px-4 bg-neutral-100 capitalize font-medium flex items-center justify-between cursor-pointer ${opt.title === "repost" ? "rounded-t-xl border-b border-neutral-200" : "rounded-b-xl"}`}
      >
        {opt.title}
        <span>
          <Icon className="size-6" />
        </span>
      </button>
    );
  });

  return (
    <div className="size-full flex items-end pb-4">
      <div
        className="wrapper flex flex-col p-4 rounded-2xl bg-white"
        onClick={stopPropagation}
      >
        {rendered_repost_options}
      </div>
    </div>
  );
}

export default RepostStoryOptions;
