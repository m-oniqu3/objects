import parse from "html-react-parser";
import type { Story } from "../../types/story";
import { formatDate } from "../../utils/validation/format-date";

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

  return (
    <article className="flex flex-col gap-12 max-w-2xl mx-auto">
      <header className="flex flex-col gap-8  border-neutral-100 pb-8">
        {prompt && (
          <p className="text-sm capitalize leading-5 tracking-wider text-neutral-800">
            {prompt.title}
          </p>
        )}

        <div className="text-neutral-400">* * *</div>

        <div className="flex flex-col gap-3">
          <h1 className="text-2xl sm:text-4xl font-semibold leading-snug tracking-wider text-neutral-800">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm  leading-5 tracking-wider text-neutral-800 capitalize">
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex items-center gap-4">
          <figure>
            <img
              src={avatar}
              alt={"Avatar" + fullname}
              className="object-cover size-10 rounded-full"
            />
          </figure>

          <div>
            <p className="text-xs uppercase tracking-wider font-medium">
              {fullname}
            </p>
            <p className="text-xs text-neutral-600 tracking-wider">
              {formatDate(updated_at)}
            </p>
          </div>
        </div>
      </header>

      <div className="text-neutral-400">* * *</div>

      <div className="text-sm leading-8 tracking-wider text-neutral-800">
        {parse(body)}
      </div>
    </article>
  );
}

export default StoryContents;
