import { useState, type ChangeEvent } from "react";
import useSWRInfinite from "swr/infinite";
import { CloseIcon, LoadingIcon, SearchIcon } from "../../assets/icons";
import { useModal } from "../../contexts/modal/useModal";
import getPrompts from "../../services/prompts/get-prompts";
import type { PromptPreview } from "../../types/story";
import InfiniteScroll from "../InfiniteScroll";

const limit = 10;
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

function SelectPrompt() {
  const [search, setSearch] = useState("");
  const { stopPropagation } = useModal();

  // Get prompts
  const { data, isLoading, isValidating, setSize } = useSWRInfinite(
    getPromptsKey,
    getPromptsFetcher,
  );

  // Flatten all pages
  const prompts =
    data
      ?.flatMap((page) => page ?? [])
      .filter((prompt) => prompt.title.includes(search)) ?? [];

  const lastPage = data?.[data.length - 1];
  const isEmpty = lastPage?.length === 0;
  const isReachingEnd = (lastPage?.length ?? 0) < limit;

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  function fetchMorePrompts() {
    setSize((prev) => prev + 1);
  }

  const rendered_prompts = prompts.map((prompt) => {
    return (
      <li
        key={prompt.id}
        className="px-4 py-4 cursor-pointer hover:bg-gray-100"
      >
        {prompt.title}
      </li>
    );
  });

  if (isLoading) {
    return (
      <div className="panel grid place-items-center">
        <LoadingIcon className="size-6" />
      </div>
    );
  }

  return (
    <div onClick={stopPropagation} className="relative panel p-0 ">
      <header className="flex flex-col gap-4 p-4 sticky top-0 left-0 w-full bg-white border-b border-gray-100">
        <div>
          <h1 className="text-xl">Pick a Prompt</h1>
          <p>Find the idea that sparks your creativity</p>
        </div>

        <form className="grid grid-cols-[30px_auto_30px] ">
          <div className="bg-gray-100 pl-4 grid place-items-center rounded-l-2xl">
            <SearchIcon className="size-4 text-neutral-400" />
          </div>

          <input
            type="text"
            value={search}
            onChange={handleSearch}
            className="bg-gray-100 w-full text-sml h-12 px-4 font-medium focus:outline-none placeholder:text-neutral-500"
            placeholder="Search..."
          />

          <button
            type="button"
            className="bg-gray-100 pr-4 grid place-items-center rounded-r-2xl cursor-pointer"
            onClick={() => setSearch("")}
          >
            {search && <CloseIcon className="size-4.5 text-neutral-400" />}
          </button>
        </form>
      </header>

      <div>
        {rendered_prompts.length > 0 ? (
          <ul className="flex flex-col ">
            <InfiniteScroll
              isLoading={isLoading || isValidating}
              canStopFetching={isEmpty || isReachingEnd}
              fetcher={fetchMorePrompts}
            >
              {rendered_prompts}
            </InfiniteScroll>
          </ul>
        ) : (
          <p className="text-center">No prompts.</p>
        )}
      </div>
    </div>
  );
}

export default SelectPrompt;
