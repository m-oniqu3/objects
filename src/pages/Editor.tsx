import { useState } from "react";
import { useLocation } from "react-router";
import EditorBody from "../components/story/edit-story/EditorBody";
import EditorNav from "../components/story/edit-story/EditorNav";
import EditorPrompt from "../components/story/edit-story/EditorPrompt";
import EditorTitle from "../components/story/edit-story/EditorTitle";
import { useAuthContext } from "../contexts/auth/useAuth";
import { usePromptContext } from "../contexts/prompt/usePrompt";
import saveStory from "../services/stories/save-story";
import type { StoryStatus } from "../types/story";

function createSnippet(html: string, maxLength = 300): string {
  const temp = document.createElement("div");
  temp.innerHTML = html;

  const text = html
    .replace(/<\/(p|div)>/gi, "$& ") // add space after closing p/div
    .replace(/<br\s*\/?>/gi, " ") // replace <br> with space
    .replace(/<[^>]+>/g, ""); // remove other tags

  return (
    text.slice(0, maxLength).trim() + (text.length > maxLength ? "..." : "")
  );
}

function Editor() {
  const { prompt } = usePromptContext();
  const { user } = useAuthContext();

  const promptID = prompt?.id ?? null;
  const userID = user?.id;

  //get story ID
  const { pathname } = useLocation();
  // ['s', id, 'edit']
  const [, storyID] = pathname.split("/").filter((el) => el !== "");

  type Key = keyof typeof headings;
  const [headings, setHeadings] = useState({
    title: "",
    subtitle: "",
  });

  const [storyBody, setStoryBody] = useState("");

  function handleTitleChange(key: Key, value: string) {
    setHeadings((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  }

  function handleStoryBodyChange(content: string) {
    setStoryBody(content);
  }

  async function handleSaveDraft() {
    if (!userID || !storyID) return;

    const snippet = createSnippet(storyBody);

    const story = {
      ...headings,
      snippet,
      body: storyBody,
      promptID,
      storyID,
      status: "draft" as StoryStatus,
    };

    const { data, error } = await saveStory(story);

    if (error) console.log(error);

    console.log(data);
    console.log("saved");
  }

  return (
    <div className="flex flex-col gap-12 pb-12">
      <EditorNav saveDraft={handleSaveDraft} />

      <div className="wrapper max-w-7xl ">
        <div className="w-full mx-auto max-w-2xl flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <EditorPrompt />
            <EditorTitle setHeading={handleTitleChange} />
          </div>

          <EditorBody setBody={handleStoryBodyChange} />
        </div>
      </div>
    </div>
  );
}

export default Editor;
