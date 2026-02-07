import useSWRInfinite from "swr/infinite";

import InfiniteScroll from "../components/InfiniteScroll";
import StoryPreview from "../components/story/StoryPreview";
import { getPublishedStories } from "../services/stories/get-published-stories";
import type { PublishedStory } from "../types/story";

// get key for each page
function getKey(page: number, previousPageData: Array<PublishedStory> | null) {
  if (previousPageData && previousPageData.length === 0) return null;
  return ["published_stories", page];
}

function publishedStoriesFetcher(key: [string, number]) {
  const page = key[1];
  return getPublishedStories(page, 5);
}

function Stories() {
  const { data, isLoading, error, isValidating, setSize } = useSWRInfinite(
    getKey,
    publishedStoriesFetcher,
  );

  console.log(isLoading);
  console.log(error);
  console.log(data);

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
        fetcher={fetchMoreStories}
      >
        <section className="flex flex-col">{rendered_stories}</section>
      </InfiniteScroll>
    </div>
  );
}

export default Stories;
