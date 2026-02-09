import NewStoryBody from "./NewStoryBody";
import NewStoryTitle from "./NewStoryTitle";

function Editor() {
  return (
    <div className="wrapper max-w-2xl flex flex-col gap-10">
      <NewStoryTitle />
      <NewStoryBody />
    </div>
  );
}

export default Editor;
