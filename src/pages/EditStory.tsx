import Editor from "../components/story/edit-story/Editor";
import EditStoryNav from "../components/story/edit-story/EditStoryNav";

function EditStory() {
  return (
    <div className="flex flex-col gap-12">
      <EditStoryNav />

      <Editor />
    </div>
  );
}

export default EditStory;
