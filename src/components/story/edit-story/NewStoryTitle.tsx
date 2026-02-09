import { useEffect, useRef } from "react";

function NewStoryTitle() {
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div
        ref={titleRef}
        contentEditable="true"
        data-placeholder="Title"
        id="new-story-title"
        className="text-4xl leading-12 line wrap-break-word outline-none"
        suppressContentEditableWarning
      />

      <div
        contentEditable="true"
        data-placeholder="Subtitle"
        id="new-story-subtitle"
        className="text-2xl wrap-break-word outline-none"
        suppressContentEditableWarning
      />
    </div>
  );
}

export default NewStoryTitle;
