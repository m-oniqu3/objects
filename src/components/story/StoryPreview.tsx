import { Link } from "react-router";
import type { PublishedStory } from "../../types/story";
import { formatDate } from "../../utils/validation/format-date";

type Props = {
  story: PublishedStory;
};

function StoryPreview(props: Props) {
  const {
    story: {
      id,
      title,
      content,
      slug,
      published_at,
      genres,
      author: { fullname, avatar_url },
      prompt,
    },
  } = props;

  const story_link = `/story/${id}-${slug}`;

  const rendred_genres = genres
    ? genres.map(({ id, name }) => {
        return (
          <li key={id} className="text-sm">
            {name}
          </li>
        );
      })
    : null;

  const avatar =
    avatar_url ?? `https://ui-avatars.com/api/?name=${fullname}?rounded=true`;

  return (
    <article className="border-b border-zinc-100 py-10">
      <Link to={story_link} className="flex flex-col gap-4">
        {rendred_genres && <ul>{rendred_genres}</ul>}

        <div>
          <h1 className="text-xl">{title}</h1>
          {prompt && (
            <p className="text-sm">
              <span className="">In response to&nbsp;</span>
              {prompt.title}
            </p>
          )}
        </div>

        <p className="text-sm">{formatDate(published_at)}</p>

        <div className="flex items-center gap-4">
          <figure>
            <img
              src={avatar}
              alt={"Avatar" + fullname}
              className="object-cover size-10 rounded-full"
            />
          </figure>

          <p>{fullname}</p>
        </div>

        <p className=""> {content.slice(0, 250)}</p>

        <div></div>
      </Link>
    </article>
  );
}

export default StoryPreview;
