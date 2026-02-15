import useSWRInfinite from "swr/infinite";
import { LoadingIcon } from "../assets/icons";
import InfiniteScroll from "../components/InfiniteScroll";
import PromptOverview from "../components/prompt/PromptOverview";
import getPrompts from "../services/prompts/get-prompts";
import type { PromptOverview as POverview } from "../types/prompt";

const limit = 15;

async function getPromptsFetcher(key: [string, number]) {
  const page = key[1];

  const { data, error } = await getPrompts(page, limit);

  if (error) throw error;
  return data;
}

function getKey(page: number, previousPageData: Array<POverview> | null) {
  if (page === 0) return ["prompts", page];
  if (previousPageData && previousPageData.length === 0) return null;
  if (previousPageData && previousPageData.length < limit) return null;

  return ["prompts", page];
}

function Prompts() {
  const { data, isLoading, isValidating, setSize } = useSWRInfinite(
    getKey,
    getPromptsFetcher,
  );

  // Check if we've reached the end
  const lastPage = data?.[data.length - 1];
  const isEmpty = lastPage?.length === 0;
  const isReachingEnd = (lastPage?.length ?? 0) < limit;

  const prompts = data?.flatMap((page) => page ?? []) ?? [];

  function fetchMore() {
    setSize((prev) => prev + 1);
  }

  const rendered_prompts = prompts.map((prompt) => {
    return <PromptOverview key={prompt.id} prompt={prompt} />;
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
        fetcher={fetchMore}
      >
        <section className="flex flex-col ">{rendered_prompts}</section>
      </InfiniteScroll>
    </div>
  );
}

export default Prompts;
