import parse from "html-react-parser";
import {
  CommentIcon,
  HeartOutlineIcon,
  RepostIcon,
} from "../../../assets/icons";
import type { Story } from "../../../types/story";
import { formatDate } from "../../../utils/validation/format-date";
import Metric from "../../Metric";
import StorySeparator from "../StorySeparator";

type Props = {
  story: Story;
};

function StoryContents(props: Props) {
  const {
    story: {
      prompt,
      title,
      subtitle,
      body,
      author: { avatar_url, fullname },
      updated_at,
    },
  } = props;

  const avatar =
    avatar_url ?? `https://ui-avatars.com/api/?name=${fullname}?rounded=true`;

  const story_stats = [
    { icon: HeartOutlineIcon, value: 0, onClick: () => {} },
    { icon: CommentIcon, value: 0, onClick: () => {} },
    { icon: RepostIcon, value: 0, onClick: () => {} },
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
    <article className="flex flex-col gap-12 ">
      <header className="flex flex-col gap-8  border-neutral-100 pb-8">
        {prompt && (
          <p className="text-sm capitalize leading-5 tracking-wider text-neutral-800">
            {prompt.title}
          </p>
        )}

        <div className="flex flex-col gap-2">
          <h1 className="text-2xl sm:text-3xl font-medium leading-snug tracking-wide text-neutral-800">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm leading-5 tracking-wider text-neutral-800 ">
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex flex-col  gap-12">
          <figure className="flex items-center gap-4">
            <img
              src={avatar}
              alt={"Avatar" + fullname}
              className="object-cover size-10 rounded-full"
            />

            <figcaption className="flex flex-col gap-1">
              <p className="text-xs uppercase tracking-wider font-medium">
                {fullname}
              </p>
              <p className="text-xs text-neutral-600 tracking-wider">
                {formatDate(updated_at)}
              </p>
            </figcaption>
          </figure>
        </div>
      </header>

      <StorySeparator />

      <div className="text-sm leading-8 tracking-wider text-neutral-800">
        {parse(body)}
      </div>
    </article>
  );
}

export default StoryContents;
