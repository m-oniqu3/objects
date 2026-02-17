import { startTransition, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import useSWR from "swr";
import { LoadingIcon } from "../assets/icons";
import EditorBody from "../components/story/edit-story/EditorBody";
import EditorNav from "../components/story/edit-story/EditorNav";
import EditorPrompt from "../components/story/edit-story/EditorPrompt";
import EditorTitle from "../components/story/edit-story/EditorTitle";
import { useAuthContext } from "../contexts/auth/useAuth";
import { usePromptContext } from "../contexts/prompt/usePrompt";
import { getDraft } from "../services/drafts/get-draft";
import saveDraft from "../services/drafts/save-draft";
import saveStory from "../services/stories/save-story";
import type { DraftSubmission, StorySubmission } from "../types/story";

async function getStoryFetcher(story_id: number) {
  if (!story_id) return null;

  const { data, error } = await getDraft({ story_id });
  if (error) throw error;

  return data;
}

function Editor() {
  const { prompt, setPrompt } = usePromptContext();
  const { user } = useAuthContext();

  const prompt_id = prompt?.id ?? null;
  const userID = user?.id;

  //get story ID -  // ['s', id, 'edit']
  const { pathname } = useLocation();
  const [, story_id] = pathname.split("/").filter((el) => el !== "");

  // function to get the draft story
  const { data, error, isLoading } = useSWR("get-draft" + story_id, () =>
    getStoryFetcher(+story_id),
  );

  // const [content, setContent] = useState({ title: "", subtitle: "", body: "" });

  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const [hasChanged, setHasChanged] = useState(false);
  const [isDraftPublishable, setIsDraftPublishable] = useState(false);
  const originalContent = useRef({ title: "", subtitle: "", body: "" });

  useEffect(() => {
    if (!data) return;

    // Batch both state updates - React will batch them automatically
    startTransition(() => {
      const initial = {
        title: data.title ?? "",
        subtitle: data.subtitle ?? "",
        body: data.body ?? "",
      };

      if (titleRef.current) titleRef.current.textContent = initial.title;
      if (subtitleRef.current)
        subtitleRef.current.textContent = initial.subtitle;
      if (bodyRef.current) bodyRef.current.innerHTML = initial.body;

      // setContent(initial);
      // setOriginalContent(initial);
      originalContent.current = initial; // Store original
    });
  }, [data]);

  // Separate cleanup effect - only runs on unmount
  useEffect(() => {
    return () => {
      setPrompt(null);
    };
  }, []);

  // type Key = keyof typeof content;
  // function handleContentChange(key: Key, value: string) {
  //   setContent((prev) => {
  //     return { ...prev, [key]: value };
  //   });
  // }

  // Check hasChanged on every input
  function checkHasChanged() {
    console.log("checking");
    const current = {
      title: titleRef.current?.textContent?.trim() || "",
      subtitle: subtitleRef.current?.textContent?.trim() || "",
      body: bodyRef.current?.textContent?.trim() || "",
    };

    const original = {
      title: originalContent.current.title.trim(),
      subtitle: originalContent.current.subtitle.trim(),
      body: originalContent.current.body.trim(),
    };

    setHasChanged(JSON.stringify(current) !== JSON.stringify(original));
    setIsDraftPublishable(!!current.title.trim() && !!current.body.trim());
  }

  console.log({ hasChanged });

  async function handleSaveDraft() {
    if (!userID || !story_id) return;

    const content = {
      title: titleRef.current?.textContent || "",
      subtitle: subtitleRef.current?.textContent || "",
      body: bodyRef.current?.textContent || "",
    };

    const draft: DraftSubmission = {
      id: +story_id,
      ...content,
      prompt_id,
    };

    const { data, error } = await saveDraft({ draft });

    if (error) {
      console.log(error);
      return;
    }

    console.log(data);
    // Reset original to current content
    originalContent.current = content;
    setHasChanged(false);
  }

  async function handleSaveStory() {
    if (!userID || !story_id) return;

    const content = {
      title: titleRef.current?.textContent || "",
      subtitle: subtitleRef.current?.textContent || "",
      body: bodyRef.current?.textContent || "",
    };

    const story: StorySubmission = {
      id: +story_id,
      ...content,
      prompt_id,
    };

    const { data, error } = await saveStory({ story });

    if (error) throw error;

    // Reset original to current content
    originalContent.current = content;
    setHasChanged(false);

    return data;
  }

  if (isLoading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
        <LoadingIcon className="size-6 animate-spin" />
      </div>
    );
  }

  if (error) {
    return <p>oops no story found</p>;
  }

  if (!isLoading && !data) {
    return <p>story not found</p>;
  }

  return (
    <div className="flex flex-col gap-12 pb-12">
      <EditorNav
        hasDraftContentChanged={hasChanged}
        draft={{
          isDraftPublishable,
          type: data?.type ?? null,
        }}
        saveStory={handleSaveStory}
        saveDraft={handleSaveDraft}
      />

      <div className="wrapper max-w-7xl ">
        <div className="w-full mx-auto max-w-2xl flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <EditorPrompt />
            <EditorTitle
              titleRef={titleRef}
              subtitleRef={subtitleRef}
              checkHasChanged={checkHasChanged}
            />
          </div>

          <EditorBody bodyRef={bodyRef} checkHasChanged={checkHasChanged} />
        </div>
      </div>
    </div>
  );
}

export default Editor;
