import useSWRInfinite from "swr/infinite";

import { LoadingIcon } from "../assets/icons";
import InfiniteScroll from "../components/InfiniteScroll";
import StoryPreview from "../components/story/StoryPreview";
import { getStoryPreviews } from "../services/stories/get-story-previews";
import type { StoryPreview as SPreview } from "../types/story";

const limit = 15;

async function storyPreviewsFetcher(key: [string, number]) {
  const page = key[1];

  const { data, error } = await getStoryPreviews(page, limit);

  if (error) throw error;
  return data;
}

function getKey(page: number, previousPageData: Array<SPreview> | null) {
  if (page === 0) return ["stories", page];
  if (previousPageData && previousPageData.length === 0) return null;
  if (previousPageData && previousPageData.length < limit) return null;

  return ["stories", page];
}

function Stories() {
  const { data, isLoading, isValidating, setSize } = useSWRInfinite(
    getKey,
    storyPreviewsFetcher,
  );

  // Check if we've reached the end
  const lastPage = data?.[data.length - 1];
  const isEmpty = lastPage?.length === 0;
  const isReachingEnd = (lastPage?.length ?? 0) < limit;

  const stories = data?.flatMap((page) => page ?? []) ?? [];

  function fetchMoreStories() {
    setSize((prev) => prev + 1);
  }

  const rendered_stories = stories.map((story) => {
    return <StoryPreview key={story.id} story={story} />;
  });

  if (isLoading) {
    return (
      <div className="grid place-items-center w-full">
        <LoadingIcon className="size-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <InfiniteScroll
        isLoading={isLoading || isValidating}
        canStopFetching={isEmpty || isReachingEnd}
        fetcher={fetchMoreStories}
      >
        <section className="flex flex-col">{rendered_stories}</section>
      </InfiniteScroll>
    </div>
  );
}

export default Stories;
