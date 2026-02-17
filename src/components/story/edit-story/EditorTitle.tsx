import { useEffect, type RefObject } from "react";

type Props = {
  titleRef: RefObject<HTMLDivElement | null>;
  subtitleRef: RefObject<HTMLDivElement | null>;
  checkHasChanged(): void;
  // setHeading: (key: "title" | "subtitle", value: string) => void;
};

function EditorTitle(props: Props) {
  const { titleRef, subtitleRef, checkHasChanged } = props;

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  // function updateTitle(key: "title" | "subtitle", value: string) {
  //   setHeading(key, value.trim() ?? "");
  // }

  return (
    <div className="flex flex-col gap-2">
      <div
        ref={titleRef}
        onInput={checkHasChanged}
        contentEditable="true"
        data-placeholder="Title"
        className="text-4xl leading-10 tracking-wide font-medium line wrap-break-word outline-none"
        suppressContentEditableWarning
      />

      <div
        ref={subtitleRef}
        id="new-story-subtitle"
        contentEditable="true"
        onInput={checkHasChanged}
        data-placeholder="Subtitle"
        className="text-xl wrap-break-word outline-none"
        suppressContentEditableWarning
      />
    </div>
  );
}

export default EditorTitle;
