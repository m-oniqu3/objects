import useSWRInfinite from "swr/infinite";

import InfiniteScroll from "../components/InfiniteScroll";
import StoryPreview from "../components/story/StoryPreview";
import { getPublishedStories } from "../services/stories/get-published-stories";
import type { PublishedStory } from "../types/story";

function publishedStoriesFetcher(key: [string, number]) {
  console.log({ key });
  const page = key[1];
  return getPublishedStories(page, 5);
}

function Stories() {
  // get key for each page
  function getKey(
    page: number,
    previousPageData: Array<PublishedStory> | null,
  ) {
    // If it's the first page, return the key
    if (page === 0) return ["published_stories", page];

    // If previous page had no data, we've reached the end
    if (previousPageData && previousPageData.length === 0) return null;

    // If previous page had less than the limit, we've reached the end
    if (previousPageData && previousPageData.length < 5) return null;

    return ["published_stories", page];
  }

  const { data, isLoading, isValidating, setSize } = useSWRInfinite(
    getKey,
    publishedStoriesFetcher,
  );

  console.log(data);

  // Check if we've reached the end
  const isReachingEnd = data && data[data.length - 1]?.length < 5;
  const isEmpty = data?.[0]?.length === 0;

  const stories = data ? data.flat() : [];

  function fetchMoreStories() {
    setSize((prev) => prev + 1);
  }

  const rendered_stories = stories.map((story) => {
    return <StoryPreview key={story.id} story={story} />;
  });

  return (
    <div className="max-w-xl mx-auto">
      <InfiniteScroll
        isLoading={isLoading || isValidating}
        hasMore={!isReachingEnd && !isEmpty}
        fetcher={fetchMoreStories}
      >
        <section className="flex flex-col">{rendered_stories}</section>
      </InfiniteScroll>
    </div>
  );
}

export default Stories;
