import type { SWRInfiniteResponse } from "swr/infinite";
import { LoadingIcon } from "../../../assets/icons";
import type { StoryComment as SComment } from "../../../types/story";
import InfiniteScroll from "../../InfiniteScroll";
import StoryComment from "./StoryComment";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  swr: SWRInfiniteResponse<SComment[] | null, any>;
};

function StoryCommentsList(props: Props) {
  const {
    swr: { data, isLoading, isValidating, setSize, error },
  } = props;

  const comments = data?.flatMap((page) => page ?? []) ?? [];

  // Check if we've reached the end
  const lastPage = data?.[data.length - 1];
  const isEmpty = lastPage?.length === 0;

  // fetchMoreComments
  function fetchMoreComments() {
    setSize((prev) => prev + 1);
  }

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

  if (!comments || comments.length == 0) {
    return (
      <div className="text-sm grid place-items-center">
        <h2 className=" text-md font-medium">No replies yet.</h2>
        <p className="">Be the first to leave a comment.</p>
      </div>
    );
  }

  const rendered_comments = comments.map((comment) => {
    return <StoryComment comment={comment} key={comment.id} />;
  });

  return (
    <section className="flex flex-col gap-8">
      <h2 className="font-medium text-center text-lg">Comments</h2>

      <InfiniteScroll
        isLoading={isLoading || isValidating}
        canStopFetching={isEmpty}
        fetcher={fetchMoreComments}
      >
        <section className="flex flex-col ">{rendered_comments}</section>
      </InfiniteScroll>
    </section>
  );
}

export default StoryCommentsList;
