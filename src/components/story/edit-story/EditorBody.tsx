function EditorBody() {
  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault();

    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
  }

  return (
    <div
      contentEditable
      onPaste={handlePaste}
      data-placeholder="Write something interesting..."
      className="text-lg leading-relaxed outline-none"
    />
  );
}

export default EditorBody;
