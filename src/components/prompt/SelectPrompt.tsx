import { useState, type ChangeEvent } from "react";
import { CloseIcon, SearchIcon } from "../../assets/icons";

function SelectPrompt() {
  const [search, setSearch] = useState("");

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  return (
    <div className="panel">
      <header>
        <h1>Choose a writing prompt</h1>
        <p>Select from our database or your saved prompts</p>
      </header>

      <div>
        <form className="grid grid-cols-[30px_auto_30px] ">
          <div className="gray pl-4 flex-center rounded-l-2xl">
            <SearchIcon className="size-4 text-neutral-400" />
          </div>

          <input
            type="text"
            value={search}
            onChange={handleSearch}
            className="gray w-full text-sml h-12 px-4 font-medium focus:outline-none placeholder:text-neutral-500"
            placeholder="Search..."
          />

          <button
            type="button"
            className="gray pr-4 flex-center rounded-r-2xl cursor-pointer"
            onClick={() => setSearch("")}
          >
            {search && <CloseIcon className="size-4.5 text-neutral-400" />}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SelectPrompt;
