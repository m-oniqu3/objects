type Props = {
  setBody: (content: string) => void;
};

function EditorBody(props: Props) {
  const { setBody } = props;

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault();

    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
  }

  function handleBodyChange(value: string) {
    setBody(value);
  }

  return (
    <div
      contentEditable
      onPaste={handlePaste}
      onInput={(e) => handleBodyChange(e.currentTarget.innerHTML)}
      data-placeholder="Write something interesting..."
      className="text-lg leading-relaxed outline-none"
      suppressContentEditableWarning
    />
  );
}

export default EditorBody;
