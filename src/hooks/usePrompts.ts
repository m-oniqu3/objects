import useSWRInfinite from "swr/infinite";
import getPrompts from "../services/prompts/get-prompts";
import type { PromptPreview } from "../types/story";

// type Props = {
//   limit?: number;
// };

function usePrompts(limit = 10) {
  //   const { limit = 10 } = props;
  async function getPromptsFetcher(key: [string, number]) {
    const page = key[1];
    const { data, error } = await getPrompts(page, limit);

    if (error) throw error;

    return data;
  }

  // get key for each page
  // type of previous pgae is what's returned by the fetcher
  function getPromptsKey(
    pageIndex: number,
    previousPageData: PromptPreview[] | null,
  ) {
    // First page
    if (pageIndex === 0) return ["prompts", pageIndex];

    // If previous page returned null or empty, stop
    if (!previousPageData || previousPageData.length === 0) return null;

    // If previous page had fewer items than limit, we've reached the end
    if (previousPageData.length < limit) return null;

    return ["prompts", pageIndex];
  }

  // Get prompts
  const { data, error, isLoading, isValidating, setSize } = useSWRInfinite(
    getPromptsKey,
    getPromptsFetcher,
  );

  // Flatten all pages
  const prompts = data?.flatMap((page) => page ?? []) ?? [];

  const lastPage = data?.[data.length - 1];
  const isEmpty = lastPage?.length === 0;
  const isReachingEnd = (lastPage?.length ?? 0) < limit;

  function fetchMorePrompts() {
    setSize((prev) => prev + 1);
  }

  return {
    data: prompts,
    canStopFetching: isEmpty || isReachingEnd,
    error,
    isLoading,
    isValidating,
    fetchMorePrompts,
  };
}

export default usePrompts;
