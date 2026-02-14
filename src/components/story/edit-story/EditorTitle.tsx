import { useEffect, useRef } from "react";

type Props = {
  setHeading: (key: "title" | "subtitle", value: string) => void;
};

function EditorTitle(props: Props) {
  const { setHeading } = props;
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  function updateTitle(key: "title" | "subtitle", value: string) {
    setHeading(key, value.trim() ?? "");
  }

  return (
    <div className="flex flex-col gap-2">
      <div
        ref={titleRef}
        onInput={(e) => updateTitle("title", e.currentTarget.textContent)}
        contentEditable="true"
        data-placeholder="Title"
        id="new-story-title"
        className="text-4xl leading-10 tracking-wide font-medium line wrap-break-word outline-none"
        suppressContentEditableWarning
      />

      <div
        id="new-story-subtitle"
        contentEditable="true"
        onInput={(e) => updateTitle("subtitle", e.currentTarget.textContent)}
        data-placeholder="Subtitle"
        className="text-xl wrap-break-word outline-none"
        suppressContentEditableWarning
      />
    </div>
  );
}

export default EditorTitle;
