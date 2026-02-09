import NewStoryBody from "./NewStoryBody";
import NewStoryTitle from "./NewStoryTitle";

function Editor() {
  return (
    <div className="mx-auto max-w-2xl flex flex-col gap-4">
      <NewStoryTitle />
      <NewStoryBody />
    </div>
  );
}

export default Editor;
