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
    console.log("reposting");
  }

  function handleQuoteStory() {
    if (!story) return;

    console.log(story);

    openModal({ type: "quote_story", payload: { story } });
  }

  const repost_options = [
    { title: "repost", handler: handleRepostStory },
    { title: "quote", handler: handleQuoteStory },
  ];

  const rendered_repost_options = repost_options.map((opt) => {
    return (
      <button
        key={opt.title}
        onClick={opt.handler}
        className="h-12 bg-neutral-100"
      >
        {opt.title}
      </button>
    );
  });

  return (
    <div className="size-full grid place-items-center">
      <div
        className="wrapper flex flex-col  p-4 rounded-2xl bg-white"
        onClick={stopPropagation}
      >
        {rendered_repost_options}
      </div>
    </div>
  );
}

export default RepostStoryOptions;
