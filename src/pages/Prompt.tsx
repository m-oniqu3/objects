import { useLocation } from "react-router";
import useSWRInfinite from "swr/infinite";
import { LoadingIcon } from "../assets/icons";
import InfiniteScroll from "../components/InfiniteScroll";
import StoryPreview from "../components/story/StoryPreview";
import getPromptStories from "../services/prompts/get-prompt-stories";
import type { PromptStories } from "../types/story";
import { formatDate } from "../utils/validation/format-date";

const limit = 15;

async function promptStoriesFetcher([, prompt_id, page]: [
  string,
  number,
  number,
]) {
  if (!prompt_id) throw new Error("No prompt ID");
  // const page = key[1];

  const { data, error } = await getPromptStories({ page, limit, prompt_id });

  if (error) throw error;
  return data;
}

function Prompt() {
  const { pathname } = useLocation();

  const promptID = pathname.split("/").pop();

  function getKey(page: number, previousPageData: Array<PromptStories> | null) {
    if (!promptID) return null; // don't fetch if missing

    if (previousPageData && !previousPageData.length) {
      return null; // reached end
    }

    return ["prompt_stories", promptID, page];
  }

  const { data, error, isLoading, isValidating, setSize } = useSWRInfinite(
    getKey,
    promptStoriesFetcher,
  );

  // Check if we've reached the end
  const lastPage = data?.[data.length - 1];
  const isEmpty = lastPage?.stories.length === 0;
  const isReachingEnd = (lastPage?.stories.length ?? 0) < limit;

  function fetchMore() {
    setSize((prev) => prev + 1);
  }

  if (isLoading) {
    return (
      <div className="grid place-items-center w-full">
        <LoadingIcon className="size-6 animate-spin" />
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!data || data.length === 0) {
    return <p> no results</p>;
  }

  const prompt = data.at(0)?.prompt ?? null;
  const stories = data.flatMap((page) => page?.stories ?? []) ?? [];

  if (!prompt) return <p>something </p>;

  const { story_count, title, created_at } = prompt;

  const rendered_stories = stories.map((story) => {
    return <StoryPreview key={story.id} story={{ ...story, prompt: null }} />;
  });

  return (
    <div className="page-wrapper">
      <div className="flex flex-col gap-4 p-8 justify-center items-center text-center">
        <h1 className="font-medium text-xl leading-8">"{title}"</h1>

        <p className="text-sm text-neutral-600 flex items-center gap-2">
          <span>
            {story_count} {story_count === 1 ? "story" : "stories"}
          </span>
          &bull;
          <span className="">Posted {formatDate(created_at)}</span>
        </p>
      </div>

      <InfiniteScroll
        isLoading={isLoading || isValidating}
        canStopFetching={isEmpty || isReachingEnd}
        fetcher={fetchMore}
      >
        <section className="flex flex-col">{rendered_stories}</section>
      </InfiniteScroll>
    </div>
  );
}

export default Prompt;
