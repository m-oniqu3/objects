import type { RefObject } from "react";
type Props = {
  bodyRef: RefObject<HTMLDivElement | null>;
  checkHasChanged(): void;
};

function EditorBody(props: Props) {
  const { bodyRef, checkHasChanged } = props;

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault();

    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
  }

  // function handleBodyChange(value: string) {
  //   setBody(value);
  // }

  return (
    <div
      ref={bodyRef}
      contentEditable
      onPaste={handlePaste}
      onInput={checkHasChanged}
      data-placeholder="Write something interesting..."
      className="text-lg leading-relaxed outline-none"
      suppressContentEditableWarning
    />
  );
}

export default EditorBody;
