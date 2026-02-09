import { useState, type ChangeEvent } from "react";
import { CloseIcon, LoadingIcon, SearchIcon } from "../../assets/icons";
import usePrompts from "../../hooks/usePrompts";
import InfiniteScroll from "../InfiniteScroll";

function PromptsSidebar() {
  const [search, setSearch] = useState("");
  const {
    data: prompts,
    isLoading,
    isValidating,
    error,
    canStopFetching,
    fetchMorePrompts,
  } = usePrompts();

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  const rendered_prompts = prompts.map((prompt) => {
    return (
      <li
        key={prompt.id}
        className="text-sm px-4 py-4 cursor-pointer rounded-xl hover:bg-gray-100"
      >
        {prompt.title}
      </li>
    );
  });

  if (isLoading) {
    return (
      <div className=" grid place-items-center">
        <LoadingIcon className="size-6" />
      </div>
    );
  }

  return (
    <div className="relative border border-gray-100 rounded-2xl h-full overflow-scroll no-scrollbar">
      <header className="flex flex-col gap-4 p-4 pb-4 sticky top-0 left-0 w-full bg-white border-b border-gray-100">
        <div>
          <h1 className="text-2xl font-semibold">Pick a Prompt</h1>
          <p className="text-sm">Find the idea that sparks your creativity</p>
        </div>

        <form className="grid grid-cols-[30px_auto_30px] ">
          <div className="bg-zinc-100 pl-4 grid place-items-center rounded-l-lg">
            <SearchIcon className="size-4 text-neutral-400" />
          </div>

          <input
            type="text"
            value={search}
            onChange={handleSearch}
            className="bg-zinc-100 w-full text-sm h-10 px-2 focus:outline-none placeholder:text-neutral-500"
            placeholder="Search..."
          />

          <button
            type="button"
            className="bg-zinc-100 pr-4 grid place-items-center rounded-r-lg cursor-pointer"
            onClick={() => setSearch("")}
          >
            {search && <CloseIcon className="size-4.5 text-neutral-400" />}
          </button>
        </form>
      </header>

      <div className="p-2">
        {rendered_prompts.length > 0 ? (
          <ul className="flex flex-col ">
            <InfiniteScroll
              isLoading={isLoading || isValidating}
              canStopFetching={canStopFetching}
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

export default PromptsSidebar;
