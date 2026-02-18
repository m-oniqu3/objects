import { useLocation } from "react-router";
import useSWR from "swr";
import { LoadingIcon } from "../assets/icons";
import StoryComments from "../components/story/comments/StoryComments";
import StoryContents from "../components/story/contents/StoryContents";
import StoryStats from "../components/story/contents/StoryStats";
import StorySeparator from "../components/story/StorySeparator";
import getStory from "../services/stories/get-story";

async function getStoryFetcher(storyID: number) {
  if (!storyID) throw new Error("No Story ID present");

  const { data, error } = await getStory(storyID);

  if (error) throw error;

  return data;
}

function Story() {
  const { pathname } = useLocation();

  const storyID = pathname.split("/").pop()?.split("-").pop() ?? "";

  const { data, error, isLoading } = useSWR("get-story" + storyID, () =>
    getStoryFetcher(+storyID),
  );

  if (isLoading) {
    return (
      <div className="h-[50dvh] absolute-center ">
        <LoadingIcon className="size-5 animate-spin" />;
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!data) {
    return <p>story not found</p>;
  }

  return (
    <section className="flex flex-col gap-12 max-w-2xl mx-auto">
      <StoryContents story={data} />
      <StorySeparator />

      <StoryStats />

      <StorySeparator />
      <StoryComments storyID={data.id} />
    </section>
  );
}

export default Story;
