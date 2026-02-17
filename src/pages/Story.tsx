import { useLocation } from "react-router";
import useSWR from "swr";
import { LoadingIcon } from "../assets/icons";
import StoryContents from "../components/story/StoryContents";
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
    <section>
      <StoryContents story={data} />
    </section>
  );
}

export default Story;
