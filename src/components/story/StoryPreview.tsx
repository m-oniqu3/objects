import { Link } from "react-router";
import { CommentIcon, HeartOutlineIcon, RepostIcon } from "../../assets/icons";
import { useModalContext } from "../../contexts/modal/useModal";
import type {
  StoryPreview as SPreview,
  StoryRepostPreview,
} from "../../types/story";
import { formatDate } from "../../utils/validation/format-date";
import Metric from "../Metric";

type Props = {
  story: SPreview;
};

function StoryPreview(props: Props) {
  const {
    story: {
      id,
      title,
      subtitle,
      snippet,
      slug,
      published_at,
      author,
      author: { fullname, avatar_url },
      prompt,
    },
  } = props;

  const { openModal } = useModalContext();

  const story_link = `/s/${slug}/${id}`;

  const avatar =
    avatar_url ?? `https://ui-avatars.com/api/?name=${fullname}?rounded=true`;

  // metrics

  function handleRepostStory() {
    const story: StoryRepostPreview = {
      id,
      title,
      subtitle,
      snippet,
      published_at,
      author,
      prompt,
    };

    openModal({
      type: "repost_story_options",
      payload: { story },
    });
  }

  const story_stats = [
    { icon: HeartOutlineIcon, value: 0, onClick: () => {} },
    { icon: CommentIcon, value: 0, onClick: () => {} },
    { icon: RepostIcon, value: 0, onClick: handleRepostStory },
  ];

  const rendered_stats = story_stats.map((stat, i) => {
    return (
      <Metric
        key={i}
        icon={stat.icon}
        value={stat.value}
        onClick={stat.onClick}
      />
    );
  });

  return (
    <article className="border-b border-zinc-100 p-8 ">
      <Link to={story_link} className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <figure>
            <img
              src={avatar}
              alt={"Avatar" + fullname}
              className="object-cover size-8 rounded-full"
            />
          </figure>

          <p className="text-xs uppercase leading-8 tracking-wider flex items-center gap-2">
            <span>{fullname}</span>
            &bull;
            <span className="lowercase text-neutral-500">
              {formatDate(published_at)}
            </span>
          </p>
        </div>

        {prompt && (
          <p className="text-sm capitalize leading-5 tracking-wider text-neutral-600">
            {prompt.title}
          </p>
        )}

        <div className="flex flex-col gap-1">
          <h1 className="text-lg font-medium">{title}</h1>

          {subtitle && (
            <p className="text-sm capitalize leading-8 tracking-wider text-neutral-600 ">
              {subtitle}
            </p>
          )}
        </div>

        <p className=" text-sm leading-8 tracking-wider text-neutral-800">
          {snippet}
        </p>

        <p className="text-sm pt-1 capitalize leading-4 tracking-wider text-neutral-600">
          {["Fiction", "Young Adult", "Romance"].join(", ")}.
        </p>

        {/* <ul className="flex items-center gap-2 ">{rendred_genres}</ul> */}

        <div className="flex items-center gap-6 pt-4">{rendered_stats}</div>
      </Link>
    </article>
  );
}

export default StoryPreview;
