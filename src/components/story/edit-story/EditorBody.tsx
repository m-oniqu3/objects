function EditorBody() {
  return (
    <div
      contentEditable
      data-placeholder="Write something interesting..."
      className="text-xl leading-relaxed outline-none"
    />
  );
}

export default EditorBody;
