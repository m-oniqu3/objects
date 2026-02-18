import useSWRInfinite from "swr/infinite";
import getStoryComments from "../../../services/stories/comments/get-story-comments";
import type { StoryComment as SComment } from "../../../types/story";
import StorySeparator from "../StorySeparator";
import CreateStoryComment from "./CreateStoryComment";
import StoryCommentsList from "./StoryCommentsList";

type Props = {
  storyID: number;
};

async function storyCommentsFetcher([, story_id, page]: [
  string,
  number,
  number,
]) {
  const { data, error } = await getStoryComments({
    story_id,
    page,
    limit: 15,
  });

  if (error) throw error;
  return data;
}

function StoryComments(props: Props) {
  const { storyID } = props;

  function getKey(page: number, previousPageData: Array<SComment> | null) {
    if (!storyID) return null; // don't fetch if missing

    if (previousPageData && !previousPageData.length) {
      return null; // reached end
    }

    return ["story-comments", storyID, page];
  }

  const commentsSWR = useSWRInfinite(getKey, storyCommentsFetcher);

  // Get the new comment after a new comment submission
  async function handleCommentCreated() {
    const swr = commentsSWR;
    await swr.setSize(1);
    await swr.mutate();
  }

  return (
    <section className="flex flex-col gap-16">
      <CreateStoryComment
        storyID={storyID}
        onCommentCreated={handleCommentCreated}
      />
      <StorySeparator />

      <StoryCommentsList swr={commentsSWR} />
    </section>
  );
}

export default StoryComments;
