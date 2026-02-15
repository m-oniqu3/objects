import { Link } from "react-router";
import { BookmarkIcon } from "../../assets/icons";
import { type PromptOverview as POverview } from "../../types/prompt";
import { formatDate } from "../../utils/validation/format-date";
import Button from "../Button";

type Props = {
  prompt: POverview;
};

function PromptOverview(props: Props) {
  const {
    prompt: { id, title, created_at, story_count },
  } = props;

  return (
    <Link
      to={`/p/${id}`}
      className="flex flex-col gap-8 p-8 border-b border-zinc-100  hover:bg-gray-50"
    >
      <h1 className=" leading-8">{title}</h1>

      <div className="flex items-center justify-between  gap-4">
        <div className="grid grid-cols-[160px_auto] gap-4">
          <p className="text-sm text-neutral-600 flex items-center gap-2">
            <span>
              {story_count} {story_count === 1 ? "story" : "stories"}
            </span>
            &bull;
            <span className="lowercase">{formatDate(created_at)}</span>
          </p>

          <button>
            <BookmarkIcon className="size-5" />
          </button>
        </div>

        <Button className="bg-neutral-300  text-neutal-800 text-sm capitalize">
          write
        </Button>
      </div>
    </Link>
  );
}

export default PromptOverview;
