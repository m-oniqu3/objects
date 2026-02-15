import { useState } from "react";
import { useLocation } from "react-router";
import EditorBody from "../components/story/edit-story/EditorBody";
import EditorNav from "../components/story/edit-story/EditorNav";
import EditorPrompt from "../components/story/edit-story/EditorPrompt";
import EditorTitle from "../components/story/edit-story/EditorTitle";
import { useAuthContext } from "../contexts/auth/useAuth";
import { usePromptContext } from "../contexts/prompt/usePrompt";
import saveStory from "../services/stories/save-story";
import type { Story, StoryType } from "../types/story";
import { slugify } from "../utils/slug";

function createSnippet(html: string, maxLength = 400): string {
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

  //get story ID -  // ['s', id, 'edit']
  const { pathname } = useLocation();
  const [, storyID] = pathname.split("/").filter((el) => el !== "");

  type Key = keyof typeof headings;
  const [headings, setHeadings] = useState({ title: "", subtitle: "" });
  const [storyBody, setStoryBody] = useState("");

  function handleTitleChange(key: Key, value: string) {
    setHeadings((prev) => {
      return { ...prev, [key]: value };
    });
  }

  function handleStoryBodyChange(content: string) {
    setStoryBody(content);
  }

  // save story as draft or publish it
  async function handleSaveStory(
    type: StoryType,
  ): Promise<{ id: string; slug: string } | null | undefined> {
    if (!userID || !storyID) return;

    // For publishing, require title and body
    if (type === "publish" && (!headings.title || !storyBody)) {
      console.error("Cannot publish: title and body are required.");
      return;
    }

    const snippet = storyBody ? createSnippet(storyBody) : "";
    const slug = headings.title ? slugify(headings.title) : "";

    const story: Story = {
      id: storyID,
      title: headings.title || "",
      subtitle: headings.subtitle || "",
      slug,
      snippet,
      body: storyBody || "",
      prompt_id: promptID,
      status: type === "publish" ? "published" : "draft",
      ...(type === "publish" && { published_at: new Date().toISOString() }),
    };

    const { data, error } = await saveStory({ story });

    if (error) throw error;

    return data;
  }

  return (
    <div className="flex flex-col gap-12 pb-12">
      <EditorNav saveStory={handleSaveStory} />

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
