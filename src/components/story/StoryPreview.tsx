import { Link } from "react-router";
import type { StoryPreview as SPreview } from "../../types/story";
import { formatDate } from "../../utils/validation/format-date";

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

      author: { fullname, avatar_url },
      prompt,
    },
  } = props;

  const story_link = `/story/${slug}/${id}`;

  // const rendred_genres = genres
  //   ? genres.map(({ id, name }) => {
  //       return (
  //         <li key={id} className="text-sm">
  //           {name}
  //         </li>
  //       );
  //     })
  //   : null;

  const avatar =
    avatar_url ?? `https://ui-avatars.com/api/?name=${fullname}?rounded=true`;

  return (
    <article className="border-b border-zinc-100 py-10">
      <Link to={story_link} className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <figure>
            <img
              src={avatar}
              alt={"Avatar" + fullname}
              className="object-cover size-8 rounded-full"
            />
          </figure>

          <p className="text-xs uppercase leading-8 tracking-wider">
            {fullname}

            <span> {formatDate(published_at)}</span>
          </p>

          <p className="text-sm">{formatDate(published_at)}</p>
        </div>

        <div>
          <h1 className="text-xl">{title}</h1>
          {subtitle && <p>{subtitle}</p>}

          {prompt && (
            <p className="text-xs uppercase leading-5 tracking-wider text-neutral-500">
              {prompt.title}
            </p>
          )}
        </div>

        <p className="text-sm leading-6 tracking-wider"> {snippet}</p>

        <div></div>
      </Link>
    </article>
  );
}

export default StoryPreview;
