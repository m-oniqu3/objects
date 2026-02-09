import Editor from "../components/story/edit-story/Editor";
import EditStoryNav from "../components/story/edit-story/EditStoryNav";

function EditStory() {
  return (
    <div className="flex flex-col gap-12">
      <EditStoryNav />

      <div className="wrapper max-w-7xl ">
        <div className="w-full">
          <Editor />
        </div>
      </div>
    </div>
  );
}

export default EditStory;
