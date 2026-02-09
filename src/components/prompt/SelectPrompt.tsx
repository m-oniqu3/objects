import { useState, type ChangeEvent } from "react";
import { CloseIcon, LoadingIcon, SearchIcon } from "../../assets/icons";
import { useModal } from "../../contexts/modal/useModal";
import { usePrompt } from "../../contexts/prompt/usePrompt";
import usePrompts from "../../hooks/usePrompts";
import type { PromptPreview } from "../../types/story";
import InfiniteScroll from "../InfiniteScroll";

function SelectPrompt() {
  const [search, setSearch] = useState("");
  const { stopPropagation, closeModal } = useModal();
  const { setPrompt } = usePrompt();

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

  function handlePrompt(prompt: PromptPreview) {
    setPrompt(prompt);
    closeModal();
  }

  const rendered_prompts = prompts.map((prompt) => {
    return (
      <li
        key={prompt.id}
        onClick={() => handlePrompt(prompt)}
        className="px-4 py-4 cursor-pointer hover:bg-gray-100"
      >
        {prompt.title}
      </li>
    );
  });

  if (isLoading) {
    return (
      <div className="panel grid place-items-center">
        <LoadingIcon className="size-6 animate-spin" />
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

export default SelectPrompt;
