import EditorBody from "./EditorBody";
import EditorPrompt from "./EditorPrompt";
import EditorTitle from "./EditorTitle";

function Editor() {
  return (
    <div className="mx-auto max-w-2xl flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <EditorPrompt />
        <EditorTitle />
      </div>
      <EditorBody />
    </div>
  );
}

export default Editor;
